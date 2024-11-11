import React, { useState } from "react";
import PageHeader from "../../components/common/MagicPageHeader";
import Stack from "../../components/mui/Stack";
import Table from "../../components/common/MagicTable";
import EditIcon from "@mui/icons-material/Edit";
import Button from "../../components/mui/Button";
import Sidebar from "../../components/common/MagicDrawer";
import { SubmitHandler, useForm } from "react-hook-form";
import AwardEditForm from "../../components/configuration/forms/AwardEditForm";

const ManageAward: React.FC = () => {
  const [isOpenEditSidebar, setIsOpenEditSidebar] = useState<boolean>(false);

  const toggleEditSidebar = () => setIsOpenEditSidebar((prevState) => !prevState);

  const {
    handleSubmit: handleEditFormSubmit,
    control: editFormControl,
    formState: editFormState,
    reset: resetEditForm,
  } = useForm({
    defaultValues: {
      editedDetails: {
        LeaderBoardCount: null,
        PointsRange: null,
        range: null
      },
    },
  });

  const handleEditFormDoneBtn:SubmitHandler<any> = (data) => {
    console.log("data ---->", data);
    console.log("Edit form submitted");
  };

  const handleEditFormCancelBtn = () => {
    resetEditForm(); // Reset form values
    toggleEditSidebar(); // Close sidebar
  };

  const handleEditBtnClick = (data: any) => {
    setIsOpenEditSidebar((prevState) => !prevState);
  };

  const onPageChange = async (event: any, page: number) => {
    console.log("page --->", page);
  };

  const columns = [
    {
      field: "award",
      headerName: "Award",
      flex: 1,
    },
    {
      field: "points",
      headerName: "Points",
      flex: 1,
    },
    {
      field: "leaderBoard",
      headerName: "Leader board",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (props: { row: any }) => {
        return (
          <Button
            variant="outlined"
            sx={{
              textTransform: "capitalize",
              border: "1px solid #EAECF0",
            }}
            onClick={() => handleEditBtnClick(props.row)}
          >
            <EditIcon sx={{ color: "#667085" }} />
          </Button>
        );
      },
    },
  ];

  const rows = [
    {
      id: 1,
      award: "Best Performer",
      points: 150,
      leaderBoard: "John Doe",
    },
    {
      id: 2,
      award: "Top Sales",
      points: 120,
      leaderBoard: "Jane Smith",
    },
    {
      id: 3,
      award: "Team Player",
      points: 100,
      leaderBoard: "Sam Wilson",
    },
    {
      id: 4,
      award: "Employee of the Month",
      points: 180,
      leaderBoard: "Alex Johnson",
    },
  ];

  return (
    <Stack>
      <PageHeader
        title="Manage award"
        subTitle="Here you can view and edit all the award details."
        chipLabel={`${rows.length} awards`}
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

      <Sidebar
        title="Edit Platinum Award"
        subTitle="Here you can edit award details."
        isOpen={isOpenEditSidebar}
        onClose={toggleEditSidebar}
        handleCancelBtn={handleEditFormCancelBtn}
        handleDoneBtn={handleEditFormSubmit(handleEditFormDoneBtn)}
      >
        <AwardEditForm
          control={editFormControl}
          formState={editFormState}
        />
      </Sidebar>
    </Stack>
  );
};

export default ManageAward;
