import {throttle} from "@stickyroll/utils";
import {PureComponent} from "react";

/**
 * @typedef {function} TScrollHandler
 * @param {number} scrollY
 * @return {void}
 */
export type TScrollHandler = (scrollY: number) => void;

/**
 * @typedef {object} IEventTrackerProps
 * @property {TScrollHandler} [onUpdate]
 * @property {number} [throttle]
 */
export interface IEventTrackerProps {
	onUpdate?: TScrollHandler;
	throttle?: number;
}

export class Tracker extends PureComponent<IEventTrackerProps> {
	/**
	 * @private
	 * @type {function}
	 */
	private resizeHandler;
	/**
	 * @private
	 * @type {function}
	 */
	private orientationHandler;
	/**
	 * @private
	 * @type {function}
	 */
	private scrollHandler;

	/**
	 * init.
	 * @public
	 */
	public componentDidMount(): void {
		this.addHandlers();
	}

	/**
	 * Update all event handlers if the throttle property changed.
	 * @public
	 * @param {IEventTrackerProps} oldProps
	 * @return {void}
	 */
	public componentDidUpdate(oldProps: IEventTrackerProps): void {
		if (oldProps.throttle !== this.props.throttle) {
			this.updateHandlers();
		}
	}

	/**
	 * Cleanup.
	 * @public
	 */
	public componentWillUnmount(): void {
		this.removeHandlers();
	}

	/**
	 * This component does not render anything.
	 * @public
	 */
	public render(): null {
		return null;
	}

	/* istanbul ignore next */
	/**
	 * Tracks the page scroll and calls the updateFunction
	 * @protected
	 * @return {void}
	 */
	protected trackScroll = (): void => {
		if (typeof this.props.onUpdate === "function") {
			this.props.onUpdate(window.scrollY);
		}
	};

	/**
	 * Add event handlers.
	 * On resize and orientation change throttle is enforced at `250ms`.
	 */
	private addHandlers() {
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
	private removeHandlers() {
		document.removeEventListener("scroll", this.scrollHandler);
		window.removeEventListener("resize", this.resizeHandler);
		window.removeEventListener("resize", this.orientationHandler);
	}
	/**
	 * Update event handlers. Safely removes and re-adds all event handlers.
	 * @public
	 */
	private updateHandlers() {
		this.removeHandlers();
		this.addHandlers();
	}
}
