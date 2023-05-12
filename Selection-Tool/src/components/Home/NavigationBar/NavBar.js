import React from "react";
import "./NavBar.css";
const TOOL_URL=process.env.REACT_APP_TOOL_URL;
function Navbar() {
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/contact">Contact</a>
                </li>
                <li>
                    <a href="/submit">Submit</a>
                </li>
                <li>
                    <a href={TOOL_URL}>AHP Tool</a>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;