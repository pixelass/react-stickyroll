import { css, Global } from "@emotion/react";
import styled from "@emotion/styled";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "@storybook/addons";
import type { ComponentMeta, ComponentStory } from "@storybook/react";
import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { forwardRef, useRef } from "react";

import type { UseStickyrollOptions } from "../src";
import { CLASS_NAMES, CSS_VARS } from "../src";
import StickyRoll from "../src/stickyroll";
import useStickyroll from "../src/use-stickyroll";

import { progressRef, Scene } from "./r3f";

const Flex = styled("div")({
	position: "relative",
	zIndex: 1,
	display: "flex",
	gap: 164,
});

const StyledChipBorder = styled("div")<{ variant: "pro" | "max" }>(({ variant }) => ({
	position: "relative",
	width: 330,
	height: 330,
	borderRadius: 2,
	backgroundImage:
		variant === "pro"
			? "linear-gradient(25deg, rgba(43,43,43,1) 0%, rgba(78,78,78,1) 25%, rgba(18,18,18,1) 39%, rgba(0,41,255,1) 52%, rgba(153,224,255,1) 60%, rgba(255,255,255,1) 65%, rgba(214,241,255,1) 66%, rgba(0,0,0,1) 67%, rgba(43,43,43,1) 75%, rgba(78,78,78,1) 100%)"
			: "linear-gradient(25deg, rgba(43,43,43,1) 0%, rgba(78,78,78,1) 25%, rgba(18,18,18,1) 39%, rgb(186 0 255) 52%, rgb(232 153 255) 60%, rgba(255,255,255,1) 65%, rgb(239 214 255) 66%, rgba(0,0,0,1) 67%, rgba(43,43,43,1) 75%, rgba(78,78,78,1) 100%)",

	backgroundSize: "800% 100%",
	backgroundPosition: "10% 100%",
	[`.${CLASS_NAMES.above} &`]: {
		transform: `translate3d(0, calc(var(${CSS_VARS.progress}) * -300%), 0)`,
	},
	[`.${CLASS_NAMES.page(0)} &, .${CLASS_NAMES.page(-1)} &`]: {
		backgroundPosition: "100% 100%",
	},
	[`.${CLASS_NAMES.page(1)} &`]: {
		backgroundPosition: `calc(10% + 90% - var(${CSS_VARS.progress}) * ${
			variant === "max" ? `var(${CSS_VARS.progress}) * var(${CSS_VARS.progress})` : 1
		} * 90%) 100%`,
	},
	"&::before": {
		content: "''",
		position: "absolute",
		inset: 0,
		zIndex: 1,
		backgroundImage:
			variant === "pro"
				? "linear-gradient(25deg, rgba(0,41,255,0) 40%, rgba(0,41,255,0.04) 50%, rgba(0,41,255,0) 60%)"
				: "linear-gradient(25deg, rgba(186, 0, 255,0) 40%, rgba(186, 0, 255,0.04) 50%, rgba(186, 0, 255,0) 60%)",

		backgroundSize: `800% 100%`,
		backgroundPosition: "0% 100%",
		[`.${CLASS_NAMES.page(0)} &, .${CLASS_NAMES.page(-1)} &`]: {
			backgroundPosition: "100% 100%",
		},
		[`.${CLASS_NAMES.page(1)} &`]: {
			backgroundPosition: `calc(100% - var(${CSS_VARS.progress}) * ${
				variant === "max" ? `var(${CSS_VARS.progress}) * var(${CSS_VARS.progress})` : 1
			} * 100%) 100%`,
		},
	},
}));

const StyledChipWrapper = styled("div")({
	position: "absolute",
	inset: 2,
	borderRadius: 2,
	backgroundImage: "linear-gradient(25deg, #131214, #141323 25%, #141323 75%, #313432)",
	boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.1)",
	color: "#fff",
});

const StyledChipInner = styled("div")({
	position: "absolute",
	inset: 0,
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
});

const Wrapper = styled("div")({
	position: "relative",
	minHeight: "inherit",
	fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
});

const WrapperInner = styled("div")({
	position: "relative",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "flex-start",
	textAlign: "center",
	maxWidth: 980,
	marginLeft: "auto",
	marginRight: "auto",
	paddingBottom: 200,
});

const Headline = styled("h1")({
	margin: "2em 0 1em",
	fontSize: 80,
	lineHeight: 1.05,
	fontWeight: 500,
	letterSpacing: "-0.015em",
	[`.${CLASS_NAMES.above} &`]: {
		opacity: `calc(0.5 + var(${CSS_VARS.progress}) * 2)`,
	},
});

