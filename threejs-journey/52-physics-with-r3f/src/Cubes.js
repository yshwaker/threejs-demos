import { InstancedRigidBodies } from '@react-three/rapier'
import * as React from 'react'

export const Cubes = ({ count }) => {
  const cubes = React.useRef()

  const cubeTransforms = React.useMemo(() => {
    const positions = []
    const rotations = []
    const scales = []

    for (let i = 0; i < count; i += 1) {
      positions.push([
        (Math.random() - 0.5) * 8,
        6 + i * 0.2,
        (Math.random() - 0.5) * 8,
      ])
      rotations.push([Math.random(), Math.random(), Math.random()])
      const scale = Math.random() + 0.5
      scales.push([scale, scale, scale])
    }
    return { positions, rotations, scales }
  }, [])

  return (
    <InstancedRigidBodies
      positions={cubeTransforms.positions}
      rotaions={cubeTransforms.rotations}
      scales={cubeTransforms.scales}
    >
      <instancedMesh args={[null, null, count]} castShadow ref={cubes}>
        <boxGeometry />
        <meshStandardMaterial color="tomato" />
      </instancedMesh>
    </InstancedRigidBodies>
  )
}
