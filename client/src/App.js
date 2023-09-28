import React from "react";
import {
	Route,
	Routes,
} from "react-router-dom";

import "./App.css";
import "./Pages/Landing/landing.css"
import "./Pages/Cryptanalysis/cryptanalysis.css"

import LandingPage from "./Pages/Landing/LandingPage.jsx";
import Cryptanalysis from "./Pages/Cryptanalysis/Cryptanalysis.jsx";
import History from "./Pages/History/History.jsx";

function App() {
	

	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<LandingPage />} />
        		<Route path="/cryptanalysis" element={<Cryptanalysis />} />
				<Route path="/history" element={<History />} />
			</Routes>
		</div>
	);
}

export default App;