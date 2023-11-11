import * as React from "react"
import background from "../images/dinner.png";

let pageStyle = {
  backgroundImage: `url(${background.src})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '100vh',
  width: '100vw',
}

export default function LandingPage() {
  return (
    <main style={pageStyle} />
  )
}
