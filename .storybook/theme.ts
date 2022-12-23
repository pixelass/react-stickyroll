import { create } from "@storybook/theming";

const theme = create({
	base: "light",

	colorPrimary: "#673AB7",
	colorSecondary: "#00836d",

	// UI
	appBg: "#fefefd",
	appContentBg: "#ffffff",
	appBorderColor: "rgba(0 0 0 / 45%)",
	appBorderRadius: 3,

	// Typography
	fontBase: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
	fontCode: `ui-monospace, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro", "Fira Mono", "Droid Sans Mono", "Courier New", monospace`,

	// Text colors
	textColor: "rgba(0 0 0 / 85%)",
	textInverseColor: "rgba(255 255 255 / 85%)",

	// Toolbar default and active colors
	barTextColor: "rgba(0 0 0 / 85%)",
	barSelectedColor: "#673AB7",
	barBg: "#fefefd",

	// Form colors
	inputBg: "#ffffff",
	inputBorder: "rgba(0 0 0 / 45%)",
	inputTextColor: "#000000",
	inputBorderRadius: 3,

	brandTitle: "Stickyroll",
	brandUrl: "https://stickyroll.vercel.app",
	brandImage:
		"https://raw.githubusercontent.com/pixelass/stickyroll/4126e6adef588513c8309886014cf3d046091e8c/resources/logo.svg",
	brandTarget: "_blank",
});

export default theme;
