import * as THREE from 'three'
import Camera from './Camera'
import Renderer from './Renderer'
import sources from './sources'
import Debug from './Utils/Debug'
import Resources from './Utils/Resources'
import Sizes from './Utils/Sizes'
import Time from './Utils/Time'
import World from './World/World'

export default class Experience {
  constructor(canvas) {
    if (Experience.instance) {
      return Experience.instance
    }
    Experience.instance = this

    // make it easy to debug using the console
    window.experience = this

    this.debug = new Debug()
    this.canvas = canvas
    this.sizes = new Sizes()
    this.time = new Time()
    this.scene = new THREE.Scene()
    this.resources = new Resources(sources)
    this.camera = new Camera()
    this.renderer = new Renderer()
    this.world = new World()

    this.sizes.on('resize', () => {
      this.resize()
    })

    this.time.on('tick', () => {
      this.update()
    })
  }

  // a central place to handle resize and proagate to all its children like camera
  // so that the order can be controlled
  resize() {
    this.camera.resize()
    this.renderer.resize()
  }

  // a central place to handle update for each frame
  // so that the order can be controlled
  update() {
    this.camera.update()
    this.world.update()
    this.renderer.update()
  }

  destroy() {
    this.sizes.off('resize')
    this.time.off('tick')

    // traverse the scene
    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose()
        for (const key in child.material) {
          const value = child.material[key]
          if (value && typeof value.dispose === 'function') {
            value.dispose()
          }
        }

        this.camera.controls.dispose()
        this.renderer.instance.dispose()

        if (this.debug.active) {
          this.debug.ui.destroy()
        }
      }
    })
  }
}
