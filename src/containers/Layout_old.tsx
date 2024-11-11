import React, { useState } from "react";

// router
import { Outlet } from "react-router-dom";

// store
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { setFilter, clearUser } from "../store/slices/userSlice";
import { RootState } from "../store";

// mui component
import MagicContainer from "../components/common/MagicContainer";
import Container from "../components/mui/Container";
import Drawer from "../components/mui/Drawer";
import Stack from "../components/mui/Stack";

// components
import DrawerAppBar from "../components/layout/DrawerAppBar";
import AppBar from "../components/layout/AppBar";

// Action
import { useProgramWithYearsQuery, useQuarterQuery } from "../store/apis/headerApi";

const Header = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state: RootState) => state.user.filter);
  const isSelectQuarter = filter.selectedProgram !== undefined && filter.selectedYear !== undefined;

  const [mobileOpen, setMobileOpen] = useState(false);

  // Actions
  const { data: programWithYears = {} } = useProgramWithYearsQuery({});
  const { data: quarterData = [] } = useQuarterQuery({});

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleFilterSelect = (name: string, value: number) => {
    dispatch(
      setFilter({
        [name]: value,
      })
    );
  };

  const handleLogout = () => {
    console.log("hhh");
    dispatch(clearUser());
  };

  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <Drawer
        sx={{
          display: { xs: "block", md: "none" },
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 200,
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
          },
        }}
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <DrawerAppBar
          ProgramAndYearFilter={programWithYears}
          quarterFilter={quarterData}
          handleFilterSelect={handleFilterSelect}
          preSelectedFilter={filter}
          isSelectQuarter={isSelectQuarter}
          handleLogout={handleLogout}
        />
      </Drawer>
        <AppBar
          ProgramAndYearFilter={programWithYears}
          quarterFilter={quarterData}
          handleDrawerToggle={handleDrawerToggle}
          handleFilterSelect={handleFilterSelect}
          preSelectedFilter={filter}
          isSelectQuarter={isSelectQuarter}
          handleLogout={handleLogout}
        />

      <MagicContainer>
        <Stack
          sx={{
            height: "calc(100vh - 110px)",
            py:2, flex: 1,
            display: "flex",
            flexFlow: "column nowrap",
          }}
        >
          <Outlet />
        </Stack>
      </MagicContainer>
    </Stack>
    
  );
};

export default Header;
