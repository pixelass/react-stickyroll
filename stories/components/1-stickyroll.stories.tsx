import React from "react";
import {Page, Pagers, renderDemo} from "../shared";
import {Stickyroll} from "../../packages/stickyroll/src";

export default {
	component: Stickyroll,
	title: "Components/Stickyroll"
};

export const Default = () => (
	<Page>
		<Stickyroll pages={3} render={renderDemo} />
	</Page>
);

export const Factor = () => (
	<Page>
		<Stickyroll pages={3} factor={5} render={renderDemo} />
	</Page>
);

export const Throttle = () => (
	<Page>
		<Stickyroll pages={3} throttle={250} render={renderDemo} />
	</Page>
);

export const Mixed = () => (
	<Page>
		<Stickyroll pages={3} anchors="mixed" smooth>
			<Pagers pagerId={"mixed:pagers"} />
		</Stickyroll>
	</Page>
);
