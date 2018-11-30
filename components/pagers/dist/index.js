'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var styled = require('styled-components');
var styled__default = _interopDefault(styled);
var context = require('@stickyroll/context');

/**
 *
 * @param {any} value
 * @param {string} type
 * @throws {?TypeError}
 */
const assert = (value, type) => {
    const valueType = typeof value;
    if (valueType !== type) {
        throw new TypeError(`Expected "${type}" but "${valueType}" was received`);
    }
};
/**
 * @type {StyledComponent<"a", {}, PagerProps>}
 * @param {PagerProps} props
 * @param {boolean} [props.active]
 * @param {boolean} [props.selected]
 * @return {React.ReactHTMLElement<HTMLAnchorElement>}
 */
const Pager = styled__default.a `
	position: relative;
	z-index: 2;
	height: var(--pager-size);
	width: var(--pager-size);
	margin: var(--pager-gap) 0.5rem;
	visibility: visible;
	border-radius: 50%;
	display: flex;
	align-content: center;
	align-items: center;
	justify-content: center;
	text-align: center;
	color: currentColor;
	text-decoration: none;
	background-clip: content-box;

	${(props) => styled.css `
		color: var(--color);
		background-color: ${props.selected ? "var(--pager-color-active)" : "var(--pager-color)"};
		border: var(--stroke-width) solid ${props.active ? "var(--marker-color)" : "transparent"};

		&:hover {
			background-color: var(--pager-color-active);
		}
	`};
`;
/**
 * @type {StyledComponent<"nav", {}>}
 * @return {React.ReactHTMLElement<HTMLElement>}
 */
const StyledPagers = styled__default.nav `
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	align-content: center;
	justify-content: center;
	margin: calc(var(--pager-gap) * -1) -0.5rem;
`;
/**
 * @type {StyledComponent<"nav", {}>}
 * @param {IPagerWrapperProps} props
 * @param {boolean} [props.dark]
 * @return {React.ReactHTMLElement<HTMLElement>}
 */
const PagerWrapper = styled__default.div `
	${(props) => styled.css `
		--marker-width: var(--marker-size);
		--marker-color: hsla(
			var(--background-h),
			var(--background-s),
			calc(var(--background-l) ${props.dark ? "-" : "+"} 30%),
			1
		);
		--pager-color: hsla(
			var(--background-h),
			var(--background-s),
			calc(var(--background-l) ${props.dark ? "-" : "+"} 20%),
			1
		);
		--pager-background-color: hsla(
			var(--background-h),
			var(--background-s),
			calc(var(--background-l) ${props.dark ? "+" : "-"} 10%),
			1
		);
		--pager-color-active: hsla(
			var(--background-h),
			var(--background-s),
			calc(var(--background-l) ${props.dark ? "-" : "+"} 10%),
			1
		);
	`};

	position: absolute;
	z-index: 2;
	top: 50%;
	margin: 0 0.5rem;
	left: 0;
	transform: translateY(-50%);
	background-color: var(--pager-background-color);
	border-radius: calc(var(--pager-size) / 2);
`;
/**
 * @type {StyledComponent<"div", {}>}
 * @return {React.ReactHTMLElement<HTMLElement>}
 */
const StyledMarker = styled__default.div `
	position: absolute;
	z-index: 1;
	top: calc((var(--pager-size) / 2) + var(--pager-gap));
	left: calc(0.5rem + (var(--pager-size) - var(--marker-width)) / 2);
	width: var(--marker-width);
	background: var(--marker-color);
	visibility: visible;

	&::before,
	&::after {
		position: absolute;
		content: "";
		display: block;
		height: calc(var(--marker-width) / 2);
		width: var(--marker-width);
		left: 0;
		background: inherit;
	}

	&::before {
		bottom: 100%;
		border-radius: calc(var(--marker-width) / 2) calc(var(--marker-width) / 2) 0 0;
	}

	&::after {
		top: 100%;
		border-radius: 0 0 calc(var(--marker-width) / 2) calc(var(--marker-width) / 2);
	}
`;
/**
 * @type {StyledComponent<"nav", {}>}
 * @param {IMarkerProps} props
 * @param {number} props.page
 * @param {number} props.progress
 * @return {React.ReactHTMLElement<HTMLElement>}
 */
const Marker = props => {
    return (React.createElement(StyledMarker, { style: {
            height: `calc(${props.progress} * (var(--pager-gap) * 2 + var(--pager-size)) + ${props.page} * (var(--pager-gap) * 2 + var(--pager-size)))`
        } }));
};
/**
 * @type {StyledComponent<"svg", {}>}
 * @return {React.ReactSVGElement<SVGSVGElement>}
 */
const Icon = styled__default.svg.attrs({
    viewBox: "0 0 24 24"
}) `
	width: 1.5rem;
	height: 1.5rem;
	fill: currentColor;
`;
/**
 * @type {StyledComponent<"a", {}>}
 * @return {React.ReactHTMLElement<HTMLAnchorElement>}
 */
