import {Frame as StickyFrame} from "../src";
import {mount, initDOM} from "@stickyroll/testing-utils";
import test from "ava";
import React from "react";

initDOM({head: StickyFrame.getStyleTag()});

test("SSR support", t => {
	t.notThrows(() => mount(<StickyFrame pages={1} render={() => null} />));
});
