import {easeIn, easeInOut, easeOut} from "@popmotion/easing";
import {Inner} from "@stickyroll/inner";
import {Pagers, Skip} from "@stickyroll/pagers";
import {Stickyroll} from "@stickyroll/stickyroll";
import React, {CSSProperties} from "react";
import {ThemeProvider} from "styled-components";
import {dark, deepOrange, teal} from "@stickyroll/themes";
import {progressable} from "./progressable";
import Pagenumber from "./pagenumber";
import {Button, Copy, Figcaption, Figure, Headline, StyledContent, Svg} from "./elements";

export interface ICSSProgress extends CSSProperties {
	"--progress"?: number;
	"--progress-2"?: number;
}
const switchProgress = (targetPage: number, page: number, progress: number): number =>
	page < targetPage ? 0 : page > targetPage ? 1 : progress;

const switchStyle = (
	name: string,
	targetPage: number,
	page: number,
	progress: number
): ICSSProgress => ({
	[name]: switchProgress(targetPage, page, progress)
});

const Group = (props: any) => <g {...props} />;

const ProgressDevices = (props: any) => (
	<Svg viewBox="0 0 897 452">
		<g fill="none" fillRule="evenodd" stroke="#444">
			<Group
				transform="translate(681 55)"
				style={{
					...switchStyle("--progress", 2, props.pageIndex, easeIn(props.progress)),
					...switchStyle("--progress-2", 3, props.pageIndex, easeOut(props.progress))
				}}>
				<path
					fill={`hsla(0, 0%, 10%, calc(var(--progress-2) * 1))`}
					strokeWidth="2"
					d="M202.986 317H12.097C5.462 317 .083 311.623.083 304.99V12.093C.083 5.46 5.461.083 12.097.083h190.889C209.622.083 215 5.46 215 12.093V304.99c0 6.633-5.378 12.01-12.014 12.01z"
					strokeDasharray="1043.0570068359375 1043.0570068359375"
					strokeDashoffset="calc(1043.0570068359375 + var(--progress) * 1043.0570068359375)"
				/>
				<path
					fill={`hsla(200, 10%, 15%, calc(var(--progress-2) * 1))`}
					d="M17 32h181.999v252.917H17z"
					strokeDasharray="869.8319702148438 869.8319702148438"
					strokeDashoffset="calc(869.8319702148438 + var(--progress) * 869.8319702148438)"
				/>
				<circle
					cx="108.021"
					cy="300.021"
					r="8.021"
					fill={`hsla(0, 0%, 10%, calc(var(--progress-2) * 1))`}
					strokeDasharray="50.072696685791016 50.072696685791016"
					strokeDashoffset="calc(50.072696685791016 + var(--progress) * 50.072696685791016)"
				/>
				<circle
					cx="106.99"
					cy="16.99"
					r="2.99"
					fill={`hsla(0, 0%, 15%, calc(var(--progress-2) * 1))`}
					strokeDasharray="18.307579040527344 18.307579040527344"
					strokeDashoffset="calc(18.307579040527344 + var(--progress) * 18.307579040527344)"
				/>
			</Group>
			<Group
				transform="translate(1 1)"
				style={{
					...switchStyle("--progress", 3, props.pageIndex, easeIn(props.progress)),
					...switchStyle("--progress-2", 4, props.pageIndex, easeOut(props.progress))
				}}>
				<path
					fill={`hsla(0, 0%, 10%, calc(var(--progress-2) * 1))`}
					strokeWidth="2"
					d="M594 0H98C84.504 0 73 11.074 73 24.79v326.238h546V24.79C619 11.073 607.537 0 594 0z"
					strokeDasharray="1772.58349609375 1772.58349609375"
					strokeDashoffset="calc(1772.58349609375 + var(--progress) * 1772.58349609375)"
				/>
				<circle
					cx="347"
					cy="19"
					r="4"
					fill={`hsla(0, 0%, 15%, calc(var(--progress-2) * 1))`}
					strokeWidth="2"
					strokeDasharray="24.491750717163086 24.491750717163086"
					strokeDashoffset="calc(24.491750717163086 + var(--progress) * 24.491750717163086)"
				/>
				<path
					fill={`hsla(0, 0%, 80%, calc(var(--progress-2) * 1))`}
					strokeWidth="2"
					d="M640.812 382.01H51.288C20.641 382.01 0 371.494 0 367.022v-13.594C0 352.084 1.335 351 2.995 351h686.109c1.662 0 2.999 1.084 2.999 2.428v14.129c-.007 3.535-15.991 14.453-51.291 14.453z"
					strokeDasharray="1422.086181640625 1422.086181640625"
					strokeDashoffset="calc(1422.086181640625 + var(--progress) * 1422.086181640625)"
				/>
				<path
					strokeLinecap="square"
					d="M.5 365.5h689.743"
					strokeDasharray="689.7429809570312 689.7429809570312"
					strokeDashoffset="calc(689.7429809570312 + var(--progress) * 689.7429809570312)"
				/>
				<path
					fill={`hsla(200, 10%, 15%, calc(var(--progress-2) * 1))`}
					d="M95 39h501.074v292.009H95z"
					strokeDasharray="1586.166015625 1586.166015625"
					strokeDashoffset="calc(1586.166015625 + var(--progress) * 1586.166015625)"
				/>
				<path
					fill={`hsla(0, 0%, 60%, calc(var(--progress-2) * 1))`}
					d="M421 352v3.087c0 2.201-4.333 2.866-7.613 2.866H278.815c-3.45 0-7.815-.664-7.815-2.866V352"
					strokeDasharray="158.46690368652344 158.46690368652344"
					strokeDashoffset="calc(158.46690368652344 + var(--progress) * 158.46690368652344)"
				/>
			</Group>
			<Group
				transform="translate(576 177)"
				style={{
					...switchStyle("--progress", 0, props.pageIndex, easeIn(props.progress)),
					...switchStyle("--progress-2", 1, props.pageIndex, easeOut(props.progress))
				}}>
				<path
					fill={`hsla(0, 0%, 10%, calc(var(--progress-2) * 1))`}
					strokeWidth="2"
					d="M130 257.964c0 8.833-7.191 15.992-16.062 15.992H16.063c-8.871 0-16.062-7.159-16.062-15.992V16.073C.001 7.24 7.192.081 16.063.081h97.875C122.809.081 130 7.24 130 16.073v241.891z"
					strokeDasharray="780.2479248046875 780.2479248046875"
					strokeDashoffset="calc(780.2479248046875 + var(--progress) * 780.2479248046875)"
				/>
				<path
					fill={`hsla(200, 10%, 15%, calc(var(--progress-2) * 1))`}
					d="M9 36h111.93v199.084H9z"
					strokeDasharray="622.0280151367188 622.0280151367188"
					strokeDashoffset="calc(622.0280151367188 + var(--progress) * 622.0280151367188)"
				/>
				<path
					fill={`hsla(0, 0%, 0%, calc(var(--progress-2) * 1))`}
					d="M77 25.746c0 .635-.439 1.147-.98 1.147H55.918c-.542 0-.98-.513-.98-1.147v-2.58c0-.635.439-1.147.98-1.147H76.02c.541 0 .98.513.98 1.147v2.58z"
					strokeDasharray="52.05827331542969 52.05827331542969"
					strokeDashoffset="calc(52.05827331542969 + var(--progress) * 52.05827331542969)"
				/>
				<circle
					cx="66"
					cy="12"
					r="3"
					fill={`hsla(0, 0%, 15%, calc(var(--progress-2) * 1))`}
					strokeDasharray="18.36880111694336 18.36880111694336"
					strokeDashoffset="calc(18.36880111694336 + var(--progress) * 18.36880111694336)"
				/>
				<ellipse
					cx="65.04"
					cy="254.001"
					fill={`hsla(0, 0%, 10%, calc(var(--progress-2) * 1))`}
					rx="10.04"
					ry="10.001"
					strokeDasharray="62.5550422668457 62.5550422668457"
					strokeDashoffset="calc(62.5550422668457 + var(--progress) * 62.5550422668457)"
				/>
			</Group>
		</g>
	</Svg>
);

