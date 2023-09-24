import React from "react";
import "./landing.css";

export default function NavBar() {
    return (
        <nav>
            <h3>Your Own Black Chamber</h3>

            <ul className="nav--title">
                <li>About</li>
                <li>Cyptanalysis</li>
                <li>Encryption</li>
                <li>History</li>
            </ul>
        </nav>
    )
}