const Title = styled("h2")({});
const Figure = styled("figure")({
	margin: 0,
	padding: 0,
});
const Figcaption = styled("figcaption")({});

const P = styled("p")({
	margin: 0,
	padding: 0,
	marginBottom: -5,
	paddingBottom: 5,
	backgroundClip: "text",
	WebkitTextFillColor: "transparent",
	textFillColor: "transparent",
	fontSize: 19,
	lineHeight: 1.2,
	fontWeight: 500,
	letterSpacing: "0.012em",
});

const PPro = styled(P)({
	backgroundImage:
		"linear-gradient(90deg, rgb(37, 47, 255) -40.43%, rgb(37, 106, 243) 9.57%, rgb(124, 192, 226) 59.57%, rgb(37, 106, 243) 109.57%, rgb(37, 47, 255) 159.57%)",
});

const PMax = styled(P)({
	backgroundImage:
		"linear-gradient(90deg, rgb(135, 39, 255) -40.43%, rgb(157, 68, 253) 9.57%, rgb(255, 159, 225) 59.57%, rgb(157, 68, 253) 109.57%, rgb(135, 39, 255) 159.57%)",
});

const Copy = styled("p")({
	maxWidth: "83.3%",
	fontSize: 28,
	lineHeight: 1.142,
	fontWeight: 500,
	letterSpacing: "0.007em",
	paddingTop: 10,
});

const Clip = styled("div")({
	all: "inherit",
	willChange: "clip-path",
	clipPath: "none",
	[`.${CLASS_NAMES.page(0)} &, .${CLASS_NAMES.page(-1)} &`]: {
		clipPath: `polygon(0 calc(100% - var(${CSS_VARS.progress}-0, var(${CSS_VARS.progress})) * 100%), 0 100%, 100% 100%, 100% calc(100% - var(${CSS_VARS.progress}-0, var(${CSS_VARS.progress})) * 100%))`,
	},
});

const Bg = styled("div")({
	position: "relative",
	minHeight: "inherit",
	backgroundColor: "#000",
	backgroundImage:
		"radial-gradient(closest-side, rgba(37, 47, 255, 0.3),  rgba(37, 47, 255, 0)), radial-gradient(closest-side, rgba(135, 39, 255, 0.3), rgb(135, 39, 255, 0))",
	backgroundSize: "900px",
	backgroundPosition: "calc(50% - 300px) 0, calc(50% + 300px) 0",
	backgroundRepeat: "no-repeat",
	color: "#fff",
});

const Logo = styled("div")<{ variant: "pro" | "max" }>(({ variant }) => ({
	fontSize: 98,
	fontWeight: 500,
	letterSpacing: "0.007em",
	backgroundClip: "text",
	WebkitTextFillColor: "transparent",
	textFillColor: "transparent",
	backgroundImage:
		variant === "pro"
			? "linear-gradient(25deg, rgba(226,226,226,1) 0%, rgba(255,255,255,1) 25%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 35%, rgba(0,41,255,1) 45%, rgba(153,224,255,1) 60%, rgba(255,255,255,1) 63%, rgba(89,197,255,1) 64%, rgba(0,0,0,1) 65%, rgba(208,208,208,1) 75%, rgba(255,255,255,1) 100%)"
			: "linear-gradient(25deg, rgba(226,226,226,1) 0%, rgba(255,255,255,1) 25%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 35%, rgb(171 0 255) 45%, rgb(207 153 255) 60%, rgba(255,255,255,1) 63%, rgb(189 89 255) 64%, rgba(0,0,0,1) 65%, rgba(208,208,208,1) 75%, rgba(255,255,255,1) 100%)",

	backgroundSize: `1200% 100%`,
	backgroundPosition: "0% 100%",
	[`.${CLASS_NAMES.page(0)} &, .${CLASS_NAMES.page(-1)} &`]: {
		backgroundPosition: "100% 100%",
	},
	[`.${CLASS_NAMES.page(1)} &`]: {
		backgroundPosition: `calc(100% - var(${CSS_VARS.progress}) * ${
			variant === "max" ? `var(${CSS_VARS.progress}) * var(${CSS_VARS.progress})` : 1
		} * 100%) 100%`,
	},
}));

const LogoSub = styled("div")({
	fontSize: 48,
	fontWeight: 500,
	letterSpacing: "0.007em",
	backgroundClip: "text",
	WebkitTextFillColor: "transparent",
	textFillColor: "transparent",
	backgroundSize: `800% 100%`,
	backgroundPosition: "0% 100%",
	[`.${CLASS_NAMES.page(0)} &, .${CLASS_NAMES.page(-1)} &`]: {
		backgroundPosition: "100% 100%",
	},
	[`.${CLASS_NAMES.page(1)} &`]: {
		backgroundPosition: `calc(100% - var(${CSS_VARS.progress}) * 100%) 100%`,
	},
});

const LogoSubPro = styled(LogoSub)({
	backgroundImage:
		"linear-gradient(25deg, rgba(37,47,255,1) 0%, rgba(37,106,243,1) 5%, rgba(124,192,226,1) 10%, rgba(37,106,243,1) 15%, rgba(37,47,255,1) 20%, rgba(20,19,35,1) 40%, rgba(20,19,35,1) 60%, rgba(37,47,255,1) 80%, rgba(37,106,243,1) 85%, rgba(124,192,226,1) 90%, rgba(37,106,243,1) 95%, rgba(37,47,255,1) 100%)",
});

const LogoSubMax = styled(LogoSub)({
	backgroundImage:
		"linear-gradient(25deg, rgb(135, 39, 255) 0%, rgb(157, 68, 253) 5%, rgb(255, 159, 225) 10%, rgb(157, 68, 253) 15%, rgb(135, 39, 255) 20%, rgba(20,19,35,1) 40%, rgba(20,19,35,1) 60%, rgb(135, 39, 255) 80%, rgb(157, 68, 253) 85%, rgb(255, 159, 225) 90%, rgb(157, 68, 253) 95%, rgb(135, 39, 255)  100%)",
	[`.${CLASS_NAMES.page(1)} &`]: {
		backgroundPosition: `calc(100% - var(${CSS_VARS.progress}) * var(${CSS_VARS.progress}) * var(${CSS_VARS.progress}) * 100%) 100%`,
	},
});

function Chip({
	children,
	variant,
	...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
	variant: "pro" | "max";
}) {
	return (
		<StyledChipBorder role="image" variant={variant} {...props}>
			<StyledChipWrapper>
				<StyledChipInner>
					<Logo variant={variant}>
						<small>M1</small>
					</Logo>
					{children}
				</StyledChipInner>
			</StyledChipWrapper>
		</StyledChipBorder>
	);
}

const StyledHeader = styled("header")<{ dark?: boolean }>({
	position: "sticky",
	zIndex: 2,
	top: 0,
	right: 0,
	left: 0,
	height: 66,
	borderBottom: "var(--border-bottom, 1px solid rgba(0, 0, 0, 0.16))",
	color: "var(--color, #000)",
});

const StyledHeaderText = styled("div")({
	position: "absolute",
	inset: 0,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	flexWrap: "wrap",
	padding: "0.5rem 3rem",
	fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
});

const StyledHeaderBg = styled("div")({
	position: "absolute",
	inset: 0,
	backdropFilter: "saturate(180%) blur(20px)",
	willChange: "background-color",
	transition: "background-color 0.2s ease-in-out",
	backgroundColor: 'var(--background-color, "rgba(255, 255, 255, 0.72)")',
});

const Header = forwardRef<
	HTMLDivElement,
	DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>((props, ref) => (
	<StyledHeader ref={ref} {...props}>
		<StyledHeaderBg />
		<StyledHeaderText>
			Not affiliated with Apple. This is just a demo to show how a similar effect can be
			achieved, with Stickyroll.
		</StyledHeaderText>
	</StyledHeader>
));

Header.displayName = "Header";

export default {
	title: "Examples",
	component: StickyRoll,
} as ComponentMeta<typeof StickyRoll>;

