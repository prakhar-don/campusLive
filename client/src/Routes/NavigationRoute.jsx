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


const NavigationRoute = () => {
  return (
     <BrowserRouter>
    
        <Routes>
          <Route path='/' element={<Layout><Home/></Layout>}/>
           <Route path='/dashboard' element={<Layout><DashBoard/></Layout>}/>
           <Route path='/login' element={<Layout><Login/></Layout>}/>
            <Route path='/signup' element={<Layout><SignUp/></Layout>}/>
            <Route path='/room/:roomId' element={<Room/>}/>
            <Route path='/event/:roomId' element={<Event/>}/>
            <Route path='/*' element={<Error/>}/>

          
          
        </Routes>
    
        </BrowserRouter>
  )
}

export default NavigationRoute