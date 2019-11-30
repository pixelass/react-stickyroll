import styled, {css, StyledComponent} from "styled-components";
import {Content} from "@stickyroll/inner";
import {light} from "@stickyroll/themes";

export const Header = styled.header<any>`
	position: relative;
	display: flex;
	align-items: center;
	align-content: center;
	height: 4rem;
	color: ${(p: any) => p.theme.color};
`;

Header.defaultProps = {
	theme: light
};

export const HeaderContent = styled.div<any>`
	margin: 2rem auto;
	padding: 1.5rem 1rem;
	max-width: 60rem;
	width: 100%;
	border-radius: 2px;

	@media (max-width: 60rem) {
		max-width: calc(100% - 3rem);
	}
`;

export const Footer = styled.footer<any>`
	position: relative;
	display: flex;
	padding: 1rem 0;
	color: ${(p: any) => p.theme.color};
`;

Footer.defaultProps = {
	theme: light
};

export const FooterContent = styled.div<any>`
	margin: 0 auto;
	padding: 1.5rem 1rem;
	width: 100%;
	border-radius: 2px;

	@media (max-width: 60rem) {
		max-width: calc(100% - 3rem);
	}
`;

export const Headline = styled.h3<any>`
	font-size: 2em;
	margin: 0;
	padding: 0.5rem 0;
	font-weight: lighter;
	opacity: var(--progress);
	${(props: any) => css`
		opacity: calc(${props.farLeft ? "1 - 1" : "1"} * var(--progress));
		text-align: ${props.farLeft ? "right" : "left"};
		transform: translate3d(
			calc(${props.farLeft ? "-100%" : "100% - 100%"} * var(--progress)),
			0,
			0
		);
	`}
`;

export const Nav = styled.nav<any>`
	font-size: 1em;
`;

export const Link = styled.a<any>`
	font-size: 1em;
	color: currentColor;
	text-decoration: none;
`;

export const Copy = styled.p<any>`
	font-size: 1em;
	opacity: var(--progress);
	transform: translate3d(0, calc(100% - 100% * var(--progress)), 0);
`;

export const Button = styled.a<any>`
	display: flex;
	text-align: center;
	justify-content: center;
	align-items: center;
	align-content: center;
	font-size: 3rem;
	padding: 1.75rem 2rem;
	margin: 4rem 0 0;
	line-height: 1.5;
	text-decoration: none;
	border: 1px solid ${props => props.theme.color};
	color: ${props => props.theme.color};
	background: none;

	&:hover {
		background: ${props => props.theme.color};
		color: ${props => props.theme.backgroundColor};
	}

	@media (max-width: 30rem) {
		font-size: 1.5rem;
		padding: 0.75rem 1rem;
	}
`;

Button.defaultProps = {
	theme: light
};

export const Svg = styled.svg<any>`
	display: block;
	margin: 0 auto;
	width: 100%;
	max-height: 38vh;
`;
export const Figcaption = styled.figcaption<any>`
	font-size: 2.5vmin;
`;
export const StyledContent = styled(Content)<any>`
	display: flex;
	flex-direction: column;
	font-size: 2.53vmin;
	overflow: hidden;
`;
export const Figure = styled.figure<any>`
	flex: 1;
	margin: 0;
	padding: 0;
	display: grid;
	align-items: center;
	justify-items: center;

	@media (orientation: landscape) {
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr;
		grid-gap: 3rem;
	}
	@media (orientation: portrait) {
		grid-template-columns: 1fr;
		grid-template-rows: 1fr 1fr;
		grid-gap: 1rem;
	}
`;

export const Card = styled.div<any>`
	margin: 2rem auto;
	padding: 1.5rem 1rem;
	max-width: 60rem;
	width: 100%;
	border-radius: 2px;
	background: ${(p: any) => p.theme.backgroundColor};
	color: ${(p: any) => p.theme.color};
	box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);

	@media (max-width: 60rem) {
		max-width: calc(100% - 3rem);
	}
`;

Card.defaultProps = {
	theme: light
};

export const Tiles = styled.div<any>`
	display: flex;
	flex-wrap: wrap;
	margin: 0 auto;
	padding: 2rem 1rem;
	max-width: 60rem;
	width: 100%;
	border-radius: 2px;

	@media (max-width: 60rem) {
		max-width: calc(100% - 3rem);
	}
`;

export const Tile = styled.div<any>`
	margin: 1rem 0.5rem;
	padding: 1.5rem 1rem;
	flex: 1 1 18rem;
	box-shadow: 0 0 0 1px ${(p: any) => p.theme.color};
	background: none;
	color: ${(p: any) => p.theme.color};
`;

Tile.defaultProps = {
	theme: light
};

export const GhostTile = styled.div<any>`
	margin: 0 0.5rem;
	padding: 0 1rem;
	flex: 0 0 calc(100% / 3 - 1rem);
`;

export const Background = styled.div<any>`
	position: fixed;
	z-index: -1;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background: ${(p: any) => p.dark.backgroundColor}
		linear-gradient(
			-155deg,
			${(p: any) => p.dark.backgroundColor} 25%,
			${(p: any) => p.light.backgroundColor} 75%
		);
	background-size: 100vw 100%;
`;
