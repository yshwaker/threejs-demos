import { Clone, useGLTF } from '@react-three/drei'

export default function Model() {
  const model = useGLTF('./hamburger.glb')

  return (
    <>
      <Clone object={model.scene} scale={0.35} position-y={-1} />
      <Clone object={model.scene} scale={0.35} position-y={4} />
      <Clone object={model.scene} scale={0.35} position-y={9} />
    </>
  )
}

useGLTF.preload('./hamburger.glb')
