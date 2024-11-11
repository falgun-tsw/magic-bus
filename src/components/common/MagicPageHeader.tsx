import React from "react";

import { SxProps, Theme } from "@mui/system";
import { styled } from "@mui/material/styles";

// @mui
import Typography from "../mui/Typography";
// import Button from "../mui/Button";
import Button from "../mui/Button";

import Stack from "../mui/Stack";
import Grid from "../mui/Grid";
import Chip from "../mui/Chip";
import Box from "../mui/Box";

interface BtnInterface {
  text: string;
  variant?: "text" | "outlined" | "contained" | any;

  disabled?: boolean;

  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
  loading?: boolean;

  sx?: SxProps<Theme>;
  onClick: () => void;
}

interface HeaderProps {
  title?: string;
  subTitle?: string;
  chipLabel: string;
  buttons?: BtnInterface[] | any;

  titleSx?: SxProps<Theme>;
  subTitleSx?: SxProps<Theme>;
  sx?: SxProps<Theme>;
}

const MagicPageHeader: React.FC<HeaderProps> = (props) => {
  const {
    title,
    chipLabel,
    subTitle,
    titleSx = {},
    subTitleSx = {},
    buttons = [],
    sx,
  } = props;

  return (
    <Grid container spacing={0} sx={{ mb: 2, ...sx }}>
      {/* this Grid contain only Title, chip, and subTitle */}
      <Grid item xs={6}>
        {/* Title */}
        <Stack direction="row" alignItems="center" mb={1}>
          <Title sx={{ ...titleSx }}>{title}</Title>
          {chipLabel && <StyledChip size="small" label={chipLabel} />}
        </Stack>

        {/* Sub Title */}
        <SubTitle sx={{ ...subTitleSx }}>{subTitle}</SubTitle>
      </Grid>

      {/* this contain only Buttons */}
      <Grid item xs={6}>
        <StyledBox>
          {buttons.map(
            (btn: BtnInterface, index: number) =>
              btn.text && (
                <Button
                  key={index}
                  variant={btn.variant}
                  startIcon={btn.startIcon}
                  endIcon={btn.endIcon}
                  onClick={btn.onClick}
                  disabled={btn.disabled}
                  sx={{ textTransform: "capitalize", ...(btn.sx || {}) }}
                  loading={btn.loading}
                >
                  {btn.text}
                </Button>
              )
          )}
        </StyledBox>
      </Grid>
    </Grid>
  );
};

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: "20px",
  color: "rgb(16, 24, 41)",
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  fontSize: "15px",
  fontWeight: 400,
  color: "#667085",
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  border: "1px solid rgb(219, 219, 219)",
  marginLeft: "15px",
  textTransform: "capitalize",
  backgroundColor: "#FEF7DA",
  color: "#242424",
  fontWeight: 500,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "end",
  alignItems: "center",
  gap: "20px",
}));

export default MagicPageHeader;
