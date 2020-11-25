import React, { useState } from "react";
import './App.css';
import {BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import LoginSignUp from "./components/LoginSignUp";
import Logout from "./components/Logout";

function App() {
  // DEBUG API (until real API added)
  const API = {
    createUser: function(data) {
      console.log('[createUser]', data);
    },
    loginUser: function(data) {
      console.log('[loginUser]', data);
      return Math.random()<0.8 ? {success: true} : {success: false};
    }
  }
  // LOGIN FORM STATE AND FUNCTIONS
  const [curUser, setCurUser] = useState('');
  const [formInfo, setFormInfo] = useState({ username:'', password:'', email:'', error:'' });
  const [formAction, setFormAction] = useState('Login');

  function handleLoginChange(evt) {
    let { name, value } = evt.target;
    // Update changed field + clear any error messages
    setFormInfo({...formInfo, [name]: value, error: ''});
  }

  function handleLoginSubmit(evt) {
    evt.preventDefault();
    // console.log('[handleSubmit]', formInfo);
    // check for valid email address
    if (formAction==='SignUp' &&
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formInfo.email)) {
      setFormInfo({...formInfo, error: 'Invalid email address!'});
      return false;
    }
    if (formAction==='SignUp') {
      API.createUser({
        username: formInfo.username,
        email: formInfo.email,
        password: formInfo.password
      });
    } else {
      let res = API.loginUser({
        username: formInfo.username,
        password: formInfo.password
      });
      // Check success (TBD)
      if (!res.success) {
        setFormInfo({...formInfo, error: 'Invalid credentials!'});
        return false;
      }
    }
    // Successful login/signup!
    setCurUser(formInfo.username);
    // Clear form fields
    setFormInfo({ username:'', password:'', email:'', error:'' });
    // Advance to game page by returning true
    return true;
  }

  function handleLoginFormType() {
    console.log('[handleLoginFormType]');
    if (formAction==='Login') {
      setFormAction('SignUp');
    } else {
      setFormAction('Login');
    }
  }

  function handleLogout() {
    setCurUser('');
    setFormAction('Login');
  }

  return(
  <Router>
    <div className="App">
      <NavBar login={curUser===''} />
      <Route path="/login">
        <LoginSignUp action={formAction} handleClick={handleLoginFormType}
                    formInfo={formInfo} handleChange={handleLoginChange} handleSubmit={handleLoginSubmit} />
      </Route>
      <Route path="/logout"><Logout handleLogout={handleLogout} /></Route>
      <Home />
    </div>
  </Router>
);
}

export default App;
