module.exports = {
	hooks: {
		"pre-push": "yarn test",
		"commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
	}
};
