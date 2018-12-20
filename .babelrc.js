module.exports = {
	extends: require.resolve("imhotep/config/.babelrc"),
	plugins: ["istanbul"],
	env: {
		development: {
			plugins: [
				[
					"styled-components",
					{
						ssr: true,
						displayName: true
					}
				]
			]
		}
	}
};
