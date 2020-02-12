const React = require("react");
const ReactDOM = require("react-dom");

module.exports = mount;

function mount(input) {
	ReactDOM.hydrate(
		React.createElement(input.default),
		input.element
	);
}
