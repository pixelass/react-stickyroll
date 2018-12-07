/**
 *
 * @param {any} value
 * @param {string} type
 * @throws {?TypeError}
 */
export const assert = (value: any, type: string): void => {
	const valueType = typeof value;
	if (valueType !== type) {
		throw new TypeError(`Expected "${type}" but "${valueType}" was received`);
	}
};
