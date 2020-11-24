import React from "react";
import './NavBar.css'



function NavBar(){
    return(
        <nav className="navbar">
            <a className="navbar-brand" href="#" style={{color:"azure", fontSize:"1.7em"}}>E-LOGICAL</a>
            <ul className="nav justify-content-end">
                <li className="nav-item">
                <a className="nav-link active" href="/">Home</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="/login">Login/Sign-up</a>
                </li>
          </ul>
        </nav>

    )

}

export default NavBar