import {
  Center,
  OrbitControls,
  shaderMaterial,
  Sparkles,
  useGLTF,
  useTexture,
} from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import portalFragmentShader from './shaders/portal/fragment'
import portalVertexShader from './shaders/portal/vertex'

const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color('#fff'),
    uColorEnd: new THREE.Color('#000'),
  },
  portalVertexShader,
  portalFragmentShader
)

extend({ PortalMaterial })

export default function Experience() {
  const { nodes } = useGLTF('./model/portal.glb')
  const bakedTexture = useTexture('./model/baked.jpg')
  bakedTexture.flipY = false

  const portalRef = useRef()

  useFrame((state, delta) => {
    portalRef.current.uTime += delta
  })

  return (
    <>
      <color args={['#201919']} attach="background" />
      <OrbitControls makeDefault />

      <Center>
        <mesh geometry={nodes.baked.geometry}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>

        <mesh
          geometry={nodes.poleLightA.geometry}
          position={nodes.poleLightA.position}
        >
          <meshBasicMaterial color="#ffffe5" />
        </mesh>

        <mesh
          geometry={nodes.poleLightB.geometry}
          position={nodes.poleLightB.position}
        >
          <meshBasicMaterial color="#ffffe5" />
        </mesh>

        <mesh
          geometry={nodes.portalLight.geometry}
          position={nodes.portalLight.position}
        >
          <portalMaterial ref={portalRef} />
        </mesh>

        <Sparkles
          size={6}
          scale={[4, 2, 4]}
          position-y={1}
          speed={0.2}
          count={40}
        />
      </Center>
    </>
  )
}
