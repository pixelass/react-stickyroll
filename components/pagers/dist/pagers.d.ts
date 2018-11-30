import React from "react";
import { StyledComponent } from "styled-components";
/**
 *
 * @param {any} value
 * @param {string} type
 * @throws {?TypeError}
 */
export declare const assert: (value: any, type: string) => void;
/**
 * @extends React.HTMLAttributes<HTMLAnchorElement>
 * @typedef {object} IPagerProps<T>
 * @property {boolean} [active]
 * @property {boolean} [selected]
 */
export interface IPagerProps<T> extends React.HTMLAttributes<HTMLAnchorElement> {
    active?: boolean;
    selected?: boolean;
}
/**
 * @typedef {IPagerProps<{}>} PagerProps
 */
export declare type PagerProps = IPagerProps<{}>;
/**
 * @type {StyledComponent<"a", {}, PagerProps>}
 * @param {PagerProps} props
 * @param {boolean} [props.active]
 * @param {boolean} [props.selected]
 * @return {React.ReactHTMLElement<HTMLAnchorElement>}
 */
export declare const Pager: StyledComponent<"a", {}, PagerProps>;
/**
 * @typedef {object} IPagerWrapperProps
 */
export interface IPagerWrapperProps {
    dark?: boolean;
}
/**
 * @type {StyledComponent<"div", {}>}
 * @return {React.ReactHTMLElement<HTMLElement>}
 */
export declare const StyledMarker: StyledComponent<"div", {}>;
/**
 * @typedef {object} IMarkerProps
 * @property {number} page
 * @property {number} progress
 */
export interface IMarkerProps {
    page: number;
    progress: number;
}
/**
 * @type {StyledComponent<"nav", {}>}
 * @param {IMarkerProps} props
 * @param {number} props.page
 * @param {number} props.progress
 * @return {React.ReactHTMLElement<HTMLElement>}
 */
export declare const Marker: React.FunctionComponent<IMarkerProps>;
/**
 * @type {StyledComponent<"svg", {}>}
 * @return {React.ReactSVGElement<SVGSVGElement>}
 */
export declare const Icon: StyledComponent<"svg", {}>;
/**
 * @type {StyledComponent<"a", {}>}
 * @return {React.ReactHTMLElement<HTMLAnchorElement>}
 */
export declare const SkipLink: StyledComponent<"a", {}>;
/**
 * @typedef {object} IScrollOptions
 * @property {boolean} noFocus
 * @property {boolean} noHash
 */
export interface IScrollToOptions {
    noFocus?: boolean;
    noHash?: boolean;
}
/**
 * @typedef {object} ISkipBaseProps
 * @property {string} prefix
 */
export interface ISkipBaseProps {
    prefix: string;
}
/**
 * @type {React.FunctionComponent<ISkipBaseProps>}
 * @param {ISkipBaseProps} props
 * @param {string} props.prefix
 * @return {React.ReactHTMLElement<HTMLAnchorElement>}
 */
export declare const SkipBase: React.FunctionComponent<ISkipBaseProps>;
/**
 * @extends IPagerWrapperProps
 * @typedef {object} IPagerBaseProps
 * @property {number} page
 * @property {number} pages
 * @property {string} prefix
 * @property {number} progress
 * @property {boolean} [showLabels]
 */
export interface IPagerBaseProps extends IPagerWrapperProps {
    page: number;
    pages: number;
    prefix: string;
    progress: number;
    showLabels?: boolean;
}
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
export declare const PagerBase: React.FunctionComponent<IPagerBaseProps>;
/**
 * @extends IPagerWrapperProps
 * @typedef {object} IPagerBaseProps
 * @property {number} page
 * @property {number} pages
 * @property {string} prefix
 * @property {number} progress
 * @property {boolean} [showLabels]
 * @property {boolean} [useContext]
 */
export interface IPagersProps extends IPagerWrapperProps {
    page?: number;
    pages?: number;
    prefix?: string;
    progress?: number;
    showLabels?: boolean;
    useContext?: boolean;
}
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
export declare const Pagers: React.FunctionComponent<IPagersProps>;
/**
 * @extends IPagerWrapperProps
 * @typedef {object} ISkipProps
 * @property {string} prefix
 * @property {boolean} [useContext]
 */
export interface ISkipProps extends IPagerWrapperProps {
    useContext?: boolean;
    prefix?: string;
}
/**
 * @type {React.FunctionComponent<IPagersProps>}
 * @param {ISkipBaseProps} props
 * @param {string} [props.prefix]
 * @param {boolean} [props.useContext]
 * @return {React.ReactHTMLElement<HTMLElement>}
 */
export declare const Skip: React.FunctionComponent<ISkipProps>;
