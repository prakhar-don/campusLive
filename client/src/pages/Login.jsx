import React from 'react'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import {toast} from 'react-hot-toast'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useContext} from 'react'
import {AppContext} from '../context/AppContext'




const Login = () => {

  const {isAuthenticated, setIsAuthenticated,setUser}= useContext(AppContext);
  const navigate= useNavigate();

  const handleSubmit= async (e)=>{
    e.preventDefault();

    try{
      const formadata= new FormData(e.target);

      const payLoad = {
        email:formadata.get("email"),
        password: formadata.get("password"),
      
      };

      const res= await axios.post(`${import.meta.env.VITE_API_URL}/login`,payLoad);

   const { data } = res;
const { token, user } = data.data;

      if(data.success){
        toast.success(data.message);
        e.target.reset();
        localStorage.setItem("token",token);
        localStorage.setItem("user",JSON.stringify(user));
        setUser(user);
        setIsAuthenticated(true);
        navigate("/dashboard");
      } else{
        toast.error(data.message);
      }

      

    } catch(err){
      toast.error(err.response.data.message);
    }

  }
  return (
    <div >
      <form className="sm:w-[50vw] mx-auto px-5 h-[80vh] flex flex-col justify-center gap-4" onSubmit={handleSubmit}>
        <Input type='email' name="email" placeholder='Email' id="email"/>
        <Input type='password' name="password" placeholder='Password' id="password"/>
        <Button text="Login"/>
      </form>
    </div>
  )
}

export default Login