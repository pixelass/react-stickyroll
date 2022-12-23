import type { CSSProperties, MutableRefObject, ReactNode } from "react";
import { forwardRef, useRef } from "react";

import { CLASS_NAMES, CSS_VARS, STYLE } from "./constants";
import type { UseStickyrollOptions } from "./types";
import useStickyroll from "./use-stickyroll";

function StickyrollBase(
	{
		pages,
		factor,
		onPage,
		onProgress,
		onStart,
		onEnd,
		children,
		className,
		style = {},
		...props
	}: UseStickyrollOptions & { className?: string; children?: ReactNode; style?: CSSProperties },
	ref: MutableRefObject<HTMLDivElement>
) {
	const innerRef = useRef<HTMLDivElement>(null);
	useStickyroll(ref ?? innerRef, {
		pages,
		factor,
		onPage,
		onProgress,
		onStart,
		onEnd,
	});
	return (
		<div
			ref={ref ?? innerRef}
			{...props}
			className={[CLASS_NAMES.root, className].filter(Boolean).join(" ")}
			style={{
				...style,
				minHeight: "var(--100vh, 100vh)",
				height: `var(${CSS_VARS.height}, var(--100vh, 100vh))`,
			}}
		>
			<div style={STYLE}>{children}</div>
		</div>
	);
}

const Stickyroll = forwardRef(StickyrollBase);

export default Stickyroll;
