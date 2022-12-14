import {
  Center,
  OrbitControls,
  Text3D,
  useMatcapTexture,
} from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Perf } from 'r3f-perf'
import { useRef, useState } from 'react'

export default function Experience() {
  const [matcapTexture] = useMatcapTexture('7B5254_E9DCC7_B19986_C8AC91', 256)
  const [torusGeometry, setTorusGeometry] = useState()
  const [material, setMaterial] = useState()
  const donutsGroup = useRef([])

  useFrame((state, delta) => {
    for (const donut of donutsGroup.current) {
      donut.rotation.y += delta * 0.2
    }
  })

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <torusGeometry ref={setTorusGeometry} args={[1, 0.6, 16, 32]} />
      <meshMatcapMaterial ref={setMaterial} matcap={matcapTexture} />

      <Center>
        <Text3D
          font="./fonts/helvetiker_regular.typeface.json"
          size={0.75}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          Hello R3F
          <meshMatcapMaterial matcap={matcapTexture} />
        </Text3D>
      </Center>

      {[...Array(100)].map((_, index) => (
        <mesh
          ref={(element) => {
            donutsGroup.current[index] = element
          }}
          geometry={torusGeometry}
          material={material}
          key={index}
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
          ]}
          scale={Math.random()}
          rotation={[
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI,
          ]}
        ></mesh>
      ))}
    </>
  )
}
