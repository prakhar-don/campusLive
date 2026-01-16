import React from 'react'
import { Toaster } from 'react-hot-toast'
import Navbar from '../components/Navbar'

const Layout = ({children}) => {
  return (
    <>
     <Navbar/>
     <Toaster position="top-center" reverseOrder={false} toastOptions={{style:{} ,
      success:{style:{
        background:"#4BB543",
        color:"#fff",
        boxShadow:"",
      }},


     }} />
     {children}

    </>
  )
}

export default Layout