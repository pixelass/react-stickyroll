import React from "react";
import {Frame as StickyFrame} from "@stickyroll/frame";
import {Pagers, Skip, IScrollToOptions} from "@stickyroll/pagers";
import {Content, Inner} from "@stickyroll/inner";
import ReactDOM from "react-dom";
import {IContext} from "@stickyroll/context";

const create = () => document.createElement("div");
const cleanup = async el => await el.remove();
const findPage = (page: number, prefix: string = "!/karma"): HTMLSpanElement | null =>
	document.getElementById(`${prefix}/${page + 1}`);

export type AsyncFunction<T> = () => Promise<T>;

const delayed = (callback: AsyncFunction<any>, ms: number = 200): Promise<any> =>
	new Promise(resolve => {
		setTimeout(async () => {
			const result = await callback();
			resolve(result);
		}, ms);
	});

const getContext = async (rootEl: HTMLDivElement): Promise<IContext> => {
	const el = rootEl.querySelector(".karma");
	const {textContent} = el;
	return JSON.parse(textContent) as IContext;
};

const scrollTo = async (
	hash: string,
	target: HTMLElement,
	options: IScrollToOptions = {}
): Promise<void> => {
	if (!options.noHash) {
		window.location.hash = hash;
	}
	const el = document.getElementById(hash);
	if (!options.noFocus) {
		await target.focus();
	}
	await el.scrollIntoView(true);
};

