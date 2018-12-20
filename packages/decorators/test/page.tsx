import Page from "./page-component";
import {initDOM, mount} from "@stickyroll/testing-utils";
import test from "ava";
import React from "react";
import {DEFAULT_CONTEXT} from "@stickyroll/context";
import {Wrapper} from "./wrapper-component";

initDOM();

test("page decorates correctly", t => {
	const wrapper = mount(
		<Wrapper context={{...DEFAULT_CONTEXT, page: 2, pageIndex: 1, pages: 5}}>
			{() => <Page />}
		</Wrapper>
	);
	const expected = "2:1:5";
	const actual = wrapper.text();
	t.is(actual, expected);
});

test("page only works with context", t => {
	const wrapper = mount(<div>{() => <Page />}test</div>);
	const expected = "test";
	const actual = wrapper.text();
	t.is(actual, expected);
});
