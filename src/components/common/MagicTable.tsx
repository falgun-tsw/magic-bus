import React from "react";

// @mui
import { GridColumnGroupingModel } from "@mui/x-data-grid";
import { styled, SxProps, Theme } from "@mui/material";

// mui components
import Box from "../mui/Box";
import DataGrid from "../mui/DataGrid";
import Pagination from "../mui/Pagination";


interface CustomGridColDef {
  sx?: SxProps<Theme>;
  cellClassName?: string;
}

interface TableProps {
  rows: { [key: string]: string | number }[] | any;
  columnGroupingModel?: GridColumnGroupingModel;
  columns: CustomGridColDef[] | any;
  secondRowOfHeaderSx?: SxProps<Theme>;
  firstRowOfHeaderSx?: SxProps<Theme>;
  thirdRowOfHeaderSx?: SxProps<Theme>;
  rowCellsSx?: SxProps<Theme>;
  headerSx?: SxProps<Theme>;
  tableSx: SxProps<Theme>;
  count?: number;
  loading?: boolean;
  height?: number | string;
  handlePageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
  sx?: any
  currentPage?: number;
}

const MagicTable: React.FC<TableProps> = (props) => {
  const {
    rows = [],
    columnGroupingModel = [],
    columns = [],
    secondRowOfHeaderSx = {},
    firstRowOfHeaderSx = {},
    thirdRowOfHeaderSx = {},
    rowCellsSx = {},
    headerSx = {},
    tableSx = {},
    count = 10,
    loading = false,
    handlePageChange,
    sx = {},
    currentPage = 1,
  } = props;

  const _Sx = {
    "& .MuiDataGrid-topContainer": {
      "& .css-yrdy0g-MuiDataGrid-columnHeaderRow": {
        '&[aria-rowindex="1"]': {
          backgroundColor: "#CDCDCD",
          color: "#242424",
          fontWeight: 600,
          fontSize: "12px",
          borderBottom: "none",
          ...firstRowOfHeaderSx,
        },
        '&[aria-rowindex="2"]': {
          backgroundColor: "#FFFDF4",
          fontWeight: 600,
          fontSize: "12px",
          color: "#676767",
          ...secondRowOfHeaderSx,
        },
        '&[aria-rowindex="3"]': {
          backgroundColor: "#FFFDF4",
          fontWeight: 600,
          fontSize: "12px",
          color: "#676767",
          ...thirdRowOfHeaderSx,
        },
        "& .MuiDataGrid-columnHeader": {
          margin: 0,
          padding: 0,
          color: "#262626",
          fontWeight: 400,
          fontSize: "14px",
          minHeight: "100%",
          ...headerSx,
        },
      },
    },
    "& .MuiDataGrid-cell": {
      textAlign: "center",
      padding: "0px 0px",
      color: "black",
      display:"flex",
      alignItems:"center",
      ...rowCellsSx,
    },
    // Loader style customization
    "& .MuiDataGrid-overlay": {
      backgroundColor: "rgba(255, 255, 255, 0.7)", // semi-transparent overlay
    },
    "& .MuiDataGrid-loading": {
      color: "#e8e804", // custom loader color (pink, but you can change this)
    },
    "& .MuiCircularProgress-root": {
      color: "#e8e804", // custom color for the loader spinner
    },
    "& .MuiDataGrid-viewport": {
      overflow: "auto",
    },
    // "& .MuiDataGrid-scrollArea": {
    //   overflow: "auto",
    //   width: "0px",
    // },
    // "& .MuiDataGrid-scrollbar": {
    //   display: "none",
    //   visibility: "hidden",
    //   width: "0px",
    // },
  
    ...sx,
  };

  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "column", mt: "10px" }}>
        <Box>
          <DataGrid
            rows={rows}
            columns={columns}
            columnGroupingModel={columnGroupingModel}
            checkboxSelection={false}
            disableColumnMenu={true}
            disableColumnSorting={false}
            autoPageSize={false}
            hideFooter={true}
            hideFooterPagination={true}
            showColumnVerticalBorder={true}
            showCellVerticalBorder={true}
            disableRowSelectionOnClick={true}
            loading={loading}
            density="standard"
            columnHeaderHeight={50}
            // @ts-ignore
            style={{ ...tableSx }}
            // @ts-ignore
            sx={{ ..._Sx }}
          />
        </Box>

        {/* Pagination */}
        <StyledBox>
          <Pagination
            sx={{ m: "auto" }}
            count={count}
            onChange={handlePageChange}
            page={currentPage}
          />
        </StyledBox>
      </Box>
    </Box>
  );
};

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  border: "1px solid rgb(204, 204, 204)",
  alignItems: "center",
  width: "100%",
  height: "50px",
}));

export default MagicTable;
