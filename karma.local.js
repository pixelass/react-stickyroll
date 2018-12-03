const os = require("os");
const meow = require("meow");

const cli = meow();
const has = name => hasFlag(cli, name);

process.env.CHROME_BIN = require("puppeteer").executablePath();

module.exports = config => {
	const indicated = has("chrome") || has("safari") || has("firefox") || has("ie");

	const files = [{pattern: "test/**/*.tsx", watched: false}];

	config.set({
		basePath: "",
		frameworks: ["jasmine", "viewport"],
		files,
		preprocessors: {
			"test/**/*.tsx": ["webpack"]
		},
		reporters: ["dots"],
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		retryLimit: 3,
		singleRun: !cli.flags.watch,
		concurrency: 5,
		webpack: {
			module: {
				rules: [
					{
						test: /\.tsx?$/,
						loader: "babel-loader"
					}
				]
			},
			devtool: false,
			watch: false,
			mode: "production"
		},
		customLaunchers: {
			FirefoxHeadless: {
				base: "Firefox",
				flags: ["-headless"]
			}
		},
		browserDisconnectTimeout: 10000,
		browsers: [
			{
				name: "ChromeHeadless",
				test() {
					return process.env.HEADLESS !== "false" && (!indicated || cli.flags.chrome);
				}
			},
			{
				name: "Chrome",
				test() {
					return process.env.HEADLESS === "false" && (!indicated || cli.flags.chrome);
				}
			},
			{
				name: "FirefoxHeadless",
				test() {
					return process.env.HEADLESS !== "false" && (!indicated || cli.flags.firefox);
				}
			},
			{
				name: "Firefox",
				test() {
					return process.env.HEADLESS === "false" && (!indicated || cli.flags.firefox);
				}
			},
			{
				name: "Safari",
				test() {
					return (
						os.platform() === "darwin" &&
						process.env.HEADLESS === "false" &&
						(!indicated || cli.flags.safari)
					);
				}
			},
			{
				name: "IE",
				test() {
					return (
						os.platform() === "win32" &&
						process.env.HEADLESS === "false" &&
						(!indicated || cli.flags.ie)
					);
				}
			}
		]
			.filter(browser => browser.test())
			.map(browser => browser.name)
	});
};

function hasFlag(cli, name) {
	return Object.prototype.hasOwnProperty.call(cli.flags, name);
}
