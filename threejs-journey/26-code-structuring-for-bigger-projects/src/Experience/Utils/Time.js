import EventEmitter from './EventEmitter'

export default class Time extends EventEmitter {
  constructor() {
    super()

    // Setup
    this.start = Date.now()
    this.current = this.start
    this.elapsed = 0
    // may create some bugs on the 1st frame if we put 0 here
    // 16 is 1000 / 60 ms per frame
    this.delta = 16

    // wait one frame otherwise the delta will become 0 on the 1st frame
    window.requestAnimationFrame(() => {
      this.tick()
    })
  }

  tick() {
    const currentTime = Date.now()
    this.elapsed = currentTime - this.start
    this.delta = currentTime - this.current
    this.current = currentTime

    this.trigger('tick')

    window.requestAnimationFrame(() => {
      this.tick()
    })
  }
}
