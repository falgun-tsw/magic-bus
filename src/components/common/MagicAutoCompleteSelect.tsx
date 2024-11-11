import * as React from "react";

// @mui
import { CircularProgress, SxProps, Theme } from "@mui/material";

// mui components
import TextField from "../mui/TextField";
// import Autocomplete from "../mui/Autocomplete";

interface AutoCompleteSelectProps {
  value: any;

  options: string[] | { label: string; id: number | string }[] | any;
  label?: string;
  placeholder?: string;
  getValue?: string | any;

  loading?: boolean;
  readOnly?: boolean;
  disabled?: boolean;

  sx?: SxProps<Theme>;
  onChange: (value: any) => void;
}

const MagicAutoCompleteSelect: React.FC<AutoCompleteSelectProps> = ({
  options = [],
  placeholder = "",
  getValue,
  value = null,

  loading = false,
  readOnly = false,
  disabled = false,

  sx = {},
  onChange,
}) => {
  const [selectedValue, setSelectedValue] = React.useState(value);
  const [inputValue, setInputValue] = React.useState("");

  const handleSelectedValue = (event: any, value: any) => {
    if (typeof value === "object" && getValue && value !== null) {
      onChange(`${value[getValue]}`);
    } else {
      onChange(value);
    }
    setSelectedValue(value);
  };

  return (
    <div>
      {/* <Autocomplete
        sx={{ width: "100%", ...sx }}
        size="small"
        value={selectedValue}
        disabled={disabled}
        readOnly={readOnly}
        onChange={(event, newValue) => handleSelectedValue(event, newValue)}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
        id="controllable-states-demo"
        options={options}
        loading={loading}
        loadingText={"Loading..."}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      /> */}
    </div>
  );
};

export default MagicAutoCompleteSelect;
