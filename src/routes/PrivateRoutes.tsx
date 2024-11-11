import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import NotFound from "../pages/NotFound";
import Layout from "../containers/Layout";

import TargetAchievement from "../pages/TargetAchievement";
import UserManagement from "../pages/UserManagement";
import Leaderboard from "../pages/Leaderboard";
import Dashboard from "../pages/Dashboard";
import Reports from "../pages/Reports";
import Centres from "../pages/Centres";
import Qc from "../pages/Qc";

// configuration module pages
import Configuration from "../pages/Configuration";
import ManageAward from "../pages/configuration/ManageAward";
import ManageScore from "../pages/configuration/ManageScore";
import Targets from "../pages/configuration/Targets";
import helperMethods from "../helper/helperMethods";

const getRedirectUrl = () =>{
  const isUserManagemnt = helperMethods.isUserManagemnt();
  if(isUserManagemnt){
    return "/user-management";
  }
  return "/dashboard";
}


function PrivateRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to={getRedirectUrl()} replace />} />
        <Route path="*" element={<Navigate to={getRedirectUrl()} replace />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/qc" element={<Qc />} />
        <Route path="/target-achievement" element={<TargetAchievement />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/centres" element={<Centres />} />


        {/* Nested configuration routes */}
        <Route path="/configuration" element={<Configuration />}> {/*This is our Parent Route */}
        {/* Route index is like whenever our code navigates to parent route it will render the child route also  */}
          <Route index element={<Navigate to="/configuration/manage-score" replace />}/> {/* This is our Child Route */}
          <Route path="manage-score" element={<ManageScore />} />
          <Route path="manage-award" element={<ManageAward />} />
          <Route path="targets" element={<Targets />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default PrivateRoutes;
