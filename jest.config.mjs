import { defaults } from "jest-config";

const jestConfig = {
	...defaults,
	testMatch: ["**/?(*.)test.ts?(x)"],
	transform: {
		"^.+\\.(t|j)sx?$": [
			"@swc/jest",
			{
				jsc: {
					transform: {
						react: {
							runtime: "automatic",
						},
					},
				},
			},
		],
	},
	collectCoverage: true,
	coverageDirectory: "./coverage",
	coverageProvider: "v8",
	coverageReporters: ["lcov"],
	testEnvironment: "jsdom",
	transformIgnorePatterns: ["/node_modules/(?!(nanoid)/)"],
	extensionsToTreatAsEsm: [".ts", ".tsx"],
};

export default jestConfig;
