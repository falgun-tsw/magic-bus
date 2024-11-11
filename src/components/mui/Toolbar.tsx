import React from "react";
import type { ToolbarProps } from "@mui/material/Toolbar";
import { default as XToolbar } from "@mui/material/Toolbar";

const Toolbar: React.FC<ToolbarProps> = (props) => {
  return <XToolbar {...props}>{props.children}</XToolbar>;
};

export default Toolbar;
