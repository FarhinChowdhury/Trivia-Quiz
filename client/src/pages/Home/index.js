import React, {useState, useContext} from 'react';
import {NavLink} from 'react-router-dom';
import './Home.css';
import Category from '../../components/Category';
import {globalContext} from '../../utils/globalContext';
import {useHistory} from 'react-router-dom';

function Home(){
    
    const [data, setData] = useContext(globalContext);
    var temp = {...data};

    let history = useHistory();

    const [category, setCategory] = useState('');
    const [mode, setMode] = useState('');
    const [btn1, setBtn1] = useState(false);
    const [btn2, setBtn2] = useState(false);

    function handleSelector(event){
        const name = event.target.name;
        const value = event.target.value;
        //console.log(`[Home] [name]: ${name}; [value]: ${value}`)
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
        if (data.username==='') {
            history.push('/login');
        } else {
            temp.category = category; temp.mode = mode;
            if(temp.mode === 'lvl') temp.totalScore = 30;
            setData({...temp});
            history.push('/game');
        }
    }

    return (
        <div className="container">
            <div className="title m-2 pt-sm-5">
                <h1 style = {{fontSize: "3rem", fontWeight: "bolder"}}>E-LOGICAL: TRIVIA</h1>
                <h3 style = {{fontSize: "3rem", fontWeight: "bolder"}}>ARE YOU UP FOR THE CHALLENGE?</h3>
            </div>
            <center>
                <div className="card" id="gameCategory">
                    <div className="cardHeader" style={{borderBottom: '2px solid #d0894b', height: '100px'}}>
                        Select Category:<br />
                        <Category handleSelector={handleSelector} />
                    </div>
                    {/* <hr style={{borderTop: '2px solid #d0894b', width: '100%'}}/> */}
                    <div className="btn-group" role="group" >
                        <button name="mode" type="button" className={btn1 ? "btn btn-dark" : "btn btn-outline-dark"} value="ta" onClick={handleSelector} 
                                style={btn1 ? {backgroundColor: 'rgba(0, 0, 133, 0.954)', color: 'white'} : {color:'white'}}>Time Attack</button>
                        <button name="mode" type="button" className={btn2 ? "btn btn-dark" : "btn btn-outline-dark"} value="lvl" onClick={handleSelector} 
                                style={btn2 ? {backgroundColor: 'rgba(0, 0, 133, 0.954)', color: 'white'} : {color:'white'}}>Levels</button>
                    </div>
                </div>
                <button className="btn btn-lg btn-primary" id="startButton" onClick={handleBtnClick} disabled={mode !== "" ? false : true}>Start</button>
            </center>   
        </div>
    );
}

export default Home;