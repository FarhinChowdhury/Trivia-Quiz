import React from "react";
import './NavBar.css';
import { NavLink } from "react-router-dom";


function NavBar(props){
    return(
        <nav className="navbar navbar-expand-lg navbar-custom">
            <a className="navbar-brand" href="/" style={{color:"azure", fontSize:"1.7em"}}>E-LOGICAL</a>
            <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <i className="fas fa-rocket"></i>
            </button>
            <div className="navbar-collapse collapse">
                <ul className="nav justify-content-end ml-auto">
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link" activeClassName="active">Home</NavLink>
                    </li>
                    <li className="nav-item">
                    {props.login 
                        ? <NavLink to="/login" className="nav-link" activeClassName="active">Login/Sign-up</NavLink>
                        : <NavLink to="/logout" className="nav-link" activeClassName="active">Logout</NavLink>
                    }
                    </li>
                    {props.login ?
                        <li className="nav-item">
                            <a className="nav-link disabled" href="/profile" tabIndex="-1" aria-disabled="true">Profile</a>
                        </li>
                        :
                        <li className="nav-item">
                            <NavLink to="/profile" className="nav-link" activeClassName="active">Profile</NavLink>
                        </li>
                    }
                </ul>
            </div>
        </nav>

    )
}

export default NavBar