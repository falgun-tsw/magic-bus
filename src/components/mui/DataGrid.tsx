import React from "react";

import type { DataGridProps } from "@mui/x-data-grid";
import { DataGrid as XDataGrid } from "@mui/x-data-grid";

const DataGrid: React.FC<DataGridProps> = (props) => {
  return <XDataGrid {...props} />;
};

export default DataGrid;
