import React from "react";
import { Box as MBox, BoxProps } from '@mui/material';

const Box: React.FC<BoxProps> = (props) => {
  return <MBox sx={{ width: "100%" }} {...props} />;
};

export default React.memo(Box);
