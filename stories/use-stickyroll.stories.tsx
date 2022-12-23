import type { ComponentStory, ComponentMeta } from "@storybook/react";
import type { ReactNode } from "react";
import { useRef } from "react";

import { CLASS_NAMES, CSS_VARS, STYLE } from "../src";
import type { UseStickyrollOptions } from "../src";
import useStickyroll from "../src/use-stickyroll";

function Stickyroll({ children, ...args }: UseStickyrollOptions & { children?: ReactNode }) {
	const ref = useRef<HTMLDivElement>(null);
	useStickyroll(ref, args);
	return (
		<div
			ref={ref}
			className={CLASS_NAMES.root}
			style={{
				minHeight: "var(--100vh, 100vh)",
				height: `var(${CSS_VARS.height}, var(--100vh, 100vh))`,
			}}
		>
			<div style={STYLE}>{children}</div>
		</div>
	);
}

export default {
	title: "Use StickyRoll",
	component: Stickyroll,
	argTypes: {
		factor: { control: "number" },
		pages: { control: "number" },
		onStart: { action: "onStart" },
		onPage: { action: "onPage" },
		onProgress: { action: "onProgress" },
		onEnd: { action: "onEnd" },
	},
} as ComponentMeta<typeof Stickyroll>;

const Template: ComponentStory<typeof Stickyroll> = args => (
	<>
		<div style={{ height: "50vh" }} />
		<Stickyroll {...args}>
			<div
				style={{
					position: "absolute",
					inset: 1,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					transition: "background 500ms ease-in-out",
					background: `hsl(calc(var(${CSS_VARS.page}) * 30), 90%, 30%)`,
					color: "rgba(255 255 255 / 85%)",
				}}
			>
				<svg viewBox="0 0 100 100" style={{ height: "100%", margin: "auto" }}>
					<path
						fill="none"
						stroke="currentColor"
						strokeWidth="10"
						strokeLinecap="square"
						d="M55 15H15v20h70v20H55l30 30"
						style={{
							strokeDashoffset: `calc(-444.8528137207px * var(${CSS_VARS.progress}))`,
							strokeDasharray: "444.8528137207px, 222.42640686035156px",
						}}
					/>
				</svg>
			</div>
		</Stickyroll>
		<div style={{ height: "50vh" }} />
	</>
);

export const Default = Template.bind({});

Default.args = {
	pages: 4,
	factor: 4,
};
