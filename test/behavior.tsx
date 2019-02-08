import React from "react";
import {Stickyroll, IFrameProps, IContext} from "@stickyroll/stickyroll";
import {Pagers, Skip} from "@stickyroll/pagers";
import {Inner} from "@stickyroll/inner";
import ReactDOM from "react-dom";

export type Create<T> = (
	tagName: keyof HTMLElementTagNameMap,
	attributes?: {[key: string]: string} | null,
	children?: string | number | HTMLElement
) => T;

const create: Create<HTMLElement> = (tagName, attributes = null, children?) => {
	const el = document.createElement(tagName);
	if (attributes !== null) {
		Object.entries(attributes).forEach(([attribute, value]) => {
			el.setAttribute(attribute, value);
		});
	}
	if (!el.hasOwnProperty("innerHTML")) {
		return el;
	}
	if (typeof children === "string" || typeof children === "number") {
		el.innerHTML = `${children}`;
	} else if (typeof children === "object") {
		if (!Array.isArray(children) && children.hasOwnProperty("nodeName")) {
			el.appendChild(children);
		} else if (Array.isArray(children)) {
			children.forEach(child => {
				if (typeof child === "string" || typeof child === "number") {
					el.innerHTML += `${child}`;
				} else if (typeof child === "object") {
					if (!Array.isArray(child) && child.hasOwnProperty("nodeName")) {
						el.appendChild(child);
					}
				}
			});
		}
	}
	return el;
};

const setup = (
	props: IFrameProps,
	log: (context: IContext) => void,
	withPagers?: "left" | "right",
	withSkip?: boolean
) => {
	const renderRoot = (create as Create<HTMLDivElement>)("div", {["data-stickyroll-root"]: ""});
	const style = (create as Create<HTMLStyleElement>)(
		"style",
		{["data-stickyroll-styles"]: ""},
		`
		body {
			margin-top: 0;
			margin-bottom: 0;
		}
	`
	);
	style.innerHTML = `
		body {
			margin-top: 0;
			margin-bottom: 0;
		}
	`;
	document.head.appendChild(style);
	document.body.appendChild(renderRoot);
	const App = () => (
		<Stickyroll {...props}>
			{context => (
				<Inner withPagers={withPagers}>
					{withPagers && <Pagers useContext={true} position={withPagers} />}
					{log(context)}
					{withSkip && <Skip useContext={true} />}
				</Inner>
			)}
		</Stickyroll>
	);
	ReactDOM.render(<App />, renderRoot);
	return {renderRoot, style};
};

const clear = (renderRoot: HTMLDivElement, style: HTMLStyleElement) => {
	renderRoot.remove();
	style.remove();
};

const findAnchors = (renderRoot: HTMLDivElement): HTMLAnchorElement[] =>
	Array.from(renderRoot.querySelectorAll("a")) as HTMLAnchorElement[];

/*******************
 *      Tests      *
 *******************/

// Before each test
beforeEach(() => {
	jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
});

it("Pagers work as expected", async done => {
	const pages = 10;
	let counter = 0;
	const results = [];
	const logResults = {};
	const log = (context: IContext): void => {
		logResults[counter] = context;
	};
	const onPage = async page => {
		counter = page;
		const context = logResults[counter - 1];
		results.push({...context, currentPage: page});
		if (page < pages - 1) {
			links[page + 1].click();
		} else {
			expect(results.length).toEqual(counter);
			expect(results.length).toEqual(pages - 1);
			results.forEach(result => {
				const {pageIndex, currentPage, progress} = result;
				expect(pageIndex).toEqual(currentPage);
				expect(progress).toEqual(0);
			});
			clear(renderRoot, style);
			done();
		}
	};
	const {renderRoot, style} = setup({pages, onPage, anchors: "!/"}, log, "left");
	const links = findAnchors(renderRoot);
	links[1].click();
});

it("The last pager works as expected", async done => {
	const pages = 10;
	const logResults = {};
	const log = (context: IContext): void => {
		logResults[0] = context;
	};
	const onEnd = async () => {
		const results = logResults[0];
		expect(results.page).toEqual(results.pages);
		expect(results.progress).toEqual(1);
		clear(renderRoot, style);
		done();
	};
	const {renderRoot, style} = setup({pages, onEnd, anchors: "!/"}, log, "left");
	const links = findAnchors(renderRoot);
	links[pages].click();
});

it("The skip link works as expected", async done => {
	const pages = 10;
	const logResults = {};
	const log = (context: IContext): void => {
		logResults[0] = context;
	};
	const onEnd = async () => {
		const results = logResults[0];
		expect(results.page).toEqual(results.pages);
		expect(results.progress).toEqual(1);
		clear(renderRoot, style);
		done();
	};
	const {renderRoot, style} = setup({pages, onEnd, anchors: "!/"}, log, "left", true);
	const links = findAnchors(renderRoot);
	links[pages].click();
});

it("Scrolling works as expected", async done => {
	const pages = 10;
	let counter = 0;
	const results = [];
	const logResults = {};
	const log = (context: IContext): void => {
		logResults[counter] = context;
	};
	const onPage = async page => {
		counter = page;
		const context = logResults[counter - 1];
		results.push({...context, currentPage: page});
		if (page < pages - 1) {
			window.scrollTo(0, window.innerHeight * (page + 1));
		} else {
			expect(results.length).toEqual(counter);
			expect(results.length).toEqual(pages - 1);
			results.forEach(result => {
				const {pageIndex, currentPage, progress} = result;
				expect(pageIndex).toEqual(currentPage);
				expect(progress).toEqual(0);
			});
			clear(renderRoot, style);
			done();
		}
	};
	const {renderRoot, style} = setup({pages, onPage}, log);
	window.scrollTo(0, window.innerHeight);
});
