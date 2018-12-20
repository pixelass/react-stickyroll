import Progress from "./progress-component";
import {initDOM, mount} from "@stickyroll/testing-utils";
import test from "ava";
import React from "react";
import {DEFAULT_CONTEXT} from "@stickyroll/context";
import {Wrapper} from "./wrapper-component";

initDOM();

test("progress decorates correctly", t => {
	const wrapper = mount(
		<Wrapper context={{...DEFAULT_CONTEXT, progress: 0.123456789}}>
			{() => <Progress />}
		</Wrapper>
	);
	const expected = "0.123456789";
	const actual = wrapper.text();
	t.is(actual, expected);
});

test("progress only works with context", t => {
	const wrapper = mount(<div>{() => <Progress />}test</div>);
	const expected = "test";
	const actual = wrapper.text();
	t.is(actual, expected);
});
