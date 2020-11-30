import React from "react";
import './NavBar.css';
import { NavLink } from "react-router-dom";

function NavBar(props){
  return(
    <header className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-1">
      <h5 className="my-0 mr-md-auto e-header">
        <a href="/" style={{color:"azure", fontSize:"1.7em"}}>E-LOGICAL</a>
      </h5>
      <nav className="d-flex flex-row align-items-center">
        <NavLink to="/" className="p-3 e-link" activeClassName="active">Home</NavLink>
        {props.login
          ? <NavLink to="/login" className="p-3 e-link" activeClassName="active">Login</NavLink>
          : <NavLink to="/logout" className="p-3 e-link" activeClassName="active">Logout</NavLink>
        }
        {props.login
          ? <NavLink to="#" className="p-3 e-link disabled" activeClassName="active">Profile</NavLink>
          : <NavLink to="/profile" className="p-3 e-link" activeClassName="active">Profile</NavLink>
        }
      </nav>
    </header>
  );
}

export default NavBar