import React from "react";
import { IconButton as MIconButton, IconButtonProps } from "@mui/material";

const IconButton: React.FC<IconButtonProps> = (props) => {
  return <MIconButton {...props} />;
};

export default React.memo(IconButton);
