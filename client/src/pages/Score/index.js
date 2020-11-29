import React, {useState, useContext, useEffect} from "react";
import {NavLink} from 'react-router-dom';
import './Score.css'
import API from '../../utils/API';
import {globalContext} from '../../utils/globalContext';

function Score(){

    const [data, setData] = useContext(globalContext);

    const [metaUser, setMetaUser] = useState([]);

    useEffect(function(){
        console.log(data.mode);
        getAllHighscore(data.mode);
        switch(data.mode){
            case 'ta':{
                if(data.score > data.highscore_TA) updateHighscore({highscore_TA: data.score}, data.username);
                break;
            }
            case 'lvl': {
                if(data.score > data.highscore_LVL) updateHighscore({highscore_LVL: data.score}, data.username );
                break;
            }
            default: break;
        }
    }, [])

    async function getAllHighscore(mode){
        const response = await API.getHighscore(mode);
        setMetaUser(response.data);
    }

    async function updateHighscore(score, username){
        await API.updateHighscore(score, username);
    }

    return(
            <div className="container">
                <div className="row" style={{marginTop: "100px"}}>
                    <div className="col-lg-8">
                        <div className="card animate__animated animate__fadeInDown" id="userScore">
                            <h1>Your Score:</h1>
                            <center>
                                {data.mode === 'ta' ? 
                                    <div className="card currentScore">
                                        {data.score}
                                    </div>
                                    :
                                    <div className="card currentScore">
                                        {data.score}/{data.totalScore}
                                    </div>
                                }

                                <hr/>

                                <h3>Highest Score:</h3>
                                {data.mode === 'ta' ?
                                    <div className=" card highScore">
                                        {data.highscore_TA}
                                    </div>
                                    :
                                    <div className=" card highScore">
                                       {data.highscore_LVL}/{data.totalScore}
                                    </div>
                                }
                            </center>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card" id ="scoreBoard">
                            <h5 style={{marginTop: "10px"}}>Leader Board:</h5>
                            <div className="card leaderList" >
                                <div style={{margin:"10px"}}>
                                    {metaUser.map(user => 
                                    <>
                                        <p value ="userName"style={{float:"left"}}>{data.username}</p><p value="Score" style={{float: "right"}}>{data.mode === 'ta' ? user.highscore_TA : user.highscore_LVL}</p>
                                        <hr style={{borderBottom: "1px rgba(255, 119, 0, 0.817) dotted"}} />
                                    </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <NavLink to='/home'>
                            <button id="re-play" className="btn btn-lg">
                                <i  className="fas fa-2x fa-redo"></i>
                            </button>
                        </NavLink>
                    </div>
                </div>
            </div>
    )

}
export default Score