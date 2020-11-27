import React, { useState, useEffect } from "react";
import './App.css';
import {BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import LoginSignUp from "./components/LoginSignUp";
import Logout from "./components/Logout";
import ProfilePic from "./components/ProfilePic";

function App() {
  let emptyUser = {username:'', highscore_TA:'', highscore_LVL:'', pic_url:''}

  // DEBUG API (until real API added)
  const API = {
    createUser: function(data) {
      console.log('[createUser]', data);
      return ({username: formInfo.username, highscore_TA: 10, highscore_LVL: 15, pic_url:''});
    },
    loginUser: function(data) {
      console.log('[loginUser]', data);
      let res =  Math.random()<0.8 
        ? ({username: formInfo.username, highscore_TA: 10, highscore_LVL: 15, pic_url:''})
        : emptyUser;
      return res;
    }
  }
  // LOGIN FORM STATE AND FUNCTIONS

  const [curUser, setCurUser] = useState(emptyUser);
  const [formInfo, setFormInfo] = useState({ username:'', password:'', email:'', error:'' });
  const [formAction, setFormAction] = useState('Login');

  useEffect(function(){
    if(localStorage.getItem('curUser')) {
      setCurUser(JSON.parse(localStorage.getItem('curUser')));
    }
  }, []);

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
    let res;
    if (formAction==='SignUp') {
      res = API.createUser({
        username: formInfo.username,
        email: formInfo.email,
        password: formInfo.password
      });
    } else {
      res = API.loginUser({
        username: formInfo.username,
        password: formInfo.password
      });
      // Check success (TBD)
      if (!res.username) {
        setFormInfo({...formInfo, error: 'Invalid credentials!'});
        return false;
      }
    }
    localStorage.setItem('curUser', JSON.stringify(res));
    // Successful login/signup!
    setCurUser(res);
    // Clear form fields
    setFormInfo({ username:'', password:'', email:'', error:'' });
    // Advance to game page by returning true
    return true;
  }

  function handleLoginFormType() {
    // console.log('[handleLoginFormType]');
    if (formAction==='Login') {
      setFormAction('SignUp');
    } else {
      setFormAction('Login');
    }
  }

  function handleLogout() {
    setCurUser(emptyUser);
    localStorage.removeItem('curUser');
    setFormAction('Login');
  }

  function setProfilePicUrl(url) {
    let updatedUser = {...curUser, pic_url: url};
    localStorage.setItem('curUser', JSON.stringify(updatedUser));
    setCurUser(updatedUser);
    console.log('[setProfilePicUrl] user=', updatedUser);
  }

  return(
  <Router>
    <div className="App">
      <NavBar login={curUser.username===''} />
      <Route path="/login">
        <LoginSignUp action={formAction} handleClick={handleLoginFormType}
                    formInfo={formInfo} handleChange={handleLoginChange} handleSubmit={handleLoginSubmit} />
      </Route>
      <Route path="/logout"><Logout handleLogout={handleLogout} /></Route>
      {curUser.username ? <ProfilePic src={curUser.pic_url} updatePic={setProfilePicUrl} /> : <></>}
      <Home />
    </div>
  </Router>
);
}

export default App;
