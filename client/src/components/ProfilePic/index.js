import React, { useRef } from "react";
import "./ProfilePic.css"

// Expecting props = { 
//                      src: <url> // img url or '' if no profile pic exists
//                      updatePic: function(<url>) { } // takes img url, adds url to user's state info
//                   }
function ProfilePic(props) {
  let inputFile = useRef();

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

          let MAX_WIDTH = 200;
          let MAX_HEIGHT = 200;
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
            formData.append('profile_pic', profilePic);
            let settings = {
              method: 'post',
              body: formData
            }
            // TBD API
            fetch('/api/image', settings)
            .then(res => res.json())
            .then(res => {
              console.log('[post /api/image b] response=', res.pic_url);
              props.updatePic(res.pic_url);
            })
            .catch(err => {
              console.log('[post /api/image c] response=', err);
            });
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
      <div className="container">
        <div className="card fade-In" id="profileCard">
          <div className="cardHeader">
              <h3>PROFILE:</h3>
          </div>
          <div className="cardBody">
              <div className="row">
                  <div className="col-lg-4">
                    <div classNameName="border border-info rounded float-right profile-pic p-2 m-2">
                      <img src={props.src} alt="Upload a Profile Pic" />
                      {props.src ? <></> : 
                        <>
                          {/* <label htmlFor="uplaod">Browse:</label> */}
                      <input id="upload" name="upload" type="file" ref={inputFile} onChange={getAndResizeImg} />
                        </>
                      }
                    </div>

                  </div>
                  <div className="col-lg-8">
                    <div className="card" id="profDesc">
                      <div style="margin:15px;">
                        <h6>Name: FarhinChowdhury</h6>
                        <h6>Highest Score: </h6>
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