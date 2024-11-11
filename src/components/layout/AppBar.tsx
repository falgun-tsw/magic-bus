import * as React from "react";

// @mui icons
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar } from "@mui/material";

// Type
import { QuarterApiParsedResponse } from "../../store/types/header";

// @mui components
import MagicContainer from "../common/MagicContainer";
import Typography from "../mui/Typography";
import MenuItem from "../mui/MenuItem";
import Toolbar from "../mui/Toolbar";
import Select from "../mui/Select";
import Button from "../mui/Button";
import Stack from "../mui/Stack";
import Box from "../mui/Box";
import Tabs from "./Tabs";

interface Program {
  id: number;
  name: string;
}

interface Year {
  id: number;
  year: number;
}

interface AppBarComponentInter {
  ProgramAndYearFilter: {};
  quarterFilter: QuarterApiParsedResponse[];
  handleDrawerToggle: () => void;
  handleFilterSelect: (name: string, value: number) => void;
  preSelectedFilter:
    | {
        selectedProgram: number;
        selectedQuarter: number;
        selectedYear: number;
      }
    | any;

  isSelectQuarter: boolean;
  handleLogout: () => void;
}
const AppBarComponent: React.FC<AppBarComponentInter> = (props: any) => {
  const {
    ProgramAndYearFilter,
    quarterFilter,
    handleDrawerToggle,
    handleFilterSelect,
    preSelectedFilter,
    isSelectQuarter,
    handleLogout,
  } = props;

  const { selectedProgram, selectedQuarter, selectedYear } = preSelectedFilter;

  return (
    <Stack>
      <AppBar component="nav">
        <Box>
          <MagicContainer>
            <Toolbar
              sx={{
                "& .MuiToolbar-root": {
                  padding: "0px",
                },

                "@media (min-width: 0px)": {
                  paddingLeft: "0px",
                  paddingRight: "0px",
                },
                "@media (min-width: 600px)": {
                  paddingLeft: "0px",
                  paddingRight: "0px",
                },
              }}
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ display: { xs: "block", md: "none" }, marginRight: 2 }}
              >
                <MenuIcon sx={{ color: "white" }} />
              </IconButton>

              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  justifyContent: "space-between",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <Stack direction="row" gap={3} sx={{ alignItems: "center" }}>
                  <img
                    src="assets/images/login/magic-bus-logo.svg"
                    alt="loading..."
                    width="50px"
                    height="50px"
                  />
                  <Typography variant="h6" component="div">
                    MB Center Metal Score Card System
                  </Typography>
                </Stack>

                <Stack direction="row">
                  <Stack direction="row">
                    {Object.entries(ProgramAndYearFilter).map(
                      ([key, options]) => {
                        const typedOptions = options as Program[] | Year[];
                        return (
                          <Select
                            key={key}
                            displayEmpty
                            size="small"
                            name={`selected${key
                              .charAt(0)
                              .toLocaleUpperCase()}${key.slice(
                              1,
                              key.length - 1
                            )}`}
                            value={
                              key === "programs"
                                ? selectedProgram
                                : selectedYear
                            }
                            onChange={(e) =>
                              handleFilterSelect(e.target.name, e.target.value)
                            }
                            sx={{
                              margin: "0px 10px",
                              width: "auto",
                              maxHeight: "30px",
                              color: "white",
                            }}
                          >
                            <MenuItem disabled>
                              <em>{`${key.charAt(0).toUpperCase()}${key.slice(
                                1
                              )}`}</em>
                            </MenuItem>
                            {typedOptions.map((option: any) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                        );
                      }
                    )}

                    <Select
                      displayEmpty
                      size="small"
                      name="selectedQuarter"
                      onChange={(e) =>
                        handleFilterSelect(e.target.name, e.target.value)
                      }
                      value={selectedQuarter}
                      disabled={!isSelectQuarter}
                      sx={{
                        margin: "0px 10px",
                        width: "auto",
                        maxHeight: "30px",
                        color: "white",
                      }}
                    >
                      <MenuItem disabled>
                        <span>
                          {isSelectQuarter
                            ? "Select Quarter"
                            : "Program and year needed"}
                        </span>
                      </MenuItem>

                      {quarterFilter.map(
                        (option: { [key: string]: string | number }) => (
                          <MenuItem
                            key={option.quarterMasterId}
                            value={option.quarterMasterId}
                          >
                            {option.quarterMasterName}
                          </MenuItem>
                        )
                      )}
                    </Select>
                  </Stack>

                  <Button
                    variant="contained"
                    onClick={handleLogout}
                    sx={{
                      backgroundColor: "rgb(255, 224, 224)",
                      color: "rgb(176, 51, 51)",
                      maxHeight: "30px",
                      textTransform: "capitalize",
                    }}
                    endIcon={<LogoutIcon />}
                  >
                    Logout
                  </Button>
                </Stack>
              </Box>
            </Toolbar>
          </MagicContainer>
        </Box>
        <Tabs />
      </AppBar>
    </Stack>
  );
};

export default AppBarComponent;
