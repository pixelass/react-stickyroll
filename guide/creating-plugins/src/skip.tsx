import { Listener } from "@stickyroll/stickyroll";
import { assert, scrollTo } from "@stickyroll/utils";
import React from "react";

export const SkipBase = props => {
	const glue = props.prefix === "" ? "" : "/";
	const handleClick = (e): void => {
		e.preventDefault();
		scrollTo(`${props.prefix}${glue}skip`, e.target as HTMLAnchorElement, {
			noFocus: true,
			noHash: true
		});
	};

	return (
		<a href={`#${props.prefix}${glue}skip`} onClick={handleClick}>
			Skip
		</a>
	);
};

const Skip = props => {
	if (props.useContext) {
		return <Listener>{context => <SkipBase prefix={context.anchors} />}</Listener>;
	}
	assert(props.prefix, "string");
	return <SkipBase prefix={props.prefix} />;
};

export default Skip;
