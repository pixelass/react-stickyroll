import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import type { Group } from "three";

THREE.ColorManagement.legacyMode = false;

export const state = { current: { progress: 0, page: -1 } };
export const geometry = new THREE.ShapeGeometry(
	new THREE.Shape()
		.moveTo(-0.5, -1.5)
		.lineTo(0.5, -1.5)
		.lineTo(0.5, 1.5)
		.lineTo(-0.5, 0.5)
		.lineTo(-0.5, -1.5)
);
export const material = new THREE.MeshStandardMaterial({
	color: new THREE.Color(`hsl(260 , 100%, 50%)`),
	side: THREE.DoubleSide,
	wireframe: false,
});

export function Scene() {
	const ref = useRef<Group>(null);

	useFrame(() => {
		material.color = new THREE.Color(`hsl(${260 + 360 * state.current.progress}, 100%, 50%)`);
		ref.current.rotation.x = Math.PI * 2 * state.current.progress + Math.PI * 0.8041;
		ref.current.rotation.y = Math.PI * 2 * state.current.progress + Math.PI * 0.75;
	});

	return (
		<>
			<ambientLight />
			<directionalLight position={[100, 100, 100]} />
			<group
				ref={ref}
				scale={100}
				position={[50, -100, 0]}
				rotation={[Math.PI * 0.804, Math.PI * 0.75, 0]}
			>
				<mesh position={[2, 0, 0.5]} material={material} geometry={geometry}></mesh>
				<mesh position={[2, 0, -0.5]} material={material} geometry={geometry}></mesh>
				<mesh position={[1.5, -0.5, 0]} rotation={[0, Math.PI / 2, 0]} material={material}>
					<planeGeometry args={[1, 2]} />
				</mesh>
				<mesh position={[2.5, 0, 0]} rotation={[0, Math.PI / 2, 0]} material={material}>
					<planeGeometry args={[1, 3]} />
				</mesh>
				<mesh
					position={[2, 1, 0]}
					rotation={[Math.PI / 2, Math.PI / 4, 0]}
					material={material}
				>
					<planeGeometry args={[Math.sqrt(2), 1]} />
				</mesh>
				<mesh position={[0.5, -2, 0]} material={material}>
					<boxGeometry args={[4, 1, 1]} />
				</mesh>
				<mesh position={[-2, -2, -2]} material={material}>
					<boxGeometry args={[1, 1, 5]} />
				</mesh>
			</group>
		</>
	);
}
