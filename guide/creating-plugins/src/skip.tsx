import { Listener } from "@stickyroll/stickyroll";
import { assert, scrollTo } from "@stickyroll/utils";
import React from "react";

export const SkipBase = props => {
	const handleClick = (e): void => {
		e.preventDefault();
		scrollTo(`${props.prefix}/skip`, e.target as HTMLAnchorElement, {
			noFocus: true,
			noHash: true
		});
	};

	return (
		<a href={`#${props.prefix}/skip`} onClick={handleClick}>
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
