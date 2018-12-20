import { Frame as StickyFrame, CORE_STYLE, CORE_STYLETAG } from "../src";
import {mount, initDOM} from "@stickyroll/testing-utils";
import test from "ava";
import React from "react";
import {renderToString} from "react-dom/server";
import {version} from "../package.json";
import {createAnchors, createMarkup} from "./base";

initDOM();

test("Expects a callback", t => {
	t.throws(() => renderToString(<StickyFrame pages={1}/>));
	t.notThrows(() => renderToString(<StickyFrame pages={1} render={() => null}/>));
	t.notThrows(() => renderToString(<StickyFrame pages={1}>{() => null}</StickyFrame>));
});

test("Has a static method to get the styles", t => {
	const expected = CORE_STYLE;
	const actual = StickyFrame.getStyle();
	t.is(expected, actual);
});

test("Has a static method to get the style tag (SSR)", t => {
	const expected = CORE_STYLETAG;
	const actual = StickyFrame.getStyleTag();
	t.is(expected, actual);
});

test("styles are scoped by version", t => {
	const pass = StickyFrame.getStyleTag().match(`data-stickyroll-version="${version}"`);
	t.truthy(pass);
});

test("Allows pages as number", t => {
	t.notThrows(() => renderToString(<StickyFrame pages={1} render={() => null} />));
});

test("Allows pages as array", t => {
	t.notThrows(() => renderToString(<StickyFrame pages={[1]} render={() => null} />));
});

test("Renders the correct markup", t => {
	const expected = createMarkup();
	const actual = renderToString(<StickyFrame pages={1} render={() => null} />);
	t.is(expected, actual);
});

test("Renders the correct height (2 pages)", t => {
	const pages = 2;
	const expected = createMarkup({pages});
	const actual = renderToString(<StickyFrame pages={pages} render={() => null} />);
	t.is(expected, actual);
});

test("Renders the correct height (10 pages)", t => {
	const pages = 10;
	const expected = createMarkup({pages});
	const actual = renderToString(<StickyFrame pages={pages} render={() => null} />);
	t.is(expected, actual);
});

test("Allow adding anchor targets", t => {
	const actual = renderToString(<StickyFrame pages={1} render={() => null} anchors="" />);
	const expected = createMarkup({anchors: createAnchors()});
	t.is(expected, actual);
});

test('Allow defining anchor prefix with ""', t => {
	const anchors = "";
	const actual = renderToString(<StickyFrame pages={1} render={() => null} anchors={anchors} />);
	const expected = createMarkup({anchors: createAnchors(anchors)});
	t.is(expected, actual);
});

test('Allow defining anchor prefix with "example"', t => {
	const anchors = "example";
	const actual = renderToString(<StickyFrame pages={1} render={() => null} anchors={anchors} />);
	const expected = createMarkup({anchors: createAnchors(anchors)});
	t.is(expected, actual);
});

test('Allow defining anchor prefix with "!"', t => {
	const anchors = "!";
	const actual = renderToString(<StickyFrame pages={1} render={() => null} anchors={anchors} />);
	const expected = createMarkup({anchors: createAnchors(anchors)});
	t.is(expected, actual);
});

test('Allow defining anchor prefix with "!/example"', t => {
	const anchors = "!/example";
	const actual = renderToString(<StickyFrame pages={1} render={() => null} anchors={anchors} />);
	const expected = createMarkup({anchors: createAnchors(anchors)});
	t.is(expected, actual);
});

test("Render the correct amount of anchors", t => {
	const pages = 3;
	const anchors = "!/example";
	const expected = createMarkup({pages, anchors: createAnchors(anchors, pages)});
	const actual = renderToString(
		<StickyFrame pages={pages} render={() => null} anchors={anchors} />
	);
	t.is(expected, actual);
});

test("Render the factor correctly", t => {
	const pages = 10;
	const expected = createMarkup({pages});
	const actual = renderToString(<StickyFrame pages={pages} render={() => null} />);
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
