import {circInOut} from "@popmotion/easing";
import {Stickyroll} from "@stickyroll/stickyroll";
import {Inner, Content} from "@stickyroll/inner";
import {Pagers, Skip} from "@stickyroll/pagers";
import React from "react";
import styled, {StyledComponent, ThemeProvider} from "styled-components";
import {Column, Copy, Dd, Dl, Dt, Headline, Link, Row} from "./elements";
import {progressable} from "./progressable";
// @ts-ignore
import slideshow_0 from "./images/slideshow_0.jpg";
// @ts-ignore
import slideshow_1 from "./images/slideshow_1.jpg";
// @ts-ignore
import slideshow_2 from "./images/slideshow_2.jpg";
// @ts-ignore
import slideshow_3 from "./images/slideshow_3.jpg";
// @ts-ignore
import slideshow_4 from "./images/slideshow_4.jpg";
// @ts-ignore
import slideshow_5 from "./images/slideshow_5.jpg";
import {TRenderer} from "@stickyroll/frame";
import {blue, deepOrange, green, light, orange, pink, red, yellow} from "@stickyroll/themes";

const DebugBox: StyledComponent<any, any> = styled.p`
	height: 1rem;
	width: calc(100% * var(--progress));
	margin: 0.5rem 0;
	background: white;
	box-shadow: inset 0 0 0 2px black;
`;

const Debugger = (props: any) => (
	<React.Fragment>
		<Dl>
			<Dt>Anchors:</Dt> <Dd>{props.anchors || "none"}</Dd>
			<Dt>Throttle:</Dt> <Dd>{props.throttle || "none"}</Dd>
			<Dt>Factor:</Dt> <Dd>{props.factor || 1}</Dd>
			<Dt>Page:</Dt>{" "}
			<Dd>
				{props.page + 1} of {props.pages}
			</Dd>
			<Dt>Progress:</Dt> <Dd>{props.progress.toFixed(6)}</Dd>
			<Dt>Timeline:</Dt> <Dd>{(props.page + props.progress).toFixed(6)}</Dd>
		</Dl>
		<div>
			{Array(props.pages)
				.fill(Boolean)
				.map((x, i) =>
					progressable(
						<DebugBox key={i} />,
						i > props.page ? 0 : i < props.page ? 1 : props.progress
					)
				)}
		</div>
	</React.Fragment>
);

const renderDefault: TRenderer = props => (
	<ThemeProvider theme={green}>
		<Inner>
			<Content>
				<Headline>Example with default settings</Headline>
				<Debugger {...props} />
			</Content>
		</Inner>
	</ThemeProvider>
);

const renderEasing: TRenderer = props => (
	<ThemeProvider theme={yellow}>
		<Inner>
			<Content>
				<Headline>Example with easing</Headline>
				<Debugger {...props} progress={circInOut(props.progress)} />
				<Copy>
					Each element can use an easing function to change the dynamics.
					<br />
					To keep Overscroll simple easing is not part of the options but should instead be
					used where needed.
				</Copy>
			</Content>
		</Inner>
	</ThemeProvider>
);

const renderThrottled: TRenderer = props => (
	<ThemeProvider theme={orange}>
		<Inner>
			<Content>
				<Headline>Example with throttle</Headline>
				<Debugger {...props} throttle={500} />
			</Content>
		</Inner>
	</ThemeProvider>
);

const renderAnchors: TRenderer = props => (
	<ThemeProvider theme={deepOrange}>
		<Inner>
			<Content>
				<Headline>Example with anchors</Headline>
				<Debugger {...props} />
				<ul>
					{Array(props.pages)
						.fill(Boolean)
						.map((x, i) => (
							<li key={i}>
								<Link href={`#${props.anchors}/${i + 1}`}>Page {i + 1}</Link>
							</li>
						))}
					<li>
						<Link href={`#${props.anchors}/${props.pages + 1}`}>Jump to End</Link>
					</li>
				</ul>
			</Content>
		</Inner>
	</ThemeProvider>
);

const renderPagers: TRenderer = props => (
	<ThemeProvider theme={{...red, pagerSize: "3rem", pagerGap: "2rem"}}>
		<Inner withPagers="right">
			<Pagers {...props} prefix={props.anchors} showLabels={true} position="right"/>
			<Content>
				<Headline>Example with pagers</Headline>
				<Debugger {...props} />
			</Content>
		</Inner>
	</ThemeProvider>
);

const renderFactor: TRenderer = props => (
	<ThemeProvider theme={pink}>
		<Inner withPagers="left">
			<Pagers {...props} prefix={props.anchors} position="left"/>
			<Content>
				<Headline>Example with factor</Headline>
				<Debugger {...props} factor={0.5} />
			</Content>
			<Skip prefix={props.anchors}/>
		</Inner>
	</ThemeProvider>
);
const slideshow = [slideshow_0, slideshow_1, slideshow_2, slideshow_3, slideshow_4, slideshow_5];

const StyledSlide = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	display: flex;
	align-items: center;
	align-content: center;
	justify-content: center;
	background-color: white;
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
`;

const Slide = ({backgroundImage, opacity, ...rest}: any) => (
	<StyledSlide {...rest} style={{backgroundImage: `url(${backgroundImage})`, opacity}} />
);

const renderSlideshow: TRenderer = props => (
	<ThemeProvider theme={{...light, pagerGap: "2vh"}}>
		<Inner withPagers="left">
			<Pagers {...props} prefix={props.anchors} position="left" />
			<Slide backgroundImage={slideshow[props.page]} opacity={1 - props.progress} />
			<Slide backgroundImage={slideshow[props.page + 1]} opacity={props.progress}>
				{props.page === props.pages - 1 ? <Headline>Fin!</Headline> : ""}
			</Slide>
		</Inner>
	</ThemeProvider>
);

export const Examples = () => (
	<React.Fragment>
		<Row>
			<Column>
				<Stickyroll pages={2} render={renderDefault} />
			</Column>
			<Column>
				<Stickyroll pages={2} render={renderEasing} />
			</Column>
		</Row>
		<Row>
			<Column>
				<Stickyroll pages={2} render={renderThrottled} throttle={500} />
			</Column>

			<Column>
				<Stickyroll pages={2} render={renderAnchors} anchors={"!/examples/anchors"} />
			</Column>
		</Row>
		<Row>
			<Column>
				<Stickyroll pages={2} render={renderPagers} anchors={"!/examples/pagers"} />
			</Column>
			<Column>
				<Stickyroll
					pages={4}
					factor={0.5}
					render={renderFactor}
					anchors={"examples/factor"}
				/>
			</Column>
		</Row>
		<Row>
			<Column>
				<Stickyroll
					pages={slideshow}
					render={renderSlideshow}
					anchors={"!/examples/slideshow"}
				/>
			</Column>
		</Row>
	</React.Fragment>
);
