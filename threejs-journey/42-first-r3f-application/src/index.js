import { Canvas } from '@react-three/fiber'
import ReactDOM from 'react-dom/client'
import { CineonToneMapping } from 'three'
import Experience from './Experience'
import './style.css'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
  <Canvas
    dpr={[1, 2]}
    gl={{ antialias: false, toneMapping: CineonToneMapping }}
    camera={{ fov: 45, near: 0.1, far: 200, position: [3, 2, 6] }}
  >
    <Experience />
  </Canvas>
)
