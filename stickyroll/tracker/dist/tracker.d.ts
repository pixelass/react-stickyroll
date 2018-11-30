import { PureComponent } from "react";
/**
 * @typedef {function} TScrollHandler
 * @param {number} scrollY
 * @return {void}
 */
export declare type TScrollHandler = (scrollY: number) => void;
/**
 * @typedef {object} IEventTrackerProps
 * @property {TScrollHandler} [onUpdate]
 * @property {number} [throttle]
 */
export interface IEventTrackerProps {
    onUpdate?: TScrollHandler;
    throttle?: number;
}
export declare class Tracker extends PureComponent<IEventTrackerProps> {
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
    componentDidMount(): void;
    /**
     * Update all event handlers if the throttle property changed.
     * @public
     * @param {IEventTrackerProps} oldProps
     * @return {void}
     */
    componentDidUpdate(oldProps: IEventTrackerProps): void;
    /**
     * Cleanup.
     * @public
     */
    componentWillUnmount(): void;
    /**
     * This component does not render anything.
     * @public
     */
    render(): null;
    /**
     * Tracks the page scroll and calls the updateFunction
     * @protected
     * @return {void}
     */
    protected trackScroll: () => void;
    /**
     * Add event handlers.
     * On resize and orientation change throttle is enforced at `250ms`.
     */
    private addHandlers;
    /**
     * Remove event handlers.
     * @public
     */
    private removeHandlers;
    /**
     * Update event handlers. Safely removes and re-adds all event handlers.
     * @public
     */
    private updateHandlers;
}
