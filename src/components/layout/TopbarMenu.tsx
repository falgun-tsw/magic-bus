import React from "react";

// Common Components
import Image from "../mui/Image";
import IconButton from "../mui/IconButton";
import Text from "../mui/Text";
import Box from "../mui/Box";
import Stack from "../mui/Stack";
import MagicContainer from "../common/MagicContainer";

// Routing
import { useLocation, useNavigate } from "react-router-dom";

import _get from "lodash/get";
import { Avatar, Menu, ListItemIcon, Divider } from "@mui/material";

// Icons
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
// @mui icons
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar } from "@mui/material";

// Type
import { QuarterApiParsedResponse } from "../../store/types/header";

// @mui components
import Typography from "../mui/Typography";
import MenuItem from "../mui/MenuItem";
import Toolbar from "../mui/Toolbar";
import Select from "../mui/Select";
import Button from "../mui/Button";
import Tabs from "./Tabs";
import AutoComplete from "../mui/AutoComplete";

interface Program {
  id: number;
  name: string;
}

interface Year {
  id: number;
  year: number;
}

// Define the types for your props
interface UserDetails {
  username: string;
  email: string;
}

interface ProfileMenuProps {
  handleLogoutClick: () => void;
  userDetails: UserDetails;
}

interface AppBarComponentInter {
  handleLogoutClick: () => void;
  userDetails: UserDetails;
  ProgramAndYearFilter: {programs: object[], years: object[]};
  quarterFilter: QuarterApiParsedResponse[];
  handleDrawerToggle: () => void;
  handleFilterSelect: (name: string, value: number | unknown) => void;
  preSelectedFilter:
    | {
        selectedProgram: number;
        selectedQuarter: number;
        selectedYear: number;
      }
    | any;

  isSelectQuarter: boolean;
}


// ProfileMenu component
const ProfileMenu: React.FC<ProfileMenuProps> = ({ handleLogoutClick, userDetails }) => {
  let userName: any = _get(userDetails, "username", "");
  const email = _get(userDetails, "email", "");
  if(!userName && email){
    userName = email.split("@")[0];
    userName = userName.split(".")[0];
  }

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogoutInternal = () => {
    handleLogoutClick();
    handleClose();
  };

  const stringAvatar = (name?: string, email?: string) => {
    let letter1 = "";
    let letter2 = "";

    if (name || email) {
      let nameArr: string[] | undefined;
      if (name) {
        nameArr = name.split(' ');
      }
      if (!nameArr && email) {
        nameArr = email.split(' ');
      }
      if (nameArr && nameArr.length > 0 && nameArr[0]) {
        letter1 = nameArr[0][0].toUpperCase();
      }
      if (nameArr && nameArr.length > 1 && nameArr[1]) {
        letter2 = nameArr[1][0].toUpperCase();
      }
    }

    return `${letter1}${letter2}`;
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar sx={{ fontSize: "16px" }}>{stringAvatar(userName, email)}</Avatar>
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            minWidth: 232,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Box>
            <Text sx={{ lineHeight: "0.8" }}>{userName}</Text>
            <Text sx={{ fontSize: "12px", color: "gray" }}>{email}</Text>
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem onClick={onLogoutInternal}>
          <ListItemIcon>
            <Logout sx={{ color: "red", fontSize: "16px" }} />
          </ListItemIcon>
          <Text sx={{ color: "red", fontSize: "16px" }}>Logout</Text>
        </MenuItem>
      </Menu>
    </>
  );
};

