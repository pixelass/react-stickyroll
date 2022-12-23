import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import type { Group } from "three";

THREE.ColorManagement.legacyMode = false;

export const progressRef = { current: 0 };
export const geometry = new THREE.ShapeGeometry(
	new THREE.Shape()
		.moveTo(-0.5, -1.5)
		.lineTo(0.5, -1.5)
		.lineTo(0.5, 1.505)
		.lineTo(-0.5, 0.505)
		.lineTo(-0.5, -1.5)
);
export const material = new THREE.MeshStandardMaterial({
	color: "#673AB7",
	side: THREE.DoubleSide,
	wireframe: false,
});

export function Scene() {
	const ref = useRef<Group>(null);

	useFrame(() => {
		ref.current.rotation.x = Math.PI * 2 * progressRef.current + Math.PI * 0.804;
		ref.current.rotation.y = Math.PI * 2 * progressRef.current + Math.PI * 0.75;
	});

	return (
		<>
			<color attach="background" args={["#feda21"]} />
			<ambientLight />
			<directionalLight position={[-100, 300, 400]} />
			<group ref={ref} scale={100} position={[0, -100, 0]}>
				<mesh position={[2, 0, 0.5]} material={material} geometry={geometry}></mesh>
				<mesh position={[2, 0, -0.5]} material={material} geometry={geometry}></mesh>
				<mesh position={[1.5, -0.5, 0]} rotation={[0, Math.PI / 2, 0]} material={material}>
					<planeGeometry args={[1, 2]} />
				</mesh>
				<mesh position={[2.5, 0, 0]} rotation={[0, Math.PI / 2, 0]} material={material}>
					<planeGeometry args={[1, 3.005]} />
				</mesh>
				<mesh
					position={[2, 1, 0]}
					rotation={[Math.PI / 2, Math.PI / 4, 0]}
					material={material}
				>
					<planeGeometry args={[Math.sqrt(2), 1]} />
				</mesh>
				<mesh position={[0, -2, 0]} material={material}>
					<boxGeometry args={[5, 1, 1]} />
				</mesh>
				<mesh position={[-2, -2, -2]} material={material}>
					<boxGeometry args={[1, 1, 5]} />
				</mesh>
			</group>
		</>
	);
}
