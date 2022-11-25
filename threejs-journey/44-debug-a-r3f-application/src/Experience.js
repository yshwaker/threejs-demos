import { OrbitControls } from '@react-three/drei'
import { button, useControls } from 'leva'
import { Perf } from 'r3f-perf'

export default function Experience() {
  const { perfVisible } = useControls({
    perfVisible: true,
  })

  const { position, color, visible } = useControls('sphere', {
    position: {
      value: { x: -2, y: 0 },
      joystick: 'invertY',
      step: 0.01,
    },
    color: '#ff0000',
    visible: true,
    myInterval: {
      min: 0,
      max: 10,
      value: [1, 2],
    },
    clickMe: button(() => {
      console.log('ok')
    }),
    choice: {
      options: ['a', 'b', 'c'],
    },
  })

  const { scale } = useControls('cube', {
    scale: 1,
  })

  return (
    <>
      {perfVisible ? <Perf position="top-left" /> : null}
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <mesh position={[position.x, position.y, 0]} visible={visible}>
        <sphereGeometry />
        <meshStandardMaterial color={color} />
      </mesh>

      <mesh position-x={2} scale={scale}>
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
