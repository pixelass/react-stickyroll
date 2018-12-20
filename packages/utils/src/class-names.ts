export const classNames = (...arr: Array<string | undefined | null | boolean | number>): string =>
	arr.filter(Boolean).join(" ");
