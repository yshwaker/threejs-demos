import { BottomLeft, BottomRight, Center, Container, Em } from "./styles"
export function Overlay() {
  return (
    <Container>
      <BottomLeft>
        A runtime deconstruction of{" "}
        <a href="https://playful.software">playful.software</a>
      </BottomLeft>
      <Center>
        More
        <br />
        <Em>Boba</Em>
        <br />
        Please
      </Center>
      <BottomRight>
        Powered by
        <br />
        React & Three.js
        <br />
        <a href="https://sketchfab.com/3d-models/bubble-tea-f75e190e6692489a9411bb5a415db0d6">
          3D model
        </a>{" "}
        by Monster
      </BottomRight>
    </Container>
  )
}
