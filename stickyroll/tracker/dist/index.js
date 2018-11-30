'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var throttle = _interopDefault(require('lodash.throttle'));
var react = require('react');

class Tracker extends react.PureComponent {
    constructor() {
        super(...arguments);
        /**
         * Tracks the page scroll and calls the updateFunction
         * @protected
         * @return {void}
         */
        this.trackScroll = () => {
            if (typeof this.props.onUpdate === "function") {
                this.props.onUpdate(window.scrollY);
            }
        };
    }
    /**
     * init.
     * @public
     */
    componentDidMount() {
        this.addHandlers();
    }
    /**
     * Update all event handlers if the throttle property changed.
     * @public
     * @param {IEventTrackerProps} oldProps
     * @return {void}
     */
    componentDidUpdate(oldProps) {
        if (oldProps.throttle !== this.props.throttle) {
            this.updateHandlers();
        }
    }
    /**
     * Cleanup.
     * @public
     */
    componentWillUnmount() {
        this.removeHandlers();
    }
    /**
     * This component does not render anything.
     * @public
     */
    render() {
        return null;
    }
    /**
     * Add event handlers.
     * On resize and orientation change throttle is enforced at `250ms`.
     */
    addHandlers() {
        const eventHandler = this.props.throttle
            ? throttle(this.trackScroll, this.props.throttle)
            : this.trackScroll;
        const forceThrottle = throttle(this.trackScroll, 250);
        this.scrollHandler = document.addEventListener("scroll", eventHandler, {
            passive: true
        });
        this.resizeHandler = window.addEventListener("resize", forceThrottle, {
            passive: true
        });
        this.orientationHandler = window.addEventListener("orientationchange", forceThrottle, {
            passive: true
        });
    }
    /**
     * Remove event handlers.
     * @public
     */
    removeHandlers() {
        document.removeEventListener("scroll", this.scrollHandler);
        window.removeEventListener("resize", this.resizeHandler);
        window.removeEventListener("resize", this.orientationHandler);
    }
    /**
     * Update event handlers. Safely removes and re-adds all event handlers.
     * @public
     */
    updateHandlers() {
        this.removeHandlers();
        this.addHandlers();
    }
}

exports.Tracker = Tracker;
