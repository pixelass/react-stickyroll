module.exports = {
	docs: ["{doc,guide}/**/*.md"],
	entry: ["guide/*/demo.js"],
	render: "@patternplate/render-styled-components/render",
	mount: "@patternplate/render-styled-components/mount",
	ui: {
		logo: `
		<svg width="30" height="30" viewBox="0 0 30 30">
			<rect width="30" height="30" fill="currentColor"/>
		</svg>
		`,
		favicon: `
		<svg height="30" width="30">
			<circle cx="15" cy="15" r="15"/>
		</svg>
		`,
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
