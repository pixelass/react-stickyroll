import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import pkg from "./package.json" assert { type: "json" };
import { swc } from "rollup-plugin-swc3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function glob(pattern) {
	try {
		const files = await readdir(path.resolve(__dirname, pattern), { withFileTypes: true });
		return (
			await Promise.all(
				files.flatMap(async dirent => {
					if (dirent.isDirectory() && dirent.name !== "__tests__") {
						return await glob(path.join(pattern, dirent.name));
					} else if (dirent.isFile() && !dirent.name.includes(".test.")) {
						return path.join(pattern, dirent.name);
					}
					return [];
				})
			)
		).flat();
	} catch (err) {
		return [];
	}
}

const allFiles = await glob("src");

const config = allFiles.map(filename => {
	const file = filename.substring(4);
	const [filePath] = file.split(".");
	return {
		external: [
			...Object.keys({
				...(pkg.dependencies ?? {}),
				...(pkg.optionalDependencies ?? {}),
				...(pkg.peerDependencies ?? {}),
			}),
		],
		input: filename,
		output: [
			{
				file: `dist/${filePath}.js`,
				sourcemap: true,
				format: "cjs",
			},
			{
				file: `dist/${filePath}.mjs`,
				sourcemap: true,
				format: "es",
			},
		],
		plugins: [
			swc({
				sourceMaps: true,
				jsc: {
					transform: {
						react: {
							runtime: "automatic",
						},
					},
				},
			}),
		],
	};
});

export default config;
