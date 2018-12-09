/* input a number, usually a hash and convert it to base-52 */
/* start at 75 for 'a' until 'z' (25) and then start at 65 for capitalised letters */
/* This is the "capacity" of our alphabet i.e. 2x26 for all letters plus their capitalised
 * counterparts */

// Source: https://github.com/garycourt/murmurhash-js/blob/1e3186c42c2dac3738f53a70b0941276a0fdc46a/murmurhash2_gc.js
function murmurhash(c: string): number {
	for (var e = c.length | 0, a = e | 0, d = 0, b; e >= 4; ) {
		(b =
			(c.charCodeAt(d) & 255) |
			((c.charCodeAt(++d) & 255) << 8) |
			((c.charCodeAt(++d) & 255) << 16) |
			((c.charCodeAt(++d) & 255) << 24)),
			(b = 1540483477 * (b & 65535) + (((1540483477 * (b >>> 16)) & 65535) << 16)),
			(b ^= b >>> 24),
			(b = 1540483477 * (b & 65535) + (((1540483477 * (b >>> 16)) & 65535) << 16)),
			(a = (1540483477 * (a & 65535) + (((1540483477 * (a >>> 16)) & 65535) << 16)) ^ b),
			(e -= 4),
			++d;
	}
	switch (e) {
		case 3:
			a ^= (c.charCodeAt(d + 2) & 255) << 16;
		case 2:
			a ^= (c.charCodeAt(d + 1) & 255) << 8;
		case 1:
			(a ^= c.charCodeAt(d) & 255),
				(a = 1540483477 * (a & 65535) + (((1540483477 * (a >>> 16)) & 65535) << 16));
	}
	a ^= a >>> 13;
	a = 1540483477 * (a & 65535) + (((1540483477 * (a >>> 16)) & 65535) << 16);
	return (a ^ (a >>> 15)) >>> 0;
}

// Source: https://github.com/styled-components/styled-components/blob/0ecbb475fd370a83a91bd42591ebff395de10acd/src/utils/generateAlphabeticName.js
/* This is the "capacity" of our alphabet i.e. 2x26 for all letters plus their capitalised
 * counterparts */
const charsLength = 52;

/* start at 75 for 'a' until 'z' (25) and then start at 65 for capitalised letters */
const getAlphabeticChar = (code: number): string =>
	String.fromCharCode(code + (code > 25 ? 39 : 97));

/* input a number, usually a hash and convert it to base-52 */
function generateAlphabeticName(code: number): string {
	let name = "";
	let x;

	/* get a char and divide by alphabet-length */
	for (x = code; x > charsLength; x = Math.floor(x / charsLength)) {
		name = getAlphabeticChar(x % charsLength) + name;
	}

	return getAlphabeticChar(x % charsLength) + name;
}

export const hashCode = (str: string): string => generateAlphabeticName(murmurhash(str));
