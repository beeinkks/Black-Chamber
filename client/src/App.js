import React from "react";
import {
	BrowserRouter,
	Route,
	Routes,
} from "react-router-dom";

import "./App.css";
import "./Pages/Landing/landing.css"

import LandingPage from "./Pages/Landing/LandingPage.jsx";

function App() {
	

	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<LandingPage />} />
			</Routes>
		</div>
	);
}

export default App;