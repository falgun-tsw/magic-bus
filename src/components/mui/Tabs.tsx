import React from "react";
import type { TabsProps } from "@mui/material";
import XTabs from "@mui/material/Tabs";

const Tabs: React.FC<TabsProps> = (props) => {
  return <XTabs {...props}>{props.children}</XTabs>
};

export default Tabs;
