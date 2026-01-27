import React ,{ useContext, useState} from 'react'
import {AppContext} from '../context/AppContext'
import {useNavigate} from 'react-router-dom'
import {useEffect} from 'react'
import axios from 'axios'
import {AiOutlineLoading3Quarters} from 'react-icons/ai'
import Event from './Event'
import {toast} from 'react-hot-toast'



const RegisteredEventList = () => {

    const [events, setEvents] = useState([]);

    const [loading, setLoading]= useState(false);

    const {user}= useContext(AppContext);

    const navigate= useNavigate();


   /* useEffect(()=>{

      const registeredEvents= async ()=>{

      const res= await axios.get(`${import.meta.env.VITE_API_URL}/registered-events`,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },


      });

      const {data}= await res.data;

      setEvents(data.registeredEvents);

      console.log(events);

      }

      registeredEvents();


    },[])
    */

   useEffect(() => {
  const fetchEvents = async () => {
    setLoading(true);
    try {
      let eventsArray = [];

      if (user?.role === "admin") {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/admin-created-events`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        eventsArray = res.data.data; // already array
      } else {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/registered-events`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        eventsArray = res.data.data.registeredEvents; // 🔥 extract array
      }

      setEvents(eventsArray || []);
    } catch (error) {
      toast.error("Failed to load events");
      setEvents([]); // safety
    } finally {
      setLoading(false);
    }
  };

  if (user) fetchEvents();
}, [user]);



   /* const startEvent= async (eventId , eventStatus)=>{
      setLoading(true);

      if(user.role !== "admin"){
        if(eventStatus === "started"){
          setLoading(false);
          navigate(`/room/${eventId}`);
          return;
        }
      } else{
        if(eventStatus === "not started"){
          const res= await axios.put(`${import.meta.env.VITE_API_URL}/start-event/${eventId}`,{},
            {
              headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`

              }
            }

            );

            const data= await res.data;
            if(data.success){
              setLoading(false);
              navigate(`/room/${eventId}`);
              toast.success(data.message);
            } else{
              setLoading(false);
              toast.error(data.message);
            }
        }
      }

      if(eventStatus === "ended"){
        setLoading(false);
        toast.error("Event has already ended");
      }

    }
      */

    const startEvent = async (eventId, eventStatus) => {
  setLoading(true);

  try {
    // USER FLOW
    if (user.role !== "admin") {
      if (eventStatus === "started") {
        navigate(`/room/${eventId}`);
        return;
      }

      if (eventStatus === "ended") {
        toast.error("Event has already ended");
        return;
      }
    }

    // ADMIN FLOW
    if (user.role === "admin") {
      if (eventStatus === "not started") {
        const res = await axios.put(
          `${import.meta.env.VITE_API_URL}/start-event/${eventId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = res.data;

        if (data.success) {
          toast.success(data.message);
          navigate(`/room/${eventId}`);
          return;
        } else {
          toast.error(data.message);
          return;
        }
      }

      if (eventStatus === "started") {
        navigate(`/room/${eventId}`);
        return;
      }
    }
  } catch (error) {
    toast.error("Failed to start event");
  } finally {
    // 🔥 GUARANTEED STOP
    setLoading(false);
  }
};

  



 /* return (
    <>

    {
      loading ? (
        <div className="">
          <AiOutlineLoading3Quarters className="animate-spin text-4xl text-gray-500 mx-auto"/>
        </div>
      ): (
        <div className="">
          {
            events?.length === 0 && (
             <div className="w-full sm:w-[50vw] mx-auto px-5 h-[80vh] flex flex-col justify-center items-center"> 

              <h1 className="text-2xl text-gray-600">No Events registered</h1>
             
             </div>


            )

          }
          <div className="w-full sm:w-[50vw] mx-auto px-5 grid grid-cols-1 sm:grid-cols-2 gap-4 my-10">
            {events.map((event)=>(
                 <Event key={event?._id} {...event} onClick= {()=> startEvent(event?._id,event?.status)} />
            ))}
          </div>
        </div>
      )
    }


    
    </>
  )
    */

  return (
  <>
    {/* 🔄 Loading spinner */}
    {loading && (
      <div className="flex justify-center my-6">
        <AiOutlineLoading3Quarters className="animate-spin text-4xl text-gray-500" />
      </div>
    )}

    {/* 🚫 Empty state */}
    {!loading && events?.length === 0 && (
      <div className="w-full sm:w-[50vw] mx-auto px-5 h-[80vh] flex flex-col justify-center items-center">
        <h1 className="text-2xl text-gray-600">No Events registered</h1>
      </div>
    )}

    {/* 📋 Event list */}
    {!loading && events?.length > 0 && (
      <div className="w-full sm:w-[50vw] mx-auto px-5 grid grid-cols-1 sm:grid-cols-2 gap-4 my-10">
        {events.map((event) => (
          <Event
            key={event._id}
            {...event}
            onClick={() => startEvent(event._id, event.status)}
          />
        ))}
      </div>
    )}
  </>
);
}

export default RegisteredEventList