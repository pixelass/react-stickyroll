import babel from "rollup-plugin-babel";
import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";

export default [
	{
		input: "src/index.ts",
		external: [
			...Object.keys(pkg.dependencies || {}),
			...Object.keys(pkg.devDependencies || {}),
			...Object.keys(pkg.peerDependencies || {})
		],
		output: [
			{
				file: `dist/${pkg.main}`,
				format: "cjs"
			},
			{
				file: pkg.module,
				format: "es"
			}
		],
		plugins: [
			babel(),
			typescript({
				tsconfig: "tsconfig.json",
				tsconfigOverride: {
					compilerOptions: {
						module: "es6"
					}
				}
			})
		]
	}
];
