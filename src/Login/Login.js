import React, {useRef,useState ,useContext, useEffect} from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import './Login.css'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
import { footContext } from "../Context";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../Redux/UserSlice";
import { setUser } from "../Redux/UserSlice";

const Login = ({matchedUser}) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [id, setid] = useState("")
  const [userData, setUserData] = useState([])
  

  const dispatch=useDispatch()
const DataList= useSelector((state)=>state.datas);
const  user= useSelector(selectUser);
const data = useContext(footContext)
const inputRef = useRef()
const { setLogin,setShowChat,socket} = data
const nav=useNavigate()


// useEffect(()=>{

// },[]);
// console.log(userData)
 
    
  const handleSubmit = async (e,id) => {
    e.preventDefault()

  
    
  
  try {
    const response = await fetch("http://localhost:3001/Grouprouter/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    const userData = await response.json();

    // Handle successful login
    console.log('Login successful:', userData);

    const matchedUser = userData.user;
console.log(userData,'all')

    if (matchedUser) {
      dispatch(
        setUser({
          ...matchedUser,
          email: matchedUser.email,
          password: matchedUser.password,
          loggedIn: true,
        })
      );

      console.log("matched", matchedUser);

      if (socket) {
        // const room = matchedUser.id;
        // const username = matchedUser.name;
        // socket.emit("join_room", room, matchedUser.id);
        setShowChat(true);
      }

      nav(`/Home/`);
      setLogin(true);
    } else {
      // alert('User Not Found !!!');
    }




  } catch (error) {
    // Handle login error, show error message, etc.
    console.error('Login error:', error.message);
    // alert("error")

    const predefinedPassword = "yourPredefinedPassword";
    if(password=="" ){
      alert("password is Null")
      return
    }
    if (password !== predefinedPassword) {
      alert("Password is not correct");
      return; // Stop further execution
    }

    if(email==""){
      alert("Email is null")
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Email is not correct");
      return; // Stop further execution
    }
  }

  };
      //  debugger
 
  return (

    
    <Container className='area relative z-0 bg-black w-screen h-screen'>
      <ul class="circles">
      <li id="rtgle"></li>
      <li id="rtgle"></li>
      <li id="rtgle"></li>
      <li id="rtgle"></li>
      <li id="rtgle"></li>
      <li id="rtgle"></li>
      <li id="rtgle"></li>
      <li id="rtgle"></li>
      <li id="rtgle"></li>
      <li id="rtgle"></li>
    </ul>
      <Row  className="justify-content-center mt-5">
        <Col md={6}  style={{marginTop:"30px"}}>
          <Form ref={inputRef} style={{color: "white",
            background: "#0b0b0be8",
            padding: "10%",
            borderRadius:"20px",
            backgroundColor:"#212529"}}  onSubmit={handleSubmit}>
      <h1 className="login">LOGIN</h1>
      {/* <h3 className="login" style={{color:"gray"}}>please enter your login and password</h3> */}
      <br/>
      <br/>
            <Form.Group className="control">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                id="email"
               value={email}
               onChange={(e)=>setEmail(e.target.value)}
             
              />
              <Form.Control.Feedback type="invalid">
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                 id="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                
              </Form.Control.Feedback>
            </Form.Group>
           <br/>
          <Link className="login" style={{color:'#afacac'}} to={"/ForgetPassword"} >Forget password</Link>
          <br/>
           <div className="login">
           <Button variant="primary" type="submit" onClick={(event) => handleSubmit(event)}>
              Login
            </Button>
            </div>
            <br/>
            <br/>
            <span style={{color:'#afacac'}} className='login'>Don't have an account?
            <Link to="/">Sign Up</Link>
            </span>
            
          </Form>
        </Col>
      </Row>
    </Container>
    

  );
};

export default Login;





