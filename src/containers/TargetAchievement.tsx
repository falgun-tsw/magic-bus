import React, { Component, useState } from "react";

// @ mui icons
import FilterListIcon from "@mui/icons-material/FilterList";
import ImportExportIcon from "@mui/icons-material/ImportExport";

// common components
import MagicPageHeader from "../components/common/MagicPageHeader";
import MagicTableHeader from "../components/common/MagicTableHeader";
import MagicDrawer from "../components/common/MagicDrawer";
import MagicTable from "../components/common/MagicTable";
import Stack from "../components/mui/Stack";
import Tabs from "../components/targetAchivment/Tabs";
import Container from "../components/mui/Container";
import TargetAchivmentfilterForm from "../components/targetAchivment/TargetAchivmentfilterForm";
import ApproveDataFilter from "../components/targetAchivment/ApproveDataFilter";
import { Height } from "@mui/icons-material";

interface TabCategory {
  id: number;
  name: string;
  targetCount: number;
}

const dummyTabCategories: TabCategory[] = [
  { id: 1, name: "Operations HR Data", targetCount: 400 },
  { id: 2, name: "Operations Finance Data", targetCount: 200 },
  { id: 3, name: "Centre Quarter Target", targetCount: 100 },
  { id: 4, name: "Centre Visit Score", targetCount: 700 },
  { id: 5, name: "Governance & Ethics", targetCount: 400 },
  { id: 6, name: "Master Centre List", targetCount: 400 },
  { id: 7, name: "Session Quality Data", targetCount: 400 },
  { id: 8, name: "Sixer Class Data", targetCount: 400 },
  { id: 9, name: "Staff Training Data", targetCount: 400 },
  { id: 10, name: "Target Achievement", targetCount: 400 },
];

