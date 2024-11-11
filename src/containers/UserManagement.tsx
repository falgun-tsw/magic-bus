import React, { useState, useEffect } from "react";

import { useForm, SubmitHandler } from "react-hook-form";

// @ui
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";

// @mui components:
import Button from "../components/mui/Button";

// Common Components:
import TableHeader from "../components/common/MagicTableHeader";
import Header from "../components/common/MagicPageHeader";
import MagicDrawer from "../components/common/MagicDrawer_new";
import Table from "../components/common/MagicTable";
import ToggleButton from "../components/mui/ToggleButton";
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
  useUserProgramQuery,
  useUpdateUserStatusMutation,
} from "../store/apis/userApi";

// center list
import { useCenterListQuery } from "../store/apis/centerApis";
import Text from "../components/mui/Text";
import Box from "../components/mui/Box";

interface FilterInterface {
  filter: {
    role: string[];
    centers: string[];
    programs: string[];
  };
}

const UserManagementContainer = () => {
  //toggle

  const [updateUserStatus] = useUpdateUserStatusMutation();
  const [isOpenAddUserSidebar, setIsOpenAddUserSidebar] =
    useState<boolean>(false);

  const [isAddFilterSidebarOpen, setIsFilterSidebarOpen] =
    useState<boolean>(false);

  const [isEditSidebarOpen, setIsEditSidebarOpen] = useState<boolean>(false);
  const [params, setParams] = useState<FetchUserRequest>({
    pageNo: "1",
    pageSize: "10",
  });

  const [searchValue, setSearchValue] = useState<string>("");
  const [isLessThen3Value, setIsLessThen3Value] = useState<boolean>(false);
  const [isLoadingSearch, setIsLoadingSearch] = useState<boolean>(false);

  const {
    data: fetchedUsers = [],
    isFetching: isFetchingUserData,
    refetch: userRefetch,
  } = useFetchedUsersQuery(params);

  const [createUser, { data: createdUserId, isLoading: isCreatingUser }] =
    useCreateUserMutation();

  const [editUser, { isLoading: isLoadingEdit }] = useEditUserMutation();
  const { data: userRoles = [] } = useUserRolesQuery();
  const { data: userProgram = [] } = useUserProgramQuery();

  //center
  const { data: centerList = [] } = useCenterListQuery({});
  const centerLists = centerList.centerSelect;

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
        department: "",
        empId: null,
        publishedAt: "",
        center: "",
        program: "",
        roleId: "",
      },
    },
  });

  const handleToggleActive = (rowData: any) => {
    const updatedStatus = rowData.isActive === 1 ? false : true;

    const payload = {
      isActive: updatedStatus,
    };

    try {
      updateUserStatus({ id: rowData?.id, payload });
      userRefetch();
    } catch (error) {
      console.log("error", error);
    }
  };

  function formatDateString(dateString: string): string {
    const date = new Date(dateString);

    // Get individual components
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    // Format hours for 12-hour format
    hours = hours % 12 || 12;

    // Format the final date string
    return `${month}/${day}/${year} - ${hours}:${minutes}${ampm}`;
  }

  // User Filter form state
  const {
    handleSubmit: handleFilter,
    control: filterControl,
    reset: resetFilterForm,
  } = useForm<FilterInterface>({
    defaultValues: {
      filter: {
        role: [],
        centers: [],
        programs: [],
      },
    },
  });

  const handleAddUserDrawerCancel = () =>
    setIsOpenAddUserSidebar(!isOpenAddUserSidebar);
  const toggleFilterSidebar = () => {
    setIsFilterSidebarOpen(!isAddFilterSidebarOpen);
  };
  const toggleEditUserSidebar = () => {
    setIsEditSidebarOpen(!isEditSidebarOpen);
    resetAddUserFormDetails({
      addUserDetails: {
        userId: null,
        username: "",
        email: "",
        department: "",
        empId: null,
        publishedAt: "",
        center: "",
      },
    });
  };
  const toggleAddUserSidebar = () => {
    setIsOpenAddUserSidebar(!isOpenAddUserSidebar);
    resetAddUserFormDetails({
      addUserDetails: {
        userId: null,
        username: "",
        email: "",
        department: "",
        empId: null,
        publishedAt: "",
        center: "",
      },
    });
  };

  const handleClearAllBtnAddFilterForm = () => {
    setIsFilterSidebarOpen(!isAddFilterSidebarOpen);
    resetFilterForm({
      filter: {
        role: [],
        centers: [],
        programs: [],
      },
    });
    setParams((prevParams) => ({
      pageNo: "1",
      pageSize: prevParams.pageSize || "10",
      role: [],
      centers: [],
      programs: [],
      search: searchValue.length >= 3 ? searchValue : undefined,
    }));
    userRefetch();
  };

  const handleApplyBtnAddUserForm = async (data: any) => {
    const { username, email, department, roleId, center, program, empId } =
      data?.addUserDetails;

    const centerKeyFormated = center?.map((item: any) => item.id);

    const programKeyFormated = program?.map((item: any) => item.value);

    const payload = {
      username: username,
      email: email,
      program: programKeyFormated,
      department: department,
      roleId: roleId?.value,
      center: centerKeyFormated,
      empId: empId,
    };

    // @ts-ignore
    try {
      const res = await createUser(payload);

      if (res.data.success) {
        userRefetch();
        setIsOpenAddUserSidebar((preState) => !preState);
        resetAddUserFormDetails();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleApplyBtnAddFilterForm: SubmitHandler<FilterInterface> = async (
    data
  ) => {
    const { role, centers, programs } = data.filter;
    const centerIds = Array.isArray(centers)
      ? centers.map((center: any) => center.id)
      : [];
    const programId = Array.isArray(programs)
      ? programs.map((program: any) => program.value)
      : [];
    const payload = { role: role, centers: centerIds, programs: programId };

    // @ts-ignore
    setParams((prevParams) => ({
      ...prevParams,
      pageNo: "1",
      role,
      center: centerIds,
      program: programId,
    }));
    setIsFilterSidebarOpen((preState) => !preState);
  };

  const handleEditUserDoneBtn = async (data: any) => {
    const {
      userId,
      username,
      roleId,
      department,
      center,
      program,
      empId,
      phoneNo,
      location,
      email,
    } = data.addUserDetails;

    const payload = {
      userId: userId,
      username: username,
      roleId: roleId?.value,
      department: department,
      center: center.map((item: any) => item.id),
      program: program.map((item: any) => item.value),
      empId: empId !== null ? String(empId) : undefined,
      email: email,
      // location: location,
    };

    try {
      const res = await editUser(payload);

      if (res.data.success) {
        setIsEditSidebarOpen((preState) => !preState);
        userRefetch();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditBtnClick = (rowData: any) => {
    const {
      id,
      username,
      email,
      phoneNo,
      roleId,
      department,
      location,
      empId,
      createdAt,
      updatedAt,
      publishedAt,
      center,
      roleName,
      program,
    } = rowData;

    const centerKeyFormated = center.map((item: any) => ({
      label: item.centerName,
      id: item.centerId,
    }));

    const programKeyFormated = program?.map((item: any) => ({
      label: item.programMasterName,
      value: item.programMasterId,
    }));

    resetAddUserFormDetails({
      addUserDetails: {
        userId: id,
        username: username,
        roleId: { label: roleName, value: roleId },
        email: email,
        phoneNo: phoneNo,
        department: department,
        location: location,
        empId: empId,
        publishedAt: publishedAt,
        updatedAt: updatedAt,
        createdAt: createdAt,
        center: centerKeyFormated,
        program: programKeyFormated,
      },
    });

    setIsEditSidebarOpen(!isEditSidebarOpen);
  };

  //toggle button

  const onPageChange = async (event: any, page: number) => {
    setParams((prevParams) => ({
      ...prevParams,
      pageNo: page.toString(),
      ...(searchValue && { search: searchValue }),
    }));
  };

  const onSearchfieldChange = (value: string | number) => {
    const inputValue = value.toString();
    setSearchValue(inputValue);

    if (inputValue.length >= 3) {
      onPageChange(null, 1);
      setSearchValue(inputValue);
      setIsLoadingSearch(true);
      setParams((prevParams) => ({
        ...prevParams,
        pageNo: "1", // Reset to the first page
        pageSize: "10",
      }));
    } else {
      setIsLoadingSearch(false);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      const isLessThan3 = searchValue.length > 0 && searchValue.length < 3;
      setIsLessThen3Value(isLessThan3);

      if (searchValue.length >= 3 || searchValue.length === 0) {
        setParams((prevParams) => ({
          pageNo: "1",
          ...prevParams,
          search: searchValue.length >= 3 ? searchValue : undefined,
        }));
      }
    }, 1500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  const buttons = [
    {
      text: "Add Users",
      variant: "contained",
      startIcon: <AddIcon />,
      onClick: toggleAddUserSidebar,
      sx: {
        borderRadius: "8px",
        border: "1px solid #a18218",
        backgroundColor: "#fef7da",
        boxShadow: "none !important",
        "&:hover": {
          backgroundColor: "#e8d78e",
        },
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
        border: "1px solid #8D8D8D",
        backgroundColor: "#fff",
        boxShadow: "none !important",
        borderRadius: "8px",
        "&:hover": {
          backgroundColor: "#ededed",
        },
      },
    },
  ];

  const columns = [
    {
      field: "username",
      headerName: "User name",
      flex: 1,
      minWidth: 220,
      sortable: false,
    },
    {
      field: "roleName",
      headerName: "Role",
      flex: 1,
      minWidth: 250,
      sortable: false,
      renderCell: (params: any) => {
        const role = params.row.roleName || ''; 
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              overflowX: "scroll", 
              whiteSpace: "nowrap",
              maxWidth: "100%", 
              "&::-webkit-scrollbar": {
                width: "0px", 
                height: "0px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#888",
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#555",
              },
            }}
          >
            {role.length > 0 ? (
              role
            ) : (
              <Text>-</Text>
            )}
          </Box>
        );
      },
    },
    

    {
      field: "center",
      headerName: "Centers",
      flex: 1,
      minWidth: 400,
      sortable: false,
      renderCell: (params: any) => {
        const centers = params.row.center || [];
        return (
          <Box
            sx={{
              display: "flex",
              gap: "5px",
              alignItems: "center",
              overflowX: "scroll",
              height: "100%",
              "&::-webkit-scrollbar": {
                width: "0px",
                height: "0px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#888",
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#555",
              },
            }}
          >
            {centers.length > 0 ? (
              centers.map((center: any) => (
                <Text
                  key={center.id}
                  sx={{
                    border: "1px solid #FEF7DA",
                    background: "#FEF7DA",
                    padding: "0px 10px",
                    borderRadius: "20px",
                  }}
                >
                  {center.centerName}
                </Text>
              ))
            ) : (
              <Text>-</Text>
            )}
          </Box>
        );
      },
    },
    {
      field: "programs",
      headerName: "Programs",
      flex: 1,
      minWidth: 200,
      sortable: false,
      renderCell: (params: any) => {
        const programs = params.row.program || [];
        return (
          <Box
            sx={{
              display: "flex",
              gap: "5px",
              alignItems: "center",
              overflowX: "scroll",
              height: "100%",
              "&::-webkit-scrollbar": {
                width: "0px",
                height: "0px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#888",
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#555",
              },
            }}
          >
            {programs.length > 0 ? (
              programs.map((program: any) => (
                <Text
                  key={program.programMasterId}
                  sx={{
                    border: "1px solid #FEF7DA",
                    background: "#FEF7DA",
                    padding: "0px 10px",
                    borderRadius: "20px",
                    height: "fit-content",
                  }}
                >
                  {program.programMasterName}
                </Text>
              ))
            ) : (
              <Text>-</Text>
            )}
          </Box>
        );
      },
    },
    {
      field: "email",
      headerName: "Email address",
      width: 300,
      sortable: false,
    },

    {
      field: "department",
      headerName: "Department",
      minWidth: 250,
      sortable: false,
      renderCell: (params: any) => {
        return params.row.department ? params.row.department : "-";
      },
    },

    {
      field: "empId",
      headerName: "Employee Id",
      flex: 1,
      minWidth: 150,
      sortable: false,
      renderCell: (params: any) => {
        return params.row.empId ? params.row.empId : "-";
      },
    },
    {
      field: "isActive",
      headerName: "Active",
      flex: 1,
      minWidth: 150,
      sortable: false,
      renderCell: (params: any) => {
        return (
          <ToggleButton
            sx={{
              "& .MuiSwitch-track": {
                backgroundColor: params.row.isActive
                  ? "#17A03B !important"
                  : "#A03717 !important",
              },
            }}
            checked={params.row.isActive}
            onChange={() => handleToggleActive(params.row)}
          />
        );
      },
    },
    {
      field: "createdBy",
      headerName: "Created by",
      flex: 1,
      minWidth: 150,
      sortable: false,
      renderCell: (params: any) => {
        return params.row.createdBy ? params.row.createdBy : "-";
      },
    },
    {
      field: "createdAt",
      headerName: "Created at",
      flex: 1,
      minWidth: 150,
      sortable: false,
      renderCell: (params: any) => {
        return formatDateString(params.row.createdAt);
      },
    },
    {
      field: "updatedAt",
      headerName: "Updated at",
      flex: 1,
      minWidth: 150,
      sortable: false,
      renderCell: (params: any) => {
        return formatDateString(params.row.updatedAt);
      },
    },
    {
      field: "publishedAt",
      headerName: "Published At",
      flex: 1,
      minWidth: 150,
      sortable: false,
      renderCell: (params: any) => {
        return formatDateString(params.row.publishedAt);
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 0,
      minWidth: 150,
      sortable: false,
      renderCell: (props: { row: any }) => {
        return (
          <Button
            onClick={() => handleEditBtnClick(props.row)}
            variant="contained"
            sx={{
              fontWeight: "400",
              textTransform: "capitalize",
              borderRadius: "8px",
              border: "1px solid #a18218",
              backgroundColor: "#fef7da",
              boxShadow: "none !important",
              "&:hover": {
                backgroundColor: "#e8d78e",
              },
            }}
          >
            Edit
          </Button>
        );
      },
    },
  ];
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
          backgroundColor: "#DADADA",
        }}
        tableSx={{ minHeight: "200px", width: "100%" }}
        handlePageChange={onPageChange}
        sx={{
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#DADADA",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: 550,
            fontSize: "14px",
          },
          "& .MuiDataGrid-row": {
            backgroundColor: "#FFFFFF",
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#FFFFFF",
          },
          "& .MuiDataGrid-cell": {
            display: "flex",
            alignItems: "center",
          },
        }}
        currentPage={Number(params?.pageNo)}
      />

      {/* This sidebar open the click of Add Users button of table */}
      <MagicDrawer
        title="Add Users"
        subtitle="Here you can Add users by filling the details"
        drawerOpen={isOpenAddUserSidebar}
        onDrawerToggle={handleAddUserDrawerCancel}
        actionComponent={() => (
          <>
            <Button
              className="bun-outline"
              onClick={handleAddUserDrawerCancel}
              disabled={isCreatingUser}
            >
              Cancel
            </Button>
            <Button
              className="bun-filled"
              onClick={handleAddUserSubmit(handleApplyBtnAddUserForm)}
              loading={isCreatingUser}
            >
              Done
            </Button>
          </>
        )}
      >
        <UserForm
          errors={addUserFormError}
          control={addUserFormControl}
          selectOptions={userRoles}
          selectOption={centerLists}
          program={userProgram}
        />
      </MagicDrawer>

      {/* This sidebar open the click of Edit button of table */}
      <MagicDrawer
        title="Edit Users"
        subtitle="Here you can edit users by filling the details."
        drawerOpen={isEditSidebarOpen}
        onDrawerToggle={toggleEditUserSidebar}
        actionComponent={() => (
          <>
            <Button
              className="bun-outline"
              onClick={toggleEditUserSidebar}
              disabled={isCreatingUser}
            >
              Cancel
            </Button>
            <Button
              className="bun-filled"
              onClick={handleAddUserSubmit(handleEditUserDoneBtn)}
              loading={isCreatingUser}
            >
              Done
            </Button>
          </>
        )}
      >
        <UserForm
          errors={addUserFormError}
          control={addUserFormControl}
          selectOptions={userRoles}
          selectOption={centerLists}
          program={userProgram}
        />
      </MagicDrawer>

      {/* This sidebar open  click of Add Filters button of table */}
      <MagicDrawer
        title="Add Filters"
        subtitle="See the data in an organized manner by applying filters"
        drawerOpen={isAddFilterSidebarOpen}
        onDrawerToggle={toggleFilterSidebar}
        actionComponent={() => (
          <>
            <Button
              className="bun-outline"
              onClick={handleClearAllBtnAddFilterForm}
              disabled={isCreatingUser}
            >
              Clear All
            </Button>
            <Button
              className="bun-filled"
              onClick={handleFilter(handleApplyBtnAddFilterForm)}
              loading={isCreatingUser}
            >
              Done
            </Button>
          </>
        )}
      >
        <AddFilterForm
          control={filterControl}
          role={userRoles}
          errors={addUserFormError}
          selectOption={centerLists}
          program={userProgram}
        />
      </MagicDrawer>
    </div>
  );
};

export default UserManagementContainer;
