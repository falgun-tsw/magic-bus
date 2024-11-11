import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";


import { useLocation, useNavigate } from "react-router-dom";
import { SxProps, Theme } from "@mui/material";
import { useMediaQuery, useTheme } from '@mui/material';
import helperMethods from "../../helper/helperMethods";

const userManagementTabs = [
  { label: "User Management", path: "/user-management" },
  { label: "Centres", path: "/centres" },
];

const firstLayerTabs = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Leaderboard", path: "/leaderboard" },
  { label: "QC", path: "/qc" },
  { label: "Configuration", path: "/configuration" },
  { label: "Target achievement", path: "/target-achievement" },
  { label: "User Management", path: "/user-management" },
  { label: "Reports", path: "/reports" },
  { label: "Centres", path: "/centres" },
];


const tabIndicatorStyles: SxProps<Theme> = {
  bgcolor: "rgb(89, 89, 89)",
  height: "2px",
};

const NavigationBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const isUserManagemnt = helperMethods.isUserManagemnt();
  let tabs: any = [];
  if(isUserManagemnt){
    tabs = userManagementTabs;
  }else{
    tabs = firstLayerTabs;
  }


  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up("md"));

  const selectedIndex = tabs.findIndex((tab: any) => tab.path === currentPath);
  const [value, setValue] = React.useState(selectedIndex !== -1 ? selectedIndex : 0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    navigate(tabs[newValue].path);
  };

  return (
    <Box sx={{ bgcolor: "rgb(255, 255, 255)" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant={isMediumScreen ? "fullWidth" : "scrollable"}
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        TabIndicatorProps={{
          sx: tabIndicatorStyles,
        }}
      >
        {tabs.map((tab: any, index: any) => (
          <Tab
            key={index}
            label={tab.label}
            sx={{
              padding: "3px 7px",
              textTransform: "capitalize",
              color: "#242424",
              "&.Mui-selected": {
                fontWeight: 700,
                color: "#242424",
                backgroundColor: "#FEF7DA",
              },
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
}


export default NavigationBar;
