import {ScrollProvider, ScrollConsumer, DEFAULT_CONTEXT} from "../src";
import {mount, initDOM} from "@stickyroll/testing-utils";
import test from "ava";
import React from "react";

const Wrapper = ({context, children}) => {
	return (
		<ScrollProvider value={context}>
			<ScrollConsumer>{children}</ScrollConsumer>
		</ScrollProvider>
	);
};

initDOM();

test("Context returns the correct default values", t => {
	const context = DEFAULT_CONTEXT;
	const report = `<pre>{"page":1,"pageIndex":0,"pages":1,"progress":0}</pre>`;
	const wrapper = mount(
		<Wrapper context={context}>{context => <pre>{JSON.stringify(context)}</pre>}</Wrapper>
	);
	const inner = wrapper.find("pre").html();
	t.is(report, inner);
});

test("Context returns the correct progression values", t => {
	const context = {
		anchors: "!/foo",
		page: 3,
		pageIndex: 2,
		pages: 5,
		progress: 0.98823
	};
	const report = `<pre>{"anchors":"!/foo","page":3,"pageIndex":2,"pages":5,"progress":0.98823}</pre>`;
	const wrapper = mount(
		<Wrapper context={context}>{context => <pre>{JSON.stringify(context)}</pre>}</Wrapper>
	);
	const inner = wrapper.find("pre").html();
	t.is(report, inner);
});