// TopbarMenu component
const TopbarMenu: React.FC<AppBarComponentInter> = ({ 
  handleLogoutClick, 
  userDetails, 
  ProgramAndYearFilter,
  quarterFilter=[],
  handleDrawerToggle,
  handleFilterSelect,
  preSelectedFilter,
  isSelectQuarter,
}) => {

  const location = useLocation();
  const navigate = useNavigate();

  const { selectedProgram, selectedQuarter, selectedYear } = preSelectedFilter;

  const {
    programs,
    years
  } = ProgramAndYearFilter;
  
  return (
    <Stack sx={{ borderBottom: "1px solid #EAECF0", backgroundColor: "#262626", color: "#fff", position: "sticky", top: "0px", zIndex: 999 }}>
      <MagicContainer>
        <Stack sx={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: "24px", height: "64px", padding: "10px" }}>
          {/* Logo */}
          <Stack sx={{ flexFlow: "row nowrap", alignItems: "center", gap: 1.4 }}>
            <Image
              alt="mb"
              imgStyle={{ width: "auto", maxWidth: "100%" }}
              src="/assets/images/login/magic-bus-logo.svg"
              width="40px"
              height={'38'}
            />
            <Text>
              Magic Bus
              <Text component="span" sx={{ display: { xs: 'none', md: 'inline' } }}> - Metal Score Card System</Text>
            </Text>
          </Stack>


          <Stack sx={{ flexFlow: "row nowrap", justifyContent: "flex-end", alignItems: "center" }} gap={2}>
            {/* Dropdown options */}
            {
              !["/user-management","/centres"].includes(location?.pathname) ? 
                <Stack direction="row" gap="10px">
                  
                  {/* Program */}
                  <AutoComplete 
                    options={programs}
                    matchKey="value"
                    labelKey="label"
                    placeholder="Program"
                    disableClearable={false}
                    value={selectedProgram}
                    onChange={(e) =>
                      handleFilterSelect("selectedProgram", e)
                    }
                    loading={false}
                    sx={{
                      marginBottom:"0px",
                      minWidth: "200px",
                    }}
                    input_sx={{
                      "& .MuiInputBase-root":{
                        backgroundColor: "#c3c3c3",
                        padding: "5px 9px !important",
                        color: "#000"
                      },
                      "& input":{
                        height: "12px",
                        fontSize: "12px",
                        fontFamily: "inherit",
                        fontWeight: 400,
                        padding: "5px !important",
                      }
                    }}
                    paper_sx={{
                      "& .MuiAutocomplete-listbox":{
                        backgroundColor: "#fff !important",
                        border: "1px solid #bcbcbc",
                        fontSize: "12px"
                      }
                    }}
                  />

                  {/* years */}
                  <AutoComplete 
                    options={years}
                    matchKey="value"
                    labelKey="label"
                    placeholder="Year"
                    disabled={!selectedProgram}
                    disableClearable={false}
                    value={selectedYear}
                    onChange={(e) =>
                      handleFilterSelect("selectedYear", e)
                    }
                    sx={{
                      marginBottom:"0px",
                      width: "110px",
                    }}
                    input_sx={{
                      "& .MuiInputBase-root":{
                        backgroundColor: "#c3c3c3",
                        padding: "5px 9px !important",
                        color: "#000"
                      },
                      "& input":{
                        height: "12px",
                        fontSize: "12px",
                        fontFamily: "inherit",
                        fontWeight: 400,
                        padding: "5px !important",
                      },
                    }}
                    paper_sx={{
                      "& .MuiAutocomplete-listbox":{
                        backgroundColor: "#fff !important",
                        border: "1px solid #bcbcbc",
                        fontSize: "12px"
                      }
                    }}
                  />

                  {/* Quarter */}
                  <AutoComplete 
                    options={quarterFilter}
                    matchKey="quarterMasterId"
                    labelKey="quarterMasterName"
                    placeholder="Quarter"
                    disabled={!selectedProgram || !selectedYear}
                    disableClearable={false}
                    value={selectedQuarter}
                    onChange={(e) =>
                      handleFilterSelect("selectedQuarter", e)
                    }
                    sx={{
                      marginBottom:"0px",
                      width: "130px",
                    }}
                    input_sx={{
                      "& .MuiInputBase-root":{
                        backgroundColor: "#c3c3c3",
                        padding: "5px 9px !important",
                        color: "#000"
                      },
                      "& input":{
                        height: "12px",
                        fontSize: "12px",
                        fontFamily: "inherit",
                        fontWeight: 400,
                        padding: "5px !important",
                      }
                    }}
                    paper_sx={{
                      "& .MuiAutocomplete-listbox":{
                        backgroundColor: "#fff !important",
                        border: "1px solid #bcbcbc",
                        fontSize: "12px"
                      }
                    }}
                  />
                </Stack>
              :null
            }

            {/* Profile icon */}
            <ProfileMenu handleLogoutClick={handleLogoutClick} userDetails={userDetails} />
          </Stack>
        </Stack>
      </MagicContainer>
    </Stack>
  );
};

export default React.memo(TopbarMenu);
