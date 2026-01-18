import React from 'react'
import {Link} from 'react-router-dom'

const Event = ({_id,
  title="Default Title",
   description="Welcome to the event",
   date="2024-01-01",
   time="12:00",
   status="upcoming",
   registereUsers=0,
   onClick}) => {
  return (
    <div>
      <Link to={`/event/${_id}`} className="text-md sm:text-lg font-semibold text-gray-700 hover:underline cursor-pointer" title='View Event details'> {title} </Link>
    </div>
  )
}

export default Event