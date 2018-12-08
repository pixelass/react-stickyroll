import React from "react";
import styled, {keyframes} from "styled-components";

const dLength = 222.42640686035156
const move = keyframes`
  from {
    stroke-dashoffset: 0;
  }

  to {
    stroke-dashoffset: ${dLength * -3};
  }
`;

const Path = styled.path`
	stroke-dasharray: ${dLength * 2}, ${dLength};
	animation: ${move} 3s cubic-bezier(0.7, 0.35, 0.91, 0.51) infinite;
	fill: none;
	stroke: currentColor;
`;

export const Logo = (props: any) => {
	return (
		<svg width={props.size} height={props.size} viewBox="0 0 100 100">
			<Path d="M55 15H15v20h70v20H55l30 30" strokeWidth={props.strokeWidth}/>
		</svg>
	);
};

Logo.defaultProps = {
	strokeWidth: 10
};
