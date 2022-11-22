import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

export default function CustomObject() {
  const geometryRef = useRef()

  const vertexCount = 10 * 3

  const positons = useMemo(() => {
    const temp = new Float32Array(vertexCount * 3)

    for (let i = 0; i < vertexCount * 3; i++) {
      temp[i] = (Math.random() - 0.5) * 3
    }
    return temp
  }, [])

  useEffect(() => {
    geometryRef.current.computeVertexNormals()
  }, [])

  return (
    <mesh>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          count={vertexCount}
          itemSize={3}
          array={positons}
        />
      </bufferGeometry>
      <meshStandardMaterial color="red" side={THREE.DoubleSide} />
    </mesh>
  )
}
