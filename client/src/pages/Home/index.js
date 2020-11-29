import React, {useState, useContext} from 'react';
import {NavLink} from 'react-router-dom';
import './Home.css';
import Category from '../../components/Category';
import {globalContext} from '../../utils/globalContext';

function Home(){
    
    const [data, setData] = useContext(globalContext);
    var temp = {...data};

    const [category, setCategory] = useState('');
    const [mode, setMode] = useState('');
    const [btn1, setBtn1] = useState(false);
    const [btn2, setBtn2] = useState(false);

    function handleSelector(event){
        const name = event.target.name;
        const value = event.target.value;
        console.log(`[name]: ${name}; [value]: ${value}`)
        switch(name){
            case 'category': setCategory(value); break;
            case 'mode': {
                switch(value){
                    case 'ta': {
                        if(!btn1) {
                            setBtn1(true);
                            setBtn2(false);
                        }
                        else {
                            setBtn1(false);
                            setMode('');
                            return;
                        }
                        break;
                    }
                    case 'lvl': {
                        if(!btn2) {
                            setBtn2(true);
                            setBtn1(false);
                        } 
                        else {
                            setBtn2(false);
                            setMode('');
                            return;
                        }
                        break;
                    }
                    default: break;
                }
                setMode(value); 
                break;
            }
            default: break;
        }
    }

    function handleBtnClick(){
        temp.category = category; temp.mode = mode;
        if(temp.mode === 'lvl') temp.totalScore = 30;
        setData({...temp});
    }

    return (
        <div className="container">
            <div className="title">
                <h1 style = {{fontSize: "3rem", fontWeight: "bolder"}}>E-LOGICAL: TRIVIA</h1>
                <h3 style = {{fontSize: "3rem", fontWeight: "bolder"}}>ARE YOU UP FOR THE CHALLENGE?</h3>
            </div>
            <center>
                <div className="card" id="gameCategory">
                    <div className="cardHeader" style={{borderBottom: '2px solid #d0894b', height: '65px'}}>
                        Select Category:
                        <Category handleSelector={handleSelector} />
                    </div>
                    {/* <hr style={{borderTop: '2px solid #d0894b', width: '100%'}}/> */}
                    <div className="btn-group" role="group" >
                        <button name="mode" type="button" className={btn1 ? "btn btn-dark" : "btn btn-outline-dark"} value="ta" onClick={handleSelector} 
                                style={btn1 ? {backgroundColor: 'rgba(43, 79, 133, 0.954)', color: 'white'} : {color:'white'}}>Time Attack</button>
                        <button name="mode" type="button" className={btn2 ? "btn btn-dark" : "btn btn-outline-dark"} value="lvl" onClick={handleSelector} 
                                style={btn2 ? {backgroundColor: 'rgba(43, 79, 133, 0.954)', color: 'white'} : {color:'white'}}>Levels</button>
                    </div>
                </div>
                <NavLink to='/game'>
                    <button className="btn btn-lg btn-primary" id="startButton" onClick={handleBtnClick} disabled={mode !== "" ? false : true}>Start</button>
                </NavLink>
            </center>   
        </div>
    );
}

export default Home;