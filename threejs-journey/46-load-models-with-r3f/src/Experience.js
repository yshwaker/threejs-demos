import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { Suspense } from 'react'

import Hamburger from './Hamburger'
import Model from './Model'
import Placeholder from './Placeholder'

export default function Experience() {
  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight
        castShadow
        shadow-normalBias={0.04}
        position={[1, 2, 3]}
        intensity={1.5}
      />
      <ambientLight intensity={0.5} />

      <Suspense fallback={<Placeholder position-y={0.5} scale={[2, 3, 2]} />}>
        <Hamburger scale={0.35} />
      </Suspense>

      <mesh castShadow position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh castShadow position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh
        receiveShadow
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  )
}
