import React from "react";
import styled, {StyledComponent} from "styled-components";
import {ScrollConsumer} from "@stickyroll/context";
import {assert, scrollTo} from "@stickyroll/utils";
import {IPagerWrapperProps} from "./pagers";

/**
 * @type {StyledComponent<"a", {}>}
 * @return {React.ReactHTMLElement<HTMLAnchorElement>}
 */
export const SkipLink = styled.a`
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
		scrollTo(`${props.prefix}${glue}skip`, e.target as HTMLElement, {
			noFocus: true,
			noHash: true
		});
	};

	return (
		<SkipLink href={`#${props.prefix}${glue}skip`} onClick={handleClick}>
			Skip
		</SkipLink>
	);
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
