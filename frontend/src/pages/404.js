import * as React from "react";

import background from "../images/dinner.png";

let pageStyle = {
  backgroundImage: `url(${background})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '100vh',
  width: '100vw',
}

const NotFoundPage = () => {
  return (
    <main style={pageStyle} />
  )
}

export default NotFoundPage

export const Head = () => <title>Page Not found</title>
