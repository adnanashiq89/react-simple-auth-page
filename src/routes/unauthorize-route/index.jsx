import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const UnAuthorizedWrapper = () => {
  const auth = localStorage.getItem('token');
  return auth ? <Navigate to='/' /> : <Outlet />;
};
export default UnAuthorizedWrapper;
