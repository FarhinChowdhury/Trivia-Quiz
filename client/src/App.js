import React, {useState, useEffect, useContext} from 'react'
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import API from './utils/API';
import Home from './pages/Home';
import Game from './pages/Game';
import Score from './pages/Score';
import Navbar from './components/NavBar';
import LoginSignUp from "./components/LoginSignUp";
import Logout from "./components/Logout";
import ProfilePic from "./components/ProfilePic";
import {globalContext} from './utils/globalContext';

function App() {

  const [data, setData] = useContext(globalContext);
  var temp = {...data};

  const [formInfo, setFormInfo] = useState({ username:'', password:'', email:'', error:'' });
  const [formAction, setFormAction] = useState('Login');

  useEffect(function(){
    if(localStorage.getItem('curUser')) {
      let {username, pic_url, highscore_TA, highscore_LVL} = JSON.parse(localStorage.getItem('curUser'));
      // data.updateUserData(username, pic_url);
      temp.username = username;
      temp.pic_url = pic_url;
      temp.highscore_TA = highscore_TA;
      temp.highscore_LVL = highscore_LVL;
      setData({...temp});
    }
  }, []);

  function handleLoginChange(evt) {
    let { name, value } = evt.target;
    // Update changed field + clear any error messages
    setFormInfo({...formInfo, [name]: value, error: ''});
  }

  async function handleLoginSubmit(evt) {
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
      res = await API.createUser({
        username: formInfo.username,
        email: formInfo.email,
        password: formInfo.password
      });
      console.log(res);
    } else {
      res = await API.loginUser({
        username: formInfo.username,
        password: formInfo.password
      });
      // Check success
      // console.log('[handleLoginSubmit]', res.data);
      if (!res.data.username) {
        // console.log('[handleLoginSubmit] bad login');
        setFormInfo({...formInfo, error: 'Invalid credentials!'});
        return false;
      }
    }
    // Successful login/signup!
    // data.updateUserData(res.data.username, res.data.pic_url, res.data.highscore_TA, res.data.highscore_LVL);
    temp.username = res.data.username; temp.pic_url = res.data.pic_url; temp.highscore_TA = res.data.highscore_TA; temp.highscore_LVL = res.data.highscore_LVL;
    setData({...temp});
    localStorage.setItem('curUser', JSON.stringify(temp));
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
    temp.username = ''; temp.pic_url = ''; temp.highscore_TA = 0; temp.highscore_LVL = 0;
    setData({...temp});
    localStorage.removeItem('curUser');
    setFormAction('Login');
  }

  // console.log(`[App] user=${data.username} score=${data.score} highscore_TA=${data.highscore_TA} pic=${data.pic_url}`);
  return (
      <Router>
        <Navbar login={data.username===''} />
        <Route path="/login">
          <LoginSignUp action={formAction} handleClick={handleLoginFormType}
                      formInfo={formInfo} handleChange={handleLoginChange} handleSubmit={handleLoginSubmit} />
        </Route>
        <Route path="/logout"><Logout handleLogout={handleLogout} /></Route>
        <Switch>
          <Route exact path='/game' component={Game} />
          <Route exact path='/score' component={Score} />
          <Route exact path='/profile' component={ProfilePic} />
          <Route path='/' component={Home} />
        </Switch>
      </Router>
  );
}

export default App;