import React, { useState } from "react";

// Router
import { Outlet } from "react-router-dom";

// Components:
import Stack from "../components/mui/Stack";
import TopbarMenu from "../components/layout/TopbarMenu";
import MagicContainer from "../components/common/MagicContainer";
import AppBar from "../components/layout/AppBar";

// Store
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { setFilter, clearUser } from "../store/slices/userSlice";
import { RootState } from "../store";


// Action
import { useProgramWithYearsQuery, useQuarterQuery } from "../store/apis/headerApi";
import NavigationBar from "../components/layout/NavigationBar";
import _get from "lodash/get";

// Routing
import { useLocation, useNavigate } from "react-router-dom";

const LayoutContainer = () => {

  // Actions
  const { data: programWithYears = { programs: [], years: [] } } = useProgramWithYearsQuery({});
  const { data: quarterData = [] } = useQuarterQuery({});

  // hooks
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userDetails = useAppSelector((state: RootState) => state.user?.userDetails);
  const filter = useAppSelector((state: RootState) => state.user.filter);
  const isSelectQuarter = filter.selectedProgram !== undefined && filter.selectedYear !== undefined;

  const [mobileOpen, setMobileOpen] = useState(false);


  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleFilterSelect = (name: string, value: any = "") => {
    let filterOptions: any = {};
    filterOptions[name] = value;

    if(!value) {
      if (name === 'selectedProgram') {
        filterOptions = {
          selectedProgram: value,
          selectedYear: null,
          selectedQuarter: null,
        };

      } else if (name === 'selectedYear') {
        filterOptions = {
          selectedYear: value,
          selectedQuarter: null,
        };
      }
    }
    dispatch(
      setFilter(filterOptions)
    );
  };

  const userDetailsObj = {
    username: _get(userDetails, "username", ""),
    email: _get(userDetails, "email", "")
  }

  const handleLogoutClick = async () => {
    dispatch(clearUser());
    navigate("/");
  };

  // Actions
  console.log("stateData =>", userDetails);

  return (
    <Stack sx={{ minHeight: "100vh", backgroundColor: "#f4f4f4" }}>
      {/* Top menu */}
      <TopbarMenu
        handleLogoutClick={handleLogoutClick}
        userDetails={userDetailsObj}
        ProgramAndYearFilter={programWithYears}
        quarterFilter={quarterData}
        handleDrawerToggle={handleDrawerToggle}
        handleFilterSelect={handleFilterSelect}
        preSelectedFilter={filter}
        isSelectQuarter={isSelectQuarter}
      />

      {/* Top Navigation bar */}
      <MagicContainer sx={{ p: "0 !important" }}>
        <NavigationBar />
      </MagicContainer>

      {/* Body */}
      <MagicContainer sx={{ py: { xs: 1, md: 2 } }}>
        <Outlet />
      </MagicContainer>
    </Stack>
  );
};

export default LayoutContainer;
