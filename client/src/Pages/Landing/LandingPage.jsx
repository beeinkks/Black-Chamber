import React from "react";

import Nav from "./NavBar.js";
import "./landing.css";

import Logo from "./../Images/lightLogo.png";

export default function LandingPage () {
    return (
        <div className="landing">
            <Nav />
            <div className="landing-body">
                <img src={Logo} className="landing-img" alt="green cube on side" />
                
                <h1>Cracking the Code with Your Black Chamber</h1>
            </div>
        </div>
    )
}