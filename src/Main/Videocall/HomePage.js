import React, { useCallback } from 'react'
import { useState } from 'react';
import "./HomeId.css"
import { useNavigate } from 'react-router';
import AOS from "aos"


const HomePage = () => {
  AOS.init();

    const [value, setValue] = useState();
    const navigate=useNavigate()

    const  HandleJoinRoom=useCallback(()=>{
    navigate(`/room/${value}`)
    },[navigate,value])
  return (
    <div className='formVideo' data-aos="zoom-in-up">
        <input className='InputID' type='text' placeholder='Enter  Room Code' value={value}  onChange={e=>setValue(e.target.value)} />
        <button  className="glow-on-hover" type="button" onClick={HandleJoinRoom}>Join</button>
    </div>
  )
}

export default HomePage