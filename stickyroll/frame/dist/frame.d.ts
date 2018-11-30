import React from "react";
import { IContext } from "@stickyroll/context";
/**
 * @typedef {function} TRender<T>
 * @param {IContext} context
 * @returns {T}
 */
export declare type TRender<T> = (context: IContext) => T;
/**
 * @typedef {TRender<any>} TRenderer
 * @param {IContext} context
 * @returns {any}
 */
export declare type TRenderer = TRender<any>;
/**
 * @typedef {TRender<any>} TChild
 * @param {IContext} context
 * @returns {any}
 */
export declare type TChild = TRender<any>;
/**
 * @typedef {function} TPageHandler
 * @param {number} page
 * @returns {void}
 */
export declare type TPageHandler = (page: number) => void;
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
 * @property {number|Array<any>} [pages]
 * @property {TRenderer} [render]
 * @property {number} [throttle]
 */
export interface IFrameProps {
    anchors?: string;
    children?: TChild;
    className?: string;
    factor?: number;
    onPage?: TPageHandler;
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
export declare class Frame extends React.Component<IFrameProps, IFrameState> {
    /**
     * @public
     * @type {IFrameState}
     */
    state: {
        page: number;
        scrollOffset: number;
        scrollY: number;
    };
    /**
     * @private
     * @type {React.RefObject<HTMLDivElement>}
     */
    private tracker;
    /**
     * @public
     * @type {IFrameDefaultProps}
     */
    static readonly defaultProps: IFrameDefaultProps;
    /**
     * Write the current scrollPosition to the internal state when the component is mounted.
     * This will allow getting the correct page and progress after mounting.
     * @public
     */
    componentDidMount(): void;
    /**
     * Write the current scrollPosition to the internal state when the component is mounted.
     * This will allow getting the correct page and progress after mounting.
     * @public
     */
    componentDidUpdate(oldProps: any, oldState: any): void;
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
    render(): JSX.Element;
    /**
     * A Wrapper around the content to ensure the correct behavior during interaction.
     * Renders a sticky container, an event-tracker and optionally anchor targets to allow deep-links.
     * @constructor
     * @private
     * @type {React.FunctionComponent}
     * @param props
     * @return {ReactElement<any> | null}
     */
    private Wrapper;
    /**
     * Scroll handler to parse the page and progress fromm the scroll position.
     * @private
     * @param {number} scrollY
     * @returns {void}
     */
    private handleUpdate;
    /**
     * @type {React.CSSProperties}
     */
    private readonly wrapperStyle;
    /**
     * If anchors are defined, a collection of spans with the correct IDs are provided.
     * This allows to link or jump to a section or even skip the entire content.
     * @type {React.ReactElement<HTMLDivElement> | null}
     */
    private readonly anchors;
}
