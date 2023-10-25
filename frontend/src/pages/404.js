import * as React from "react";
import { Link } from "gatsby";

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
