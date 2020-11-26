import React from "react"
import './Home.css'


function Home(){
    return(
        <body>
            <div className="container">
                <div className="title">
                    <h1 style = {{fontSize: "3rem", fontWeight: "bolder"}}>E-LOGICAL: TRIVIA</h1>
                </div>
                <center>
                    <div className="card gameCategory" id="gameCategory">
                        <div className="cardHeader" style={{height: "50px", fontSize: "1.6rem", color: "azure", padding: "10px", backgroundColor: "rgba(43, 79, 133, 0.954)", borderRadius:"20px"}}>
                            Select Category:
                        </div>
                        <hr/>
                        <div clas="cardBody" style= {{height: "40px", margin: "10px"}}>
                            <label className="category"for="ta">Time Attack</label>
                            <input id="ta" name="category" type="radio" value="Time Attack"/> /
                            <label className="category" for="lvl">Levels</label>
                            <input id="lvl" name="category" type="radio" value="Levels"/>
                        </div>
                    </div>
                    <button className="btn btn-lg btn-primary"id="startButton">Start</button>
                </center>
            </div>

        </body>

    )
}


export default Home;