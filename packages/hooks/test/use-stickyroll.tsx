import {useStickyroll} from "../src";
import {mount, initDOM} from "@stickyroll/testing-utils";
import test from "ava";
import React from "react";

const Wrapper = ({options}) => {
	const [wrapper, {height, ...context}] = useStickyroll(options);
	return (
		<div ref={wrapper} style={{height}}>
			<pre>{JSON.stringify(context)}</pre>
		</div>
	);
};

initDOM();

test("useStickyroll returns the correct data", t => {
	const expected = `<pre>{"currentPage":1,"pageCount":1,"pageIndex":0,"progress":0}</pre>`;
	const wrapper = mount(<Wrapper options={{pages: 1}} />);
	const actual = wrapper.find("pre").html();
	t.is(expected, actual);
});
