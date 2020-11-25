import React from "react"
import './Game.css'

function Game(){
    return(
        <body>
            <center>
            <div className="container">
                    <div className="card" id = "questionCard">
                        <h3 style={{borderBottom: "2px rgba(255, 119, 0, 0.817) solid"}}>WRITE YOUR QUESTION HERE</h3>
                        <hr />
                        <div id='block-11' style={{padding: '10px;'}}>
                            <label for='option-11' style={{padding: '5px', fontSize: '1.5rem'}}>
                            <input type='radio' name='option' value='6/24' id='option-11' style={{transform: 'scale(1.6)', marginRight: '10px', verticalAlign: 'middle', marginTop: '-2px'}} />
                            ANSWER 1</label>
                            <span id='result-11'></span>
                        </div>
                        <hr />
                        <button className="enterBtn">
                            ENTER
                        </button>
                    </div>

            </div>
        </center>
    </body>
    )
}

export default Game;