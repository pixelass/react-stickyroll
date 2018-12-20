import test from "ava";
import {assert, classNames} from "../src";

test("classNames joins classes", t => {
	const expected = "1 2 3";
	const actual = classNames(1, 2, 3);
	t.is(expected, actual);
});

test("classNames ignores false", t => {
	const expected = "1 2";
	const actual = classNames(1, 2, null);
	t.is(expected, actual);
});

test("classNames ignores null", t => {
	const expected = "1 2";
	const actual = classNames(1, 2, false);
	t.is(expected, actual);
});

test("classNames ignores 0", t => {
	const expected = "1 2";
	const actual = classNames(0, 1, 2);
	t.is(expected, actual);
});

test("classNames ignores empty strings", t => {
	const expected = "1 2";
	const actual = classNames(1, 2, "");
	t.is(expected, actual);
});

test("classNames passes all options", t => {
	const expected = "1 2 4 5 7 8 10 11";
	const actual = classNames(0, 1, 2, null, 4, 5, false, 7, 8, "", 10, 11 );
	t.is(expected, actual);
});

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

