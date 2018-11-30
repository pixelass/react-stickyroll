/// <reference types="react" />
/**
 * @typedef {object} IContext
 * @property {string} [anchors]
 * @property {number} page
 * @property {number} pages
 * @property {number} progress
 */
export interface IContext {
    anchors?: string;
    page: number;
    pages: number;
    progress: number;
}
/**
 * @type {IContext}
 */
export declare const DEFAULT_CONTEXT: IContext;
/**
 * @type {Context<IContext>}
 */
export declare const ScrollConsumer: import("react").ExoticComponent<import("react").ConsumerProps<IContext>>, ScrollProvider: import("react").ProviderExoticComponent<import("react").ProviderProps<IContext>>;
