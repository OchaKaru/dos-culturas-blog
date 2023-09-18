import * as React from "react"
import background from "../images/dinner.png";

let pageStyle = {
  backgroundImage: `url(${background})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '100vh',
  width: '100vw',
}

const LandingPage = () => {
  return (
    <main style={pageStyle}>
      {/* <img src={background} alt="The background image" /> */}
    </main>
  )
}

export default LandingPage

export const Head = () => <title>Welcome Page</title>
