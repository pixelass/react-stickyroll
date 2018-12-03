const env = require("dotenv");
const meow = require("meow");

const cli = meow();

env.config();

// const DEFAULT_BROWSERS = ["win_chrome", "win_firefox", "osx_chrome", "osx_firefox", "osx_safari", "ios_safari"];
const DEFAULT_BROWSERS = [
	"bs_chrome_win",
	"bs_firefox_win",
	"bs_chrome_osx",
	"bs_firefox_osx",
	"bs_safari_osx",
	"bs_edge"
];

module.exports = config => {
	if (!process.env.BROWSER_STACK_USERNAME || !process.env.BROWSER_STACK_ACCESS_KEY) {
		console.log(
			`BROWSER_STACK_USERNAME and BROWSER_STACK_ACCESS_KEY must be set for test --remote`
		);
		process.exit(1);
	}

	const indicated = [
		cli.flags.edge && "bs_edge",
		cli.flags.firefox && "bs_firefox_osx",
		cli.flags.firefox && cli.flags.win && "bs_firefox_win",
		cli.flags.chrome && cli.flags.win && "bs_chrome_win",
		cli.flags.safari && cli.flags.ios && "bs_safari_ios",
		cli.flags.safari && "bs_safari_osx",
		cli.flags.chrome && "bs_chrome_osx"
	].filter(Boolean);

	const browsers = indicated.length === 0 ? DEFAULT_BROWSERS : indicated;

	config.set({
		basePath: "",
		frameworks: ["jasmine", "viewport"],
		files: [{pattern: "test/**/*.tsx", watched: false}],
		exclude: [],
		preprocessors: {
			"test/**/*.tsx": ["webpack"]
		},
		reporters: ["dots", "BrowserStack"],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		singleRun: true,
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
			mode: "production",
			devtool: false,
			watch: false
		},
		browserStack: {
			username: process.env.BROWSER_STACK_USERNAME,
			accessKey: process.env.BROWSER_STACK_ACCESS_KEY
		},
		customLaunchers: {
			bs_chrome_win: {
				base: "BrowserStack",
				browser: "chrome",
				browser_version: "68.0",
				os: "Windows",
				os_version: "10"
			},
			bs_firefox_win: {
				base: "BrowserStack",
				browser: "firefox",
				browser_version: "61.0",
				os: "Windows",
				os_version: "10"
			},
			bs_edge: {
				base: "BrowserStack",
				browser: "edge",
				browser_version: "17",
				os: "Windows",
				os_version: "10"
			},
			bs_chrome_osx: {
				base: "BrowserStack",
				browser: "chrome",
				browser_version: "68.0",
				os: "OS X",
				os_version: "Sierra"
			},
			bs_firefox_osx: {
				base: "BrowserStack",
				browser: "firefox",
				browser_version: "61.0",
				os: "OS X",
				os_version: "Sierra"
			},
			bs_safari_osx: {
				base: "BrowserStack",
				browser: "safari",
				browser_version: "11.1",
				os: "OS X",
				os_version: "High Sierra"
			}
			// bs_safari_ios: {
			// 	realMobile: true,
			// 	base: "BrowserStack",
			// 	device: "iPhone 8",
			// 	os: "ios",
			// 	os_version: "11.0"
			// }
		},
		browsers
	});
};
