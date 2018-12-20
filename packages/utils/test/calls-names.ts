import test from "ava";
import {classNames} from "../src";

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
	const actual = classNames(0, 1, 2, null, 4, 5, false, 7, 8, "", 10, 11);
	t.is(expected, actual);
});
