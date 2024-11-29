import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectUser } from "../Redux/UserSlice";
import { selectPost } from "../Redux/Postslice";
import { useState, useEffect } from "react";
import axios from "axios";
import AOS from "aos";
import PostBox from "./PostBox";
import ProfileAdd from "./ProfileAdd";
import { footContext } from "../Context";
import { useContext } from 'react';

const Condant = () => {
  AOS.init();
  const post = useSelector(selectPost);
  const user = useSelector(selectUser);
  const { id } = useParams();
  const data = useContext(footContext)
  const { Search} = data
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    setPosts([])
    try {
      let url = `http://localhost:3001/Grouprouter/posts`;
      if(id){
        url = `${url}/${id};`
      }
      const response = await axios.get(url);
      setPosts(response.data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error.message);
      // Handle error cases, if needed
    }
  };



  useEffect(() => {
    fetchPosts();
  }, [ id ])


  console.log("posts", posts);

  const handlePostDelete = (postId) => {
    // Update the posts state by removing the deleted post
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };
  return (
    
    <div className="col-md-8 col-lg-6 vstack gap-4" data-aos="fade-left">
      
      {/* <!-- Card END --> */}

      {/* <div className="col-md-8 col-lg-6 vstack gap-4"> */}
      {/* <!-- Card START --> */}
      <div className="card">
        
        {/* <!-- Card header START --> */}
        <div className="card-header border-0 pb-0">
          <div className="row g-2">
            {/* <div className="col-lg-2"> */}
              {/* <!-- Card title --> */}
              {/* <h1 className="h4 card-title mb-lg-0">
                Group <br></br>
                {user.name}
              </h1>
            </div> */}
            {/* <div className="col-sm-6 col-lg-3 ms-lg-auto">
             
              <select
                className="form-select js-choice choice-select-text-none"
                data-search-enabled="false"
              >
                <option value="AB">Alphabetical</option>
                <option value="NG">Newest group</option>
                <option value="RA">Recently active</option>
                <option value="SG">Suggested</option>
              </select>
            </div> */}
            <div className="col-sm-6 col-lg-3">
              {/* <!-- Button modal --> */}
              {sessionStorage.user && (
              <Link to={"/PostForm"}>
                <a
                  className="btn btn-primary-soft ms-auto w-100"
                  data-bs-toggle="modal"
                  data-bs-target="#modalCreateGroup"
                >
                  {" "}
                  <i className="fa-solid fa-plus pe-1"></i> Create Post
                </a>
              </Link>
              )}
            </div>
          </div>
        </div>
        {/* <!-- Card header START --> */}
        {/* <!-- Card body START --> */}
        <div className="card-body" style={{background:"linear-gradient(45deg, black, transparent)"}}>
          {/* <!-- Tab nav line --> */}
          <ul className="nav nav-tabs nav-bottom-line justify-content-center justify-content-md-start">
            <li className="nav-item">
              {" "}
              <a className="nav-link active" data-bs-toggle="tab" href="#tab-1">
                {" "}
                Friends' Posts{" "}
              </a>{" "}
            </li>
           
            
          </ul>
          <div className="tab-content mb-0 pb-0" >
            {/* 
                <!-- Friends groups tab START --> */}
            <div className="tab-pane fade show active" id="tab-1" >
              <div className="row g-4" >
                
                
        {posts.filter((Newpost)=>{
           const postName = Newpost.imgdecs || '';
           return !Search || postName.toLowerCase().includes(Search.toLowerCase());
        })
               .map((Newpost) => {
                  return <div className={`col-sm-6 col-lg-4`} key={Newpost.id}><PostBox key={Newpost.id} Newpost={Newpost}  onDelete={handlePostDelete}  /></div>;
                })}

                { !posts.length && <div>Not posts found...</div>}
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Card body END --> */}
      </div>
      {/* <!-- Card END --> */}
    </div>
    // </div >
  );
};

export default Condant;
