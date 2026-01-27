import React from 'react'
import SearchBar from '../components/SearchBar'
import Event from '../components/Event'
import {useContext} from 'react'
import {AppContext} from '../context/AppContext'
import {useEffect} from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'


const Home = () => {
  const {events,setEvents}= useContext(AppContext);

  const registerEvent= async (eventId)=>{
    try{

      const res= await axios.put(`${import.meta.env.VITE_API_URL}/register/${eventId}`,{},{

        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }

      });

      const data=  res.data;

      if(data.success){
        toast.success(data.message);
         setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === eventId
            ? { ...event, registeredUsers: data.data.registeredUsers }
            : event
        )
      );
      console.log("Updated registered users:", data.data.registeredUsers);

      
    } else{
        toast.error(data.message);
      }


    } catch(err){
      toast(err.response?.data?.message || "Registration Failed");
    }
  }
useEffect(()=>{
  const getEvents= async ()=>{
     const res= await axios.get(`${import.meta.env.VITE_API_URL}/get-events`);

     setEvents(res.data.data);

  }
  getEvents();
},[]);


  return (
     <div className="flex flex-col justify-center items-center mt-5 gap-5">
      <SearchBar/>
      <div className="w-full lg:w-[50vw] mx-auto px-5 grid grid-cols-1 sm:grid-cols-2 gap-4 my-10">
        {
          events?.map((event)=>{

            return (
              <Event key={event._id} {... event} onClick={()=> registerEvent(event._id)}/>
            )

})
        }

      </div>
      
      </div>
    
  )
}

export default Home