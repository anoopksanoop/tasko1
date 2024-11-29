



import React from 'react'
import {ZegoUIKitPrebuilt} from "@zegocloud/zego-uikit-prebuilt"
import { useContext } from 'react';
import { footContext } from '../../Context';
import { useParams } from 'react-router-dom';
const RoomPage = () => {

  const { id } = useParams();

  const myMeeting=async (element)=>{
    const appID=1489474735 ;
    const serverSecret="58e37c93d2f4b659bd2cda9ed9f44ac6";
    const kitToken= ZegoUIKitPrebuilt.generateKitTokenForTest(appID,
      serverSecret,
      id,
      Date.now().toString(),
      " ");

const zc= ZegoUIKitPrebuilt.create(kitToken);
zc.joinRoom({
  container:element,
  sharedLinks:[
    {
name:"Copy Link",
url:`http://localhost:3000/room/${id}`
    }
],
  scenario:{
    mode:ZegoUIKitPrebuilt.OneONoneCall,
  },
  showScreenSharingButton:true
})

  }
  return (
    <div >
      <div data-aos="zoom-out-right">
        <h1  data-aos="fade-right">Room {id}</h1>
      </div>
        <div ref={myMeeting}/>
    </div>
  )
}

export default RoomPage