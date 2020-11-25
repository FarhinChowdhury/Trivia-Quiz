import React from "react";
import {NavLink, useLocation} from 'react-router-dom';
import './NavBar.css'

function NavBar(){
    const location = useLocation();
    return(
        <nav className="navbar">
            <a className="navbar-brand" href="/home" style={{color:"azure", fontSize:"1.7em"}}>E-LOGICAL</a>
            <ul className="nav justify-content-end">
                <li className="nav-item">
                    <NavLink to="/Home" className={location.pathname === "/home" ? "nav-link active" : "nav-link"} >Home</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/Home" className={location.pathname === "/home" ? "nav-link active" : "nav-link"}>Login/SignUp</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar