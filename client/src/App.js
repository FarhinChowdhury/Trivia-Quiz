import React, { useState } from "react";
import './App.css';
import {BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import LoginSignUp from "./components/LoginSignUp";

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
  const [displayLogin, setDisplayLogin] = useState(false);

  function handleLoginChange(evt) {
    let { name, value } = evt.target;
    // Update changed field + clear any error messages
    setFormInfo({...formInfo, [name]: value, error: ''});
  }

  function handleLoginSubmit(evt) {
    evt.preventDefault();
    // clear error message
    console.log('[handleSubmit]', formInfo);
    // check for valid email address
    if (formAction==='SignUp' &&
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formInfo.email)) {
      setFormInfo({...formInfo, error: 'Invalid email address!'});
      return;
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
      // Check success
      if (!res.success) {
        setFormInfo({...formInfo, error: 'Invalid credentials!'});
        return;
      }
    }
    // Successful login/signup!
    setCurUser(formInfo.username);
    // Clear form fields
    setFormInfo({ username:'', password:'', email:'', error:'' });
    // Hide form box
    setDisplayLogin(false);
  }

  function handleLoginFormType() {
    console.log('[handleLoginFormType]');
    if (formAction==='Login') {
      setFormAction('SignUp');
    } else {
      setFormAction('Login');
    }
  }

  let loginButton;
  if (curUser) {
    loginButton = <button className="mx-2" onClick={()=>{setCurUser(''); setFormAction('Login');}}>Logout</button>;
  } else {
    loginButton = <button className="mx-2" onClick={()=>setDisplayLogin(true)}>Login/SignUp</button>
  }

  return(
  <Router>
    <div className="App">
      <NavBar/>
      <Route path="/login">
        <LoginSignUp action={formAction} handleClick={handleLoginFormType}
                    formInfo={formInfo} handleChange={handleLoginChange} handleSubmit={handleLoginSubmit} />
      </Route>
      <Home />
    </div>
  </Router>
);
}

export default App;
