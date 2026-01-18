import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '../Layouts/Layout'
import Home from '../pages/Home'
import DashBoard from '../pages/DashBoard'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import Room from '../pages/Room'
import Event from '../pages/Event'
import Error from '../pages/Error'
import ProtectedRoutes from '../Routes/ProtectedRoutes'



const NavigationRoute = () => {
  return (
     <BrowserRouter>
    
        <Routes>
          <Route path='/' element={<Layout><Home/></Layout>}/>
           <Route path='/dashboard' element={<Layout><ProtectedRoutes><DashBoard/></ProtectedRoutes></Layout>}/>
           <Route path='/login' element={<Layout><ProtectedRoutes><Login/></ProtectedRoutes></Layout>}/>
            <Route path='/signup' element={<Layout><ProtectedRoutes><SignUp/></ProtectedRoutes></Layout>}/>
            <Route path='/room/:roomId' element={<ProtectedRoutes><Room/></ProtectedRoutes>}/>
            <Route path='/event/:roomId' element={<ProtectedRoutes><Event/></ProtectedRoutes>}/>
            <Route path='/*' element={<Error/>}/>

          
          
        </Routes>
    
        </BrowserRouter>
  )
}

export default NavigationRoute