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
	brandUrl: "https://react-stickyroll.vercel.app",
	brandImage:
		"https://raw.githubusercontent.com/pixelass/react-stickyroll/6fff51d8c4716410a4370e53ebe52e53996436da/resources/logo.svg",
	brandTarget: "_blank",
});

export default theme;
