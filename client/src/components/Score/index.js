import React from "react";
import './Score.css'

function Score(){
    return(
        <body>
            <div className="container">
                <div className="row" style={{marginTop: "100px"}}>
                    <div className="col-lg-8">
                        <div className="card animate__animated animate__fadeInDown" id="userScore">
                            <h1>Your Score:</h1>
                            <center>

                                <div className=" card currentScore">
                                    20/50
                                    
                                </div>

                                <hr/>

                                <h3>Highest Score:</h3>    
                                <div className=" card highScore">
                                    30/50

                                </div>
                            </center>
                        </div>

                    </div>
                    <div className="col-lg-4">
                        <div className="card" id ="scoreBoard">
                            <h5 style={{marginTop: "10px"}}>Leader Board:</h5>
                            <div className="card leaderList" >
                                <div style={{margin:"10px"}}>
                                    <p value = "userName"style={{float:"left"}}>UserName</p><p value="Score" style={{float: "right"}}>Score</p>
                                    <hr style={{borderBottom: "1px rgba(255, 119, 0, 0.817) dotted"}}/>
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