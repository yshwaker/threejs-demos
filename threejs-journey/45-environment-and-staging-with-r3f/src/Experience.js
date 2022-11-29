import { useControls } from "leva"
import { OrbitControls, ContactShadows, Sky } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { Perf } from "r3f-perf"
import { useRef } from "react"

export default function Experience() {
  const directionalLight = useRef()

  const { color, opacity, blur } = useControls("contact shadow", {
    color: "#000",
    opacity: {
      value: 0.4,
      min: 0,
      max: 1,
    },
    blur: {
      value: 2.8,
      min: 0,
      max: 10,
    },
  })

  const { sunPosition } = useControls("sky", {
    sunPosition: {
      value: [1, 2, 3],
    },
  })

  const cube = useRef()

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime
    cube.current.rotation.y += delta * 0.2
    cube.current.position.x = 2 + Math.sin(time)
  })

  return (
    <>
      {/* <BakeShadows /> */}
      <color args={["ivory"]} attach="background" />

      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <ContactShadows
        position={[0, -0.99, 0]}
        scale={10}
        resolution={512}
        far={5}
        color={color}
        blur={blur}
        opacity={opacity}
        frames={1}
      />

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
        position={sunPosition}
        intensity={1.5}
      />
      <ambientLight intensity={0.5} />

      <Sky sunPosition={sunPosition} />

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
  )
}
