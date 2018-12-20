import test from "ava";
import {assert} from "../src";

test("assert checks strings", t => {
	t.throws(() => assert(1, "string"));
	t.throws(() => assert(null, "string"));
	t.throws(() => assert(false, "string"));
	t.throws(() => assert(undefined, "string"));
	t.throws(() => assert({}, "string"));
	t.throws(() => assert([], "string"));
	t.notThrows(() => assert("", "string"));
});

test("assert checks numbers", t => {
	t.throws(() => assert("", "number"));
	t.throws(() => assert(null, "number"));
	t.throws(() => assert(false, "number"));
	t.throws(() => assert(undefined, "number"));
	t.throws(() => assert({}, "number"));
	t.throws(() => assert([], "number"));
	t.notThrows(() => assert(0, "number"));
});

test("assert checks objects", t => {
	t.throws(() => assert("", "object"));
	t.throws(() => assert(1, "object"));
	t.throws(() => assert(false, "object"));
	t.throws(() => assert(undefined, "object"));
	t.throws(() => assert(null, "object"));
	t.throws(() => assert([], "object"));
	t.notThrows(() => assert({}, "object"));
});

test("assert checks arrays", t => {
	t.throws(() => assert("", "array"));
	t.throws(() => assert(1, "array"));
	t.throws(() => assert(false, "array"));
	t.throws(() => assert(undefined, "array"));
	t.throws(() => assert(null, "array"));
	t.throws(() => assert({}, "array"));
	t.notThrows(() => assert([], "array"));
});

test("assert checks null", t => {
	t.throws(() => assert("", "null"));
	t.throws(() => assert(1, "null"));
	t.throws(() => assert(false, "null"));
	t.throws(() => assert(undefined, "null"));
	t.throws(() => assert([], "null"));
	t.throws(() => assert({}, "null"));
	t.notThrows(() => assert(null, "null"));
});

test("assert checks undefined", t => {
	t.throws(() => assert("", "undefined"));
	t.throws(() => assert(1, "undefined"));
	t.throws(() => assert(false, "undefined"));
	t.throws(() => assert(null, "undefined"));
	t.throws(() => assert([], "undefined"));
	t.throws(() => assert({}, "undefined"));
	t.notThrows(() => assert(undefined, "undefined"));
});
