import React from 'react'

const Input = ({type="text", placeholder,name, id , onChange}) => {
  return (
    <input type={type} placeholder={placeholder} name={name} id={id} autoComplete="off" className="py-3 text-center rounded-lg w-full bg-gray-100 focus:outline-none
    focus:border-amber-300 focus:ring-1 focus:ring-amber-300 transition-all duration-300 ease-in-out text-gray-700 px-5 " onChange={onChange} />
  )
}

export default Input