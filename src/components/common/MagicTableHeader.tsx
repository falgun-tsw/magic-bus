import React from "react";
// @mui
import { styled, SxProps, Theme } from "@mui/material/styles";
// mui components
import ImageComponent from "../mui/Image";
import InputAdornment from "../mui/InputAdornment";
import FormHelperText from "../mui/FormHelperText";
import LoadingButton from "../mui/LoadingButton";
import TextField from "../mui/TextField";
import Grid from "../mui/Grid";
import Box from "../mui/Box";

interface BtnInterface {
  text: string;
  variant?: "text" | "outlined" | "contained";

  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;

  disabled?: boolean;
  loading: boolean;

  sx?: SxProps<Theme> | any;
  onClick: () => void;
}

interface TableHeadingProps {
  buttons?: BtnInterface[] | any;
  isInvalidSearch?: boolean;
  isVisibleSearchField?: boolean;
  onSearchfieldChange?: (value: string | number) => void;
}

const MagicTableHeader: React.FC<TableHeadingProps> = (props) => {
  const {
    buttons = [],
    isVisibleSearchField = true,
    isInvalidSearch,
    onSearchfieldChange,
  } = props;

  return (
    <Box>
      <Grid container spacing={0}>
        {/* Search field */}
        <StyledGridFirst1Item item xs={12} md={8}>
          {isVisibleSearchField && (
            <TextField
              placeholder="Search"
              size="small"
              name="search"
              sx={{ width: "452px", background: "#ffffff" }}
              error={isInvalidSearch}
              helperText={
                isInvalidSearch && (
                  <StyledFormHelperText>
                    Minimum three characters
                  </StyledFormHelperText>
                )
              }
              onChange={(e) => {
                if (onSearchfieldChange) {
                  onSearchfieldChange(e.target.value);
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <ImageComponent src="assets/images/login/searchIcon.svg" />
                  </InputAdornment>
                ),
              }}
            />
          )}
        </StyledGridFirst1Item>

        {/* Buttons */}
        <StyledGridSecondItem item xs={12} md={4}>
          {buttons.length > 0 &&
            buttons.map(
              (btn: BtnInterface, index: number) =>
                btn.text && (
                  <LoadingButton
                    key={index}
                    variant={btn.variant}
                    startIcon={btn.startIcon}
                    endIcon={btn.endIcon}
                    onClick={btn.onClick}
                    disabled={btn.disabled}
                    loadingPosition="start"
                    loading={btn.loading}
                    sx={{ textTransform: "capitalize", ...btn.sx }}
                  >
                    {btn.text}
                  </LoadingButton>
                )
            )}
        </StyledGridSecondItem>
      </Grid>
    </Box>
  );
};

const StyledGridFirst1Item = styled(Grid)({
  display: "flex",
  justifyContent: "start",
});

const StyledGridSecondItem = styled(Grid)({
  display: "flex",
  justifyContent: "end",
  alignItems: "center",
  gap: "12px",
});

const StyledFormHelperText = styled(FormHelperText)({
  marginLeft: "-11px",
  marginTop: "-1px",
});

export default MagicTableHeader;
