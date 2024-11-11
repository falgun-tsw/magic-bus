import React from "react";

import type { LoadingButtonProps } from "@mui/lab/LoadingButton";
import { default as XLoadingButton } from "@mui/lab/LoadingButton";

const LoadingButton: React.FC<LoadingButtonProps> = (props) => {
  return <XLoadingButton {...props}>
    {props.children}
  </XLoadingButton>;
};

export default LoadingButton;
