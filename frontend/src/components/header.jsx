import * as React from "react";
import { Link } from "gatsby";

export default function Header() {
    return (
        <div>
            This is the header.
            <Link to="/home/">Home</Link>
            <Link to="/library/">All Recipes</Link>
            <Link to="/about/">About</Link>
        </div>
    )
}