import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useRef, useState } from "react"
import * as THREE from "three"

function Box({ z }) {
  const ref = useRef()
  const { viewport, camera } = useThree()
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z])

  const [data] = useState({
    x: THREE.MathUtils.randFloatSpread(2), // -1 to 1
    y: THREE.MathUtils.randFloatSpread(height),
  })

  useFrame((state) => {
    ref.current.position.set(width * data.x, (data.y += 0.3), z)
    if (data.y > height / 1.5) {
      data.y = -height / 1.5
    }
  })

  return (
    <mesh ref={ref}>
      <boxGeometry />
      <meshBasicMaterial color="orange" />
    </mesh>
  )
}

function Test() {
  const { viewport, camera } = useThree()
  console.log(width, height)
  console.log(viewport.width, viewport.height)
  return (
    <mesh position={[0, 0, -10]} scale={[width, height, 1]}>
      <planeGeometry />
      <meshBasicMaterial color="orange" />
    </mesh>
  )
}

function App({ count = 100 }) {
  return (
    <Canvas>
      {Array.from({ length: count }, (_, i) => (
        <Box key={i} z={-i} />
      ))}
    </Canvas>
  )
}

export default App
