import React from "react";
import type { PaginationProps } from "@mui/material/Pagination";
import { default as XPagination } from "@mui/material/Pagination";

const Pagination: React.FC<PaginationProps> = (props) => {
  return <XPagination {...props} />;
};

export default Pagination;
