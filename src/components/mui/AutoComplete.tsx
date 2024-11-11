import * as React from "react";
import TextField from "@mui/material/TextField";
import MAutocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { styled, SxProps, Theme } from "@mui/material/styles";
import FormHelperText from "./FormHelperText";
import Stack from "./Stack";

// Define the types for the props
interface AutoCompleteSelectProps {
  options?: any[];
  loading?: boolean;
  placeholder?: string;
  labelKey?: string | null;
  matchKey?: string | null;
  label?: string;
  disableClearable?: boolean;
  sx?: SxProps<Theme>;
  input_sx?: SxProps<Theme>;
  paper_sx?: SxProps<Theme>;
  onChange?: (newValue: any) => void;
  value?: any;
  readOnly?: boolean;
  disabled?: boolean;
  errorMsg?: string | null;
  id?: any
  multiple?: boolean
}

// Styled component for Paper
const StyledPaper = styled('div')((props: any) => {
  const {
    theme,
    sx
  } = props;
  return {
    fontSize: "14px !important",
    "& .MuiAutocomplete-paper":{
      backgroundColor: "red !important"
    },
    "& .MuiAutocomplete-listbox":{
      backgroundColor: "#fff !important",
      border: "1px solid #bcbcbc",
    },
    "& .MuiAutocomplete-listbox li": {
      textTransform: "capitalize !important",
      "&[aria-selected=true]": {
        backgroundColor: `${theme.palette.primary.light} !important`,
        color: "#003A75",
      },
      "&.Mui-focused, &.Mui-focusVisible": {
        backgroundColor: "#E5EAF2",
        color: "#1C2025",
      },
    },
    ...sx
  };
})

const AutoComplete: React.FC<AutoCompleteSelectProps> = ({
  options = [],
  loading = false,
  placeholder = "",
  labelKey = null,
  matchKey = null,
  label = "",
  disableClearable = true,
  sx = {},
  input_sx = {},
  paper_sx = {},
  onChange,
  value = {},
  readOnly = false,
  disabled = false,
  errorMsg ="",
  id= "",
  multiple = false,
}) => {
  const [open, setOpen] = React.useState(false);

  // Helper functions
  const getOptionLabelInternal = (option: any) => {
    const labelOption = labelKey ? option[labelKey] : option.label;
    return labelOption ? labelOption : "";
  };

  const isOptionEqualToValueInternal = (option: any, value: any) => {
    return matchKey
      ? option[matchKey] === value[matchKey]
      : option.label === value.label;
  };

  return (
    <Stack sx={{position: "relative",}}>
      <MAutocomplete
        sx={{ width: "100%", ...sx }}
        multiple={multiple}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        onChange={(e, newValue) => {
          if(onChange){
            onChange(newValue);
          }
        }}
        value={value}
        readOnly={readOnly}
        disabled={disabled}
        disableClearable={disableClearable}
        isOptionEqualToValue={isOptionEqualToValueInternal}
        getOptionLabel={getOptionLabelInternal}
        options={options}
        loading={loading}
        PaperComponent={(props) => <StyledPaper {...props} sx={paper_sx}/>}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            placeholder={placeholder}
            sx={{
              "& .MuiInputBase-root": {
                borderColor: "#aeaeae !important",
              },
              "& input": {
                height: "12px",
                fontSize: "14px",
                fontFamily: "inherit",
                fontWeight: 400,
                padding: "5px !important",
              },
              "& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#aeaeae !important",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderWidth: "1px",
                borderColor: "#aeaeae !important",
              },
              ...input_sx
            }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />

      {
        errorMsg?
        <FormHelperText sx={{position: "absolute",
          fontSize: "12px",
          width: "100%",
          paddingLeft: "6px",
          margin: "0px",
          bottom: "-20px",}}>
          {errorMsg}
        </FormHelperText>: null
      }
    </Stack>
  );
};

export default AutoComplete;
