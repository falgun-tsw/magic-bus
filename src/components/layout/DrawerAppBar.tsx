import React from "react";

// @mui icon
import LogoutIcon from "@mui/icons-material/Logout";

// Type
import { QuarterApiParsedResponse } from "../../store/types/header";

import Typography from "../mui/Typography";
import MenuItem from "../mui/MenuItem";
import Divider from "../mui/Divider";
import Select from "../mui/Select";
import Button from "../mui/Button";
import Stack from "../mui/Stack";
import Box from "../mui/Box";

interface Program {
  id: number;
  name: string;
}

interface Year {
  id: number;
  year: number;
}

interface DrawerAppBarInter {
  ProgramAndYearFilter: {};
  quarterFilter: QuarterApiParsedResponse[];
  handleFilterSelect: (name: string, value: number | any) => void;
  preSelectedFilter:
    | {
        selectedProgram: number;
        selectedQuarter: number;
        selectedYear: number;
      }
    | any;
  isSelectQuarter: boolean;
  handleLogout:()=> void;
}

const DrawerAppBar: React.FC<DrawerAppBarInter> = (props) => {
  const {
    ProgramAndYearFilter = {},
    quarterFilter = [],
    handleFilterSelect,
    preSelectedFilter,
    isSelectQuarter,
    handleLogout,
  } = props;

  const { selectedProgram, selectedQuarter, selectedYear } = preSelectedFilter;

  return (
    <Box sx={{ textAlign: "left" }}>
      <Stack direction="column" gap={1} sx={{ alignItems: "center" }}>
        <img
          src="assets/images/login/magic-bus-logo.svg"
          alt="loading..."
          width="50px"
          height="50px"
        />
        <Typography component="div" sx={{ fontSize: "15px" }} mb="10px">
          MB Center Metal Score Card System
        </Typography>
      </Stack>

      <Divider />

      <Stack direction="column" gap="20px" sx={{ p: "0px 20px", mt: "20px" }}>
        {Object.entries(ProgramAndYearFilter).map(([key, options]) => {
          const typedOptions = options as Program[] | Year[];
          return (
            <Select
              key={key}
              displayEmpty
              size="small"
              name={`selected${key.charAt(0).toLocaleUpperCase()}${key.slice(
                1,
                key.length - 1
              )}`}
              value={key === "programs" ? selectedProgram : selectedYear}
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
                <em>{`${key.charAt(0).toUpperCase()}${key.slice(1)}`}</em>
              </MenuItem>
              {typedOptions.map((option: any) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          );
        })}

        <Select
          displayEmpty
          size="small"
          name="selectedQuarter"
          onChange={(e) => handleFilterSelect(e.target.name, e.target.value)}
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
              {isSelectQuarter ? "Select Quarter" : "Program and year needed"}
            </span>
          </MenuItem>

          {quarterFilter.map((option) => (
            <MenuItem
              key={option.quarterMasterId}
              value={option.quarterMasterId}
            >
              {option.quarterMasterName}
            </MenuItem>
          ))}
        </Select>

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
  );
};

export default DrawerAppBar;
