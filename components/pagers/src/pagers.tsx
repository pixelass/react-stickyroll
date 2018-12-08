import React from "react";
import styled, {css, StyledComponent} from "styled-components";
import {ScrollConsumer} from "@stickyroll/context";
import {ITheme, light} from "@stickyroll/themes";
import {scrollTo} from "@stickyroll/utils";
import {assert} from "@stickyroll/utils";

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
export type PagerProps = IPagerProps<{}>;

/**
 * @type {StyledComponent<"a", {}, PagerProps>}
 * @param {PagerProps} props
 * @param {boolean} [props.active]
 * @param {boolean} [props.selected]
 * @return {React.ReactHTMLElement<HTMLAnchorElement>}
 */
export const Pager: StyledComponent<"a", {}, PagerProps> = styled.a`
	position: relative;
	z-index: 2;
	height: var(--pager-size);
	width: var(--pager-size);
	margin: var(--pager-gap) 0.5rem;
	visibility: visible;
	border-radius: 50%;
	display: flex;
	align-content: center;
	align-items: center;
	justify-content: center;
	text-align: center;
	color: currentColor;
	text-decoration: none;
	background-clip: content-box;

	${(props: PagerProps) => css`
		color: var(--color);
		background-color: ${props.selected ? "var(--pager-color-active)" : "var(--pager-color)"};
		border: var(--stroke-width) solid ${props.active ? "var(--marker-color)" : "transparent"};

		&:hover,
		&:focus {
			background-color: var(--pager-color-active);
			border-color: var(--marker-color);
		}
		&:focus {
			box-shadow: 0 0 0 2px var(--marker-color);
		}
	`};
`;

/**
 * @type {StyledComponent<"nav", {}>}
 * @return {React.ReactHTMLElement<HTMLElement>}
 */
const StyledPagers: StyledComponent<"nav", {}> = styled.nav`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	align-content: center;
	justify-content: center;
	margin: calc(var(--pager-gap) * -1) -0.5rem;
`;

/**
 * @typedef {object} IPagerWrapperProps
 */
export interface IPagerWrapperProps {
	position?: "left" | "right";
	theme?: ITheme;
}

/**
 * @type {StyledComponent<"nav", {}>}
 * @param {IPagerWrapperProps} props
 * @param {ITheme} [props.theme]
 * @return {React.ReactHTMLElement<HTMLElement>}
 */
const PagerWrapper: StyledComponent<"div", {}, IPagerWrapperProps> = styled.div`
	${(props: IPagerWrapperProps) => css`
		--marker-color: ${props.theme.markerColor};
		--marker-width: ${props.theme.markerWidth};
		--pager-background-color: ${props.theme.pagerBackgroundColor};
		--pager-color: ${props.theme.pagerColor};
		--pager-color-active: ${props.theme.pagerColorActive};
		--pager-gap: ${props.theme.pagerGap};
		--pager-size: ${props.theme.pagerSize};
		--stroke-width: ${props.theme.strokeWidth};
		${props.position}: 0;
	`};

	position: absolute;
	z-index: 2;
	top: 50%;
	margin: 0 0.5rem;
	transform: translateY(-50%);
	background-color: var(--pager-background-color);
	border-radius: calc(var(--pager-size) / 2);
`;

PagerWrapper.defaultProps = {
	position: "left",
	theme: light
};

/**
 * @type {StyledComponent<"div", {}>}
 * @return {React.ReactHTMLElement<HTMLElement>}
 */
export const StyledMarker: StyledComponent<"div", {}> = styled.div`
	position: absolute;
	z-index: 1;
	top: calc((var(--pager-size) / 2) + var(--pager-gap));
	left: calc(0.5rem + (var(--pager-size) - var(--marker-width)) / 2);
	width: var(--marker-width);
	background: var(--marker-color);
	visibility: visible;

	&::before,
	&::after {
		position: absolute;
		content: "";
		display: block;
		height: calc(var(--marker-width) / 2);
		width: var(--marker-width);
		left: 0;
		background: inherit;
	}

	&::before {
		bottom: 100%;
		border-radius: calc(var(--marker-width) / 2) calc(var(--marker-width) / 2) 0 0;
	}

	&::after {
		top: 100%;
		border-radius: 0 0 calc(var(--marker-width) / 2) calc(var(--marker-width) / 2);
	}
`;

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
export const Marker: React.FunctionComponent<IMarkerProps> = props => {
	return (
		<StyledMarker
			style={{
				height: `calc(${props.progress} * (var(--pager-gap) * 2 + var(--pager-size)) + ${
					props.page
				} * (var(--pager-gap) * 2 + var(--pager-size)))`
			}}
		/>
	);
};

