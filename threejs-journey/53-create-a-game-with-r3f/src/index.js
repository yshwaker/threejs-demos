import { KeyboardControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import ReactDOM from 'react-dom/client'
import Experience from './Experience.js'
import Interface from './Interface.js'
import './style.css'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
  <KeyboardControls
    map={[
      // use KeyW instead of W, so that it also works on non-QWERTY keyboards
      { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
      { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
      { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
      { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
      { name: 'jump', keys: ['Space'] },
    ]}
  >
    <Canvas
      shadows
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [2.5, 4, 6],
      }}
    >
      <Experience />
    </Canvas>
    <Interface />
  </KeyboardControls>
)
