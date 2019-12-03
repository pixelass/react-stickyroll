export default {
	compileEnhancements: false,
	require: ["ts-node/register/transpile-only"],
	babel: {
		extensions: ["ts", "tsx"]
	},
	files: ["test/**/*.ts", "test/**/*.tsx"]
};
