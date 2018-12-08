const logo = (size = 24) => `
<svg width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
	<path d="M55 15H15v20h70v20H55l30 30" fill="none" stroke="currentColor" stroke-width="10"/>
</svg>`;
module.exports = {
	docs: ["{doc,guide}/**/*.md", "!**/CHANGELOG.md", "CHANGELOG.md"],
	entry: ["guide/*/demo.js"],
	cover: "./src/cover",
	render: "@patternplate/render-styled-components/render",
	mount: "@patternplate/render-styled-components/mount",
	ui: {
		logo: logo(30),
		favicon: logo(24),
		// Fonts
		fontDefault: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
		fontHeadline: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
		fontCode: "SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace",

		// Global colors
		colorActive: "#FF6F00",
		colorError: "#F44336",
		colorWarning: "#FF9800",
		colorInfo: "#03A9F4",
		colorSuccess: "#8BC34A",

		// Dark context colors
		colorBackgroundDark: "#222",
		colorBackgroundSecondaryDark: "#111",
		colorBackgroundTertiaryDark: "#333",
		colorBorderDark: "#333",
		colorTextDark: "#fff",
		colorRecessDark: "#ddd",

		// Light context colors
		colorBackgroundLight: "#fff",
		colorBackgroundSecondaryLight: "#eee",
		colorBackgroundTertiaryLight: "#eee",
		colorBorderLight: "#eee",
		colorTextLight: "#000",
		colorRecessLight: "#444",
		// Components
		showComponents: true
	}
};
