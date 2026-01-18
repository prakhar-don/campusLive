import React from 'react'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import {toast} from 'react-hot-toast'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'




const SignUp = () => {

  const navigate= useNavigate();

  const handleSubmit= async (e)=>{
    e.preventDefault();

    try{

      const formdata= new FormData(e.target);

      const payload= {
        firstName: formdata.get("firstName"),
        lastName: formdata.get("lastName"),
        email: formdata.get("email"),
        password: formdata.get("password"),

      };

      const res= await axios.post(`${import.meta.env.VITE_API_URL}/signup`,payload);

      const data= await res.data;

      if(data.success){
        toast.success(data.message);
        e.target.reset();
        navigate("/login");
      } else{
        toast.error(data.message);
      }

      


    } catch(err){
      console.log(err);
    }
  }
  return (
    <div>
    <form action="" className="sm:w-[50vw] mx-auto px-5 h-[80vh] flex flex-col justify-center gap-4" onSubmit={handleSubmit}>

      <div className="flex gap-4">
        <Input id="firstName" name="firstName" placeholder="First name here" type="text"/>
        <Input id="lastName" name="lastName" placeholder="Last name here" type="text"/>

      </div>
      <Input id="email" name="email" placeholder="Email here" type="email"/>

      <div className="flex flex-col sm:flex-row gap-4">
        <Input id="password" name="password" placeholder="Password here" type="password"/>
        <Button text="Create Account" />


      </div>


    </form>
    </div>
    
  )
}

export default SignUp