import React from "react";
import {IContext, ScrollConsumer, ScrollProvider} from "@stickyroll/context";
import {Tracker} from "@stickyroll/tracker";
import {Globals} from "csstype";

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

/**
 * @typedef {Globals|"-webkit-sticky"|"sticky"} PositionSticky
 */
export type PositionSticky = Globals | "-webkit-sticky" | "sticky";

/**
 * Check for sticky support to fix webkit issues.
 * @returns {PositionSticky}
 */
export const vendoredSticky = (): PositionSticky => {
	if ("window" in global) {
		if (CSS.supports("position", "sticky")) {
			return "sticky";
		}
		return "-webkit-sticky";
	}
	return "sticky";
};

/**
 * @type {React.CSSProperties}
 * @property {string|number} height
 * @property {string} position
 * @property {string|number} top
 * @property {string|number} width
 */
const overlayStyle: React.CSSProperties = {
	height: "100vh",
	position: vendoredSticky(),
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
const anchorStyle: React.CSSProperties = {
	bottom: 0,
	left: 0,
	position: "absolute",
	right: 0,
	top: 0
};

export class Frame extends React.Component<IFrameProps, IFrameState> {
	/**
	 * @public
	 * @type {IFrameState}
	 */
	public state = {
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
		this.setState({
			scrollY: window.scrollY
		});
	}

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
		const {render, children, anchors, pages} = this.props;
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
			<div className={this.props.className} style={this.wrapperStyle} ref={this.tracker}>
				{this.anchors}
				<div style={overlayStyle}>{children}</div>
			</div>
		</React.Fragment>
	);

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
	private get anchors(): React.ReactElement<HTMLDivElement> | null {
		const {anchors} = this.props;
		if (!(typeof anchors === "string")) {
			return null;
		}
		const {factor} = this.props;
		const glue = anchors.length ? "/" : "";
		const triggers = Array(this.pageCount + 1)
			.fill(Boolean)
			.map((x, i) => (
				<span
					id={`${anchors}${glue}${i + 1}`}
					key={`${anchors}:${i + 1}`}
					style={{
						display: "block",
						height: `${i === this.pageCount ? 100 : 100 * factor}vh`
					}}
				/>
			));

		return (
			<div style={anchorStyle}>
				{triggers}
				<span
					id={`${anchors}${glue}skip`}
					style={{
						position: "absolute",
						top: "100%"
					}}
				/>
			</div>
		);
	}
}
