import React, {useState, useEffect} from 'react'
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
import globalContext from './utils/globalContext';


function App() {

  const [data, setData] = useState({
    username: '',
    pic_url: '',
    highscore_TA: '',
    highscore_LVL: '',
    category: '',
    mode: '',
    score: 0,
    totalScore: 0,
    setValue: (name, value) =>{
      setData({...data, [name]: value});
    },
    updateGameData: (category, mode) => {
      console.log(data);
      setData({...data, category, mode});
    },
    updateUserData: (username, pic_url, highscore_TA, highscore_LVL) => {
      setData({...data, username, pic_url, highscore_TA, highscore_LVL});
    }
  });

  // let emptyUser = {username:'', highscore_TA:'', highscore_LVL:'', pic_url:''}

  // DEBUG API (until real API added)
  // const API = {
  //   createUser: function(data) {
  //     console.log('[createUser]', data);
  //     return ({username: formInfo.username, highscore_TA: 10, highscore_LVL: 15, pic_url:''});
  //   },
  //   loginUser: function(data) {
  //     console.log('[loginUser]', data);
  //     let res =  Math.random()<0.8 
  //       ? ({username: formInfo.username, highscore_TA: 10, highscore_LVL: 15, pic_url:''})
  //       : emptyUser;
  //     return res;
  //   }
  // }
  // LOGIN FORM STATE AND FUNCTIONS
  const [formInfo, setFormInfo] = useState({ username:'', password:'', email:'', error:'' });
  const [formAction, setFormAction] = useState('Login');

  useEffect(function(){
    if(localStorage.getItem('curUser')) {
      let {username, pic_url} = JSON.parse(localStorage.getItem('curUser'));
      data.updateUserData(username, pic_url);
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
      // Check success (TBD)
      if (!res.data.username) {
        setFormInfo({...formInfo, error: 'Invalid credentials!'});
        return false;
      }
    }
    localStorage.setItem('curUser', JSON.stringify({username: res.data.username, pic_url: res.data.pic_url}));
    // Successful login/signup!
    // data.updateUserData(res.data.username, res.data.pic_url, res.data.highscore_TA, res.data.highscore_LVL);
    setData({...data, username: res.data.username, pic_url: res.data.pic_url, highscore_TA: res.data.highscore_TA, highscore_LVL: res.data.highscore_LVL})
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
    data.updateUserData('','');
    localStorage.removeItem('curUser');
    setFormAction('Login');
  }

  function setProfilePicUrl(url) {
    localStorage.setItem('curUser', JSON.stringify({username: data.username, pic_url: url}));
    //data.setValue('pic_url', url); // Doesn't work!???!!!
    setData({...data, pic_url: url});
    console.log(`[setProfilePicUrl] user=${data.username} pic=${url}`);
  }

  console.log(`[App] user=${data.username} pic=${data.pic_url}`);
  return (
    <globalContext.Provider value={data}>
      <Router>
        <Navbar login={data.username===''} />
        <Route path="/login">
          <LoginSignUp action={formAction} handleClick={handleLoginFormType}
                      formInfo={formInfo} handleChange={handleLoginChange} handleSubmit={handleLoginSubmit} />
        </Route>
        <Route path="/logout"><Logout handleLogout={handleLogout} /></Route>
        {data.username ? <ProfilePic src={data.pic_url} updatePic={setProfilePicUrl} /> : <></>}
        <Switch>
          <Route exact path='/game' component={Game} />
          <Route exact path='/score' component={Score} />
          <Route path='/' component={Home} />
        </Switch>
      </Router>
    </globalContext.Provider>
  );
}

export default App;