import * as dat from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import firefliesFragmentShader from './shaders/fireflies.frag'
import firefliesVertexShader from './shaders/fireflies.vert'
import portalFragmentShader from './shaders/portal.frag'
import portalVertexShader from './shaders/portal.vert'
import './style.css'

/**
 * Base
 */
// Debug
const debugObject = {}
const gui = new dat.GUI({
  width: 400,
})

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Loaders
 */
// Texture loader
const textureLoader = new THREE.TextureLoader()
const bakedTexture = textureLoader.load('baked.jpg')
bakedTexture.flipY = false
bakedTexture.encoding = THREE.sRGBEncoding

// Draco loader
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('draco/')

// GLTF loader
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

/**
 * Materials
 */
// Baked material
const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture })

// Pole light material
const poleLightMaterial = new THREE.MeshBasicMaterial({
  color: debugObject.poleLightColor,
})
debugObject.poleLightColor = '#d1c97b'

gui.addColor(debugObject, 'poleLightColor').onChange(() => {
  poleLightMaterial.color.set(debugObject.poleLightColor)
})

debugObject.portalColorStart = '#26408c'
debugObject.portalColorEnd = '#e2dda7'

// portal Light material
const portalLightMaterial = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uColorStart: { value: new THREE.Color(debugObject.portalColorStart) },
    uColorEnd: { value: new THREE.Color(debugObject.portalColorEnd) },
  },
  vertexShader: portalVertexShader,
  fragmentShader: portalFragmentShader,
})

gui.addColor(debugObject, 'portalColorStart').onChange(() => {
  portalLightMaterial.uniforms.uColorStart.value.set(
    debugObject.portalColorStart
  )
})
gui.addColor(debugObject, 'portalColorEnd').onChange(() => {
  portalLightMaterial.uniforms.uColorEnd.value.set(debugObject.portalColorEnd)
})

/**
 * Model
 */
gltfLoader.load('portal.glb', (gltf) => {
  const bakedMesh = gltf.scene.children.find((child) => child.name === 'baked')

  const poleLightAMesh = gltf.scene.children.find(
    (child) => child.name === 'poleLightA'
  )
  const poleLightBMesh = gltf.scene.children.find(
    (child) => child.name === 'poleLightB'
  )
  const portalLightMesh = gltf.scene.children.find(
    (child) => child.name === 'portalLight'
  )

  bakedMesh.material = bakedMaterial
  poleLightAMesh.material = poleLightMaterial
  poleLightBMesh.material = poleLightMaterial
  portalLightMesh.material = portalLightMaterial

  scene.add(gltf.scene)
})

/**
 * Fireflies
 */
const firefliesGeometry = new THREE.BufferGeometry()
const firefliesCount = 30
const positions = new Float32Array(firefliesCount * 3)
const scales = new Float32Array(firefliesCount)
for (let i = 0; i < firefliesCount; i++) {
  const i3 = i * 3

  positions[i3] = (Math.random() - 0.5) * 4
  positions[i3 + 1] = Math.random() * 1.5
  positions[i3 + 2] = (Math.random() - 0.5) * 4

  scales[i] = Math.random()
}
firefliesGeometry.setAttribute(
  'position',
  new THREE.BufferAttribute(positions, 3)
)
firefliesGeometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))

const firefliesMaterial = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    uSize: { value: 200 },
  },
  transparent: true,
  vertexShader: firefliesVertexShader,
  fragmentShader: firefliesFragmentShader,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
})

gui
  .add(firefliesMaterial.uniforms.uSize, 'value')
  .min(0)
  .max(500)
  .step(1)
  .name('firefliesSize')

const fireflies = new THREE.Points(firefliesGeometry, firefliesMaterial)
scene.add(fireflies)

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

  fireflies.material.uniforms.uPixelRatio = Math.min(window.devicePixelRatio, 2)
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 4
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.outputEncoding = THREE.sRGBEncoding

debugObject.clearColor = '#252e37'
renderer.setClearColor(debugObject.clearColor)

gui.addColor(debugObject, 'clearColor').onChange(() => {
  renderer.setClearColor(debugObject.clearColor)
})

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update materials
  firefliesMaterial.uniforms.uTime.value = elapsedTime
  portalLightMaterial.uniforms.uTime.value = elapsedTime

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
