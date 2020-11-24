import React, {useState} from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import globalContext from './utils/globalContext';

function App() {

  const [data, setData] = useState({
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
        <Route exact path='/' component={Home} />
        <Route exact path='/game' component={Game} />
        <Route exact path='/score' component={Score} />
      </Router>
    </globalContext.Provider>
  );
}

export default App;