const SkipLink = styled__default.a `
	position: absolute;
	bottom: 0.5rem;
	right: 0.5rem;
	color: currentColor;
	font-size: 1rem;
	text-decoration: none;
	&:hover {
		text-decoration: underline;
	}
`;
/**
 * @param {string} hash
 * @param {HTMLElement} target
 * @param {IScrollToOptions} [options={}]
 * @return {void}
 */
const scrollTo = (hash, target, options = {}) => {
    if (!options.noHash) {
        window.location.hash = hash;
    }
    const el = document.getElementById(hash);
    if (!options.noFocus) {
        target.focus();
    }
    // Attempted to implement smooth scrolling if the page changes by one position.
    // The page jumps in several state changes
    // @todo Fix unless a browser bug exists.
    // const index = parseInt(hash.split("/").reverse()[0], 10) - 1;
    // const diff = Math.abs(index - page);
    // document.documentElement.style["scroll-behavior"] = diff > 1 ? "auto" : "smooth";
    el.scrollIntoView(true);
    // Optionally if Element.scrollIntoView does not return the expected result.
    // const {top: tEl} = el.getBoundingClientRect();
    // const {top: tBody} = document.body.getBoundingClientRect();
    // const offset = tEl - tBody;
    // window.scrollTo(0, offset);
};
/**
 * @type {React.FunctionComponent<ISkipBaseProps>}
 * @param {ISkipBaseProps} props
 * @param {string} props.prefix
 * @return {React.ReactHTMLElement<HTMLAnchorElement>}
 */
const SkipBase = props => {
    const handleClick = (e) => {
        e.preventDefault();
        scrollTo(`${props.prefix}/skip`, e.target, { noFocus: true, noHash: true });
    };
    return (React.createElement(SkipLink, { href: `#${props.prefix}/skip`, onClick: handleClick }, "Skip"));
};
/**
 * @type {React.FunctionComponent<IPagerBaseProps>}
 * @param {ISkipBaseProps} props
 * @param {number} props.page
 * @param {number} props.pages
 * @param {string} props.prefix
 * @param {number} props.progress
 * @param {boolean} [props.showLabels]
 * @return {React.ReactHTMLElement<HTMLElement>}
 */
const PagerBase = props => {
    const handleClick = (e) => {
        e.preventDefault();
        const target = e.target;
        const id = target.getAttribute("href").replace(/^#/, "");
        scrollTo(id, target);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(PagerWrapper, { dark: props.dark },
            React.createElement(StyledPagers, null,
                React.createElement(Marker, { progress: props.progress, page: props.page }),
                Array(props.pages)
                    .fill(Boolean)
                    .map((x, i) => {
                    const id = `${props.prefix}/${i + 1}`;
                    return (React.createElement(Pager, { key: id, active: i <= props.page, selected: i === props.page && props.progress < 1, href: `#${id}`, onClick: handleClick }, props.showLabels && i + 1));
                }),
                React.createElement(Pager, { href: `#${props.prefix}/${props.pages + 1}`, selected: props.page === props.pages - 1 && props.progress === 1, active: props.page === props.pages - 1 && props.progress === 1, onClick: handleClick }, props.showLabels && (React.createElement(Icon, null,
                    React.createElement("path", { d: "M4,5V19L11,12M18,5V19H20V5M11,5V19L18,12" }))))))));
};
/**
 * @type {React.FunctionComponent<IPagersProps>}
 * @param {ISkipBaseProps} props
 * @param {number} props.page
 * @param {number} props.pages
 * @param {string} props.prefix
 * @param {number} props.progress
 * @param {boolean} [props.showLabels]
 * @param {boolean} [props.useContext]
 * @return {React.ReactHTMLElement<HTMLElement>}
 */
const Pagers = props => {
    if (props.useContext) {
        return (React.createElement(context.ScrollConsumer, null, context$$1 => (React.createElement(PagerBase, { dark: props.dark, page: context$$1.page, pages: context$$1.pages, prefix: context$$1.anchors, progress: context$$1.progress, showLabels: props.showLabels }))));
    }
    assert(props.page, "number");
    assert(props.pages, "number");
    assert(props.progress, "number");
    assert(props.prefix, "string");
    return (React.createElement(PagerBase, { dark: props.dark, page: props.page, pages: props.pages, prefix: props.prefix, progress: props.progress, showLabels: props.showLabels }));
};
/**
 * @type {React.FunctionComponent<IPagersProps>}
 * @param {ISkipBaseProps} props
 * @param {string} [props.prefix]
 * @param {boolean} [props.useContext]
 * @return {React.ReactHTMLElement<HTMLElement>}
 */
const Skip = props => {
    if (props.useContext) {
        return React.createElement(context.ScrollConsumer, null, context$$1 => React.createElement(SkipBase, { prefix: context$$1.anchors }));
    }
    assert(props.prefix, "string");
    return React.createElement(SkipBase, { prefix: props.prefix });
};

//# sourceMappingURL=index.js.map

exports.assert = assert;
exports.Pager = Pager;
exports.StyledMarker = StyledMarker;
exports.Marker = Marker;
exports.Icon = Icon;
exports.SkipLink = SkipLink;
exports.SkipBase = SkipBase;
exports.PagerBase = PagerBase;
exports.Pagers = Pagers;
exports.Skip = Skip;
