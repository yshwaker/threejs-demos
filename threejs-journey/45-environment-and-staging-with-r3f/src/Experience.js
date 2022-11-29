import {
  softShadows,
  OrbitControls,
  useHelper,
  BakeShadows,
  RandomizedLight,
  AccumulativeShadows,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { useRef } from "react";
import * as THREE from "three";

// softShadows({
//   frustum: 3.75,
//   size: 0.005,
//   near: 9.5,
//   samples: 17,
//   rings: 11,
// });

export default function Experience() {
  const directionalLight = useRef();
  // useHelper(directionalLight, THREE.DirectionalLightHelper, 1);

  const cube = useRef();

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    cube.current.rotation.y += delta * 0.2;
    cube.current.position.x = 2 + Math.sin(time);
  });

  return (
    <>
      {/* <BakeShadows /> */}
      <color args={["ivory"]} attach="background" />

      <Perf position="top-left" />

      <OrbitControls makeDefault />

      {/* place it right above the floor */}
      <AccumulativeShadows
        position={[0, -0.99, 0]}
        color="#316d39"
        opacity={0.8}
        // render 100 times on the first frame, causing the page to freeze
        // iOS will try to reload if the page freezes for a long time
        frames={Infinity}
        // this allows threejs to render 100 times, but onece for each frame.
        // so we can see the shadow created gradually.
        // it solves the freeze but may looks weird
        temporal
        blend={100}
      >
        <RandomizedLight
          position={[1, 2, 3]}
          castShadow
          amount={8}
          radius={1}
          ambient={0.5}
          intensity={1}
          bias={0.001}
        />
      </AccumulativeShadows>

      <directionalLight
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={5}
        shadow-camera-right={5}
        shadow-camera-bottom={-5}
        shadow-camera-left={-5}
        ref={directionalLight}
        position={[1, 2, 3]}
        intensity={1.5}
      />
      <ambientLight intensity={0.5} />

      <mesh castShadow position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh castShadow ref={cube} position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
