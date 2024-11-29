import React, { useRef } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../Redux/UserSlice";
import { addPost } from "../../Redux/Postslice";
import { useState } from "react";
import axios from "axios";
import "./PostForm.css"

const PostForm = () => {
    const fileUploadRef = useRef();
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = new useNavigate();

    const [imgdecs, setimgDecs] = useState("");
    const [tempImagePath, setTempImagePath] = useState();
    const [postimage, setImage] = useState("");
   
   
  



const handleSubmit=async(event,id)=>{
    event.preventDefault();
   const formdata=new FormData()
   formdata.append('image',postimage);
   formdata.append('userId', user.id)
   formdata.append("imgdecs",imgdecs)
    dispatch(
        addPost({
            userId:user.id,
            imgdecs:imgdecs,
            postimage:postimage,
        
        })
      );
      
    try {
      // Send signup data to the server using Axios
      const response = await axios.post(
        "http://localhost:3001/Grouprouter/Posts",
        formdata
      );
  
      console.log(response.data);
      // Redirect or perform any other actions upon successful signup
    } catch (error) {
      console.log("Error Posts:", error.message);
      // Handle error cases, if needed
    }

    navigate(`/Home/`);
      
}



const triggerFileUpload = () => {
  // debugger 
  // fileUploadRef.current
  console.log(fileUploadRef)
  try{
    fileUploadRef.current.click();
  }catch(e){

  }
  
} 

const handleImageChange = (e) => {
    const selectedFile = e.target.files[0]; // Corrected typo: .files instead of .file
    setImage(selectedFile);
    setTempImagePath(URL.createObjectURL(selectedFile))
}
   

  const HandleDeleteImage=(e)=>{
    setImage("")
  
  }

  function navHome(id) {
    navigate(`/Home`);
  }

  const defaultImage = 'https://static.cognitoforms.com/app/file-uploads.cea7a48397aad113ab5dce06491381ef.png';
  return (
    <div
      className="d-flexs justify-content-center align-items-center mt-5"
      id="modalCreateGroup"
      tabindex="-1"
      aria-labelledby="modalLabelCreateGroup"
      aria-hidden="true"
    >
      <div className="modal-dialog w-50">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modalLabelCreateGroup">
              Create Post
            </h5>
            <button
              onClick={() => navHome(user.id)}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form>

              <div className="mb-3">


                <label className="form-label">post picture</label>

                <div className="d-flex align-items-center">
                  <div className="avatar-uploader me-3">
                    <div className="avatar-edit">
                      <input
                        type="file"
                        id="post-upload"
                        accept="image/*"
                      onChange={handleImageChange}
                      ref={ fileUploadRef }
                       required
                      />
                      <label for="post-upload"></label>
                    </div>

                    <div className="avatars avatar-xl position-relative">
                      <img
                        id="avatar-preview"
                        className="avatar-img border border-white border-3 shadow"
                        src={tempImagePath || postimage || defaultImage}
                        onClick={ (e) => triggerFileUpload(e) }
                        alt=""
                      />
                    </div>
                  </div>

                  <div className="avatar-remove">
                    <button
                      type="button"
                      id="avatar-reset-img"
                      className="btn btn-light"
                      onClick={HandleDeleteImage}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>

              <div className="mb-3">


                <label className="form-label"> Description</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add post description here"
                  value={imgdecs}
                  onChange={(e)=>setimgDecs(e.target.value)}
                />
              </div>
            </form>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-success-soft" onClick={handleSubmit }>
              Create now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
