import React, {useState} from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import Game from './pages/Game';
import Navbar from './components/NavBar';
import globalContext from './utils/globalContext';

function App() {

  const [data, setData] = useState({
    username: '',
    select: '',
    mode: '',
    score: 0,
    totalScore: 0,
    setValue: (name, value) =>{
        setData({...data, [name]: value});
    }
  });

  return (
    <globalContext.Provider value={data}>
      <Router>
        <Navbar />
        <Route exact path='/' component={Home} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/game' component={Game} />
      </Router>
    </globalContext.Provider>
  );
}

export default App;
