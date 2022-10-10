import styled, { keyframes } from "styled-components"

const fade = keyframes`
  from { opacity: 1}
  to { opacity: 0}
`
export const FadeIn = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #e75082;
  animation: ${fade} 4s forwards ease-in-out;
`

export const Blur = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  filter: blur(4px);
`

export const Container = styled.div`
  color: #f7f7f7;
  font-family: "Inter", sans-serif;
  font-size: 16px;

  a:visited {
    color: #bf1b1b;
  }
`

export const Center = styled.div`
  position: absolute;
  font-family: "Rubik Mono One", sans-serif;
  font-size: min(10vw, 10em);
  top: 50%;
  left: 50%;
  width: 6ch;
  transform: translate3d(-50%, -50%, 0);
`

export const Em = styled.span`
  // color: #222;
  background: linear-gradient(30deg, #503a37, #222);
  -webkit-background-clip: text;
  color: transparent;
  // -webkit-text-fill-color: transparent;
`

export const BottomLeft = styled.div`
  position: absolute;
  bottom: 5vw;
  left: 5vw;
  width: 30ch;
  max-width: 40%;
`

export const BottomRight = styled.div`
  position: absolute;
  bottom: 5vw;
  right: 5vw;
  width: 35ch;
  max-width: 40%;
  letter-spacing: -0.01em;
  text-align: right;
`

export const MiddleRight = styled.div`
  position: absolute;
  top: 50%;
  right: 5vw;
  transform: rotate(90deg) translate3d(50%, 0, 0);
  transform-origin: 100% 50%;

  input[type="range"] {
    display: block;
    -webkit-appearance: none;
    -moz-appearance: none;
    background: black;
    color: black;
    border-radius: 5px;
    width: 100%;
    height: 2px;
    outline: 0;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    background-color: #000;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    cursor: pointer;
    transition: 0.3s ease-in-out;
  }

  input[type="range"]::-webkit-slider-thumb:active {
    transform: scale(1);
  }
`
