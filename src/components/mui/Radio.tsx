import React from "react";
import type { RadioProps } from "@mui/material";
import { default as XRadio } from "@mui/material/Radio";

const Radio: React.FC<RadioProps> = (props) => {
  return <XRadio {...props} />;
};

export default Radio;
