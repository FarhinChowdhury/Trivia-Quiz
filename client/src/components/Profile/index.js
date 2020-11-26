import React from "react";
import './Profile.css';

function Profile(){
    return(
        <body>
            <div className="container">
                <div className="card" id="profileCard">
                    <div className="cardHeader">
                        <h3>PROFILE:</h3>
                    </div>
                    <div className="cardBody">
                        <div className="row">
                            <div className="col-lg-4">
                                <center>
                                    <img id ="profImg"src="https://via.placeholder.com/200" alt="placeholder"/>
                                </center>
                                

                            </div>
                            <div className="col-lg-8">
                                <div className="card" id="profDesc"style={{margin:"15px", padding:"20px"}}>
                                    <div >
                                        <h6>Name: FarhinChowdhury</h6>
                                        <h6>Higest Score:</h6>
                                        <h6>Decription: LOREMSDFJSDFSLF;SJD S;F;lJA;LJlkjlksdjfs;ldkfjsk Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate hic dolor quam voluptatum fugit, aliquam omnis unde excepturi iusto nobis alias a sint accusantium rem suscipit nostrum odit possimus atque!</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>

        </body>
    )
}

export default Profile;