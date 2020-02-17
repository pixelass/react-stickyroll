import {JSDOM, DOMWindow} from "jsdom";

declare global {
	namespace NodeJS {
		interface Global {
			document: Document;
			window: DOMWindow;
			navigator: Navigator | {userAgent: string};
			requestAnimationFrame: (callback: any) => number;
			cancelAnimationFrame: (id: any) => void;
			CSS: {supports: (property: string, value: string) => boolean};
		}
	}
}

interface DomOptions {
	head?: string;
}
export const initDOM = ({head = ""}: DomOptions = {}) => {
	const jsdom = new JSDOM(`<!doctype html><html><head>${head}</head></head><body></body></html>`);
	const {window} = jsdom;

	function copyProps(src, target) {
		Object.defineProperties(target, {
			...Object.getOwnPropertyDescriptors(src),
			...Object.getOwnPropertyDescriptors(target)
		});
	}

	global.window = window;
	global.document = window.document;
	global.navigator = {
		userAgent: "node.js"
	};
	global.requestAnimationFrame = function(callback) {
		return setTimeout(callback, 0);
	};
	global.cancelAnimationFrame = function(id) {
		clearTimeout(id);
	};
	global.CSS = {
		supports: function(property: string, value: string): boolean {
			// always supported
			return true;
		}
	};
	copyProps(window, global);
};
