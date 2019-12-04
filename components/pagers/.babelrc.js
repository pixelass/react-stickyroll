module.exports = {
	extends: require.resolve("imhotep/config/.babelrc"),
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
		},
		production: {
			plugins: [
				[
					"styled-components",
					{
						ssr: true,
						displayName: false
					}
				]
			]
		}
	}
};
