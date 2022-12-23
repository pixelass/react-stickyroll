import coverage from "@cypress/code-coverage/task";
import useBabel from "@cypress/code-coverage/use-babelrc";
import { defineConfig } from "cypress";

export default defineConfig({
	component: {
		specPattern: "src/__tests__/{**/*,*}.cy.{ts,tsx}",
		supportFile: "cypress/support/components.ts",
		devServer: {
			framework: "next",
			bundler: "webpack",
		},
		async setupNodeEvents(on, config) {
			coverage(on, config);
			on("file:preprocessor", useBabel);
			return config;
		},
	},
});
