import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import './Home.css';
import Category from '../../components/Category';
import globalContext from '../../utils/globalContext';

function Home(){
    
    const {setValue} = useContext(globalContext);

    function handleSelector(event){
        const name = event.target.name;
        const value = event.target.value;
        console.log(`[name]: ${name}; [value]: ${value}`)
        switch(name){
            case 'category': setValue('select', value); break;
            case 'mode': {
                setValue('mode', value); 
                if(value === 'lvl') setValue('totalScore', 30);
                break;
            }
            default: {
                setValue('select', ''); 
                setValue('mode', 'ta'); 
                break;
            }
        }
    }

    function handleBtnClick(event){
        console.log(event);
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
                        <Category handleSelector={handleSelector} />
                    </div>
                    <hr/>
                    <div clas="cardBody" style= {{height: "40px", margin: "10px"}} >
                        <label className="category" htmlFor="ta" >Time Attack</label>
                        <input name='mode' type="Checkbox" value="ta" onChange={handleSelector} />
                        <label className="category" htmlFor="lvl" >Levels</label>
                        <input name='mode' type="Checkbox" value="lvl" onChange={handleSelector} />
                    </div>
                </div>
                <NavLink to='/game'><button className="btn btn-lg btn-primary" id="startButton" onClick={handleBtnClick}>Start</button></NavLink>
            </center>
        </div>
    );
}

export default Home;