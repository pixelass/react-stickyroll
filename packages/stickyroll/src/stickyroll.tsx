/** @jsx jsx */
import {jsx} from "@emotion/core";
import React from "react";
import {useAnchors, useStickyroll} from "@stickyroll/hooks";
import {StickyrollProvider} from "@stickyroll/context";
import {contentStyle, Pages, wrapperStyle} from "./components";
import {StickyrollProps} from "./types";

export function Stickyroll({
	children,
	className,
	render,
	smooth,
	throttle,
	pages,
	factor = 1,
	anchors
}: StickyrollProps) {
	const [ref, {style, currentPage, pageCount, pageIndex, progress, time}] = useStickyroll({
		pages,
		factor,
		throttle
	});

	const {targets, triggers} = useAnchors({
		name: anchors,
		factor,
		progress,
		pageCount,
		pageIndex,
		smooth
	});

	return (
		<StickyrollProvider
			value={{anchors: {triggers}, currentPage, pageIndex, pageCount, progress, time}}>
			<div css={wrapperStyle} ref={ref} className={className} style={style}>
				<Pages targets={targets} />
				<div css={contentStyle}>
					{render
						? render({
								anchors: {triggers},
								currentPage,
								pageIndex,
								pageCount,
								progress,
								time
						  })
						: children}
				</div>
			</div>
		</StickyrollProvider>
	);
}
