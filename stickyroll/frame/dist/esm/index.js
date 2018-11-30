import React from 'react';
import { ScrollConsumer, ScrollProvider } from '@stickyroll/context';
import { Tracker } from '@stickyroll/tracker';

/**
 * @type {React.CSSProperties}
 * @property {string|number} height
 * @property {string} position
 * @property {string|number} top
 * @property {string|number} width
 */
const overlayStyle = {
    height: "100vh",
    position: "sticky",
    top: 0,
    width: "100%"
};
/**
 * @type {React.CSSProperties}
 * @property {string|number} bottom
 * @property {string|number} left
 * @property {string} position
 * @property {string|number} top
 */
const anchorStyle = {
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0
};
class Frame extends React.Component {
    constructor() {
        super(...arguments);
        /**
         * @public
         * @type {IFrameState}
         */
        this.state = {
            page: 0,
            scrollOffset: 0,
            scrollY: 0
        };
        /**
         * @private
         * @type {React.RefObject<HTMLDivElement>}
         */
        this.tracker = React.createRef();
        /**
         * A Wrapper around the content to ensure the correct behavior during interaction.
         * Renders a sticky container, an event-tracker and optionally anchor targets to allow deep-links.
         * @constructor
         * @private
         * @type {React.FunctionComponent}
         * @param props
         * @return {ReactElement<any> | null}
         */
        this.Wrapper = ({ children }) => (React.createElement(React.Fragment, null,
            React.createElement(Tracker, { onUpdate: this.handleUpdate, throttle: this.props.throttle }),
            React.createElement("div", { className: this.props.className, style: this.wrapperStyle, ref: this.tracker },
                this.anchors,
                React.createElement("div", { style: overlayStyle }, children))));
        /**
         * Scroll handler to parse the page and progress fromm the scroll position.
         * @private
         * @param {number} scrollY
         * @returns {void}
         */
        this.handleUpdate = (scrollY) => {
            if (!this.tracker || !this.tracker.current) {
                return;
            }
            let page = 0;
            let scrollOffset = 0;
            const { top, bottom } = this.tracker.current.getBoundingClientRect();
            const { factor, pages } = this.props;
            const pageCount = Array.isArray(pages) ? pages.length : pages;
            const { innerHeight = 0 } = window;
            const touchedTop = top <= 0;
            const touchedEnd = bottom <= innerHeight;
            if (touchedTop && !touchedEnd) {
                page = Math.max(0, Math.min(pageCount - 1, Math.floor((top * (-1 / factor)) / innerHeight)));
                scrollOffset = Math.max(0, Math.min(100, (((top * -1) % (innerHeight * factor)) / innerHeight / factor) * 100));
            }
            else if (touchedEnd) {
                page = pageCount - 1;
                scrollOffset = 100;
            }
            this.setState({
                page,
                scrollOffset,
                scrollY
            });
        };
    }
    /**
     * @public
     * @type {IFrameDefaultProps}
     */
    static get defaultProps() {
        return {
            factor: 1
        };
    }
    /**
     * Write the current scrollPosition to the internal state when the component is mounted.
     * This will allow getting the correct page and progress after mounting.
     * @public
     */
    componentDidMount() {
        this.setState({
            scrollY: window.scrollY
        });
    }
    /**
     * Write the current scrollPosition to the internal state when the component is mounted.
     * This will allow getting the correct page and progress after mounting.
     * @public
     */
    componentDidUpdate(oldProps, oldState) {
        if (oldState.page !== this.state.page) {
            if (typeof this.props.onPage === "function") {
                this.props.onPage(this.state.page);
            }
        }
    }
    /**
     * Rendering can be configured in two different ways.
     * 1. Using `children`:
     *    * uses context
     *    * supports context based plugins
     * 2. Using `render`:
     *    * better performance
     *
     * The differences are based on the use of context. To allow context based plugins it is advised
     * to use a child function. To improve performance the render property can be used (Plugins can still be used but
     * must be configured manually)
     * @public
     */
    render() {
        const { render, children, anchors, pages } = this.props;
        // Test for either the render property or children to be defined as function.
        // Render wins over children if both are defined. If neither is defined as function, a TypeError is thrown.
        if (typeof render !== "function" && typeof children !== "function") {
            throw new TypeError(`Either children or render needs to be defined as a function`);
        }
        const { page } = this.state;
        const Wrapper = this.Wrapper;
        const pageCount = Array.isArray(pages) ? pages.length : pages;
        // Convert the scrollOffset from percent to a timeline [0,1]
        const progress = this.state.scrollOffset / 100;
        // Switch between context free and context based versions
        switch (typeof render) {
            case "function":
                // Context free
                return (React.createElement(Wrapper, null, render({
                    anchors,
                    page,
                    pages: pageCount,
                    progress
                })));
            // Context based
            default:
                return (React.createElement(ScrollProvider, { value: { anchors, page, pages: pageCount, progress } },
                    React.createElement(Wrapper, null,
                        React.createElement(ScrollConsumer, null, children))));
        }
    }
    /**
     * @type {React.CSSProperties}
     */
    get wrapperStyle() {
        const { pages, factor } = this.props;
        const pageCount = Array.isArray(pages) ? pages.length : pages;
        const vh = pageCount * 100 * factor + 100;
        return {
            height: `${vh}vh`,
            margin: 0,
            position: "relative"
        };
    }
    /**
     * If anchors are defined, a collection of spans with the correct IDs are provided.
     * This allows to link or jump to a section or even skip the entire content.
     * @type {React.ReactElement<HTMLDivElement> | null}
     */
    get anchors() {
        const { anchors } = this.props;
        if (!anchors) {
            return null;
        }
        const { factor, pages } = this.props;
        const pageCount = Array.isArray(pages) ? pages.length : pages;
        const vh = 100 * factor;
        const triggers = Array(pageCount + 1)
            .fill(Boolean)
            .map((x, i) => (React.createElement("span", { id: `${anchors}/${i + 1}`, key: `${anchors}:${i + 1}`, style: {
                display: "block",
                height: `${vh}vh`
            } })));
        return (React.createElement("div", { style: anchorStyle },
            triggers,
            React.createElement("span", { id: `${anchors}/skip`, style: {
                    position: "absolute",
                    top: "100%"
                } })));
    }
}

//# sourceMappingURL=index.js.map

export { Frame };
