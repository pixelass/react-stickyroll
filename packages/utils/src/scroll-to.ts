/**
 * @typedef {object} IScrollOptions
 * @property {boolean} [noFocus]
 * @property {boolean} [noHash]
 */
export interface IScrollToOptions {
	noFocus?: boolean;
	noHash?: boolean;
}

/**
 * @param {string} hash
 * @param {HTMLElement} target
 * @param {IScrollToOptions} [options={}]
 * @return {void}
 */
export const scrollTo = (
	hash: string,
	target: HTMLElement,
	options: IScrollToOptions = {}
): void => {
	if (!options.noHash) {
		window.location.hash = hash;
	}
	const el = document.getElementById(hash);
	if (!options.noFocus) {
		target.focus();
	}

	// Attempted to implement smooth scrolling if the page changes by one position.
	// The page jumps in several state changes
	// @todo Fix unless a browser bug exists.
	// const index = parseInt(hash.split("/").reverse()[0], 10) - 1;
	// const diff = Math.abs(index - page);
	// document.documentElement.style["scroll-behavior"] = diff > 1 ? "auto" : "smooth";

	el.scrollIntoView(true);

	// Optionally if Element.scrollIntoView does not return the expected result.
	// const {top: tEl} = el.getBoundingClientRect();
	// const {top: tBody} = document.body.getBoundingClientRect();
	// const offset = tEl - tBody;
	// window.scrollTo(0, offset);
};
