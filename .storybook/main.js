module.exports = {
	stories: ['../stories/**/*.stories.(tsx|mdx)'],
	addons: ["@storybook/addon-links", "@storybook/preset-typescript", "@storybook/addon-docs" ],
	webpackFinal: async config => {
		config.module.rules.push({
			test: /\.(ts|tsx)$/,
			use: [
				{
					loader: require.resolve('ts-loader'),
				}
			],
		});
		config.resolve.extensions.push('.ts', '.tsx');
		return config;
	}
};
