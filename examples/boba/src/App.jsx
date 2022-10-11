import { Suspense, useState } from "react"
import { BobaTeas } from "./BobaTeas"
import { Overlay } from "./layout/Overlay"
import { FadeIn, MiddleRight } from "./layout/styles"

export default function App() {
  const [speed, setSpeed] = useState(1)
  return (
    <>
      <Suspense fallback={null}>
        <BobaTeas speed={speed} />
        <FadeIn />
        <Overlay />
        <MiddleRight>
          <input
            type="range"
            min="1"
            max="10"
            value={speed}
            step="1"
            onChange={(e) => setSpeed(e.target.value)}
          />
        </MiddleRight>
      </Suspense>
    </>
  )
}
