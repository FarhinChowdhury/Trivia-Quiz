import React, { useRef, useContext } from "react";
import API from '../../utils/API';
import "./ProfilePic.css"
import { globalContext } from "../../utils/globalContext";

// Expecting props = { 
//                      src: <url> // img url or '' if no profile pic exists
//                      updatePic: function(<url>) { } // takes img url, adds url to user's state info
//                   }
function ProfilePic(props) {

  const [data, setData] = useContext(globalContext); 
  let temp = {...data};

  let inputFile = useRef();

  function setProfilePicUrl(url) {
    temp.pic_url = url;
    setData({...temp});
    localStorage.setItem('curUser', JSON.stringify(temp));
    console.log(`[setProfilePicUrl] user=${data.username} pic=${url}`);
  }

  function getAndResizeImg() {
    let fileReader = new FileReader();

    // Setup fileReader file load event
    fileReader.addEventListener('load', function (event) {
      let image = new Image();
      
      // Setup img load event
      image.addEventListener('load', function(){
          // RESIZE IMG
          //document.getElementById("original-Img").src=image.src;
          var canvas=document.createElement("canvas");
          var context=canvas.getContext("2d");

          let MAX_WIDTH = 400;
          let MAX_HEIGHT = 400;
          let calcWidth = image.width;
          let calcHeight = image.height;

          if (calcWidth > calcHeight) {
            if (calcWidth > MAX_WIDTH) {
              calcHeight *= MAX_WIDTH / calcWidth;
              calcWidth = MAX_WIDTH;
            }
          } else {
            if (calcHeight > MAX_HEIGHT) {
              calcWidth *= MAX_HEIGHT / calcHeight;
              calcHeight = MAX_HEIGHT;
            }
          }
          canvas.width=calcWidth;
          canvas.height=calcHeight;
          context.drawImage(image,
              0,
              0,
              image.width,
              image.height,
              0,
              0,
              canvas.width,
              canvas.height
          );
          
          //document.getElementById("upload-Preview").src = canvas.toDataURL();
          // Convert resized img back to file
          canvas.toBlob(function(blob) {
            const profilePic = new File([blob], 'temp.png', { type: "image/png" });
            // console.log('[profilePic]', profilePic);
    
            // Upload file to server
            let formData = new FormData();
            formData.append('username', data.username)
            formData.append('profile_pic', profilePic);
            API.updateUserPic(formData)
            .then(res => setProfilePicUrl(res.data.pic_url))
            .catch(err => console.log('[axios post /api/image] err=', err));
          })
      });
      image.src=event.target.result;
    });
    
    //check and retuns the length of uploded file.
    if (inputFile.current.files.length === 0) { 
      return; 
    }
    
    //Is Used for validate a valid file.
    let uploadFile = inputFile.current.files[0];
    if (!uploadFile.type.match(/image.*/)) {
      alert("Please select a valid image."); 
      return;
    }
    
    fileReader.readAsDataURL(uploadFile);
  }

  return (
      <div className="container" style={{marginTop:"150px",marginBottom:"100px"}}>
        <div className="card m-2" id="profileCard">
          <div className="cardHeader">
              <h3>PROFILE:</h3>
          </div>
          <div className="cardBody">
              <div className="row">
                  <div className="col-lg-4 col-sm-12">
                    <div className="container">

                      <div className="profile-pic">
                        <img className="propic m-1"src={data.pic_url} alt="Upload a Profile Pic" />

                      </div>
                      {data.pic_url ? <></> :
                          <>
                            {/* <label htmlFor="uplaod">Browse:</label> */}
                            <input id="upload" name="upload" type="file" ref={inputFile} onChange={getAndResizeImg} />
                          </>
                        }

                  </div>
                </div>
                  <div className="col-lg-8">
                    <div className="card" id="profDesc" style={{margin:'20px'}}>
                      <div style={{margin: '15px'}}>
                        <h6>Username: {data.username}</h6>
                        <h6>Time Attack Highest Score: {data.highscore_TA === 0 ? 'N/A' : `${data.highscore_TA}`}</h6>
                        <h6>Levels Highest Score: {data.highscore_LVL === 0 ? 'N/A' : `${data.highscore_LVL}`}</h6>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>
      </div>
  )
}

export default ProfilePic;