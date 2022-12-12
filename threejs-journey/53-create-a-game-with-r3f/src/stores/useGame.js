import create from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export default create(
  subscribeWithSelector((set) => {
    return {
      blocksSeed: 0,
      blocksCount: 10,
      /**
       * Time
       */
      startTime: 0,
      endTime: 0,
      /**
       * Phases
       */
      phase: 'ready',
      start: () => {
        set((state) => {
          if (state.phase === 'ready') {
            return { phase: 'playing', startTime: Date.now() }
          }

          return {}
        })
      },
      restart: () => {
        set((state) => {
          if (state.phase === 'playing' || state.phase === 'ended') {
            return { phase: 'ready', blocksSeed: state.blocksSeed + 1 }
          }
        })
      },
      end: () => {
        set((state) => {
          if (state.phase === 'playing') {
            return { phase: 'ended', endTime: Date.now() }
          }

          return {}
        })
      },
    }
  })
)
