export default {
	compileEnhancements: false,
	require: ["ts-node/register"],
	babel: {
		extensions: ["ts", "tsx"]
	},
	files: ["test/**/*.ts", "test/**/*.tsx"]
};
