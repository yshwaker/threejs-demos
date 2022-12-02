import {
  Center,
  OrbitControls,
  Text3D,
  useMatcapTexture,
} from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { useEffect } from 'react'
import * as THREE from 'three'

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32)
const material = new THREE.MeshMatcapMaterial()

export default function Experience() {
  const [matcapTexture] = useMatcapTexture('7B5254_E9DCC7_B19986_C8AC91', 256)

  useEffect(() => {
    matcapTexture.encoding = THREE.sRGBEncoding
    matcapTexture.needsUpdate = true

    material.matcap = matcapTexture
    material.needsUpdate = true
  }, [])
  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

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
        />
      ))}
    </>
  )
}
