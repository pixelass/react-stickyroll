import {Frame as StickyFrame, CORE_STYLE, CORE_STYLETAG} from "../src";
import {mount, initDOM} from "@stickyroll/testing-utils";
import test from "ava";
import React from "react";
import {version} from "../package.json";

initDOM({
	head: StickyFrame.getStyleTag().replace(
		`data-stickyroll-version="${version}"`,
		`data-stickyroll-version="0.0.0"`
	)
});

test("SSR support versions", t => {
	t.notThrows(() => mount(<StickyFrame pages={1} render={() => null} />));
});
