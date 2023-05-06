import React from "react";
import "./NavBar.css";
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
                    <a href="http://localhost:3001">AHP Tool</a>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;