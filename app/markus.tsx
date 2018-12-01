import {progress} from "@stickyroll/decorators";
import lottie from "lottie-web";
import styled from "styled-components";
import React from "react";
const {NODE_ENV} = process.env;

const path =
	NODE_ENV === "production"
		? "./data/markus.json"
		: "https://labs.nearpod.com/bodymovin/demo/markus/halloween/markus.json";

const Container = styled.section`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: black;
`;

class Markus extends React.Component<{progress?: number}, {}> {
	ref: React.RefObject<HTMLDivElement> = React.createRef();
	scene: any;
	shouldComponentUpdate() {
		return true;
	}
	componentDidUpdate(oldProps) {
		if (oldProps.progress !== this.props.progress) {
			const {totalFrames, isLoaded} = this.scene;
			if (isLoaded) {
				this.scene.goToAndStop(Math.round(this.props.progress * totalFrames), true);
			}
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
	}
	public render() {
		return <Container ref={this.ref} />;
	}
}

export default progress(Markus);
