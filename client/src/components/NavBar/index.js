import React from "react";
import './NavBar.css';
import { NavLink } from "react-router-dom";


function NavBar(){
    return(
        <nav className="navbar">
            <a className="navbar-brand" href="#" style={{color:"azure", fontSize:"1.7em"}}>E-LOGICAL</a>
            <ul className="nav justify-content-end">
                <li className="nav-item">
                <NavLink to="/" className="nav-link" activeClassName="active">Home</NavLink>
                </li>
                <li className="nav-item">
                <NavLink to="/login" className="nav-link" activeClassName="active">Login/Sign-up</NavLink>
                </li>
          </ul>
        </nav>

    )

}

export default NavBar