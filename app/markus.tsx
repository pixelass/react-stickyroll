import {page, progress} from "@stickyroll/decorators";
import lottie from "lottie-web";
import styled, {keyframes} from "styled-components";
import React from "react";
import {Content} from "@stickyroll/inner";

const path =
	process.env.NODE_ENV === "production"
		? "./data/markus.json"
		: "https://labs.nearpod.com/bodymovin/demo/markus/isometric/markus2.json";

const Headline = styled.h3`
	margin: 0;
	text-align: center;
`;

const loading = keyframes`
	to {
		transform: rotate(1turn);
	}
`;

const Loading = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	height: 20rem;
	width: 20rem;
	margin: -10rem;
	display: flex;
	flex-direction: column;
`;

const Spinner = styled.div`
	height: 10rem;
	width: 10rem;
	margin: auto;
	border-radius: 50% 0;
	animation: ${loading} 1s ease-in-out infinite;
	border: 2px solid ${props => props.theme.borderColor};
`;

export interface MarkusProps {
	progress?: number;
	page?: number;
	pages: number;
}
export interface MarkusState {
	isLoaded?: boolean;
}

class Markus extends React.Component<MarkusProps, MarkusState> {
	state = {
		isLoaded: false
	};
	ref: React.RefObject<HTMLDivElement> = React.createRef();
	scene: any;
	componentDidUpdate(oldProps) {
		if (oldProps.progress !== this.props.progress || oldProps.page !== this.props.page) {
			this.update();
		}
	}
	update() {
		const progress = (this.props.page + this.props.progress) / (this.props.pages + 1);
		const {totalFrames, isLoaded} = this.scene;
		if (isLoaded) {
			this.scene.goToAndStop(
				Math.min(totalFrames - 1, Math.floor(progress * totalFrames)),
				true
			);
		}
	}
	componentDidMount() {
		this.scene = lottie.loadAnimation({
			animType: "svg",
			autoplay: false,
			loop: false,
			path,
			wrapper: this.ref.current
		});
		this.scene.addEventListener("DOMLoaded", this.handleLoad);
	}
	handleLoad = () => {
		this.setState({isLoaded: true}, () => {
			this.update();
		});
	};
	public render() {
		return (
			<React.Fragment>
				<Content ref={this.ref} />
				{!this.state.isLoaded && (
					<Loading>
						<Spinner />
						<Headline>Loading</Headline>
					</Loading>
				)}
			</React.Fragment>
		);
	}
}

export default page(progress(Markus));