/**
 * @type {StyledComponent<"svg", {}>}
 * @return {React.ReactSVGElement<SVGSVGElement>}
 */
export const Icon: StyledComponent<"svg", {}> = styled.svg.attrs({
	viewBox: "0 0 24 24"
})`
	width: 1.5rem;
	height: 1.5rem;
	fill: currentColor;
`;

/**
 * @type {StyledComponent<"a", {}>}
 * @return {React.ReactHTMLElement<HTMLAnchorElement>}
 */
export const SkipLink: StyledComponent<"a", {}> = styled.a`
	position: absolute;
	bottom: 0;
	right: 0;
	padding: 0.5rem 1rem;
	color: currentColor;
	font-size: 1rem;
	line-height: 1.5rem;
	text-decoration: none;
	&:hover {
		text-decoration: underline;
	}
`;

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
export const SkipBase: React.FunctionComponent<ISkipBaseProps> = props => {
	const glue = props.prefix === "" ? "" : "/";
	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
		e.preventDefault();
		scrollTo(`${props.prefix}${glue}skip`, e.target as HTMLElement, {noFocus: true, noHash: true});
	};

	return (
		<SkipLink href={`#${props.prefix}${glue}skip`} onClick={handleClick}>
			Skip
		</SkipLink>
	);
};

/**
 * @extends IPagerWrapperProps
 * @typedef {object} IPagerBaseProps
 * @property {number} page
 * @property {number} pageIndex
 * @property {number} pages
 * @property {string} prefix
 * @property {number} progress
 * @property {boolean} [showLabels]
 */
export interface IPagerBaseProps extends IPagerWrapperProps {
	page: number;
	pageIndex: number;
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
export const PagerBase: React.FunctionComponent<IPagerBaseProps> = props => {
	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
		e.preventDefault();
		const target = e.target as HTMLElement;
		const id = target.getAttribute("href").replace(/^#/, "");
		scrollTo(id, target);
	};

	return (
		<React.Fragment>
			<PagerWrapper position={props.position}>
				<StyledPagers>
					<Marker progress={props.progress} page={props.pageIndex} />
					{Array(props.pages)
						.fill(Boolean)
						.map((x, i) => {
							const id = `${props.prefix}/${i + 1}`;
							return (
								<Pager
									key={id}
									active={i <= props.pageIndex}
									selected={i === props.pageIndex && props.progress < 1}
									href={`#${id}`}
									onClick={handleClick}>
									{props.showLabels && i + 1}
								</Pager>
							);
						})}
					<Pager
						href={`#${props.prefix}/${props.pages + 1}`}
						selected={props.page === props.pages && props.progress === 1}
						active={props.page === props.pages && props.progress === 1}
						onClick={handleClick}>
						{props.showLabels && (
							<Icon>
								<path d="M4,5V19L11,12M18,5V19H20V5M11,5V19L18,12" />
							</Icon>
						)}
					</Pager>
				</StyledPagers>
			</PagerWrapper>
		</React.Fragment>
	);
};

/**
 * @extends Partial<IPagerBaseProps>
 * @typedef {object} IPagersProps
 * @property {boolean} [useContext]
 */
export interface IPagersProps extends Partial<IPagerBaseProps> {
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
export const Pagers: React.FunctionComponent<IPagersProps> = props => {
	if (props.useContext) {
		return (
			<ScrollConsumer>
				{context => (
					<PagerBase
						page={context.page}
						pageIndex={context.pageIndex}
						pages={context.pages}
						position={props.position}
						prefix={context.anchors}
						progress={context.progress}
						showLabels={props.showLabels}
					/>
				)}
			</ScrollConsumer>
		);
	}
	assert(props.page, "number");
	assert(props.pageIndex, "number");
	assert(props.pages, "number");
	assert(props.progress, "number");
	assert(props.prefix, "string");
	return (
		<PagerBase
			page={props.page}
			pageIndex={props.pageIndex}
			pages={props.pages}
			position={props.position}
			prefix={props.prefix}
			progress={props.progress}
			showLabels={props.showLabels}
		/>
	);
};

Pagers.defaultProps = {
	position: "left"
};

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
export const Skip: React.FunctionComponent<ISkipProps> = props => {
	if (props.useContext) {
		return <ScrollConsumer>{context => <SkipBase prefix={context.anchors} />}</ScrollConsumer>;
	}
	assert(props.prefix, "string");
	return <SkipBase prefix={props.prefix} />;
};
