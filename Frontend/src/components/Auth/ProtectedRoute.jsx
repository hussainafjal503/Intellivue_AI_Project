import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute() {
  const { isAuthenticated,user } = useSelector((state) => state.auth);

  // console.log(isAuthenticated)
  // console.log(user);

  return isAuthenticated && user.role==="user" ? <Outlet /> : <Navigate to={"/login"} />;
}

export default ProtectedRoute;
