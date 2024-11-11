// src/routes/PublicRoutes.tsx
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/Login";
import NotFound from "../pages/NotFound";
import ResetPassword from "../pages/ResetPassword";

function PublicRoutes() {
  return (
    <Routes>
      <Route index element={<Navigate to={"/login"} />} />
      <Route path="/" element={<Navigate to={"/login"}/>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="*" element={<Navigate to={"/login"} />} />
    </Routes>
  );
}

export default PublicRoutes;
