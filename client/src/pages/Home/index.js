import React, {useState, useContext} from 'react';
import {NavLink} from 'react-router-dom';
import './Home.css';
import Category from '../../components/Category';
import globalContext from '../../utils/globalContext';

function Home(){
    
    const {setValue} = useContext(globalContext);

    const [category, setCategory] = useState('');
    const [mode, setMode] = useState('');

    function handleSelector(event){
        const name = event.target.name;
        const value = event.target.value;
        console.log(`[name]: ${name}; [value]: ${value}`)
        switch(name){
            case 'category': setCategory(value); break;
            case 'mode': setMode(value); break;
            default: break;
        }
    }

    function handleBtnClick(){
        setValue('category', category);
        setValue('mode', mode);
    }

    return (
        <div className="container">
            <div className="title">
                <h1 style = {{fontSize: "3rem", fontWeight: "bolder"}}>E-LOGICAL: TRIVIA</h1>
            </div>
            <center>
                <div className="card" id="gameCategory">
                    <div className="cardHeader" style={{height: "50px", fontSize: "1.6rem", color: "azure", padding: "10px", backgroundColor: "rgba(43, 79, 133, 0.954)"}}>
                        Select Category:
                        <Category value={category} handleSelector={handleSelector} />
                    </div>
                    <hr/>
                    <div className="cardBody" style= {{height: "40px", margin: "10px"}} >
                        <label className="mode">Time Attack</label>
                        <input name='mode' type="Checkbox" value="ta" onChange={handleSelector} />
                        <label className="mode" >Levels</label>
                        <input name='mode' type="Checkbox" value="lvl" onChange={handleSelector} />
                    </div>
                </div>
                <NavLink to='/game'><button className="btn btn-lg btn-primary" id="startButton" onClick={handleBtnClick} disabled={mode !== "" ? false : true}>Start</button></NavLink>
            </center>
        </div>
    );
}

export default Home;