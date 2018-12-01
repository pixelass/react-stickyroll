/**
 * @typedef {object} ITheme
 * @property {string} color
 * @property {number} hue
 * @property {string} lightness
 * @property {string} markerSize
 * @property {string} pagerGap
 * @property {string} pagerSize
 * @property {string} saturation
 * @property {string} strokeWidth
 */
export interface ITheme {
	backgroundColor: string;
	color: string;
	markerColor: string;
	markerWidth: string;
	pagerBackgroundColor: string;
	pagerColor: string;
	pagerColorActive: string;
	pagerGap: string;
	pagerSize: string;
	strokeWidth: string;
}
