import React , {useContext} from 'react'   

import {AppContext} from "../context/AppContext";
import { useNavigate ,Link} from 'react-router-dom';
import Button from './ui/Button';

const Navbar = () => {
 const {isAuthenticated , setIsAuthenticated,setUser} = useContext(AppContext);

 const navigate = useNavigate();
 const handleLogout =()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
    navigate("/");
 }

  return (
    <nav className="flex justify-between items-center p-5 w-full md:w-[50vw] max-auto mt-3">

        <Link to={"/"} className='text-2xl'>CampusLive</Link>

        {isAuthenticated ? (

          <ul className="flex gap-3">
            <Link className="px-5 py-2 rounded-lg bg-amber-500 text-sm cursor-pointer hover:shadow-md transition-all duration-300 ease-in-out" to={"/dashboard"}>DashBoard</Link>
            <Button text={"Logout"} onClick={handleLogout}/>
            

          </ul>
        ):(
            <ul className="flex gap-3">
                <Link className="px-5 py-2 rounded-lg bg-amber-500 text-sm cursor-pointer hover:shadow-md transition-all duration-300 ease-in-out"to={"/login"}>Login</Link>
                <Link className="px-8 py-2 rounded-lg bg-amber-500 text-sm cursor-pointer hover:shadow-md transition-all duration-300 ease-in-out"to={"/signup"}>SignUp</Link>
            </ul>
        )}

    </nav>
    
  )
}

export default Navbar