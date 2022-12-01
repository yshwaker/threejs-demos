import { useLoader } from '@react-three/fiber'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function Model() {
  const model = useLoader(
    GLTFLoader,
    './FlightHelmet/glTF/FlightHelmet.gltf',
    (loader) => {
      // we can access the instance of the gltfloader here
      const dracoLoader = new DRACOLoader()
      dracoLoader.setDecoderPath('./draco/')
      loader.setDRACOLoader(dracoLoader)
    }
  )

  return <primitive object={model.scene} scale={5} position-y={-1} />
}
