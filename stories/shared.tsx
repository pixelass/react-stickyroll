import {Global, css} from "@emotion/core";
import React from "react";
import {useStickyrollContext} from "../packages/hooks/src";

export const globalStyle = css`
	* {
		box-sizing: border-box;
	}
	body {
		margin: 0;
		font-family: sans-serif;
	}
`;

export function renderDemo({currentPage, pageIndex, pageCount, progress}) {
	return (
		<pre style={{margin: 0, padding: 16}}>
			<code>{JSON.stringify({currentPage, pageIndex, pageCount, progress}, null, 4)}</code>
		</pre>
	);
}

export function Pager({name, active, scrollTo}) {
	return <input type="radio" name={name} checked={active} onChange={scrollTo} />;
}

export function Pagers({pagerId}: {pagerId: string}) {
	const {
		anchors: {triggers}
	} = useStickyrollContext();
	return (
		<nav>
			{triggers.map(({href, active, scrollTo}) => (
				<Pager
					key={`${pagerId}:${href}`}
					name={pagerId}
					active={active}
					scrollTo={scrollTo}
				/>
			))}
		</nav>
	);
}

export function Page({children}) {
	return (
		<React.Fragment>
			<Global styles={globalStyle} />
			{children}
		</React.Fragment>
	);
}
