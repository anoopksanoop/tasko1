import{React,useEffect} from 'react'
import { footContext } from './Context';
import Header from "./Common/Header";
import SideBar from "./Main/SideBar";
import ChatBox from "./Main/ChatBox";
import SideNav from "./Home/SideNav";
import Condant from "./Home/Condant";
import Login from './Login/Login';
import SignupForm from './LSiginupPage/Siginup';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from 'react';
import PostForm from './Home/CreatePost/PostForm';
import ProfileAdd from './Home/ProfileAdd';
import RoomPage from './Main/Videocall/RoomPage';
// server side
import io from "socket.io-client"
import HomePage from './Main/Videocall/HomePage';
import ProfilePage from './Home/ProfilePage/ProfilePage';
import PageNotFound from './404/PageNotFound';
import SinglePost from './Home/Post/SinglePost';
import './App.css'

let socketIO;;

const Router = () => {
  // server side
  const [showChat, setShowChat] = useState(false);
  const [socket, setSocket] = useState(null);
  const [messageList, setMessageList] = useState([]);


  // useEffect(() => {
   
  // }, [])

  const [login, setLogin] = useState(false)
  const [password, setPassword] = useState([])
  const [Loginuser, setLoginUser] = useState([])
  const [value, setvalue] = useState();
  
  const [Search, setSearch] = useState("")

const user={
  login,
  setLogin,
  password,
  setPassword,
  Loginuser,
  setLoginUser,
value,
setvalue,
Search,
setSearch,

// server side
  showChat,
  setShowChat,
  socket,
  setSocket,
messageList,
setMessageList
}

useEffect(() => {
  
  if(!socket){
    socketIO = io.connect("http://localhost:3001")
    setSocket(socketIO);
  }
  
  return () => {
    setSocket(null)
  }
}, [setSocket])

  return (
    <div>
        <BrowserRouter>
        <footContext.Provider value={user}>
        <Header/>
          <div className="container" style={{ marginTop: "70px" }}>
            <div className="row gx-0">
            <Routes>
           <Route path='*' element={<><PageNotFound/></>}/>
            {/* {login ? ( */}
            <Route path="/chatBox/:id?" element={<><SideBar/><ChatBox/></>} />,
            <Route path="/Home/:id?"  element={<><SideNav /><Condant /><Header/></>} />
               {/* ):( */}
        
            <Route path='login' element={<Login/>}/>
           
              {/* )} */}
              <Route  path='/PostForm' element={<PostForm/>}/>
              <Route path='/post/:id' element={<><SideNav /><SinglePost/></>}/>
            <Route path='/ProfileAdd' element={<ProfileAdd/>}/>
            <Route path='/' element={<SignupForm/>}/>
            <Route path='HomePage' element={<HomePage/>}/>
            <Route path='/room/:id' element={<RoomPage/>}/>
            <Route path='/profilepage' element={<><SideNav/><ProfilePage/></>}/>

            <Route path='/users' element={<user/>}/>
              </Routes>
            </div>
          </div>
          </footContext.Provider>
      </BrowserRouter>
    </div>
  )
}

export default Router