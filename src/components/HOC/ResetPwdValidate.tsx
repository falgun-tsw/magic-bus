import React, { useEffect, ReactNode, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation, Navigate, useSearchParams } from 'react-router-dom';
import { RootState } from '../../store';

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { clearUser } from "../../store/slices/userSlice";

interface AuthWrapperProps {
  children: ReactNode;
}

const ResetPwdValidate: React.FC<AuthWrapperProps> = ({ children }) => {

  // const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
//   const token = localStorage.getItem('token');

  const user = useSelector((state: RootState) => state.user);
  const [initPath, setInitPath]= useState("");
  const [searchParams] = useSearchParams();
  const accessToken = user?.accessToken;
  const isAuthenticated = user?.isAuthenticated;


  function isInvalidTokenFormat(token: string | null): boolean {
    if (!token) return true;
  
    // JWT token should consist of three parts separated by dots
    const parts = token.split('.');
  
    if (parts.length !== 3) {
      return true; // Invalid token format (should have 3 parts)
    }
  
    return false; // Valid JWT format
  }

  
  const checkAndRenderResetPage = () =>{
    // if path is not reset-password page.
    if(location.pathname !== "/reset-password"){
      return true;
    }

    // Invalid token.
    const resetToken = searchParams.get('token');
    if(isInvalidTokenFormat(resetToken)){
      return false;
    }

    // valid token
    if(accessToken){
      dispatch(clearUser());
      setInitPath(location.pathname);
      localStorage.setItem("reset_pwd_path",`${location.pathname}?token=${resetToken}`)
      return true
    }

    return true
  }
  

  return checkAndRenderResetPage() ? (
    <>{children}</>
  ) : <Navigate to={"/"} />;
};

export default ResetPwdValidate;
