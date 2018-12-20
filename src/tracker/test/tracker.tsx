import {Tracker} from "../src";
import {mount, initDOM} from "@stickyroll/testing-utils";
import test from "ava";
import React from "react";

initDOM();

test("Tracker allows changing the throttle value", t => {
	const wrapper = mount(<Tracker />);
	t.is(undefined, wrapper.props().throttle);
	wrapper.setProps({throttle: 300});
	t.is(300, wrapper.props().throttle);
	wrapper.setProps({onUpdate: () => {}});
	t.is(300, wrapper.props().throttle);
});

test("Tracker unmounts correctly", t => {
	const wrapper = mount(<Tracker throttle={100} />);
	t.notThrows(() => wrapper.unmount());
});
