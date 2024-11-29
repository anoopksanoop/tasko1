import React from 'react'
import "./Profile.css"
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { selectUser } from '../../Redux/UserSlice'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect ,useState} from 'react'
import { RiFacebookCircleLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";
import { TbBrandLinkedin } from "react-icons/tb";


const ProfilePage = () => {
     const user = useSelector(selectUser);
     const [posts, setPosts] = useState([]);

     useEffect(() => {
        // Fetch posts from the backend when the component mounts
        const fetchPosts = async () => {
          try {
            const response = await axios.get(
                `http://localhost:3001/Grouprouter/posts?userId=${user.id}`
            );
            setPosts(response.data.posts);
          } catch (error) {
            console.error("Error fetching posts:", error.message);
            // Handle error cases, if needed
          }
        };
    
        fetchPosts();
      }, [user.id]);
    
    

  return (
    <div className='col-lg-9'>


   


      <div className="container mt-5">
      <div className="row d-flex justify-content-center">
        <div className="col-md-7">
          <div className="card p-3 py-4">
            <div className="text-center">
              <img src={user.image} width="100" className="" alt="User Avatar" />
            </div>
            <div className="text-center mt-3">
         
              <h5 className="mt-2 mb-0">{user.name}</h5>
              <span>{user.decs}</span>
              <div className="px-4 mt-1">
               
              </div>
              <ul className="social-list ">
                <Link to={"https://www.facebook.com/anoopsachuz01/"}>
                 <i className=""><RiFacebookCircleLine className='icons' /></i>
                 </Link>
                {/* <li><i className="fa fa-dribbble"></i></li> */}
                <Link to={"https://www.instagram.com/ak._str_om/"}>
                <i className=""><FaInstagram  className='icons'/></i>
                </Link>
                <Link to={"https://www.linkedin.com/in/anoop-k-s-a80784246"}>
                <i className=""><TbBrandLinkedin className='icons'/></i>
                </Link>
                {/* <li><i className="fa fa-google"></i></li>  */}
              </ul>
              <div className="buttons">
                {/* <button className="btn btn-outline-primary px-4">Message</button> */}
                <button className="btn btn-primary px-4 ms-3">Contact</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    </div>
  )
}

export default ProfilePage