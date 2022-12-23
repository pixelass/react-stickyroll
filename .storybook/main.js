const path = require("node:path");
const process = require("node:process");

const toPath = path_ => path.join(process.cwd(), path_);

module.exports = {
	stories: ["../stories/**/*.stories.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
	addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-docs"],
	framework: "@storybook/react",
	typescript: { reactDocgen: true },
	core: {
		builder: "webpack5",
	},
	webpackFinal: async config => {
		config.resolve.alias = {
			...config.resolve.alias,
			"@emotion/core": toPath("node_modules/@emotion/react"),
			"emotion-theming": toPath("node_modules/@emotion/react"),
			"@": toPath("src"),
		};
		return config;
	},
};
