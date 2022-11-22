import { extend, useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import { Vector3 } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import CustomObject from './CustomObject'

extend({ OrbitControls })

export default function Experience() {
  const { camera, gl } = useThree()
  const cubeRef = useRef()
  const groupRef = useRef()
  useFrame((state, delta) => {
    cubeRef.current.rotation.y += Math.PI * delta
    // groupRef.current.rotation.y += delta

    // state.camera.position.x = Math.cos(state.clock.elapsedTime) * 10
    // state.camera.position.z = Math.sin(state.clock.elapsedTime) * 10
    // state.camera.lookAt(new Vector3(0, 0, 0))
  })

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <group ref={groupRef}>
        <mesh position={[-2, 0, 0]}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>
        <mesh ref={cubeRef} scale={1.5} position={[2, 0, 0]} rotation-y={0}>
          <boxGeometry scale={1.5} />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
      </group>
      <mesh position-y={-1} rotation-x={-Math.PI / 2} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>

      <CustomObject />
    </>
  )
}
