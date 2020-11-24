import React, {useState} from 'react'
import './App.css';
import globalContext from './utils/globalContext';

function App() {

  const [data, setData] = useState({
    select: '',
    mode: '',
    questions: [],
    setValue: (name, value) =>{
        setData({...data, [name]: value});
    }
  });

  return (
    <globalContext.Provider value={data}>
    <div className="App">

    </div>
    </globalContext.Provider>
  );
}

export default App;