const handleClick = async (t): Promise<void> => {
	const id = t.getAttribute("href").replace(/^#/, "");
	const el = document.getElementById(id);
	const {top: tEl} = el.getBoundingClientRect();
	const {top: tBody} = document.body.getBoundingClientRect();
	const offset = tEl - tBody;
	await window.scrollTo(0, offset);
};

const delayLong = 300;
const delayShort = 100;

const setup = (pages, handlePage, handleStart, handleEnd) => {
	let renderRoot = create();
	document.body.innerHTML = "";
	document.body.appendChild(renderRoot);
	const App = props => (
		<StickyFrame
			pages={props.pages}
			anchors={props.prefix}
			onPage={handlePage}
			onStart={handleStart}
			onEnd={handleEnd}>
			{context => (
				<Inner>
					<Pagers useContext={true} />
					<Content>
						<div className="karma">{JSON.stringify(context, null, 4)}</div>
					</Content>
					<Skip useContext={true} />
				</Inner>
			)}
		</StickyFrame>
	);
	ReactDOM.render(<App pages={pages} prefix="!/karma" />, renderRoot);
	return renderRoot;
};

const style = document.createElement("style");
style.innerHTML = `
	body {
		margin: 0;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
		background: #E0E0E0;
		color: black;
	}
	* {
		box-sizing: border-box;
	}
`;
document.head.appendChild(style);

/*******************
 *      Tests      *
 *******************/

// Before each test
beforeEach(async () => {
	jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
	await window.scrollTo(0, 0);
});

// After each test
afterEach(async () => {
	await window.scrollTo(0, 0);
});

// Run tests
it("Scrolling works as expected", async done => {
	const pages = [1, 2, 3, 4, 5];
	let currentPage = 0;
	let hitEnd = false;
	let hitStart = false;
	const handlePage = (page: number) => {
		currentPage = page;
		hitStart = false;
		hitEnd = false;
	};
	const handleStart = () => {
		hitEnd = false;
		hitStart = true;
	};
	const handleEnd = () => {
		hitStart = false;
		hitEnd = true;
	};
	const renderRoot = setup(pages, handlePage, handleStart, handleEnd);
	const {innerHeight} = window;
	const {scrollHeight} = document.body;
	const results = await Promise.all(
		pages.map(
			async (link, index) =>
				await delayed(async () => {
					await window.scrollTo(0, index * innerHeight);
					return await delayed(async () => {
						return {
							...(await getContext(renderRoot)),
							currentPage,
							hitStart,
							hitEnd,
							index,
							scrollY: window.scrollY,
							expectedScroll: Math.min(
								scrollHeight - innerHeight,
								index * innerHeight
							)
						};
					}, delayShort);
				}, delayLong * index)
		)
	);
	results.forEach((x, i) => {
		const {page, currentPage, progress, hitEnd, index, expectedScroll, scrollY} = x;
		expect(page).toBe(index);
		expect(currentPage).toBe(index);
		expect(progress).toBe(0);
		expect(hitEnd).toBe(false);
		expect(scrollY).toBe(expectedScroll);
	});
	await done();
});

it("Pagers work as expected", async done => {
	const pages = 8;
	let currentPage = 0;
	let hitEnd = false;
	let hitStart = false;
	const handlePage = (page: number) => {
		currentPage = page;
		hitStart = false;
		hitEnd = false;
	};
	const handleStart = () => {
		hitEnd = false;
		hitStart = true;
	};
	const handleEnd = () => {
		hitStart = false;
		hitEnd = true;
	};
	const renderRoot = setup(pages, handlePage, handleStart, handleEnd);
	const {innerHeight} = window;
	const {scrollHeight} = document.body;
	const links: HTMLAnchorElement[] = Array.from(renderRoot.querySelectorAll("a"));
	const results = await Promise.all(
		links.map(
			async (link, index) =>
				await delayed(async () => {
					await handleClick(link);
					return await delayed(async () => {
						return {
							...(await getContext(renderRoot)),
							currentPage,
							hitStart,
							hitEnd,
							index,
							scrollY: window.scrollY,
							expectedScroll: Math.min(
								scrollHeight - innerHeight,
								index * innerHeight
							)
						};
					}, delayShort);
				}, delayLong * index)
		)
	);
	// Test Pagers
	// Test Skip
	results.forEach((x, i) => {
		const {page, pages, currentPage, progress, hitEnd, index, expectedScroll, scrollY} = x;
		const lastPage = pages - 1;
		if (index < pages) {
			expect(page).toBe(index);
			expect(currentPage).toBe(index);
			expect(progress).toBe(0);
			expect(hitEnd).toBe(false);
		} else {
			expect(page).toBe(lastPage);
			expect(currentPage).toBe(lastPage);
			expect(progress).toBe(1);
			expect(hitEnd).toBe(true);
		}
		// Does not pass on Travis
		// Firefox 56.0.0 (Linux 0.0.0)
		// @todo Fix test
		expect(scrollY).toBe(expectedScroll);
	});
	await done();
});

it("Skip works", async done => {
	const pages = 8;
	let currentPage = 0;
	let hitEnd = false;
	let hitStart = false;
	const handlePage = (page: number) => {
		currentPage = page;
	};
	const handleStart = () => {
		hitStart = true;
	};
	const handleEnd = () => {
		hitEnd = true;
	};
	const renderRoot = setup(pages, handlePage, handleStart, handleEnd);
	const links: HTMLAnchorElement[] = Array.from(renderRoot.querySelectorAll("a"));
	const result = await (async () => {
		await handleClick(links.reverse()[0]);
		return await delayed(async () => {
			const {innerHeight} = window;
			const {scrollHeight} = document.body;
			const maxScroll = scrollHeight - innerHeight;
			const context = await getContext(renderRoot);
			return {
				...context,
				currentPage,
				hitStart,
				hitEnd,
				targetPage: context.pages - 1,
				scrollY: window.scrollY,
				expectedScroll: maxScroll
			};
		}, delayShort);
	})();

	expect(result.page).toBe(result.targetPage);
	expect(result.currentPage).toBe(result.targetPage);
	expect(result.progress).toBe(1);
	expect(result.hitEnd).toBe(true);
	await done();
});

const testPages = 8;
for (let index = 0; index < testPages; index++) {
	it("Page navigation works", async done => {
		const targetPage = index;
		let currentPage = 0;
		let hitEnd = false;
		let hitStart = false;
		const handlePage = (page: number) => {
			currentPage = page;
		};
		const handleStart = () => {
			hitStart = true;
		};
		const handleEnd = () => {
			hitEnd = true;
		};
		const renderRoot = setup(testPages, handlePage, handleStart, handleEnd);
		const links: HTMLAnchorElement[] = Array.from(renderRoot.querySelectorAll("a"));
		const targetLink: HTMLAnchorElement = links[targetPage];
		const result = await (async () => {
			await handleClick(targetLink);
			return await delayed(async () => {
				const {innerHeight} = window;
				const {scrollHeight} = document.body;
				const maxScroll = scrollHeight - innerHeight;
				return {
					...(await getContext(renderRoot)),
					currentPage,
					hitStart,
					hitEnd,
					targetPage,
					scrollY: window.scrollY,
					expectedScroll: Math.min(maxScroll, targetPage * innerHeight)
				};
			}, delayShort);
		})();
		expect(result.currentPage).toBe(result.targetPage);
		expect(result.page).toBe(result.targetPage);
		expect(result.progress).toBe(0);
		expect(result.hitEnd).toBe(false);
		expect(result.scrollY).toBe(result.expectedScroll);
		await done();
	});
}
