import React from "react";

import type { ChipProps } from "@mui/material/Chip";
import { default as XChip } from "@mui/material/Chip";

const Chip: React.FC<ChipProps> = (props) => {
  return <XChip {...props} />;
};

export default Chip;
