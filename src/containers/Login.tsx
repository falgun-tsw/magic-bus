import React, { useEffect } from "react";

// react-hook-form
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useLocation, Navigate, useSearchParams } from 'react-router-dom';

import { useAppDispatch } from "../hooks/reduxHooks";

// Page
import LoginForm from "../components/Login/LoginForm";

// @mui components
import Card from "../components/mui/Card";
import Box from "../components/mui/Box";

// Actions
import { useUserLoginMutation } from "../store/apis/userApi";
import { setUser } from "../store/slices/userSlice";

interface LoginForm {
  loginCredential: {
    email: string;
    password: string;
  };
}

const LoginContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [loginAction, { data, isLoading }] = useUserLoginMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginForm>({
    defaultValues: {
      loginCredential: {
        email: "",
        password: "",
      },
    },
  });

  const handleLoginFormSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      const res: any = await loginAction(data.loginCredential);
      dispatch(setUser(res.data.data));
      
    } catch (error: any) {
      console.log("correct error");
      console.error(error.data);
    }
  };
  useEffect(() =>{
    const reset_pwd_path = localStorage.getItem("reset_pwd_path");
    if(reset_pwd_path){
      localStorage.removeItem("reset_pwd_path");
      navigate(reset_pwd_path);
    }
  },[]);

  return (
    <div>
      <Card
        sx={{ maxWidth: 450, padding: 2.5, borderRadius: 4, boxShadow: 14 }}
      >
        <Box sx={{ margin: 4, overflow: "hidden", boxSizing: "border-box" }}>
          <LoginForm
            control={control}
            errors={errors}
            handleSubmit={handleSubmit(handleLoginFormSubmit)}
            loading={isLoading}
          />
        </Box>
      </Card>
    </div>
  );
};

export default LoginContainer;
