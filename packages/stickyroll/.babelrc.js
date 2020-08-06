module.exports = {
	extends: require.resolve("imhotep/config/.babelrc"),
	plugins: ["babel-plugin-emotion"],
	env: {
		development: {
			presets: [
				[
					"@emotion/babel-preset-css-prop",
					{
						autoLabel: true,
						labelFormat: "[local]"
					}
				]
			]
		},
		production: {
			presets: [
				[
					"@emotion/babel-preset-css-prop",
					{
						autoLabel: true,
						labelFormat: "[hash]"
					}
				]
			]
		}
	}
};
