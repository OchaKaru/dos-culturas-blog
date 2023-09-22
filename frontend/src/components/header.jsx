import * as React from "react";
import { Link } from "gatsby";

import logo from "../images/temp_logo.svg";

export default function Header() {
    return (
        <div className="header">
            <div className="header-logo">
                <img src={logo} alt="logo" />
                <h1>Dos Culturas</h1>
            </div>
            <ul className="nav-links">
                <li><Link to="/home/">Home</Link></li>
                <li><Link to="/library/">All Recipes</Link></li>
                <li><Link to="/about/">About</Link></li>
            </ul>
        </div>
    )
}