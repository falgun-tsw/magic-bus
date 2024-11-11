import React, { useState } from "react";

// @ mui icons
import FilterListIcon from "@mui/icons-material/FilterList";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import PlayForWorkIcon from '@mui/icons-material/PlayForWork';
import QcFilterForm from "../components/Qc/QcFilterForm";

// common components
import MagicPageHeader from "../components/common/MagicPageHeader";
import MagicTableHeader from "../components/common/MagicTableHeader";
import MagicDrawer from "../components/common/MagicDrawer";
import MagicTable from "../components/common/MagicTable";
import Stack from "../components/mui/Stack";

const QcContainer: React.FC = () => {
  const [isOpenFilterForm, setIsOpenFilterForm] = useState<boolean>(false)
  const [filter, setFilter] = useState({
    center: "", 
  });

  const toggleFilerFormDrawer = () => {
    setIsOpenFilterForm((preState) => !preState);
  };

  const handleDownloadBtnClick = () => {
    console.log("Hit approve data btn");
  };

  const handleImportBtnClick = () => {
    console.log("Hit Import btn");
  };

  const handleApplyFilterBtn = (): void => {
    console.log("Hit apply filter btn");
  };

  const handleClearAllFilterBtn = (): void => {
    console.log("Hit apply filter btn");
  };
  const handleSearch = (value: string | number) => {
    console.log("Searching value -->", value);
  };

  const handlePagination = (event: any, pageNo: number) => {
    console.log("current page no. --->", pageNo);
  };

  // Header Button
  const magicPageHeaderBtn = [
    {
      text: "Download",
      variant: "contained",
      startIcon: <PlayForWorkIcon />,
      onClick: handleDownloadBtnClick,
      sx: {
        background:"white",
        color: "black",
        textTransform: "capitalize",
        border: "1px solid rgb(176, 152, 65)",
        padding: "4.7px 16px",
      },
    },
  ];

  const magicTableHeaderBtn = [
    {
      text: "Add Filters",
      variant: "outlined",
      startIcon: <FilterListIcon />,
      onClick: toggleFilerFormDrawer,
      sx: {
        color: "black",
        textTransform: "capitalize",
        border: "1px solid rgb(204, 204, 204)",
      },
    },
  ];

  const columns = [
    {
      field: "region",
      headerName: "Region",
      width: 100,
    },
    {
      field: "centerName",
      headerName: "Centre Name",
      minWidth: 250,
    },
    {
      field: "projectCode",
      headerName: "Project Code",
      minWidth: 100,
    },
    {
      field: "tenure",
      headerName: "Tenure",
      minWidth: 190,
    },
    {
      field: "funder",
      headerName: "Funder",
      minWidth: 150,
    },
    {
      field: "district",
      headerName: "District",
      minWidth: 100,
    },
    {
      field: "state",
      headerName: "State",
      minWidth: 150,
    },
    {
      field: "centerType",
      headerName: "Center Type",
      minWidth: 190.6,
    },
  ];

  const rows = [
    {
      id: 1, // Ensure each row has a unique ID
      region: "North",
      centerName: "North Centre A",
      projectCode: "NC001",
      tenure: "2020-2025",
      funder: "Funder A",
      district: "District 1",
      state: "State A",
      centerType: "Type 1",
    },
    {
      id: 2,
      region: "South",
      centerName: "South Centre B",
      projectCode: "SC002",
      tenure: "2021-2026",
      funder: "Funder B",
      district: "District 2",
      state: "State B",
      centerType: "Type 2",
    },
    {
      id: 3,
      region: "East",
      centerName: "East Centre C",
      projectCode: "EC003",
      tenure: "2019-2024",
      funder: "Funder C",
      district: "District 3",
      state: "State C",
      centerType: "Type 3",
    },
    {
      id: 4,
      region: "West",
      centerName: "West Centre D",
      projectCode: "WC004",
      tenure: "2022-2027",
      funder: "Funder D",
      district: "District 4",
      state: "State D",
      centerType: "Type 4",
    },
    {
      id: 5,
      region: "Central",
      centerName: "Central Centre E",
      projectCode: "CC005",
      tenure: "2023-2028",
      funder: "Funder E",
      district: "District 5",
      state: "State E",
      centerType: "Type 5",
    },
  ];

  const ratiobtn = [
    { label: "All", value: "all" },
    { label: "East", value: "east" },
    { label: "West", value: "west" },
    { label: "North", value: "north" },
    { label: "South", value: "south" }
  ];
  const centerList = {
    centerSelect: [
      { id: "center1", label: "Center 1" },
      { id: "center2", label: "Center 2" },
    ],
  };
  const handleFilterFormChange = (field: string, value: any) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [field]: value,
    }));
  };
  return (
    <>
      <Stack>
        <MagicPageHeader
          title="Quarter wise comparison"
          subTitle="Here you can view the Quarter wise comparison."
          buttons={magicPageHeaderBtn}
          chipLabel="400 entries"
        />

        <MagicTableHeader
          buttons={magicTableHeaderBtn}
          onSearchfieldChange={handleSearch}
        />

        <MagicTable
          columns={columns}
          rows={rows}
          loading={false}
          handlePageChange={handlePagination}
          count={4}
          rowCellsSx={{ paddingLeft: "16px", textAlign: "start" }}
          headerSx={{
            paddingLeft: "16px",
            textAlign: "start",
            fontWeight: 600,
            color: "#242424",
            padding: "13px 16px",
          }}
          tableSx={{ maxHeight: "280px" }}
        />

        <MagicDrawer
          title="Add Filters"
          subTitle="See the data in an organized manner by applying filters"
          doneBtnTxt="Apply"
          cancelBtnTxt="Clear all"
          isOpen={isOpenFilterForm}
          doneBtnLoading={false}
          onClose={toggleFilerFormDrawer}
          handleDoneBtn={handleApplyFilterBtn}
          handleCancelBtn={handleClearAllFilterBtn}
        >
          <QcFilterForm 
          ratiobtn={ratiobtn} 
          centerList={centerList} 
          filter={filter} 
          handleFilterFormChange={handleFilterFormChange}  />
        </MagicDrawer>
      </Stack>
    </>
  );
};

export default QcContainer;
