import {Context, createContext} from "react";

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
export const DEFAULT_CONTEXT: IContext = {page: 0, progress: 0, pages: 0};

/**
 * @type {Context<IContext>}
 */
export const {
	Consumer: ScrollConsumer,
	Provider: ScrollProvider
}: Context<IContext> = createContext(DEFAULT_CONTEXT);
