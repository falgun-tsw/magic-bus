import React from "react";

import type { InputAdornmentProps } from "@mui/material/InputAdornment";
import { default as XInputAdornment } from "@mui/material/InputAdornment";

const InputAdornment: React.FC<InputAdornmentProps> = (props) => {
  return <XInputAdornment {...props}>{props.children}</XInputAdornment>;
};

export default InputAdornment;
