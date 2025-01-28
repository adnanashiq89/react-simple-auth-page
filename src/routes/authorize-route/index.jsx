import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthorizeWrapper = () => {
  const auth = localStorage.getItem("token");
  return auth ? <Outlet /> : <Navigate to="/signin" />;
};
export default AuthorizeWrapper;
