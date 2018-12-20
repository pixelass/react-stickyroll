export default {
	compileEnhancements: false,
	require: ["ts-node/register/transpile-only"],
	extensions: ["ts", "tsx"],
	files: ["test/**/*.ts", "test/**/*.tsx", "!test/**/*.d.ts", "!test/**/base.tsx"]
};
