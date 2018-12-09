export const classNames = (...arr: Array<string | undefined | null>): string =>
	arr.filter(Boolean).join(" ");
