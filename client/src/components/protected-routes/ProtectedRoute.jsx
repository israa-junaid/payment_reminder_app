import React from "react";
import { Routes, Route, Link, Navigate, Outlet } from "react-router-dom";
import { toast } from "react-hot-toast";

const ProtectedRoute = ({  redirectPath = "/login", children }) => {
  let isAuthenticated = null;
  if (localStorage.getItem("token") == null || undefined || "") {
    isAuthenticated = false;
    localStorage.clear();
  
  } else if (localStorage.getItem("token")){
    isAuthenticated = true;
  }
  else isAuthenticated = false;
 
  if (isAuthenticated === false) {
    return <Navigate to={redirectPath} />;
  } else return children ? children : <Outlet />;
};

export default ProtectedRoute;
