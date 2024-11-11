import React, { useMemo, useState } from "react";
import Cards from "../components/dashboard/Cards";
import MagicPageHeader from "../components/common/MagicPageHeader";
import MagicTableHeader from "../components/common/MagicTableHeader";
import MagicTable from "../components/common/MagicTable";
import QuarterWiseMedalsChart from "../components/dashboard/QuarterWiseMedalsChart";
import RegionWiseMedalsChart from "../components/dashboard/RegionWiseMedalsChart";
import MagicDrawer from "../components/common/MagicDrawer";
import DashBroadFilterForm from "../components/dashboard/FilterForm"

//icon
import FilterListIcon from "@mui/icons-material/FilterList";

const cardData = [
  { 
    id:1,
    code: "ALL_CENTRE",
    displayName: "All Centres",
    count: 40,
    percentage: false
  },
  {
    id:2,
    code: "PLATINUM",
    displayName: "Platinum",
    count: 10,
    percentage: 15

  },
  {
    id:3,
    code: "GOLD",
    displayName: "Gold",
    count: 20,
    percentage: 10

  },
  {
    id:4,
    code: "SILVER",
    displayName: "Silver",
    count: 30,
    percentage: 30

  },
  {
    id:5,
    code: "BRONZE",
    displayName: "Bronze",
    count: 40,
    percentage: 40

  },
];

const DashboardContainer = () => {
  const [selectedCard, setSelectedCard] = useState<string>("ALL_CENTRE");
  const [isOpenFilterForm, setIsOpenFilterForm] = useState<boolean>(false)
  const [filter, setFilter] = useState({
    center: "", 
  });


  const handleOnStatusChange = (currentStatus: string): void => {
    setSelectedCard(currentStatus);
    console.log(selectedCard,"Pratik")
  };

  const handleSearch = (value: string | number): void => {
    console.log("Value -->", value);
  };

  const handlePagination = (event: any, pageNo: number): void => {
    console.log("Page number ------->", pageNo);
  };

  

  const handleFilterBtnClick = (): void => {
    console.log("Hit filter button");
  };
  const toggleFilerFormDrawer = () => {

    setIsOpenFilterForm((preState) => !preState);
  };
  const handleApplyFilterBtn = (): void => {
    console.log("Hit apply filter btn");
  };

  const handleClearAllFilterBtn = (): void => {
    console.log("Hit apply filter btn");
  };
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

  return (
    <>
      <Cards
        cardList={cardData}
        onStatusChange={handleOnStatusChange}
        selectedStatus={selectedCard}
        handleFilter={toggleFilerFormDrawer}
      />

      <MagicPageHeader
        title="Performance of Platinum medals"
        subTitle="Here you can view the performance of all the Platinum medals."
        chipLabel="400 centres"
      />

      {selectedCard === "ALL_CENTRE" && (
        <>
          <RegionWiseMedalsChart />
          <QuarterWiseMedalsChart />
        </>
      )}

      <MagicTableHeader onSearchfieldChange={handleSearch} 
                       />

      <MagicTable
        rows={rows}
        columns={columns}
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
        tableSx={{ height: "213px" }}
      />
      <MagicDrawer  title="Add Filters"
          subTitle="See the data in an organized manner by applying filters"
          doneBtnTxt="Apply"
          cancelBtnTxt="Clear all"
          isOpen={isOpenFilterForm}
          doneBtnLoading={false}
          onClose={toggleFilerFormDrawer}
          handleDoneBtn={handleApplyFilterBtn}
          handleCancelBtn={handleClearAllFilterBtn}>
            <DashBroadFilterForm
                ratiobtn={ratiobtn} 
                centerList={centerList} 
                filter={filter} 
                handleFilterFormChange={handleFilterFormChange}  />

      </MagicDrawer>
    </>
  );
};

export default DashboardContainer;
