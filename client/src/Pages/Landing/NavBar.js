import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "./landing.css";

export default function NavBar() {
    return (
        <nav>
            <Link to="/"><h3>Your Black Chamber</h3></Link>

            <ul className="nav--title">
                <CustomLink to="/cryptanalysis">Cyptanalysis</CustomLink>
                <CustomLink to="/history">History</CustomLink>
            </ul>
        </nav>
    )
}

function CustomLink({ to, children, ...props }) {
	//const path = window.location.pathname

	const resolvedPath = useResolvedPath(to);
	const isActive = useMatch({ path: resolvedPath.pathname, end: true });

	return (
		<li className={isActive ? "active" : ""}>
			<Link to={to} {...props}>
				{children}
			</Link>
		</li>
	);
}