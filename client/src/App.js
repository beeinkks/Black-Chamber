import React from "react";
import {
	BrowserRouter,
	Route,
	Routes,
} from "react-router-dom";

import "./App.css";
import "./Pages/Landing/landing.css"
import "./Pages/Cryptanalysis/cryptanalysis.css"

import LandingPage from "./Pages/Landing/LandingPage.jsx";
import Cryptanalysis from "./Pages/Cryptanalysis/Cryptanalysis.jsx";

function App() {
	

	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<LandingPage />} />
        <Route path="/cryptanalysis" element={<Cryptanalysis />} />
			</Routes>
		</div>
	);
}

export default App;