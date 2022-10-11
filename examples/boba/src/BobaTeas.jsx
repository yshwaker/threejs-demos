import { Environment, useGLTF } from "@react-three/drei"
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber"
import { DepthOfField, EffectComposer } from "@react-three/postprocessing"
import { useRef, useState } from "react"
import * as THREE from "three"

function Banana({ z }) {
  const ref = useRef()
  const { viewport, camera } = useThree()
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z])
  const { nodes, materials } = useGLTF("/banana-v1-transformed.glb")

  const [data] = useState({
    x: THREE.MathUtils.randFloatSpread(2), // -1 to 1
    y: THREE.MathUtils.randFloatSpread(height),
    rX: Math.random() * Math.PI,
    rY: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
  })

  useFrame((state) => {
    ref.current.rotation.set(
      (data.rX += 0.001),
      (data.rY += 0.001),
      (data.rZ += 0.001)
    )
    ref.current.position.set(width * data.x, (data.y += 0.025), z)
    if (data.y > height) {
      data.y = -height
    }
  })

  return (
    <mesh
      ref={ref}
      geometry={nodes.banana.geometry}
      material={materials.skin}
      material-emissive="orange"
    />
  )
}

function BobaTea({ z, speed }) {
  const ref = useRef()
  const { viewport, camera } = useThree()
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z])
  const { nodes, materials } = useGLTF("/boba_tea-transformed.glb")

  const [data] = useState({
    x: THREE.MathUtils.randFloatSpread(2), // -1 to 1
    y: THREE.MathUtils.randFloatSpread(height),
    rX: Math.random() * Math.PI,
    rY: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
  })

  useFrame((state, delta) => {
    ref.current.rotation.set(
      (data.rX += 0.001),
      (data.rY += 0.001),
      (data.rZ += 0.001)
    )
    if (delta < 0.1) {
      ref.current.position.set(width * data.x, (data.y += delta * speed), z)
    }
    if (data.y > height) {
      data.y = -height
    }
  })

  return (
    <mesh
      ref={ref}
      geometry={nodes.Boba_tea.geometry}
      material={materials["boba_tea_texture.png"]}
    />
  )
}

export function BobaTeas({ count = 100, depth = 80, speed = 1 }) {
  return (
    <Canvas
      gl={{ alpha: false }}
      camera={{ near: 0.01, far: 30 + depth, fov: 35 }}
    >
      <color attach="background" args={["#eb6c96"]} />
      <spotLight position={[10, 10, 10]} intensity={0.9} />
      <Environment preset="city" />
      {Array.from({ length: count }, (_, i) => (
        <BobaTea key={i} z={(-i / count) * depth - 20} speed={speed} />
      ))}
      <EffectComposer>
        {/* not working well for BobaTea since it has transparent materials  */}
        <DepthOfField
          focusDistance={0.2}
          focalLength={0.5}
          bokehScale={7}
          height={500}
          width={500}
        />
      </EffectComposer>
    </Canvas>
  )
}
