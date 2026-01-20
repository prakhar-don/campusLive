import React, { use } from 'react'
import {useParams} from 'react-router-dom'
import {useContext} from 'react'
import {AppContext} from '../context/AppContext'
import {useNavigate} from 'react-router-dom'
import {ZegoUIKitPrebuilt} from '@zegocloud/zego-uikit-prebuilt'
import axios from 'axios'
import {toast} from 'react-hot-toast'


const Room = () => {

  const {roomId}= useParams();
  const navigate= useNavigate();
  const {user} = useContext(AppContext);

  const endLive = async ()=>{
    try{

      const res= await axios.put(`${import.meta.env.VITE_API_URL}/end-event/${roomId}`,{},{

        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }

      });

      const data= await res.data;

      if(data.success){
        toast.success(data.message);
        navigate("/dashboard");
      } 
      else{
        toast.error(data.message);
      }

    } catch(error){
      toast.error(error.response.data.message);
      

    }
  }
  const joinRoom= (element)=>{
    const appId= Number(import.meta.env.VITE_ZEGOCLOUD_APP_ID);
    const serverSecret= import.meta.env.VITE_ZEGOCLOUD_SERVER_SECRET;

    const userId= user._id;
    const username= user.firstName + " " + user.lastName;

    let role= user.role === "admin" ? ZegoUIKitPrebuilt.Host : ZegoUIKitPrebuilt.Audience;

    const kitToken= ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId, serverSecret, roomId, userId, username
    );

    const zp= ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.LiveStreaming,
        config:{
          role,
        }
      },

      liveNotStartedTextForAudience:"Event not started yet",
      onLeaveRoom:()=>{
        if (user.role === "admin"){
          endLive();
          return;
        } else{

          navigate("/dashboard");
        }
      }
    })




  }



  return (
    <div ref={joinRoom} className="w-full h-[80vh]"></div>
  )
}

export default Room