import { useEffect, useState } from "react";
import {  useParams } from "react-router";
import { useNavigate  } from "react-router-dom"
import PostBox from "../PostBox";

const SinglePost = () => {
    const [ post, setPost ] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const getPostById = async () => {

      try{
        const response = await fetch(`http://localhost:3001/Grouprouter/post/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json();
        //   debugger 
         if(data && data.post){
            // debugger
            setPost(data.post);
         }else{
           navigate('/Home')
         }
      }catch(e){

      }
        // debugger 
    }
    useEffect(() => {
        getPostById();

        return () => {

        }
    }, []);
    const handleDelete = () => {
        // debugger
        setTimeout(() => {
            navigate('/Home')
        }, 200);
        
    }

    return (
        <div className="col-lg-9">
           <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        {
                            post && <PostBox Newpost={post} onDelete={() => handleDelete() }/>
                            
                            
                        }
                    </div>
                </div>
           </div>
        </div>
    )

}

export default SinglePost;
