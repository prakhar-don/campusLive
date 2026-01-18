import React from 'react'

const Button = ({text="Click here", onClick}) => {
  return (
    <button onClick={onClick} className="px-5 py-2 rounded-lg bg-amber-500 text-sm cursor-pointer hover:shadow-md transition-all duration-300 ease-in-out min-w-fit capitalize">{text}</button>
  )
}

export default Button