export const Devices = (props: any) => {
	return (
		<Figure>
			<ProgressDevices progress={props.progress} pageIndex={props.pageIndex} />
			<Figcaption>
				{progressable(
					<Headline>Built for all screen sizes</Headline>,
					switchProgress(4, props.pageIndex, easeOut(props.progress))
				)}
				{progressable(
					<Copy>
						Stickyroll relies on the viewport and therefore ensures responsive behavior.
						<br />
						Add your own logic to define how to display the content on different screen
						sizes
						<ThemeProvider theme={props.buttonTheme}>
							<Button
								href={
									"https://stickyroll.github.io/react-stickyroll/doc/guide/getting-started/Readme.html?guides-enabled=true"
								}>
								Show me how
							</Button>
						</ThemeProvider>
					</Copy>,
					switchProgress(3, props.pageIndex, easeInOut(props.progress))
				)}
			</Figcaption>
		</Figure>
	);
};

const headlines = [
	"Stickyroll, it's time to scroll",
	"Mobile devices",
	"Tablets",
	"Desktops",
	"Built for all devices"
];

export const DeviceSupport = (props: any) => (
	<React.Fragment>
		<Stickyroll pages={5} anchors="!/device-support">
			{context => (
				<ThemeProvider theme={props.wrapperTheme}>
					<Inner withPagers="left">
						<ThemeProvider
							theme={props.pagerTheme}>
							<Pagers useContext={true} />
						</ThemeProvider>
						<StyledContent>
							{progressable(
								<Headline farLeft={context.pageIndex > 0}>
									{headlines[context.pageIndex]}
								</Headline>,
								1 - context.progress
							)}
							<Devices progress={context.progress} pageIndex={context.pageIndex} buttonTheme={props.buttonTheme} />
						</StyledContent>
						<Pagenumber />
						<Skip useContext={true} />
					</Inner>
				</ThemeProvider>
			)}
		</Stickyroll>
	</React.Fragment>
);
