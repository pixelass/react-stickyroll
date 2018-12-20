import React from "react";
import { IContext, ScrollConsumer, ScrollProvider } from "@stickyroll/context";
import { Tracker } from "@stickyroll/tracker";
import { classNames, hashCode } from "@stickyroll/utils";
import { version } from "../package.json";

/**
 * @typedef {function} TRender<T>
 * @param {IContext} context
 * @returns {T}
 */
export type TRender<T> = (context: IContext) => T;

/**
 * @typedef {TRender<any>} TRenderer
 * @param {IContext} context
 * @returns {any}
 */
export type TRenderer = TRender<any>;

/**
 * @typedef {TRender<any>} TChild
 * @param {IContext} context
 * @returns {any}
 */
export type TChild = TRender<any>;

/**
 * @typedef {function} TPageHandler
 * @param {number} page
 * @returns {void}
 */
export type TPageHandler = (page: number) => void;

/**
 * @typedef {function} TAsyncPageHandler
 * @param {number} page
 * @returns {Promise<void>}
 */
export type TAsyncPageHandler = (page: number) => Promise<void>;

/**
 * @typedef {function} TProgressHandler
 * @returns {void}
 */
export type TProgressHandler = () => void;

/**
 * @typedef {function} TAsyncProgressHandler
 * @returns {Promise<void>}
 */
export type TAsyncProgressHandler = () => Promise<void>;

/**
 * @typedef {object} IFrameDefaultProps
 * @property {number} factor
 */
export interface IFrameDefaultProps {
	factor: number;
}

/**
 * @typedef {object} IFrameProps
 * @extends {IFrameDefaultProps}
 * @property {string} [anchors]
 * @property {TChild} [children]
 * @property {string} [className]
 * @property {number} [factor]
 * @property {TPageHandler} [onPage]
 * @property {number|Array<any>} pages
 * @property {TRenderer} [render]
 * @property {number} [throttle]
 */
export interface IFrameProps {
	anchors?: string;
	children?: TChild;
	className?: string;
	factor?: number;
	onEnd?: TProgressHandler | TAsyncProgressHandler;
	onPage?: TPageHandler | TAsyncPageHandler;
	onStart?: TProgressHandler | TAsyncProgressHandler;
	pages: number | Array<any>;
	render?: TRenderer;
	throttle?: number;
}

/**
 * @typedef {object} IFrameState
 * @property {number} page
 * @property {number} scrollOffset
 * @property {number} scrollY
 */
export interface IFrameState {
	page: number;
	scrollOffset: number;
	scrollY: number;
}

const styles = {
	wrapper: `
		position: relative;
		margin: 0;
	`,
	overlay: `
		height: 100vh;
		position: -webkit-sticky;
		position: sticky;
		top: 0;
		width: 100%;
	`,
	targets: `
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	`,
	target: `
		display: block; 
		height: 100vh;
	`,
	skip: `
		position: absolute; 
		top: 100%;
	`
};

const hashSelectors = {
	wrapper: hashCode(`/* stickyroll-version: ${version} */\n${styles.wrapper}`),
	overlay: hashCode(`/* stickyroll-version: ${version} */\n${styles.overlay}`),
	targets: hashCode(`/* stickyroll-version: ${version} */\n${styles.targets}`),
	target: hashCode(`/* stickyroll-version: ${version} */\n${styles.target}`),
	skip: hashCode(`/* stickyroll-version: ${version} */\n${styles.skip}`)
};

const hashNSSelectors = {
	wrapper: `sr-${hashCode(hashSelectors.wrapper)}`,
	overlay: `sr-${hashCode(hashSelectors.overlay)}`,
	targets: `sr-${hashCode(hashSelectors.targets)}`,
	target: `sr-${hashCode(hashSelectors.target)}`,
	skip: `sr-${hashCode(hashSelectors.skip)}`
};

