import React from "react";
import type { DrawerProps } from "@mui/material/Drawer";
import { default as XDrawer } from "@mui/material/Drawer";

const Drawer: React.FC<DrawerProps> = (props) => {
  return <XDrawer {...props}>{props.children}</XDrawer>;
};

export default Drawer;
