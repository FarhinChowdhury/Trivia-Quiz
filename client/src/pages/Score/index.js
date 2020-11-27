import React, {useState, useContext, useEffect} from "react";
import './Score.css'
import API from '../../utils/API';
import globalContext from '../../utils/globalContext';

function Score(){

    const {username, mode, score, totalScore} = useContext(globalContext);

    const [userData, setUserData] = useState({});
    const [metaUser, setMetaUser] = useState([]);

    useEffect(function(){
        getUser();
        getAllHighscore();
    }, [])

    async function getUser(){
        const response = await API.getUserData(username);
        setUserData(response.data);
    }

    async function getAllHighscore(mode){
        const response = await API.getHighscore(mode);
        setMetaUser(response.data);
    }

    return(
        <body>
            <div className="container">
                <div className="row" style={{marginTop: "100px"}}>
                    <div className="col-lg-8">
                        <div className="card animate__animated animate__fadeInDown" id="userScore">
                            <h1>Your Score:</h1>
                            <center>
                                {mode === 'ta' ? 
                                    <div className=" card currentScore">
                                        {score}
                                    </div>
                                    :
                                    <div className=" card currentScore">
                                        {score}/{totalScore}
                                    </div>
                                }

                                <hr/>

                                <h3>Highest Score:</h3>
                                {mode === 'ta' ?
                                    <div className=" card highScore">
                                        {userData.highscore}
                                    </div>
                                    :
                                    <div className=" card currentScore">
                                       {score}/{totalScore}
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
                                        <p value ="userName"style={{float:"left"}}>{user.username}</p><p value="Score" style={{float: "right"}}>{mode === 'ta' ? user.highscore_TA : user.highscore_LVL}</p>
                                        <hr style={{borderBottom: "1px rgba(255, 119, 0, 0.817) dotted"}}/>
                                    </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <button id="re-play" className="btn btn-lg">
                            <i  className="fas fa-2x fa-redo"></i>
                        </button>
                    </div>
                </div>
            </div>

        </body>

    )

}
export default Score