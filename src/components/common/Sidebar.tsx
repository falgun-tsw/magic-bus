import React, { ReactNode } from "react";

import ClearIcon from "@mui/icons-material/Clear";
import { styled } from "@mui/material/styles";
import { SxProps, Theme } from "@mui/system";

// @mui components
import Typography from "../mui/Typography";
import Button from "../mui/Button";
import Drawer from "../mui/Drawer";
import Stack from "../mui/Stack";
import Grid from "../mui/Grid";
import Box from "../mui/Box";
import LoadingButton from "../mui/LoadingButton";


interface SideBarProps {
  children?: ReactNode;
  title?: string;
  subTitle?: string;
  doneBtnTxt?: string;
  cancelBtnTxt?: string;
  ActionSx?: SxProps<Theme>;
  cancelBtnSx?: SxProps<Theme>;
  doneBtnSx?: SxProps<Theme>;
  rootSx?: SxProps<Theme>;

  isVisibleActionSection?: boolean;
  doneBtnLoading?: boolean;

  isOpen: boolean;
  onClose: () => void;
  handleDoneBtn: () => void;
  handleCancelBtn: () => void;

  headerSx?: React.CSSProperties;
  childrenSx?: React.CSSProperties;
  btn1Sx?: React.CSSProperties;
  btn2Sx?: React.CSSProperties;
  bodySx?: SxProps<Theme>;
}

const Sidebar: React.FC<SideBarProps> = ({
  children,
  title,
  subTitle,
  doneBtnLoading,
  isOpen = false,
  onClose,
  headerSx,
  isVisibleActionSection = true,
  cancelBtnTxt = "Cancel",
  doneBtnTxt = "Done",
  cancelBtnSx,
  doneBtnSx,
  bodySx,
  rootSx,
  handleDoneBtn,
  handleCancelBtn,
  ActionSx,
  ...drawerProps
}) => {
  const defaultBtn1Sx = {
    backgroundColor: "rgb(255, 255, 255)",
    border: "1px solid rgb(219, 219, 219)",
    color: "#242424",
    fontWeight: 500,
    "&:hover": {
      backgroundColor: " rgb(255, 248, 219)",
      border: "1px solid rgb(176, 152, 67)",
      cursor: "pointer",
    },
    ...cancelBtnSx,
  };

  const defaultBtn2Sx = {
    backgroundColor: " rgb(255, 248, 219)",
    border: "1px solid rgb(176, 152, 67)",
    cursor: "pointer",
    color: "#242424",
    fontWeight: 500,

    "&:hover": {
      backgroundColor: "rgb(255, 255, 255)",
      border: "1px solid rgb(219, 219, 219)",
    },
    ...doneBtnSx,
  };

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      {...drawerProps}
      sx={{
        width:"600px",
        "& .MuiPaper-root": {
          maxWidth: "450px",
          minWidth: "400px",
          // ...rootSx,
        },
      }}
    >
      <Stack sx={{ position: "relative", height: "100%" }}>
        <Box
          sx={{
            minHeight: 64,
            backgroundColor: "#4d4d4d",
            padding: "10px",
          }}
        >
          <CloseButton onClick={onClose}>
            <ClearIcon
              fontSize="small"
              sx={{ color: "white", padding: "2px" }}
            />
          </CloseButton>

          <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
            {title}
          </Typography>

          <Typography sx={{ color: "white", fontSize: "13px" }}>
            {subTitle}
          </Typography>
        </Box>

        <Box sx={{ maxHeight: "457px", overflowY: "auto" }}>
          <Stack sx={{ p: "20px", ...bodySx }}> {children} </Stack>
        </Box>

        {isVisibleActionSection && (
          <ActionSection container columnSpacing={2} sx={{ ...ActionSx }}>
            <Grid
              item
              xs={6}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                size="small"
                onClick={handleCancelBtn}
                variant="contained"
                color="primary"
                fullWidth
                sx={{ textTransform: "capitalize", ...defaultBtn1Sx }}
              >
                {cancelBtnTxt}
              </Button>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <LoadingButton
                size="small"
                onClick={handleDoneBtn}
                variant="contained"
                color="primary"
                fullWidth
                sx={{ textTransform: "capitalize", ...defaultBtn2Sx }}
                loadingPosition="end"
                loading={doneBtnLoading}
              >
                {doneBtnTxt}
              </LoadingButton>
            </Grid>
          </ActionSection>
        )}
      </Stack>
    </Drawer>
  );
};

const CloseButton = styled(Box)({
  position: "absolute",
  right: 8,
  top: 8,
  width: 20,
  height: 20,
  border: "2px solid white",
  borderRadius: "50%",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textTransform:"capitalize"
});

const ActionSection = styled(Grid)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  right: 0,
  backgroundColor: "white",
  padding: theme.spacing(1.3),
  zIndex: 10,
  boxShadow:
    "0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -2px rgba(0, 0, 0, 0.1)",
}));

export default React.memo(Sidebar);
