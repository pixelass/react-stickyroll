const meow = require("meow");

const cli = meow();

module.exports = config => {
	if (cli.flags.remote) {
		return require("./karma.remote.js")(config);
	}

	if (cli.flags.local) {
		return require("./karma.local.js")(config);
	}

	if (!process.env.CI) {
		console.log("Specify test environment, either --local or --remote");
		process.exit(1);
	}

	if (process.env.TRAVIS_SECURE_ENV_VARS === "true") {
		return require("./karma.remote.js")(config);
	}

	return require("./karma.local.js")(config);
};
