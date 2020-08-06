/**
 * @typedef {object} IScrollOptions
 * @property {boolean} [noHash]
 * @property {boolean} [smooth]
 */
export interface IScrollToOptions {
	noHash?: boolean;
	noFocus?: boolean;
	smooth?: boolean;
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
	{ smooth, noFocus, noHash }: IScrollToOptions = {}
): void => {
	if (!noFocus) {
		target.focus();
	}
	const behavior = smooth ? "smooth" : "auto";
	const id = hash.substr(1);
	const el = document.getElementById(id);
	document.documentElement.style["scroll-behavior"] = behavior;
	el.scrollIntoView({ behavior });
	if (!noHash) {
		window.location.hash = hash;
	}
};
