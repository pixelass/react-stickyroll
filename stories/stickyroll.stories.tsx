import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { useRef } from "react";

import { CSS_VARS } from "../src";
import Stickyroll from "../src/stickyroll";

export default {
	title: "Stickyroll",
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
		<Stickyroll ref={useRef<HTMLDivElement>(null)} {...args}>
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
