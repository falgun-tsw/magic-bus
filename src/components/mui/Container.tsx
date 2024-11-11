import React from "react";
import type { ContainerProps } from "@mui/material/Container";
import { default as XContainer } from "@mui/material/Container";

const Container: React.FC<ContainerProps> = (props) => {
  return <XContainer>{props.children}</XContainer>;
};

export default Container;
