import React from 'react'
import {Link} from 'react-router-dom'
import Button from './ui/Button'
import {FiUsers} from 'react-icons/fi'  
import {useLocation} from 'react-router-dom'
import {useContext} from 'react'
import {AppContext} from '../context/AppContext'  

const Event = ({_id,
  title="Default Title",
   description="Welcome to the event",
   date="2024-01-01",
   time="12:00",
   status="upcoming",
   registeredUsers=[],
   onClick}) => {

    const {pathname} = useLocation();
    const {user} = useContext(AppContext);

    const checkEventStatus=()=>{
      if(pathname === '/dashboard'){
        if(user?.role === "admin"){
          return status === "not started" ? "start now": status;
    }

    if(user?.role === "user"){
      return status === "not started" ? "Upcoming" : status;
    }
  }else{
    return status === "not started" ? "Register" : status;
  }



  }


  return (
    <div className="p-3 w-full rounded-lg bg-gray-50 shadow-md flex flex-col gap-1 hover:scale-[1.02] transition-all duration-300 cursor-pointer ease-in-out">

      <Link to={`/event/${_id}`} className="text-md sm:text-lg font-semibold text-gray-700 hover:underline cursor-pointer" title='View Event details'> {title} </Link>
      <p className="text-sm sm:text-md text-gray-500 ">{
        description.length>100 ? description.slice(0,100) + "...": description }  </p>

        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <h3 className="text-xs sm:text-sm text-slate-500 flex gap-2">
              On: {date} at {time}
            </h3>
            <div>
              <FiUsers className="text-sm sm:text-lg"/>
              <span>{registeredUsers.length} Registered Users</span>

            </div>
          </div>
          <Button text={checkEventStatus()} onClick={onClick}  />
          
        </div>


    </div>
  )
}

export default Event