const AppleBase: ComponentStory<typeof StickyRoll> = ({ factor }) => {
	const clipRef = useRef<HTMLDivElement>(null);
	const headerRef = useRef<HTMLDivElement>(null);
	const innerRef = useRef<HTMLDivElement>(null);
	const [pages, setPages] = useState(2);
	useEffect(() => {
		function handleResize() {
			if (innerRef.current) {
				const { offsetHeight } = innerRef.current;
				const { innerHeight } = window;
				const diff = offsetHeight - innerHeight;
				const overscroll = diff / innerHeight / factor;
				setPages(2 + overscroll);
			}
		}
		handleResize();
		window.addEventListener("resize", handleResize, { passive: true });
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [factor]);

	return (
		<>
			<Global styles={css({ ".sb-show-main.sb-main-padded": { padding: 0 } })} />
			<Header ref={headerRef} />
			<div style={{ height: "100vh" }} />
			<StickyRoll
				ref={useRef<HTMLDivElement>(null)}
				pages={pages}
				factor={factor}
				onPage={page => {
					if (page === 1) {
						headerRef.current.style.setProperty(
							"--background-color",
							"rgba(255, 255, 255, 0.72)"
						);
						headerRef.current.style.setProperty(
							"--border-bottom",
							"1px solid rgba(0, 0, 0, 0.16)"
						);
						headerRef.current.style.setProperty("--color", "#000");
					} else {
						headerRef.current.style.setProperty(
							"--background-color",
							"rgba(29, 29, 31, 0.72)"
						);
						headerRef.current.style.setProperty(
							"--border-bottom",
							"1px solid rgba(255, 255, 255,0.24)"
						);
						headerRef.current.style.setProperty("--color", "#fff");
					}
				}}
			>
				<Wrapper>
					<WrapperInner style={{ position: "absolute", inset: 0 }} aria-hidden="true">
						<Headline as="div">Pro to the Max.</Headline>
						<Flex>
							<Figure>
								<Chip variant="pro">
									<LogoSubPro>Pro</LogoSubPro>
								</Chip>
							</Figure>
							<Figure>
								<Chip variant="max">
									<LogoSubMax>Max</LogoSubMax>
								</Chip>
							</Figure>
						</Flex>
					</WrapperInner>
					<Clip ref={clipRef}>
						<Bg>
							<WrapperInner ref={innerRef}>
								<Headline>Pro to the Max.</Headline>
								<Flex>
									<Figure>
										<Chip variant="pro">
											<LogoSubPro>Pro</LogoSubPro>
										</Chip>
										<Figcaption>
											<Title>Scary fast.</Title>
											<PPro>Up to 10-core CPU</PPro>
											<PPro>Up to 16-core GPU</PPro>
											<PPro>Up to 32GB of unified memory</PPro>
											<PPro>Up to 200GB/s memory bandwidth</PPro>
										</Figcaption>
									</Figure>
									<Figure>
										<Chip variant="max">
											<LogoSubMax>Max</LogoSubMax>
										</Chip>
										<Figcaption>
											<Title>Scary faster.</Title>
											<PMax>10-core CPU</PMax>
											<PMax>Up to 32-core GPU</PMax>
											<PMax>Up to 64GB of unified memory</PMax>
											<PMax>Up to 400GB/s memory bandwidth</PMax>
										</Figcaption>
									</Figure>
								</Flex>
								<Copy>
									M1&nbsp;Pro and M1&nbsp;Max scale the amazing M1 architecture to
									new heights — and for the first time, they bring a system on a
									chip (SoC) architecture to a pro notebook. Both have more CPU
									cores, more GPU cores, and more unified memory than M1. Along
									with a powerful Neural&nbsp;Engine for supercharged machine
									learning and upgraded media engines with ProRes support,
									M1&nbsp;Pro and M1&nbsp;Max allow pros to do things they never
									could before.
								</Copy>
							</WrapperInner>
						</Bg>
					</Clip>
				</Wrapper>
			</StickyRoll>
			<div style={{ height: "100vh", background: "#000" }} />
		</>
	);
};

export const Apple = AppleBase.bind({});

Apple.args = {
	factor: 3,
};

const R3fWrapper = styled("div")({
	minHeight: "var(--100vh, 100vh)",
	height: `var(${CSS_VARS.height}, var(--100vh, 100vh))`,
});

const R3fInner = styled("div")({
	position: "sticky",
	inset: 0,
	height: `var(--100vh, 100vh)`,
});

function R3FBase(args: UseStickyrollOptions) {
	const ref = useRef<HTMLDivElement>(null);
	useStickyroll(ref, {
		...args,
		onProgress(progress) {
			progressRef.current = progress;
		},
		pages: 1,
	});

	return (
		<>
			<Global styles={css({ ".sb-show-main.sb-main-padded": { padding: 0 } })} />
			<div style={{ height: "100vh" }} />
			<R3fWrapper ref={ref}>
				<R3fInner>
					<Canvas orthographic camera={{ far: 1000, near: -1000 }}>
						<Scene />
					</Canvas>
				</R3fInner>
			</R3fWrapper>
			<div style={{ height: "100vh" }} />
		</>
	);
}
export const R3F = R3FBase.bind({});

R3F.args = {
	factor: 3,
};
