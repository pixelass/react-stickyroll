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
	const {hash: currentHash} = window.location
	const currentHashTarget = currentHash.split("/").reverse()[0];

	const el = document.getElementById(hash);
	if (!options.noFocus) {
		target.focus();
	}

	const hashTarget = hash.split("/").reverse()[0];
	const wasSkip = currentHashTarget === "skip";
	const isSkip = hashTarget === "skip";
	const index = isSkip ? -1 : parseInt(hashTarget, 10);
	const currentIndex = wasSkip ? -1 : parseInt(currentHashTarget, 10);
	const diff = index > 0 && currentIndex > 0 ? Math.abs(index - currentIndex) : -1;
	const shouldJump = isSkip || (diff !== 1);
	document.documentElement.style["scroll-behavior"] = shouldJump ? "auto" : "smooth";
	el.scrollIntoView(true);
	if (!options.noHash) {
		window.location.hash = hash;
	}
};
