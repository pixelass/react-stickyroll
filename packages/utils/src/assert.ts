/**
 *
 * @param {any} value
 * @param {string} type
 * @throws {?TypeError}
 */
export const assert = (value: any, type: string): void => {
	const valueType = typeof value;
	if (type === "object") {
		if (Array.isArray(value)) {
			throw new TypeError(`Expected "object" but "array" was received`);
		} else if (value === null) {
			throw new TypeError(`Expected "object" but "null" was received`);
		} else if (valueType !== type) {
			throw new TypeError(`Expected "${type}" but "${valueType}" was received`);
		}
	} else if (type === "array") {
		if (!Array.isArray(value)) {
			throw new TypeError(`Expected "array" but "${valueType}" was received`);
		}
	} else if (type === "null") {
		if (value !== null) {
			throw new TypeError(`Expected "null" but "${valueType}" was received`);
		}
	} else if (valueType !== type) {
		throw new TypeError(`Expected "${type}" but "${valueType}" was received`);
	}
};
