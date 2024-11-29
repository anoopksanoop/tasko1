import { useEffect, useRef } from "react";
import axios from "axios";
import { useState } from "react";
import "./PostBox.css"
import { Link } from "react-router-dom";

const PostBox = ({ Newpost ,onDelete}) => {
  // debugger
    const [ post, setPost ] = useState({});
    const [ backgroundImage, setBackgroundImage ] = useState();

    
    // like functionality
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    let postBoxRef = useRef(null);
   


    const backgroundStyle = {
    backgroundPosition: "center",backgroundSize: "cover",backgroundRepeat: "no-repeat"}
    // debugger 
    // 
    


    

    useEffect(() => {
      if(postBoxRef){
        // debugger 
        postBoxRef.style.backgroundImage = 'url("'+backgroundImage+'")';    
      }
    }, [backgroundImage])
    

    useEffect(() => {
      setPost(Newpost);
       
        setTimeout(() => {
            // debugger 
          // backgroundImage = Newpost.image; 
          setLikeCount(Newpost.likeCount || 0);
          setLiked(localStorage.getItem(`liked_${Newpost.id}`) === 'true');
           setBackgroundImage(Newpost.image)
            
        }, 200);
        
    }, [Newpost])

    const handleDeleteClick = async () => {
        try {
          // Make an API call to delete the post
          await axios.delete(`http://localhost:3001/Grouprouter/posts/${post.id}`);
    
          // Trigger the onDelete callback to update the state in the parent component
          onDelete(post.id);
        } catch (error) {
          console.error("Error deleting post:", error.message);
         
        }
      };



      const handleLikeClick = async () => {
        const newLikedState = !liked;
        const newLikeCount = newLikedState ? likeCount + 1 : likeCount - 1;
    
        setLiked(newLikedState);
        setLikeCount(newLikeCount);
        localStorage.setItem(`liked_${post.id}`, newLikedState.toString());
    

        try {
          await axios.post(`http://localhost:3001/Grouprouter/posts/${post.id}/like`, {
            liked: newLikedState
          });
        } catch (error) {
          console.error("Error updating like status:", error.message);
        }
      };

 

      if(!post){
        return <></>
      }


      
    return (
      
      <div  id={`post-${post.id}`} key={post.id}  >
      {/* <!-- Card START --> */}
      {/* {group.value.map((item)=>{ */}
      <div className="card-pic"  >

        
         
        <div ref={ el =>  postBoxRef = el } className="h-80px rounded-top" data-image-url={backgroundImage}  style={ backgroundStyle}></div>
      
          <div className="card-body text-center pt-0">
          
          
            
            <h5 className="mb-0"> {post.imgdecs || 'General'}</h5>
          
        </div>
     
        <div className="card-footer mt-4 text-center">
       
        {sessionStorage.user && (
          <a className="btn btn-danger-soft btn-sm" onClick={handleDeleteClick} > Delete picture </a>
        )}
   


    <img  src="https://cdn-icons-png.flaticon.com/128/3128/3128313.png" onClick={handleLikeClick} style={{    width: "30px",
    marginLeft: "5px" , filter: liked ? '' : 'grayscale(90%)' ,border:"none" , marginLeft:'20px',  }}/>

         {liked ? '' : ''} ({likeCount})
        </div>

        
        {/* <!-- Card Footer END --> */}
      </div>
        {/* })}  */}
      {/* <!-- Card END --> */}
    </div>
)
}
export default PostBox;