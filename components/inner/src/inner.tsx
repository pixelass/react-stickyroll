import styled, {css, StyledComponent} from "styled-components";
import {light, ITheme} from "@stickyroll/themes";

/**
 * @typedef {object} IInnerProps
 * @property {ITheme} [theme]
 * @property {boolean} [withPagers]
 */
export interface IInnerProps {
	theme?: ITheme;
	withPagers?: "left" | "right";
}

/**
 * This component can be used to add a themed inner wrapper. This is especially helpful when using
 * nested stickyroll components (e.g. Pagers).
 *
 * The theme is inherited and can therefore be used in other components. This mechanism relies on
 * styled-components `ThemeProvider`
 * ### Usage:
 * ```jsx
 * import {Stickyroll} from "@stickyroll/stickyroll";
 * import {Inner} from "@stickyroll/inner";
 * const App = () => (
 *   <Stickyroll pages={1}>
 *       {() => <Inner/>}
 *   </Frame>
 * )
 * ```
 * ---
 * @type {StyledComponent<"section", ITheme, IInnerProps>}
 * @param {IInnerProps} props
 * @param {ITheme} [props.theme]
 * @param {boolean} [props.withPagers]
 * @return {React.ReactHTMLElement<HTMLElement>}
 */
export const Inner: StyledComponent<"section", ITheme, IInnerProps> = styled.section`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	overflow: hidden;
	display: flex;
	padding: 0.5rem 0.5rem 2.5rem;
	${(props: IInnerProps) => css`
		${props.withPagers &&
			css`padding-${props.withPagers}: calc(${props.theme.pagerSize} + 1rem)`};
		color: ${props.theme.color};
		background-color: ${props.theme.backgroundColor};
	`};
`;

Inner.defaultProps = {
	theme: light
};

export interface IContentProps {
	theme?: ITheme;
	withPagers?: "left" | "right";
}

export const Content: StyledComponent<"div", ITheme, IContentProps> = styled.div`
	flex: 1 1 1%;
	${(props: IContentProps) => css`
		padding: 1rem;
		color: ${props.theme.color};
		background-color: ${props.theme.backgroundColor};
	`};
`;

Content.defaultProps = {
	theme: light
};
