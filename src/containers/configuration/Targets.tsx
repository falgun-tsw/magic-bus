import React, { useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";

import AddIcon from "@mui/icons-material/Add";

// common components
import TableHeader from "../../components/common/MagicTableHeader";
import PageHeader from "../../components/common/MagicPageHeader";
import Sidebar from "../../components/common/MagicDrawer";
import Table from "../../components/common/MagicTable";

// components
import AddTargetForm from "../../components/configuration/forms/AddTargetForm";
import FilterTarget from "../../components/configuration/FilterTarget";

const Targets: React.FC = () => {
  const [isOpenAddTargetSidebar, setIsOpenAddTargetSidebar] = useState<boolean>(false);
  const [isOpenAddFilterSidebar, setIsOpenAddFilterSidebar] = useState<boolean>(false);

  const {
    handleSubmit: handleAddTargetFormSubmit,
    control: addTargetFormControl,
    reset: resetTargetForm,
  } = useForm({
    defaultValues: {
      createNewTargetFormData: {
        center: null,
        targetDuration: null,

        programmePerformance: {
          youthEnrolment: null,
          femaleEnrolment: null,
          youthDropout: null,
          youthAttendance: null,
          youthPlacement: null,
          youthRetention: null,
          demandDrivenBatches: null,
        },

        qualityAndEfficacy: {
          finPerformanceUnderspent: null,
          onboardStaff: null,
          staffAttrition: null,
          infantAttrition: null,
          trainedStaff: null,
          centerOccupancyAsPerSessionPlanAndTimeSheet: null,
          youthAttendance: null,
          communicationWithFPD: null,
          qualityDocumentation: null,
          knowledge: null,
          skill: null,
          attitude: null,
          funderAuditScore: null,
          youthFeedbackScore: null,
          staffProfessional: null,
          infrastructure: null,
          centerHygieneAndSafety: null,
          centerBranding: null,
        },
      },
    },
  });

  const {
    handleSubmit: handleFilterSubmit,
    control: filterFormControl,
    reset: resetFilter,
  } = useForm({
    defaultValues: {
      filter: {
        targetDuration:[]
      },
    },
  });

  const toggleAddNewTargetSidebar = () => setIsOpenAddTargetSidebar((preState) => !preState);
  const toggleAddFilterSidebar = () => setIsOpenAddFilterSidebar((preState) => !preState);





  const handleAddTargetDoneBtn: SubmitHandler<any> = (data) => {
    console.log("data ---->", data);
    setIsOpenAddTargetSidebar((preState) => !preState);
  };

  const handleAddFilterDoneBtn:SubmitHandler<any> = (data) => {
    console.log("filter data --->", data)
    setIsOpenAddFilterSidebar((preState) => !preState);
  };






  const handleAddTargetCancelBtn = () => {
    resetTargetForm();

  };

  const handleAddFilterCancelBtn = () => {
    resetFilter();
    setIsOpenAddFilterSidebar((preState) => !preState);
  };


  const handleSearch = (value: string | number) => {
    console.log("value --->", value);
  };


  const onPageChange = async (event: any, page: number) => {
     console.log("page --->", page);
  };


  const headerBtn = [
    {
      text: "Add target",
      variant: "contained",
      startIcon: <AddIcon />,
      onClick: toggleAddNewTargetSidebar,
    },
  ];
  const tableHeaderBtn = [
    {
      text: "Add Filter",
      variant: "contained",
      startIcon: <AddIcon />,
      onClick: toggleAddFilterSidebar,
    },
  ];

  const columns = [
    {
      field: "centre", 
      headerName: "Centre",
      minWidth: 90,
    },
    {
      field: "targetDuration",
      headerName: "Target duration",
      minWidth: 120,
    },
    {
      field: "youthEnrolment",
      headerName: "Youth enrolment",
      minWidth: 135,
    },
    {
      field: "femaleEnrolment",
      headerName: "Female enrolment",
      minWidth: 135,
    },
    {
      field: "youthDropout",
      headerName: "Youth dropout",
      minWidth: 115,
    },
    {
      field: "youthAttendance",
      headerName: "Youth attendance",
      minWidth: 130,
    },
    {
      field: "youthPlacement",
      headerName: "Youth placement",
      minWidth: 130,
    },
    {
      field: "youthRetention",
      headerName: "Youth retention",
      minWidth: 125,
    },
    {
      field: "demandDrivenBatches",
      headerName: "Demand driven batches",
      flex: "auto",
      minWidth: 173,
    },
    {
      field: "finePerformanceUnderspent",
      headerName: "Fine performance underspent",
      minWidth: 210,
    },
    {
      field: "onboardStaff",
      headerName: "Onboard staff",
      flex: "auto",
    },
    {
      field: "staffAttrition",
      headerName: "Staff attrition",
      minWidth: 106,
    },
    {
      field: "infantAttrition",
      headerName: "Infant attrition",
      minWidth: 110,
    },
    {
      field: "trainedStaff",
      headerName: "Trained staff",
      flex: "auto",
    },
    {
      field: "centreOccupancy",
      headerName: "Centre occupancy",
      minWidth: 130,
    },
    {
      field: "communicationWithFpd",
      headerName: "Communication with FPD",
      minWidth: 185,
    },
    {
      field: "qualityDocumentation",
      headerName: "Quality documentation",
      minWidth: 165,
    },
    {
      field: "knowledge",
      headerName: "Knowledge",
      flex: "auto",
    },
    {
      field: "skill",
      headerName: "Skills",
      flex: "auto",
    },
    {
      field: "attitude",
      headerName: "Attitude",
      flex: "auto",
    },
    {
      field: "funderSatisfactionScore",
      headerName: "Funder satisfaction score",
      minWidth: 180,
    },
    {
      field: "funderAdultScore",
      headerName: "Funder Adult Score",
      minWidth: 140,
    },
    {
      field: "youthFeedbackScore",
      headerName: "Youth Feedback Score", // Capitalized "Youth"
      minWidth: 160,
    },
    {
      field: "employerFeedbackScore",
      headerName: "Employer Feedback Score",
      minWidth: 185,
    },
    {
      field: "staffProfessionalism",
      headerName: "Staff Professionalism",
      minWidth: 155,
    },
    {
      field: "infrastructure",
      headerName: "Infrastructure", // Capitalized "Infrastructure"
      minWidth: 105,
    },
    {
      field: "centerHygiene",
      headerName: "Center hygiene",
      minWidth: 110,
    },
    {
      field: "centerBranding",
      headerName: "Center branding",
      minWidth: 120,
    },
  ];

  const rows = [
    {
      id: 2,
      centre: "Centre B",
      targetDuration: 14,
      youthEnrolment: 200,
      femaleEnrolment: 90,
      youthDropout: 15,
      youthAttendance: 10,
      youthPlacement: 10,
      youthRetention: 10,
      demandDrivenBatches: 6,
      finePerformanceUnderspent: 20,
      onboardStaff: 25,
      staffAttrition: 8,
      infantAttrition: 4,
      trainedStaff: 22,
      centreOccupancy: 88,
      communicationWithFpd: 20,
      qualityDocumentation: 5,
      knowledge: 1,
      skill: 2,
      attitude: 4,
      funderSatisfactionScore: 7,
      funderAdultScore: 6,
      youthFeedbackScore: 8,
      employerFeedbackScore: 7,
      staffProfessionalism: 3,
      infrastructure: 8,
      centerHygiene: 6,
      centerBranding: 5,
    },
  ];


  return (
    <>
      <PageHeader
        title="All Targets"
        subTitle="Here you can view the targets given to the employees."
        chipLabel={`400 targets`}
        buttons={headerBtn}
      />

      <TableHeader
        buttons={tableHeaderBtn}
        onSearchfieldChange={handleSearch}
      />

      <Table
        columns={columns}
        rows={rows}
        rowCellsSx={{ paddingLeft: "10px", textAlign: "start" }}
        headerSx={{
          textAlign: "start",
          fontWeight: 600,
          color: "#242424",
          padding: "13px 0px 13px 10px",
        }}
        tableSx={{ height: "247px" }}
        handlePageChange={onPageChange}
        count={10}
        loading={false}
      />

      {/* this sidebar open on click of add new target btn */}
      <Sidebar
        bodySx={{ padding: "0px" }}
        title="Create New target"
        subTitle="Here you can create new target by filling the details."
        handleDoneBtn={handleAddTargetFormSubmit(handleAddTargetDoneBtn)}
        isOpen={isOpenAddTargetSidebar}
        onClose={toggleAddNewTargetSidebar}
        doneBtnLoading={false}
        handleCancelBtn={handleAddTargetCancelBtn}
      >
        <AddTargetForm control={addTargetFormControl} />
      </Sidebar>

      {/* this sidebar open on click of Add filter btn */}
      <Sidebar
        bodySx={{ bgcolor: "rgb(250, 250, 250)" }}
        title="Add Filters"
        cancelBtnTxt="Clear All"
        subTitle="See the data in an organized manner by applying filters"

        handleDoneBtn={handleFilterSubmit(handleAddFilterDoneBtn)}
        handleCancelBtn={handleAddFilterCancelBtn}
        onClose={toggleAddFilterSidebar}

        isOpen={isOpenAddFilterSidebar}
        doneBtnLoading={false}
      >
        <FilterTarget controller = {filterFormControl } />
      </Sidebar>
    </>
  );
};

export default Targets;
