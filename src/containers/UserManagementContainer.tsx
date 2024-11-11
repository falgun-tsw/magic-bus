import React, { useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";

// @ui
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";

// @mui components:
import Button from "../components/mui/Button";

// Common Components:
import TableHeader from "../components/common/MagicTableHeader";
import Header from "../components/common/MagicPageHeader";
import Sidebar from "../components/common/MagicDrawer";
import Table from "../components/common/MagicTable";

// pages:
import UserForm from "../components/userManagement/UserForm";
import AddFilterForm from "../components/userManagement/FilterForm";

// interface
import {
  FetchUserRequest,
  UserFormInterface,
  ParsedFetchUserResponse,
} from "../store/types/user";

// Action
import {
  useFetchedUsersQuery,
  useCreateUserMutation,
  useEditUserMutation,
  useUserRolesQuery,
} from "../store/apis/userApi";
import { Switch } from "@mui/material";
import OnOffButton from "../components/common/OnOffButton";

interface FilterInterface {
  filter: {
    [key: string]: string[];
  };
}
const handleToggle = ()=>{
  console.log("handleToggle")
}
const UserManagementContainer = () => {
  
  const columns = [
    {
      field: "username",
      headerName: "User name",
      flex: 1,
    },
    {
      field: "roleName",
      headerName: "Role",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email address",
      flex: 1,
    },
    {
      field: "phoneNo",
      headerName: "Phone number",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      // renderCell: (props: { row: any }) => {
      //   return (
      //     <Button
      //       onClick={() => handleEditBtnClick(props.row)}
      //       variant="contained"
      //       sx={{
      //         fontWeight: "400",
      //         textTransform: "capitalize",
      //         border: "1px solid #997906", // Corrected here
      //         borderRadius: "8px",
      //       }}
      //     >
      //       Edit
      //     </Button>
      //   );
      // },

      renderCell: (props: { row: any }) => {
        return (
          <Switch
            checked={props.row.status}
            sx={{
              "& .MuiSwitch-thumb": {
                backgroundColor: props.row.status ? "green" : "red",
              },
              "& .MuiSwitch-track": {
                backgroundColor: props.row.status ? "green" : "red",
              },
            }}
          />
        //   <div style={{padding:12}}>

        //   <OnOffButton
        // checked={true}
        // onChange={handleToggle}
        // opacity={1}
        // cursor="pointer"
        // onText="On"
        // offText="Off"
        // disabled={false}
        // />
        // </div>
        );
      },
    },
  ];

  const [isOpenAddUserSidebar, setIsOpenAddUserSidebar] =
    useState<boolean>(false);
  const [isAddFilterSidebarOpen, setIsFilterSidebarOpen] =
    useState<boolean>(false);
  const [isEditSidebarOpen, setIsEditSidebarOpen] = useState<boolean>(false);
  const [params, setParams] = useState<FetchUserRequest>({
    pageNo: "1",
    pageSize: "10",
  });
  const [isLessThen3Value, setIsLessThen3Value] = useState<boolean>(false);

  const { data: fetchedUsers = [], isFetching: isFetchingUserData } =
    useFetchedUsersQuery(params);
  const [createUser, { data: createdUserId, isLoading: isCreatingUser }] =
    useCreateUserMutation();
  const [editUser, { isLoading: isLoadingEdit }] = useEditUserMutation();
  const { data: userRoles = [] } = useUserRolesQuery();

  // @ts-ignore
  const totalUsers = fetchedUsers.totalUsers;
  const totalPages = Math.ceil(totalUsers / 10);

  // User Form state
  const {
    handleSubmit: handleAddUserSubmit,
    control: addUserFormControl,
    formState: { errors: addUserFormError },
    reset: resetAddUserFormDetails,
  } = useForm<UserFormInterface>({
    defaultValues: {
      addUserDetails: {
        userId: null,
        username: "",
        email: "",
        phoneNo: "",
        roleId: null,
      },
    },
  });

  // User Filter form state
  const { handleSubmit: handleFilter, control: filterControl } =
    useForm<FilterInterface>({
      defaultValues: {
        filter: {
          role: [],
        },
      },
    });

  const toggleFilterSidebar = () =>
    setIsFilterSidebarOpen(!isAddFilterSidebarOpen);
  const toggleEditUserSidebar = () => setIsEditSidebarOpen(!isEditSidebarOpen);
  const toggleAddUserSidebar = () =>
    setIsOpenAddUserSidebar(!isOpenAddUserSidebar);

  const handleAddUserCancelBtn = () =>
    setIsOpenAddUserSidebar(!isOpenAddUserSidebar);
  const handleClearAllBtnAddFilterForm = () =>
    setIsFilterSidebarOpen(!isAddFilterSidebarOpen);
  const handleClearBtnEditUserForm = () =>
    setIsEditSidebarOpen(!isEditSidebarOpen);

  const handleApplyBtnAddUserForm: SubmitHandler<UserFormInterface> = async (
    data
  ) => {
    const { username, phoneNo, email, roleId } = data.addUserDetails;

    // @ts-ignore
    const res = await createUser({ username, phoneNo, email, roleId });

    if (res) {
      setIsOpenAddUserSidebar((preState) => !preState);
      resetAddUserFormDetails(); // reset user form after create new user
    }
  };

  const handleApplyBtnAddFilterForm: SubmitHandler<FilterInterface> = async (
    data
  ) => {
    // @ts-ignore
    setParams((prevParams) => ({ ...data.filter }));
    setIsFilterSidebarOpen((preState) => !preState);
  };

  const handleEditUserDoneBtn: SubmitHandler<UserFormInterface> = async (
    data: UserFormInterface
  ) => {
    const { userId, username, phoneNo, roleId } = data.addUserDetails;

    // @ts-ignore
    const res = await editUser({ userId, username, phoneNo, roleId });
    if (res) setIsEditSidebarOpen((preState) => !preState);
  };

  const handleEditBtnClick = (rowData: any) => {
    const { id, username, email, phoneNo, roleId } = rowData;
    resetAddUserFormDetails({
      addUserDetails: {
        userId: id,
        username: username,
        roleId: roleId,
        email: email,
        phoneNo: phoneNo,
      },
    });

    setIsEditSidebarOpen(!isEditSidebarOpen);
  };

  const onPageChange = async (event: any, page: number) => {
    setParams({ pageSize: "10", pageNo: page.toString() });
  };

  const onSearchfieldChange = (value: string | number) => {
    const searchValue = value.toString();
    const isLessThan3 = searchValue.length > 0 && searchValue.length < 3;
    setIsLessThen3Value(isLessThan3);

    if (searchValue.length >= 3) {
      setParams({ search: searchValue });
    } else if (searchValue.length === 0) {
      // @ts-ignore
      setParams();
    }
  };

  const buttons = [
    {
      text: "Add Users",
      variant: "contained",
      startIcon: <AddIcon />,
      onClick: toggleAddUserSidebar,
      sx: {
        border: "1px solid #997906", // Corrected here
        borderRadius: "8px",
      },
    },
  ];

  const tableHeaderBtn = [
    {
      text: "Add Filters",
      variant: "contained",
      startIcon: <FilterListIcon />,
      onClick: toggleFilterSidebar,
      sx: {
        background: "white",
        border: "1px solid #D0D5DD", // Corrected here
        borderRadius: "8px",
      },
    },
  ];
  console.log(fetchedUsers, "fetchedUsers");
  console.log(totalPages, "totalPages");
  console.log(isFetchingUserData, "isFetchingUserData");
  return (
    <div>
      <Header
        title="User management"
        subTitle="Here you can view the list of all the users and roles."
        chipLabel={`${totalUsers} users`}
        buttons={buttons}
      />

      <TableHeader
        buttons={tableHeaderBtn}
        onSearchfieldChange={onSearchfieldChange}
        isInvalidSearch={isLessThen3Value}
      />

      <Table
        // @ts-ignore
        rows={fetchedUsers.users}
        count={totalPages}
        columns={columns}
        loading={isFetchingUserData}
        rowCellsSx={{ paddingLeft: "16px", textAlign: "start" }}
        headerSx={{
          textAlign: "start",
          fontWeight: 600,
          color: "#242424",
          padding: "13px 16px",
        }}
        tableSx={{ height: "243px" }}
        handlePageChange={onPageChange}
      />

      {/* This sidebar open the click of Add Users button of table */}
      <Sidebar
        title="Add Users"
        subTitle="Here you can Add users by filling the details"
        isOpen={isOpenAddUserSidebar}
        onClose={toggleAddUserSidebar}
        handleCancelBtn={handleAddUserCancelBtn}
        handleDoneBtn={handleAddUserSubmit(handleApplyBtnAddUserForm)}
        cancelBtnTxt="Cancel"
        doneBtnTxt="Done"
        doneBtnLoading={isFetchingUserData}
      >
        {/* <UserForm
          errors={addUserFormError}
          control={addUserFormControl}
          selectOptions={userRoles}
        /> */}
      </Sidebar>

      {/* This sidebar open the click of Edit button of table */}
      <Sidebar
        title="Edit Users"
        subTitle="Here you can add users by filling the details."
        isOpen={isEditSidebarOpen}
        onClose={toggleEditUserSidebar}
        handleCancelBtn={handleClearBtnEditUserForm}
        handleDoneBtn={handleAddUserSubmit(handleEditUserDoneBtn)}
        cancelBtnTxt="Cancel"
        doneBtnTxt="Done"
        doneBtnLoading={isLoadingEdit}
      >
        {/* <UserForm
          errors={addUserFormError}
          control={addUserFormControl}
          selectOptions={userRoles}
        /> */}
      </Sidebar>

      {/* This sidebar open  click of Add Filters button of table */}
      <Sidebar
        title="Add Filters"
        subTitle="See the data in an organized manner by applying filters"
        isOpen={isAddFilterSidebarOpen}
        onClose={toggleFilterSidebar}
        handleCancelBtn={handleClearAllBtnAddFilterForm}
        handleDoneBtn={handleFilter(handleApplyBtnAddFilterForm)}
        isVisibleActionSection={true}
        cancelBtnTxt="Clear all"
        doneBtnTxt="Apply"
        doneBtnLoading={isFetchingUserData}
      >
        {/* <AddFilterForm control={filterControl} role={userRoles} /> */}
      </Sidebar>
    </div>
  );
};

export default UserManagementContainer;