const TargetAchievementContainer: React.FC = () => {
  const [isOpenApproveData, setIsOpenApproveData] = useState<boolean>(false);
  const [isOpenFilterForm, setIsOpenFilterForm] = useState<boolean>(false);
  const [filter, setFilter] = useState({
    center: "",
  });
  const [selectedTab, setSelectedTab] = useState<TabCategory | null>(null);

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

  const toggleFilerFormDrawer = () => {
    setIsOpenFilterForm((preState) => !preState);
  };

  const handleApproveDataBtnClick = () => {
    setIsOpenApproveData((preState) => !preState);
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
  const handleReportSearch = (value: string | number) => {
    console.log("Searching value -->", value);
  };

  // Pagination Function
  const handlePagination = (event: any, pageNo: number) => {
    console.log("current page no. --->", pageNo);
  };

  // Buttons
  const magicPageHeaderBtn = [
    {
      text: "Approve data",
      variant: "contained",
      startIcon: "",
      onClick: handleApproveDataBtnClick,
      sx: {
        color: "black",
        textTransform: "capitalize",
        border: "1px solid rgb(176, 152, 65)",
        // padding: "12px 20px",
        width: "171px",
        Height: "40px",
        boarderRadius: "8px",
      },
    },
    {
      text: "Import",
      variant: "outlined",
      startIcon: <ImportExportIcon />,
      onClick: handleImportBtnClick,
      sx: {
        color: "black",
        textTransform: "capitalize",
        border: "1px solid #D0D5DD",
        boarderRadius: "8px",
      },
    },
  ];
  // Header Buttons
  const magicTableHeaderBtn = [
    {
      text: "Add Filters",
      variant: "outlined",
      startIcon: <FilterListIcon />,
      onClick: toggleFilerFormDrawer,
      sx: {
        color: "black",
        textTransform: "capitalize",
        border: "1px solid #D0D5DD",
        boarderRadius: "8px",
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
      field: "funder",
      headerName: "Funder",
      minWidth: 250,
    },
    {
      field: "center",
      headerName: "Center",
      minWidth: 100,
    },
    {
      field: "programmeType",
      headerName: "Programme Type",
      minWidth: 190,
    },
    {
      field: "state",
      headerName: "State",
      minWidth: 150,
    },
    {
      field: "city",
      headerName: "City",
      minWidth: 100,
    },
    {
      field: "cityManager",
      headerName: "City Manager",
      minWidth: 150,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 190.6,
    },
    {
      field: "totBudgetStaff",
      headerName: "Total budgeted staff for the center",
      minWidth: 190.6,
    },
    {
      field: "countOfTheStaff",
      headerName: "Count of the staff in the beginning of the quarter",
      minWidth: 190.6,
    },
    {
      field: "onboardedStaffStrengthEndOfTheQtr",
      headerName: "Current onboarded staff strength at the end of the quarter",
      minWidth: 190.6,
    },
    {
      field: "staffHiredAtEndOfTheQtr",
      headerName: "Staff to be hired at the end of the quarter",
      minWidth: 190.6,
    },
    {
      field: "onboardedStaffInThisQtr",
      headerName: "Onboarded staff in this quarter",
      minWidth: 190.6,
    },
    {
      field: "empResignedInThisQtr",
      headerName: "No. of EMP resigned in the qtr",
      minWidth: 190.6,
    },
    {
      field: "outOfStaffWhoJoinInQtr",
      headerName:
        "Out of staff who joined in QTR-, No. of staff resigned within 3 months (infant Attrition)",
      minWidth: 190.6,
    },
    {
      field: "noOfStaffCompletedF2F",
      headerName: "No. of Staff completed F2F Functional training",
      minWidth: 190.6,
    },
  ];

  const rows = [
    {
      id: 1, // Ensure each row has a unique ID
      region: "North",
      funder: "Swatch India",
      center: "Paharganj (Delhi) - Swatch",
      programmeType: "Standard",
      state: "West Bengal",
      city: "Kolkata",
      cityManager: "Dababrata",
      status: "Active",
      totBudgetStaff: "4",
      countOfTheStaff: "4",
      onboardedStaffStrengthEndOfTheQtr: "4",
      staffHiredAtEndOfTheQtr: "4",
      onboardedStaffInThisQtr: "4",
      empResignedInThisQtr: "4",
      outOfStaffWhoJoinInQtr: "4",
      noOfStaffCompletedF2F: "100%",
    },
    {
      id: 2,
      region: "East",
      funder: "PTI",
      center: "Kirti Nagar (Delhi) - PTI",
      programmeType: "Digital",
      state: "West Bengal",
      city: "Kolkata",
      cityManager: "Dababrata",
      status: "Active",
      totBudgetStaff: "4",
      countOfTheStaff: "4",
      onboardedStaffStrengthEndOfTheQtr: "4",
      staffHiredAtEndOfTheQtr: "4",
      onboardedStaffInThisQtr: "4",
      empResignedInThisQtr: "4",
      outOfStaffWhoJoinInQtr: "4",
      noOfStaffCompletedF2F: "100%",
    },
    {
      id: 3,
      region: "West",
      funder: "Accenture",
      center: "Porur (TamilNadu) - JPM",
      programmeType: "CWW",
      state: "West Bengal",
      city: "Kolkata",
      cityManager: "Dababrata",
      status: "Active",
      totBudgetStaff: "4",
      countOfTheStaff: "4",
      onboardedStaffStrengthEndOfTheQtr: "4",
      staffHiredAtEndOfTheQtr: "4",
      onboardedStaffInThisQtr: "4",
      empResignedInThisQtr: "4",
      outOfStaffWhoJoinInQtr: "4",
      noOfStaffCompletedF2F: "100%",
    },
    {
      id: 4,
      region: "West",
      funder: "Accenture",
      center: "Porur (TamilNadu) - JPM",
      programmeType: "CWW",
      state: "West Bengal",
      city: "Kolkata",
      cityManager: "Dababrata",
      status: "Active",
      totBudgetStaff: "4",
      countOfTheStaff: "4",
      onboardedStaffStrengthEndOfTheQtr: "4",
      staffHiredAtEndOfTheQtr: "4",
      onboardedStaffInThisQtr: "4",
      empResignedInThisQtr: "4",
      outOfStaffWhoJoinInQtr: "4",
      noOfStaffCompletedF2F: "100%",
    },
    {
      id: 5,
      region: "West",
      funder: "Accenture",
      center: "Porur (TamilNadu) - JPM",
      programmeType: "CWW",
      state: "West Bengal",
      city: "Kolkata",
      cityManager: "Dababrata",
      status: "Active",
      totBudgetStaff: "4",
      countOfTheStaff: "4",
      onboardedStaffStrengthEndOfTheQtr: "4",
      staffHiredAtEndOfTheQtr: "4",
      onboardedStaffInThisQtr: "4",
      empResignedInThisQtr: "4",
      outOfStaffWhoJoinInQtr: "4",
      noOfStaffCompletedF2F: "100%",
    },
    {
      id: 6,
      region: "West",
      funder: "Accenture",
      center: "Porur (TamilNadu) - JPM",
      programmeType: "CWW",
      state: "West Bengal",
      city: "Kolkata",
      cityManager: "Dababrata",
      status: "Active",
      totBudgetStaff: "4",
      countOfTheStaff: "4",
      onboardedStaffStrengthEndOfTheQtr: "4",
      staffHiredAtEndOfTheQtr: "4",
      onboardedStaffInThisQtr: "4",
      empResignedInThisQtr: "4",
      outOfStaffWhoJoinInQtr: "4",
      noOfStaffCompletedF2F: "100%",
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
    <>
      <Stack>
        <Tabs
          tabs={dummyTabCategories}
          handleTabChange={handleCategoryChange}
        />
        <MagicPageHeader
          title={selectedTab?.name || "Operations HR data"}
          subTitle="Here you can view the targets given to the employees."
          buttons={magicPageHeaderBtn}
          chipLabel={`${selectedTab?.targetCount || "400"} Target`}
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
          count={5}
          rowCellsSx={{ paddingLeft: "16px", textAlign: "start" }}
          headerSx={{
            paddingLeft: "16px",
            textAlign: "start",
            fontWeight: 600,
            color: "#242424",
            padding: "13px 16px",
          }}
          tableSx={{ height: "350px" }}
        />

        <MagicDrawer
          title="Approve data"
          subTitle="Here you can approve the data by adding remark."
          doneBtnTxt="Approve"
          cancelBtnTxt="Cancel"
          isOpen={isOpenApproveData}
          doneBtnLoading={false}
          onClose={handleApproveDataBtnClick}
          handleDoneBtn={handleApplyFilterBtn}
          handleCancelBtn={handleClearAllFilterBtn}
        >
          <ApproveDataFilter />
        </MagicDrawer>

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
          <TargetAchivmentfilterForm
            ratiobtn={ratiobtn}
            centerList={centerList}
            filter={filter}
            handleFilterFormChange={handleFilterFormChange}
          />
        </MagicDrawer>
      </Stack>
    </>
  );
};

export default TargetAchievementContainer;