export const hashClassNames = {
	wrapper: classNames(hashNSSelectors.wrapper, hashSelectors.wrapper),
	overlay: classNames(hashNSSelectors.overlay, hashSelectors.overlay),
	targets: classNames(hashNSSelectors.targets, hashSelectors.targets),
	target: classNames(hashNSSelectors.target, hashSelectors.target),
	skip: classNames(hashNSSelectors.skip, hashSelectors.skip),
};

export const CORE_STYLE = `
	body {
		margin-top: 0;
		margin-bottom: 0;
	}
	.${hashSelectors.wrapper}{${styles.wrapper}}
	.${hashSelectors.overlay}{${styles.overlay}}
	.${hashSelectors.targets}{${styles.targets}}
	.${hashSelectors.target}{${styles.target}}
	.${hashSelectors.skip}{${styles.skip}}
	.${hashSelectors.wrapper}{${styles.wrapper}}
`
	.replace(/\s+/g, "")
	.replace(/;}/g, "}");

export const CORE_STYLETAG = `<style data-stickyroll data-stickyroll-version="${version}">${CORE_STYLE}</style>`;

/**
 * Injects core styles for Stickyroll. This is the client side version.
 * Stickyroll will inject these styles to ensure the correct behavior.
 * @constructor
 */
const INJECT_CORE_STYLE = () => {
	const existingStyle = document.head.querySelector("[data-stickyroll]");
	if (Boolean(existingStyle)) {
		const styleVersion = existingStyle.getAttribute("data-stickyroll-version");
		if (styleVersion === version) {
			document.head.appendChild(existingStyle);
			return;
		}
	}
	const style = document.createElement("style");
	style.setAttribute("data-stickyroll", "");
	style.setAttribute("data-stickyroll-version", `${version}`);
	style.innerHTML = CORE_STYLE;
	document.head.appendChild(style);
};

export class Frame extends React.Component<IFrameProps, IFrameState> {
	/**
	 * @public
	 * @type {IFrameState}
	 */
	public state: IFrameState = {
		page: 0,
		scrollOffset: 0,
		scrollY: 0
	};

	/**
	 * @private
	 * @type {React.RefObject<HTMLDivElement>}
	 */
	private tracker: React.RefObject<HTMLDivElement> = React.createRef();

	/**
	 * @public
	 * @type {IFrameDefaultProps}
	 */
	public static get defaultProps(): IFrameDefaultProps {
		return {
			factor: 1
		};
	}

	/**
	 * Write the current scrollPosition to the internal state when the component is mounted.
	 * This will allow getting the correct page and progress after mounting.
	 * @public
	 */
	public componentDidMount() {
		Frame.injectStyle();
		this.setState({
			scrollY: window.scrollY
		});
	}

