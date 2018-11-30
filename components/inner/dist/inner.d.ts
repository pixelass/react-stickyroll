import { StyledComponent } from "styled-components";
/**
 * @typedef {object} IInnerTheme
 * @property {string} [color]
 * @property {number} [hue]
 * @property {string} [lightness]
 * @property {string} [markerSize]
 * @property {string} [pagerGap]
 * @property {string} [pagerSize]
 * @property {string} [saturation]
 * @property {string} [strokeWidth]
 */
export interface IInnerTheme {
    color?: string;
    hue?: number;
    lightness?: string;
    markerSize?: string;
    pagerGap?: string;
    pagerSize?: string;
    saturation?: string;
    strokeWidth?: string;
}
/**
 * @typedef {object} IInnerProps
 * @property {IInnerTheme} [theme]
 * @property {boolean} [withPagers]
 */
export interface IInnerProps {
    theme?: IInnerTheme;
    withPagers?: boolean;
}
/**
 * This component can be used to add a themed inner wrapper. This is especially helpful when using
 * nested stickyroll components (e.g. Pagers).
 *
 * The theme is inherited and can therefore be used in other components. This mechanism relies on
 * styled-components `ThemeProvider`
 * ### Usage:
 * ```jsx
 * import {Frame} from "@stickyroll/frame";
 * import {Inner} from "@stickyroll/inner";
 * const App = () => (
 *   <Frame pages={1}>
 *       {() => <Inner/>}
 *   </Frame>
 * )
 * ```
 * ---
 * @type {StyledComponent<"section", IInnerTheme, IInnerProps>}
 * @param {IInnerProps} props
 * @param {IInnerTheme} [props.theme]
 * @param {boolean} [props.withPagers]
 * @return {React.ReactHTMLElement<HTMLElement>}
 */
export declare const Inner: StyledComponent<"section", IInnerTheme, IInnerProps>;
