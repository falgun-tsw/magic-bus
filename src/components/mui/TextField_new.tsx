import React from "react";
import MTextField, { TextFieldProps as MUITextFieldProps } from "@mui/material/TextField";
import { styled, SxProps, Theme } from "@mui/material/styles";


const StyledTextField = styled(MTextField)(({ theme }) => ({
  width: "100%",
  backgroundColor: "#F2F6FA",
  marginBottom: "18px",
  boxShadow: "0 0 0 30px white inset",
  "& .MuiInputBase-root": {
    height:"40px",
    backgroundColor: "transparent !important",
    border: "1px solid #c2c2c2",
    borderRadius: "5px",
    overflow: "hidden",
  },
  "& .MuiInputBase-input": {
    fontSize: "15px",
    color: "#2E384D",
    fontWeight: 500,
    padding: "6px 16px",
    "-moz-appearance": "textfield",
    "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "&::-webkit-autofill": {
      boxShadow: "0 0 0 30px white inset",
    },
  },
  "& label": {
    transform: `translate(${theme.spacing(3)}, ${theme.spacing(1.75)}) scale(1)`,
    fontSize: theme.typography.body1.fontSize,
    color: "#808591",
    "&.Mui-focused": {
      color: "#808591",
    },
    "&.MuiFormLabel-filled, &.Mui-focused": {
      transform: `translate(${theme.spacing(3)}, ${theme.spacing(0.5)}) scale(0.75)`,
    },
  },
  "& .MuiSelect-root": {
    width: "100%",
    backgroundColor: "red",
    "& .MuiSelect-select": {
      fontSize: theme.typography.body1.fontSize,
      color: "#2E384D",
      fontWeight: 500,
      backgroundColor: "red",
    },
  },
  "& > p": {
    position: "absolute",
    fontSize: "12px",
    width: "100%",
    paddingLeft: "6px",
    margin: "0px",
    bottom: "-20px",
  },
}));

const TextField: React.FC<any> = ({
  InputProps = {},
  FormHelperTextProps = {},
  InputLabelProps = {},
  SelectProps = {},
  error = false,
  hasField = true,
  sx = {},
  ...restProps
}) => {
  const mergedProps: MUITextFieldProps = {
    variant: "filled", // Ensure variant is correctly typed
    size: "small",
    fullWidth: true,
    InputProps: {
      disableUnderline: true,
      ...InputProps,
    },
    FormHelperTextProps: {
      ...FormHelperTextProps,
    },
    InputLabelProps: {
      ...InputLabelProps,
    },
    SelectProps: {
      ...SelectProps,
    },
    ...restProps,
  };

  return hasField ? (
    <StyledTextField error={error} {...mergedProps} sx={sx} />
  ) : null;
};

export default React.memo(TextField);