	/* istanbul ignore next */
	/**
	 * Call the onPage handler if it is defined every time the page changes.
	 * No initial call!
	 * @public
	 */
	public componentDidUpdate(oldProps, oldState) {
		const {page, scrollOffset} = this.state;
		if (oldState.page !== page) {
			this.props.onPage && this.props.onPage(this.state.page);
		}
		if (oldState.scrollOffset !== scrollOffset) {
			if (scrollOffset === 0 && page === 0) {
				this.props.onStart && this.props.onStart();
			} else if (scrollOffset === 1 && page === this.pageCount - 1) {
				this.props.onEnd && this.props.onEnd();
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
	public render() {
		const {render, children, anchors} = this.props;
		// Test for either the render property or children to be defined as function.
		// Render wins over children if both are defined. If neither is defined as function, a TypeError is thrown.
		if (typeof render !== "function" && typeof children !== "function") {
			throw new TypeError(`Either children or render needs to be defined as a function`);
		}
		const {page} = this.state;
		const Wrapper = this.Wrapper;

		// Convert the scrollOffset from percent to a timeline [0,1]
		const progress = this.state.scrollOffset;
		// const {innerHeight} = window;
		// const clippedProgress = Math.round(progress * innerHeight) / innerHeight;

		// Switch between context free and context based versions
		switch (typeof render) {
			case "function":
				// Context free
				return (
					<Wrapper>
						{render({
							anchors,
							page: page + 1,
							pageIndex: page,
							pages: this.pageCount,
							progress
						})}
					</Wrapper>
				);
			// Context based
			default:
				return (
					<ScrollProvider
						value={{
							anchors,
							page: page + 1,
							pageIndex: page,
							pages: this.pageCount,
							progress
						}}>
						<Wrapper>
							<ScrollConsumer>{children}</ScrollConsumer>
						</Wrapper>
					</ScrollProvider>
				);
		}
	}

	public static injectStyle() {
		INJECT_CORE_STYLE();
	}

	public static getStyleTag() {
		return CORE_STYLETAG;
	}

	public static getStyle() {
		return CORE_STYLE;
	}

	private get pageCount(): number {
		const {pages} = this.props;
		return Array.isArray(pages) ? (pages as Array<any>).length : (pages as number);
	}

	/**
	 * A Wrapper around the content to ensure the correct behavior during interaction.
	 * Renders a sticky container, an event-tracker and optionally anchor targets to allow deep-links.
	 * @constructor
	 * @private
	 * @type {React.FunctionComponent}
	 * @param props
	 * @return {ReactElement<any> | null}
	 */
	private Wrapper: React.FunctionComponent = ({children}) => (
		<React.Fragment>
			<Tracker onUpdate={this.handleUpdate} throttle={this.props.throttle} />
			<div
				className={classNames(
					hashClassNames.wrapper,
					this.props.className
				)}
				ref={this.tracker}
				style={this.wrapperStyle}>
				{this.anchors}
				<div className={hashClassNames.overlay}>
					{children}
				</div>
			</div>
		</React.Fragment>
	);

	/* istanbul ignore next */
	/**
	 * Scroll handler to parse the page and progress from the scroll position.
	 * @private
	 * @param {number} scrollY
	 * @returns {void}
	 */
	private handleUpdate = (scrollY: number): void => {
		if (!this.tracker || !this.tracker.current) {
			return;
		}
		let page: number = 0;
		let scrollOffset: number = 0;

		const {top, bottom}: ClientRect = this.tracker.current.getBoundingClientRect();
		const {factor} = this.props;
		const {innerHeight = 0}: Window = window;
		const touchedTop: boolean = top <= 0;
		const touchedEnd: boolean = bottom <= innerHeight;
		if (touchedTop && !touchedEnd) {
			page = Math.max(
				0,
				Math.min(this.pageCount - 1, Math.floor((top * (-1 / factor)) / innerHeight))
			);
			scrollOffset = Math.max(
				0,
				Math.min(1, ((top * -1) % (innerHeight * factor)) / innerHeight / factor)
			);
		} else if (touchedEnd) {
			page = this.pageCount - 1;
			scrollOffset = 1;
		}
		this.setState({
			page,
			scrollOffset,
			scrollY
		});
	};

	/**
	 * @type {React.CSSProperties}
	 */
	private get wrapperStyle(): React.CSSProperties {
		const {factor} = this.props;
		const vh = this.pageCount * 100 * factor + 100;
		return {
			height: `${vh}vh`
		};
	}

	/**
	 * If anchors are defined, a collection of spans with the correct IDs are provided.
	 * This allows to link or jump to a section or even skip the entire content.
	 * @type {React.ReactElement<HTMLDivElement> | null}
	 */
	private get anchors(): React.ReactElement<HTMLDivElement> | null {
		const {anchors} = this.props;
		if (!(typeof anchors === "string")) {
			return null;
		}
		const {factor} = this.props;
		const glue = anchors.length ? "/" : "";
		const targets = Array(this.pageCount)
			.fill(Boolean)
			.map((x, i) => (
				<span
					id={`${anchors}${glue}${i + 1}`}
					key={`${anchors}:${i + 1}`}
					className={hashClassNames.target}
					style={{
						height: `${100 * factor}vh`
					}}
				/>
			));

		return (
			<div className={hashClassNames.targets}>
				{targets}
				<span
					id={`${anchors}${glue}${this.pageCount + 1}`}
					className={hashClassNames.target}
				/>
				<span
					id={`${anchors}${glue}skip`}
					className={hashClassNames.skip}
				/>
			</div>
		);
	}
}
