import React ,{useState } from 'react'
import {useContext} from 'react'
import {AppContext} from '../context/AppContext'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import {toast} from 'react-hot-toast'
import axios from 'axios'
import RegisteredEventList from '../components/RegisteredEventList'


const DashBoard = () => {

  const [description, setDescription] = useState("");

  const {user}= useContext(AppContext);

  const registerEvent= async (e)=>{
    e.preventDefault();

    try{

    const formdata= new FormData(e.target);

    const rawDate= formdata.get("date");
    

    const formattedDate= new Intl.DateTimeFormat("en-US",{
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(rawDate));

     const time = formdata.get("time");

if (!time) {
  toast.error("Time is required");
  return;
}

const [hours, minutes] = time.split(":");

    const formattedTime= new Intl.DateTimeFormat("en-US",{

      hour:"numeric",
      minute:"numeric",
      hour12:true,
    }).format(new Date(0,0,0,hours,minutes));
    console.log(formdata.get("time"), typeof formdata.get("time"));


    const payload= {

      title: formdata.get("title"),
      description: formdata.get("description"),
      date: formattedDate,
      time: formattedTime,


    };


const res= await axios.post(`${import.meta.env.VITE_API_URL}/create-event`,payload,{

  headers:{
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }

})

const data= await res.data;

if(data.success){
  toast.success(data.message);
  e.target.reset();
  setDescription("");
}else{
  toast.error(data.message);
}


  } catch (err) {
  toast.error(
    err.response?.data?.message || 
    err.message || 
    "Something went wrong"
  );
}
}




  return (
    <div>
      {
        user?.role === "admin" && (<form className="w-full sm:w-[50vw] mx-auto px-5 grid gap-4 my-10" onSubmit={registerEvent}>

          <Input type="text" placeholder="Title here" id="title" name="title"/>
          <textarea className="py-3 text-center rounded-lg w-full bg-gray-100 focus:outline-none focus:border-amber-300 focus:ring-1 
          focus:ring-amber-300 transition-all duration-300 ease-in-out text-gray-700 px-5 " placeholder='Description here' id="description"
          value={description} name="description" Change={(e)=> setDescription(e.target.value)}>

          </textarea>

          <Input type="date" id="date" name="date"/>
          <Input type="time" id="time" name="time"/>
          <Button text="Create Event"/>
          


        </form> 
          
      )}
      <RegisteredEventList/>
    </div>

  );
  
}

export default DashBoard;