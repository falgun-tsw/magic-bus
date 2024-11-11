import React from "react";
import type { TextFieldProps } from "@mui/material/TextField";
import { default as MUITextField } from "@mui/material/TextField";
import InputLabel from "./InputLabel";
import { SxProps, Theme } from "@mui/material";

type TextFieldFinalProps = TextFieldProps & {
  masterLabel?: string;
  masterLabelSx?: SxProps<Theme>;
};

const TextField: React.FC<TextFieldFinalProps> = (props) => {
  const { masterLabel, masterLabelSx, sx, ...textFieldProps } = props;

  return (
    <>
      {masterLabel && (
        <InputLabel sx={{ ...masterLabelSx }}>{masterLabel}</InputLabel>
      )}
      <MUITextField
        {...textFieldProps}
        sx={{
          ...sx,
          borderRadius: 2, // Adjust as needed
          height: 'auto', // Let MUI handle height, or set a fixed value
        }}
      />
    </>
  );
};

export default TextField;
