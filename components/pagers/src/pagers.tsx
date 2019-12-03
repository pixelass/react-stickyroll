import React from "react";
import styled, {css, StyledComponent} from "styled-components";
import {ScrollConsumer} from "@stickyroll/context";
import {ITheme, light} from "@stickyroll/themes";
import {assert, scrollTo} from "@stickyroll/utils";
import {Marker} from "./marker";

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
export const Pager = styled.a<PagerProps>`
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
const StyledPagers = styled.nav`
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
const PagerWrapper = styled.div<IPagerWrapperProps>`
	${(props: IPagerWrapperProps) => {
		return css`
		--marker-color: ${props.theme.markerColor};
		--marker-width: ${props.theme.markerWidth};
		--pager-background-color: ${props.theme.pagerBackgroundColor};
		--pager-color: ${props.theme.pagerColor};
		--pager-color-active: ${props.theme.pagerColorActive};
		--pager-gap: ${props.theme.pagerGap};
		--pager-size: ${props.theme.pagerSize};
		--stroke-width: ${props.theme.strokeWidth};
		${props.position}: 0;
	`}};

	position: absolute;
	z-index: 2;
	top: 50%;
	margin: 0 0.5rem;
	transform: translateY(-50%);
	background-color: var(--pager-background-color);
	border-radius: calc(var(--pager-size) / 2);
`;

PagerWrapper.defaultProps = {
	position: "left"
};

/**
 * @type {StyledComponent<"svg", {}>}
 * @return {React.ReactSVGElement<SVGSVGElement>}
 */
export const Icon = styled.svg.attrs({
	viewBox: "0 0 24 24"
})`
	width: 1.5rem;
	height: 1.5rem;
	fill: currentColor;
`;

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
	const glue = props.prefix === "" ? "" : "/";

	return (
		<PagerWrapper theme={props.theme} position={props.position}>
			<StyledPagers>
				<Marker progress={props.progress} page={props.pageIndex} />
				{Array(props.pages)
					.fill(Boolean)
					.map((x, i) => {
						const id = `${props.prefix}${glue}${i + 1}`;
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
					href={`#${props.prefix}${glue}${props.pages + 1}`}
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
export const RawPagers: React.FunctionComponent<IPagersProps> = props => {
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
						theme={props.theme}
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
			theme={props.theme}
		/>
	);
};

RawPagers.defaultProps = {
	position: "left"
};

export const Pagers = styled(RawPagers)``;
