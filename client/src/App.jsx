import { useState } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import NavigationRoute from './Routes/NavigationRoute.jsx'
import { AppProvider } from './context/AppContext.jsx'

import './App.css'

function App() {
  

  return (
    <>
    <AppProvider>
    <NavigationRoute/>
    </AppProvider>
    </>
  )
}

export default App
