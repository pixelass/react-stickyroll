import {Frame as StickyFrame, vendoredSticky} from "@stickyroll/frame";
import {mount, initDOM} from "@stickyroll/testing-utils";
import test from "ava";
import React from "react";
import {renderToString} from "react-dom/server";

initDOM();

const DEFAULT_OPTIONS = {
	anchors: "",
	className: "",
	content: "",
	height: 200
};

const createMarkup = ({
	anchors = DEFAULT_OPTIONS.anchors,
	className = DEFAULT_OPTIONS.className,
	content = DEFAULT_OPTIONS.content,
	height = DEFAULT_OPTIONS.height
} = DEFAULT_OPTIONS) =>
	`<div${
		className !== "" ? ` class="${className}"` : ""
	} style="height:${height}vh;margin:0;position:relative">${anchors}<div style="height:100vh;position:${vendoredSticky()};top:0;width:100%">${content}</div></div>`;

const createAnchors = (prefix = "!/examples", pages = 1) =>
	`<div style="bottom:0;left:0;position:absolute;right:0;top:0">${Array(pages + 1)
		.fill(Boolean)
		.map((x, i) => `<span id="${prefix}/${i + 1}" style="display:block;height:100vh"></span>`)
		.join("")}<span id="${prefix}/skip" style="position:absolute;top:100%"></span></div>`;

test("Renders the correct markup ", t => {
	const expected = createMarkup();
	const actual = renderToString(<StickyFrame pages={1} render={() => null} />);
	t.is(expected, actual);
});

test("Renders the correct height (2 pages)", t => {
	const expected = createMarkup({height: 300});
	const actual = renderToString(<StickyFrame pages={2} render={() => null} />);
	t.is(expected, actual);
});

test("Renders the correct height (10 pages)", t => {
	const expected = createMarkup({height: 1100});
	const actual = renderToString(<StickyFrame pages={10} render={() => null} />);
	t.is(expected, actual);
});

test("Allow adding anchor targets", t => {
	const actual = renderToString(
		<StickyFrame pages={1} render={() => null} anchors="!/examples" />
	);
	const expected = createMarkup({anchors: createAnchors()});
	t.is(expected, actual);
});

test("Allow defining anchor prefix", t => {
	const actual = renderToString(<StickyFrame pages={1} render={() => null} anchors="!/foobar" />);
	const expected = createMarkup({anchors: createAnchors("!/foobar")});
	t.is(expected, actual);
});

test("Render the correct amount of anchors", t => {
	const actual = renderToString(
		<StickyFrame pages={3} render={() => null} anchors="!/examples" />
	);
	const expected = createMarkup({height: 400, anchors: createAnchors("!/examples", 3)});
	t.is(expected, actual);
});

test("Renders children when passed in", t => {
	const wrapper = mount(
		<StickyFrame className="🌈" pages={1} render={() => <div className="unique" />} />
	);
	t.true(wrapper.contains(<div className="unique" />));
});

test("Allows adding classNames", t => {
	const wrapper = mount(<StickyFrame className="🌈" pages={1} render={() => null} />);
	t.true(wrapper.hasClass("🌈"));
});
