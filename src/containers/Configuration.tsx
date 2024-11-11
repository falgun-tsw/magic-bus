import { Stack } from "@mui/material";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom"; // Import Outlet for nested routes
import Tabs from "../components/targetAchivment/Tabs";

interface TabCategory {
  id: number;
  name: string;
  targetCount: number;
}

const dummyTabCategories: TabCategory[] = [
  { id: 1, name: "Manage Score", targetCount: 400 },
  // { id: 2, name: "Manage Award", targetCount: 200 },
  // { id: 3, name: "Targets", targetCount: 100 },
];

const ConfigurationContainer = () => {
  const navigate = useNavigate();

  const handleCategoryChange = (id: number) => {
    switch (id) {
      case 1:
        navigate("/configuration/manage-score");
        break;
      case 2:
        navigate("/configuration/manage-award");
        break;
      case 3:
        navigate("/configuration/targets");
        break;
      default:
        break;
    }
  };

  return (
    <Stack>
      <Tabs
        tabs={dummyTabCategories}
        handleTabChange={handleCategoryChange}
      />
      {/* Render the matched route component */}
      <Outlet />
    </Stack>
  );
};

export default ConfigurationContainer;
