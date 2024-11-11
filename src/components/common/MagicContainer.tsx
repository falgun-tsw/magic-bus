import React from "react";
// import Container from "../mui/Container";
import { Container } from '@mui/material';
import type { ContainerProps } from "@mui/material/Container";

const MagicContainer: React.FC<ContainerProps> = (props) => {
  const {
    children,
    className="",
    sx: _sx={}
  }= props;

  return(
    <Container 
      {...props} 
      maxWidth="xl" 
      sx={{ px: { xs: 2, md: 3 }, ..._sx}}
      className={className}
    >
      {children}
    </Container>
  )
};

export default MagicContainer;
