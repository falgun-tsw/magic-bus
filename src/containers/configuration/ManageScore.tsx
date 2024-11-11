import React, { useState } from "react";

import { useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../store";

// types
import { ManageScoreApiReq } from "../../store/types/configuration";

// common components
import Sidebar from "../../components/common/Sidebar";

// component
import AddScoreParameterFrom from "../../components/configuration/forms/AddScoreParameterFrom";
import ScoreManagementTabs from "../../components/configuration/ScoreManagementTabs";
import ManageScoreTable from "../../components/configuration/ManageScoreTable";

// Actions
import {
  useParameterTypeQuery,
  useManageScoreQuery,
} from "../../store/apis/configurationApis";
import { SubmitHandler, useForm } from "react-hook-form";
import MagicTable from "../../components/common/MagicTable";
import { Button } from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
const ManageScore: React.FC = () => {
  const filter = useAppSelector((state: RootState) => state.user.filter);

  const [isAddParameterForm, setIsAddParameterForm] = useState<boolean>(false);
  const [manageScoreParams, setManageScoreParams] = useState<ManageScoreApiReq>(
    {
      programMasterId: filter?.selectedProgram,
      quarterMasterId: filter?.selectedQuarter,
      ProgramYearId: filter?.selectedYear,
    }
  );

  const { data: parameterType = [], isLoading: isLoadingParameterType } =
  useParameterTypeQuery();
  const { data: manageScore = [], isLoading: isLoadingManageScore } =
  useManageScoreQuery(manageScoreParams);
  console.log(manageScore,"manageScore-->")

  const {
    handleSubmit: handleAddParameterFormSubmit,
    control: addParameterFormControl,
    setValue: setParameterFormValue,
    reset: resetTargetForm,
  } = useForm({
    defaultValues: {
      parameterFormData: {
        parameterTypeId: undefined,
        parameterName: null,
        programMasterId: filter?.selectedProgram,
        quarterMasterId: filter?.selectedQuarter,
        ProgramYearId: filter?.selectedYear,

        weightage: null,
        measurementCriteria: null,
        score: null,
        highestScoreCanBeObtained: null,
        region: null,
        operator: null,
      },
    },
  });

  const toggleAddParameterForm = () => setIsAddParameterForm((pre) => !pre);

  const handlePagination = (event: any, pageNo: number) => {
    console.log("current page no. --->", pageNo);
  };

  const handleTabChange = (id: number) => {
    setManageScoreParams((prevState) => ({
      ...prevState,
      parameterTypeId: id,
    }));

    // @ts-ignore
    setParameterFormValue("parameterFormData.parameterTypeId", id);
  };

  const handleAddParameterBtn = () => {
    setIsAddParameterForm((pre) => !pre);
  };

  const handleAddParameterFromDoneBtn: SubmitHandler<any> = (data) => {
    console.log("form data --->", data);
  };

  const handleAddParameterFromCancelBtn = () => {};

  const columns = [
    {
      field: "parameter",
      headerName: "Parameter",
      width: 350,
    },
    {
      field: "weightage",
      headerName: "Weightage",
      minWidth: 100,
    },
    {
      field: "measurementCriteria",
      headerName: "Measurement Criteria",
      minWidth: 500,
    },
    {
      field: "score",
      headerName: "Score",
      minWidth: 100,
    },
    {
      field: "action",
      headerName: "Action ",
      minWidth: 100,
      renderCell: (props: { row: any }) => {
        return (
          <Button
            // onClick={() => handleEditBtnClick(props.row)}
            variant="contained"
            sx={{
              backgroundColor:"#FFF",
              textTransform: "capitalize",
              border: "1px solid #DFDFDF", // Corrected here
              borderRadius: "8px"
            }}
          >
            <EditOutlinedIcon sx={{color:"#667085"}}/>
          </Button>
        );
      },
    }
  ];

  const rows = [
    {
      id: 1, // Ensure each row has a unique ID
      parameter:"Your Enrolment",
      weightage: "20%",
      measurementCriteria: ">= 100% target is achieved",
      score:"20",
      action:""
    },
    {
      id: 2, // Ensure each row has a unique ID
      parameter:"Your Enrolment",
      weightage: "20%",
      measurementCriteria: ">= 100% target is achieved",
      score:"20",
      action:""
    },
    {
      id: 3, // Ensure each row has a unique ID
      parameter:"Your Enrolment",
      weightage: "20%",
      measurementCriteria: ">= 100% target is achieved",
      score:"20",
      action:""
    },
    {
      id: 4, // Ensure each row has a unique ID
      parameter:"Your Enrolment",
      weightage: "20%",
      measurementCriteria: ">= 100% target is achieved",
      score:"20",
      action:""
    },
    {
      id: 5, // Ensure each row has a unique ID
      parameter:"Your Enrolment",
      weightage: "20%",
      measurementCriteria: ">= 100% target is achieved",
      score:"20",
      action:""
    },
    {
      id: 6, // Ensure each row has a unique ID
      parameter:"Your Enrolment",
      weightage: "20%",
      measurementCriteria: ">= 100% target is achieved",
      score:"20",
      action:""
    },
  ];
  return (
    <div>
      <ScoreManagementTabs
        scoreTabs={parameterType}
        isLoadingScoreTabs={isLoadingParameterType}
        handleTabChange={handleTabChange}
        handleAddParameterBtn={handleAddParameterBtn}
      />

      {/* <ManageScoreTable manageScore={manageScore} /> */}
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
      <Sidebar
        bodySx={{ p: 2 }}
        title="Add Parameter"
        subTitle="Here you can add parameters by filling the details."
        handleDoneBtn={handleAddParameterFormSubmit(
          handleAddParameterFromDoneBtn
        )}
        isOpen={isAddParameterForm}
        onClose={toggleAddParameterForm}
        doneBtnLoading={false}
        handleCancelBtn={handleAddParameterFromCancelBtn}
      >
        <AddScoreParameterFrom control={addParameterFormControl} />
      </Sidebar>
    </div>
  );
};

export default ManageScore;
