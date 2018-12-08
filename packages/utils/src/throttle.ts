

export type ICallbackFunction = (...any) => any;
export interface ICallbackOptions {
	leading?: boolean;
	trailing?: boolean
}
export type IThrottleFunction<T> = (
	callback: T,
	wait: number,
	options?: ICallbackOptions
) => T;

export const throttle: IThrottleFunction<ICallbackFunction> = (
	callback,
	wait,
	options = {}
	) => {
	let context, args, result;
	let timeout = null;
	let previous = 0;
	const later = function() {
		previous = options.leading === false ? 0 : Date.now();
		timeout = null;
		result = callback.apply(context, args);
		if (!timeout) {
			context = args = null
		};
	};
	return function() {
		const now = Date.now();
		if (!previous && options.leading === false) previous = now;
		const remaining = wait - (now - previous);
		context = this;
		args = arguments;
		if (remaining <= 0 || remaining > wait) {
			if (timeout) {
				clearTimeout(timeout);
				timeout = null;
			}
			previous = now;
			result = callback.apply(context, args);
			if (!timeout) context = args = null;
		} else if (!timeout && options.trailing !== false) {
			timeout = setTimeout(later, remaining);
		}
		return result;
	};
};
