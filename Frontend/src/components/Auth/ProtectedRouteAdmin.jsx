import React from 'react'
import { Navigate, Outlet,useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {toast} from 'react-toastify'


function ProtectedRouteAdmin() {
	const navigateTo=useNavigate();
	 
	 const { isAuthenticated,user } = useSelector((state) => state.auth);

	
	//  console.log(user);
	//  if(user?.role==='user'){
	// 		toast.warning("Your are not Authorized to Access this resource")

	// 	return <Navigate to="/" />
	//  }
 
		if(isAuthenticated && user.role==='admin'){
			return	<Outlet/>
		}else if(isAuthenticated && user.role==='user'){
			return navigateTo("/")
		}

		if(!isAuthenticated){
			return <Navigate to="/login"/>
		}


	//  return isAuthenticated && user.role==="admin" ? <Outlet/> : 
	//  	isAuthenticated && user.role==='user' ? <Navigate to="/"/> :
	//  <Navigate to={"/login"} />
}

export default ProtectedRouteAdmin
