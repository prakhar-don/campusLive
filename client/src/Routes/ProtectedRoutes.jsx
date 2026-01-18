import React from 'react'
import {useLocation} from 'react-router-dom'

const ProtectedRoutes = ({children}) => {

    const {pathName} = useLocation();

    const isAuthenticated = !!localStorage.getItem("user");

    if(isAuthenticated && (pathName === "/login" || pathName === "/signup")){
        return <Navigate to="/dashboard"/>

    }

    if(!isAuthenticated && pathName === "/dashboard"){
        return <Navigate to="/login"/>

    }

    return children;





 
}

export default ProtectedRoutes