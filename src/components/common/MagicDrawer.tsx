import React, { ReactNode } from "react";

// @mui
import ClearIcon from "@mui/icons-material/Clear";
import { styled } from "@mui/material/styles";
import { SxProps, Theme } from "@mui/system";

// mui components
import LoadingButton from "../mui/LoadingButton";
import Typography from "../mui/Typography";
import Drawer from "../mui/Drawer";
import Stack from "../mui/Stack";
import Grid from "../mui/Grid";
import Box from "../mui/Box";

interface SideBarProps {
  title?: string;
  subTitle?: string;
  children?: ReactNode;
  doneBtnTxt?: string;
  cancelBtnTxt?: string;

  ActionSx?: SxProps<Theme>;
  cancelBtnSx?: SxProps<Theme>;
  doneBtnSx?: SxProps<Theme>;
  bodySx?: SxProps<Theme>;

  isOpen: boolean;
  doneBtnLoading?: boolean;
  isVisibleActionSection?: boolean;

  onClose: () => void;
  handleDoneBtn: () => void;
  handleCancelBtn: () => void;

  headerSx?: React.CSSProperties;
  childrenSx?: React.CSSProperties;
  btn1Sx?: React.CSSProperties;
  btn2Sx?: React.CSSProperties;
}

const MagicDrawer: React.FC<SideBarProps> = ({
  title,
  subTitle,
  children,
  doneBtnTxt = "Done",
  cancelBtnTxt = "Cancel",

  isOpen = false,
  doneBtnLoading = false,
  isVisibleActionSection = true,

  cancelBtnSx,
  doneBtnSx,
  bodySx,
  ActionSx,

  onClose,
  handleDoneBtn,
  handleCancelBtn,
  ...drawerProps
}) => {
  return (
    <>
      {/* Drawer */}
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={onClose}
        {...drawerProps}
        sx={{
          "& .MuiPaper-root": {
            maxWidth: "450px",
            minWidth: "400px",
          },
        }}
      >
        <Stack sx={{ position: "relative", height: "100%" }}>
          {/* Header */}
          <Header>
            {/* Cross close Btn */}
            <CloseButton onClick={onClose}>
              <ClearIcon fontSize="small" />
            </CloseButton>

            {/* Title */}
            <Title variant="h5">{title}</Title>

            {/* Sub Title */}
            <SubTitle>{subTitle}</SubTitle>
          </Header>

          {/* Children */}
          <Box sx={{ maxHeight: "457px", overflowY: "auto" }}>
            <Stack sx={{ p: "20px", ...bodySx }}>{children}</Stack>
          </Box>

          {/* Action  */}
          {isVisibleActionSection && (
            <ActionSection container columnSpacing={2} sx={{ ...ActionSx }}>
              <GridItem item xs={6}>
                <ButtonStyle
                  size="small"
                  onClick={handleCancelBtn}
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{textTransform:"capitalize", ...cancelBtnSx }}
                >
                  {cancelBtnTxt}
                </ButtonStyle>
              </GridItem>

              <GridItem item xs={6}>
                <LoadingButtonStyle
                  size="small"
                  fullWidth
                  onClick={handleDoneBtn}
                  variant="contained"
                  color="primary"
                  loadingPosition="end"
                  sx={{ textTransform:"capitalize", ...doneBtnSx }}
                  loading={doneBtnLoading}
                >
                  {doneBtnTxt}
                </LoadingButtonStyle>
              </GridItem>
            </ActionSection>
          )}
        </Stack>
      </Drawer>
    </>
  );
};



const Header = styled(Box)({
  minHeight: 64,
  backgroundColor: "#4d4d4d",
  padding: "10px",
});

const Title = styled(Typography)({
  color: "white",
  fontWeight: "bold",
});

const SubTitle = styled(Typography)({
  color: "white",
  fontSize: "13px",
});

const CloseButton = styled(Box)({
  position: "absolute",
  right: 8,
  top: 8,
  width: 20,
  height: 20,
  border: "1px solid white",
  borderRadius: "50%",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});


// Done Btn of acton section
const LoadingButtonStyle = styled(LoadingButton)({
  backgroundColor: " rgb(255, 248, 219)",
  border: "1px solid rgb(176, 152, 67)",
  cursor: "pointer",
  color: "#242424",
  fontWeight: 500,

  "&:hover": {
    backgroundColor: "rgb(255, 255, 255)",
    border: "1px solid rgb(219, 219, 219)",
  },
});

// Cancel Btn of acton section
const ButtonStyle = styled(LoadingButton)({
  backgroundColor: "rgb(255, 255, 255)",
  border: "1px solid rgb(219, 219, 219)",
  color: "#242424",
  fontWeight: 500,

  "&:hover": {
    backgroundColor: " rgb(255, 248, 219)",
    border: "1px solid rgb(176, 152, 67)",
    cursor: "pointer",
  },
});

const ActionSection = styled(Grid)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  right: 0,
  backgroundColor: "#F9F9F9",
  padding: theme.spacing(1.3),
  zIndex: 10,
  boxShadow:
    "0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -2px rgba(0, 0, 0, 0.1)",
}));

const GridItem = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
}));

export default React.memo(MagicDrawer);
