import * as dat from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import './style.css'

/**
 * Base
 */
// Debug
const gui = new dat.GUI({ width: 400 })

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Texture
const textLoader = new THREE.TextureLoader()
const starTexture = textLoader.load('/textures/particles/4.png')

/**
 * Galaxy
 */
const parameters = {
  count: 10000,
  sparseCount: 100,
  size: 0.01,
  radius: 5,
  branches: 3,
  spin: 1,
  randomness: 0.2,
  randomnessPower: 3,
  insideColor: '#ff6030',
  outsideColor: '#1b3984',
}

let geometry = null
let material = null
let points = null

const generateGalaxy = () => {
  // destroy the galaxy
  if (geometry || material || points) {
    geometry.dispose()
    material.dispose()
    scene.remove(points)
  }
  geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(
    (parameters.count + parameters.sparseCount) * 3
  )
  const colors = new Float32Array(
    (parameters.count + parameters.sparseCount) * 3
  )

  const colorInside = new THREE.Color(parameters.insideColor)
  const colorOutside = new THREE.Color(parameters.outsideColor)

  for (let i = 0; i < parameters.count; i++) {
    const i3 = i * 3

    // Position
    const branch = i % parameters.branches
    const branchAngle = ((Math.PI * 2) / parameters.branches) * branch
    const radius = Math.random() * parameters.radius
    const spinAngle = parameters.spin * radius
    const angle = branchAngle + spinAngle

    const dist = () => Math.pow(Math.random(), parameters.randomnessPower)

    const randomX =
      dist() * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius
    const randomY =
      dist() * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius
    const randomZ =
      dist() * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius

    positions[i3] = Math.cos(angle) * radius + randomX
    positions[i3 + 1] = randomY
    positions[i3 + 2] = Math.sin(angle) * radius + randomZ

    // Color
    const color = colorInside.clone()

    color.lerp(colorOutside, radius / parameters.radius)
    colors[i3] = color.r
    colors[i3 + 1] = color.g
    colors[i3 + 2] = color.b
  }

  for (
    let i = parameters.count;
    i < parameters.count + parameters.sparseCount;
    i += 1
  ) {
    const i3 = i * 3

    // Position
    const edgeLength = 50
    const a = (positions[i3] = (Math.random() - 0.5) * edgeLength)
    positions[i3 + 1] = (Math.random() - 0.5) * edgeLength
    positions[i3 + 2] = (Math.random() - 0.5) * edgeLength

    // Color
    const color = new THREE.Color('#fff')

    // color.lerp(colorOutside, Math.random())
    colors[i3] = color.r
    colors[i3 + 1] = color.g
    colors[i3 + 2] = color.b
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  material = new THREE.PointsMaterial({
    size: parameters.size,
    sizeAttenuation: true,
    depthWrite: false,
    alphaMap: starTexture,
    transparent: true,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
  })

  points = new THREE.Points(geometry, material)
  scene.add(points)
}

generateGalaxy()

gui
  .add(parameters, 'count')
  .min(100)
  .max(1000000)
  .step(100)
  .onFinishChange(generateGalaxy)
gui
  .add(parameters, 'sparseCount')
  .min(100)
  .max(10000)
  .step(100)
  .onFinishChange(generateGalaxy)
gui
  .add(parameters, 'size')
  .min(0.001)
  .max(0.1)
  .step(0.01)
  .onFinishChange(generateGalaxy)
gui
  .add(parameters, 'radius')
  .min(0.01)
  .max(20)
  .step(0.01)
  .onFinishChange(generateGalaxy)
gui
  .add(parameters, 'branches')
  .min(2)
  .max(20)
  .step(1)
  .onFinishChange(generateGalaxy)
gui
  .add(parameters, 'spin')
  .min(-5)
  .max(5)
  .step(0.001)
  .onFinishChange(generateGalaxy)
gui
  .add(parameters, 'randomness')
  .min(0)
  .max(2)
  .step(0.001)
  .onFinishChange(generateGalaxy)
gui
  .add(parameters, 'randomnessPower')
  .min(1)
  .max(10)
  .step(0.001)
  .onFinishChange(generateGalaxy)
gui.addColor(parameters, 'insideColor').onFinishChange(generateGalaxy)
gui.addColor(parameters, 'outsideColor').onFinishChange(generateGalaxy)
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
)
camera.position.x = 3
camera.position.y = 3
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
