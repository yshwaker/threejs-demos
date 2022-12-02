import { useAnimations, useGLTF } from '@react-three/drei'
import { button, useControls } from 'leva'
import { useEffect } from 'react'

export default function Fox(props) {
  const model = useGLTF('./Fox/glTF/Fox.gltf')
  const animations = useAnimations(model.animations, model.scene)

  const { animationName } = useControls({
    animationName: { options: animations.names },
  })

  useEffect(() => {
    const action = animations.actions[animationName]
    // we reset the animation so that it start playing from the beginning
    action.reset().fadeIn(0.5).play()

    return () => {
      action.fadeOut(0.5)
    }

    // window.setTimeout(() => {
    //   animations.actions.Walk.play()

    //   animations.actions.Walk.crossFadeFrom(animations.actions.Run, 1)
    // }, 3000)
  }, [animationName])

  return (
    <primitive
      object={model.scene}
      scale={0.02}
      position={[-2.5, -1, 2.5]}
      rotation-y={0.3}
      {...props}
    />
  )
}
