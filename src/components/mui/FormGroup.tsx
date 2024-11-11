import React from "react";

import type { FormGroupProps } from "@mui/material";
import { default as XFormGroup } from "@mui/material/FormGroup";

const FormGroup: React.FC<FormGroupProps> = (props) => {
  return <XFormGroup {...props} />;
};

export default FormGroup;
