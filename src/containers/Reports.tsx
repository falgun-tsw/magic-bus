import React, { useState } from "react";

// @ mui icons
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import FilterListIcon from "@mui/icons-material/FilterList";

// common components
import MagicPageHeader from "../components/common/MagicPageHeader";
import MagicTableHeader from "../components/common/MagicTableHeader";
import MagicDrawer from "../components/common/MagicDrawer";
import MagicTable from "../components/common/MagicTable";
import Stack from "../components/mui/Stack";
import ReportFilterForm from "../components/Report/ReportFilterForm";
import Tabs from "../components/targetAchivment/Tabs";

interface TabCategory {
  id: number;
  name: string;
  targetCount: number;
}

const dummyTabCategories: TabCategory[] = [
  { id: 1, name: "Parameter wise", targetCount: 400 },
  { id: 2, name: "Medal wise", targetCount: 200 },
  { id: 3, name: "Target VS Achievement", targetCount: 100 },
  { id: 4, name: "Lorem ipsum", targetCount: 700 },
  { id: 5, name: "Lorem ipsum", targetCount: 400 },
  { id: 6, name: "Lorem ipsum", targetCount: 400 },
  { id: 7, name: "Lorem ipsum", targetCount: 400 },
];

const ReportsContainer: React.FC = () => {
  const [isOpenFilterForm, setIsOpenFilterForm] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<TabCategory | null>(null);
  const [filter, setFilter] = useState({
    center: "",
  });

  const toggleFilerFormDrawer = () => {
    setIsOpenFilterForm((preState) => !preState);
  };
  const handleCategoryChange = (id: number) => {
    const selectedCategory = dummyTabCategories.find(
      (category) => category.id === id
    );
    if (selectedCategory) {
      setSelectedTab(selectedCategory);
    } else {
      console.log("Category not found for ID:", id);
    }
  };
  const handleApplyFilterBtn = (): void => {
    console.log("Hit apply filter btn");
  };

  const handleClearAllFilterBtn = (): void => {
    console.log("Hit apply filter btn");
  };
  const handleReportSearch = (value: string | number) => {
    console.log("Searching value -->", value);
  };

  const handlePagination = (event: any, pageNo: number) => {
    console.log("current page no. --->", pageNo);
  };

  const magicPageHeaderBtn = [
    {
      text: "Download",
      variant: "outlined",
      startIcon: <ArrowDownwardIcon />,
      onClick: () => {},
      sx: {
        color: "black",
        textTransform: "capitalize",
        border: "1px solid rgb(204, 204, 204)",
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
    { label: "South", value: "south" },
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
    <Stack>
      <Tabs tabs={dummyTabCategories} handleTabChange={handleCategoryChange} />
      <MagicPageHeader
        title={`${selectedTab?.name || "Parameter wise"} Report`}
        subTitle="Here you can view the report with all the details."
        buttons={magicPageHeaderBtn}
        chipLabel={`${selectedTab?.targetCount || "400"} entries`}
      />
      <MagicTableHeader
        buttons={magicTableHeaderBtn}
        onSearchfieldChange={handleReportSearch}
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
        tableSx={{ height: "280px" }}
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
        <ReportFilterForm
          ratiobtn={ratiobtn}
          centerList={centerList}
          filter={filter}
          handleFilterFormChange={handleFilterFormChange}
        />
      </MagicDrawer>
    </Stack>
  );
};

export default ReportsContainer;
