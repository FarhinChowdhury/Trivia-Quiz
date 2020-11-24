import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom"
import NavBar from "./components/NavBar"
import Home from "./components/Home"

function App() {  
  return(
  <div className="App">
  <NavBar/>
  <Home />

  </div>
);
}

export default App;
