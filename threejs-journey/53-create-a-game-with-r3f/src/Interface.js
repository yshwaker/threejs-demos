import { useKeyboardControls } from '@react-three/drei'
import { addEffect } from '@react-three/fiber'
import * as React from 'react'
import useGame from './stores/useGame'

export default function Interface() {
  const forward = useKeyboardControls((state) => state.forward)
  const backward = useKeyboardControls((state) => state.backward)
  const leftward = useKeyboardControls((state) => state.leftward)
  const rightward = useKeyboardControls((state) => state.rightward)
  const jump = useKeyboardControls((state) => state.jump)
  const restart = useGame((state) => state.restart)
  const phase = useGame((state) => state.phase)

  const time = React.useRef()

  React.useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      const state = useGame.getState()

      let elapsedTime = 0
      if (state.phase === 'playing') {
        elapsedTime = Date.now() - state.startTime
      } else if (state.phase === 'ended') {
        elapsedTime = state.endTime - state.startTime
      }

      elapsedTime /= 1000
      elapsedTime = elapsedTime.toFixed(2)

      // in rare case, callback of addEffect can be invoked before the ref is ready
      if (time.current) {
        time.current.textContent = elapsedTime
      }
    })

    return () => {
      unsubscribeEffect()
    }
  }, [])

  return (
    <div className="interface">
      {/* Time */}
      <div ref={time} className="time">
        0.00
      </div>

      {/* Restart btn */}
      {phase === 'ended' ? (
        <div className="restart" onClick={restart}>
          RESTART
        </div>
      ) : null}

      {/* Controls */}
      <div className="controls">
        <div className="row">
          <div className={`key ${forward ? 'active' : ''}`}>W</div>
        </div>
        <div className="row">
          <div className={`key ${leftward ? 'active' : ''}`}>A</div>
          <div className={`key ${backward ? 'active' : ''}`}>S</div>
          <div className={`key ${rightward ? 'active' : ''}`}>D</div>
        </div>
        <div className="row">
          <div className={`key large ${jump ? 'active' : ''}`}>Space</div>
        </div>
      </div>
    </div>
  )
}
