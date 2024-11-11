import { useEffect, useState } from "react";

import { State, City } from "country-state-city";
import { useForm, SubmitHandler } from "react-hook-form";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AddIcon from "@mui/icons-material/Add";

import AddCentreForm from "../components/centres/CentreForm";
import AddFilterForm from "../components/centres/FilterForm";
import TableHeader from "../components/common/MagicTableHeader";
import Header from "../components/common/MagicPageHeader";
import Sidebar from "../components/common/MagicDrawer";
import Table from "../components/common/MagicTable";
import Button from "../components/mui/Button";

// Actions
import {
  useCreateCentreMutation,
  useFetchedCentreQuery,
  useFetchRegionQuery,
  useFetchedFunderQuery,
  useFetchedProgramTypesQuery,
  useLazyDownloadQuery,
  useUserListQuery,
  useCenterListQuery,
  useUpdateCenterMutation,
} from "../store/apis/centerApis";
import { Switch } from "@mui/material";
import dayjs from "dayjs";
import OnOffButton from "../components/common/OnOffButton";

interface CentreFormInterface {
  centreDetail: {
    [key: string]: string | number | null | boolean;
  };
}

const selectOptions = {
  district: [{ label: "district1", id: "Brooklyn" }],
  regionalDirector: [{ label: "regionalDirector1", id: 1 }],
  cityManager: [{ label: "cityManager1", id: 1 }],
  centre: [{ label: "cityManager1", id: "kdksfkh" }],
  districtLevelManger: [{ label: "districtLevelManger1", id: 1 }],
  clusterManager: [{ label: "clusterManager1", id: 1 }],
  regionalDataManger: [{ label: "regionalDataManger1", id: 1 }],
  placementHead: [{ label: "placementHead1", id: 1 }],
};
const mcpCentre = [
  { label: "Yes", id: true },
  { label: "No", id: false },
];

const CentresContainers = () => {
  const initialFilterState = {
    region: [],
    centerId: undefined,
    centerType: undefined,
    state: undefined,
    district: undefined,
    city: undefined,
    regionalDirector: null,
    cityManager: null,
    districtLevelManager: null,
    clusterManager: null,
    placementHead: null,
    funderId: undefined,
    regionalDataManager: null,
    mcpCentre: undefined,
    programType: null,
    programSubType: null,
    tenureStartDate: undefined,
    tenureEndDate: undefined,
  };

  const [isOpenAddCentreSidebar, setIsOpenAddCentreSidebar] =
    useState<boolean>(false);
  const [isOpenAddFilterSidebar, setIsOpenAddFilterSidebar] =
    useState<boolean>(false);
  const [isOpenEditCentreSidebar, setIsOpenEditCentreSidebar] =
    useState<boolean>(false);
  const [params, setParams] = useState<{ [key: string]: number | string }>({});
  const [isLessThen3Value, setIsLessThen3Value] = useState<boolean>(false);
  const [filter, setFilter] = useState({ ...initialFilterState });

  // Actions:
  const [createCenter, { isLoading: isCreatingLoading }] =
    useCreateCentreMutation();
  const { data: fetchedCentre = {}, isLoading: isLoadingCenters } =
    useFetchedCentreQuery(params);
  const { data: fetchedRegion = [] } = useFetchRegionQuery();
  const { data: fetchedFunder = [] } = useFetchedFunderQuery();
  const { data: fetchedProgramTypes = {} } = useFetchedProgramTypesQuery();
  const [triggerDownload, { isLoading: isDownloading }] =
    useLazyDownloadQuery();
  const { data: centerList = {} } = useCenterListQuery({});
  const [centerUpdateAction, { isLoading: isLoadingUpdateCenter }] =
    useUpdateCenterMutation({});

  // Calling same api for different use roles
  const { data: regionalDirector = [], isLoading: isLoadingRegionalDirector } =
    useUserListQuery({ role: "Regional director" });
  const { data: cityManager = [], isLoading: isLoadingCityManger } =
    useUserListQuery({ role: "City manager" });
  const {
    data: districtLevelManager = [],
    isLoading: isLoadingDisLevelManager,
  } = useUserListQuery({ role: "District level manager" });
  const { data: clusterManager = [], isLoading: isLoadingClusterManager } =
    useUserListQuery({ role: "Cluster Manager" });
  const {
    data: regionalDataManager = [],
    isLoading: isLoadingRegionalDataManager,
  } = useUserListQuery({ role: "Regional data manager" });
  const { data: placementHead = [], isLoading: isLoadingPlacementHead } =
    useUserListQuery({ role: "Placement head" });

  const cities: string[] = [];
  // @ts-ignore
  const totalCenters = fetchedCentre.totalCentres;
  const totalPages = Number(Math.ceil(Number(totalCenters) / 10));
  const indianStates: { label: string; id: string }[] =
    State.getStatesOfCountry("IN")?.map((state) => ({
      label: state.name,
      id: state.isoCode,
    })) || [];

  useEffect(() => {
    console.log("Fetched Centres:", fetchedCentre);
    console.log("Is Loading:", isLoadingCenters);
  }, [fetchedCentre, isLoadingCenters]);
  // Centre form initial state
  const {
    handleSubmit: handleCentreFromSubmit,
    control: centreControl,
    formState: { errors: centreErrors },
    reset: resetCentre,
    getValues: getCenterFormValues,
    setValue: setCenterFormValue,
  } = useForm<CentreFormInterface>({
    defaultValues: {
      centreDetail: {
        centerId: null,
        centerName: null,
        centerType: null,
        projectCode: null,
        region: null,
        state: null,
        district: null,
        city: null,
        regionalDirector: null,
        cityManager: null,
        districtLevelManager: null,
        clusterManager: null,
        funderId: null,
        regionalDataManager: null,
        placementHead: null,
        tenureStartDate: null,
        tenureEndDate: null,
        mcpCenter: undefined,
        programType: null,
        programSubType: null,
      },
    },
  });

  const toggleAddCentreSidebar = () =>
    setIsOpenAddCentreSidebar((prevState) => !prevState);
  const toggleAddFilterSidebar = () => {
    setFilter({ ...initialFilterState });
    setIsOpenAddFilterSidebar((prevState) => !prevState);
  };
  const toggleEditCentreDetailSidebar = () => {
    resetCentre();
    setIsOpenEditCentreSidebar((prevState) => !prevState);
  };
  const handleAddCentreCancelBtn = () =>
    setIsOpenAddCentreSidebar((prevState) => !prevState);
  const handleEditCentreCancelAllBtn = () =>
    setIsOpenEditCentreSidebar((prevState) => !prevState);
  const handleAddFilterClearAllBtn = () => {
    setFilter({ ...initialFilterState });
    setParams({});
    setIsOpenAddFilterSidebar(!isOpenAddFilterSidebar);
  };
  const handleAddCentreDoneBtn: SubmitHandler<CentreFormInterface> = async (
    data
  ) => {
    const formData: any = data.centreDetail;
    const payload = {
      centerName: formData.centerName,
      centerType: formData.centerType,
      projectCode: formData.projectCode,
      region: formData.region?.id,
      state: formData.state,
      district: formData.district,
      city: formData.city,
      regionalDirector: formData.regionalDirector?.id,
      cityManager: formData.cityManager?.id,
      districtLevelManager: formData.districtLevelManager?.id,
      clusterManager: formData.clusterManager?.id,
      funderId: formData.funderId.id,
      regionalDataManager: formData.regionalDataManager?.id,
      placementHead: formData.placementHead?.id,
      tenureStartDate: formData.tenureStartDate,
      tenureEndDate: formData.tenureEndDate,
      mcpCenter: formData.mcpCenter?.id,
      programType: formData.programType?.id,
      programSubType: formData.programSubType?.id,
    };
    // @ts-ignore
    const res = await createCenter(payload);
    if (res) {
      setIsOpenAddCentreSidebar((prevState) => !prevState);
      resetCentre();
    }
  };
  const handleAddFilterApplyBtn = async () => {
    // @ts-ignore
    setParams(filter);
  };

  const handleFilterFormChange = (name: string, value: any) => {
    setFilter((prevState) => ({
      ...prevState,
      [name]: value?.value ? value?.value : value?.label ? value?.label : value,
    }));
  };

  const handleFilterRegionSelect = (value: string) => {
    setFilter((prevState: any) => {
      const newRegions = prevState.region.includes(value)
        ? prevState.region.filter((region: string) => region !== value) // Deselect
        : [...prevState.region, value]; // Select

      return {
        ...prevState,
        region: [...newRegions], // Update the region array
      };
    });
  };

  const handleEditCentreDetailDoneBtn: SubmitHandler<
    CentreFormInterface
  > = async (data) => {
    const formData: any = data.centreDetail;

    const payload = {
      centerName: formData.centerName,
      centerType: formData.centerType,
      projectCode: formData.projectCode,
      region: formData.region?.id,
      state: formData.state,
      district: formData.district,
      city: formData.city,
      regionalDirector: formData.regionalDirector?.id,
      cityManager: formData.cityManager?.id,
      districtLevelManager: formData.districtLevelManager?.id,
      clusterManager: formData.clusterManager?.id,
      funderId: formData.funderId.id,
      regionalDataManager: formData.regionalDataManager?.id,
      placementHead: formData.placementHead?.id,
      tenureStartDate: formData.tenureStartDate,
      tenureEndDate: formData.tenureEndDate,
      mcpCenter: formData.mcpCenter?.id,
      programType: formData.programType?.id,
      programSubType: formData.programSubType?.id,
    };

    const centerId = getCenterFormValues("centreDetail.centerId");

    // @ts-ignore
    const res = await centerUpdateAction({ centerId, payload });
    if (res) {
      resetCentre();
      setIsOpenEditCentreSidebar((preState) => !preState);
    }
  };

  const handleEditBtnClick = (data: any) => {
    const selectedRegion: any = fetchedRegion.find(
      (item) => item.label === data.region
    );
    const selectedRegionalDirector: any = regionalDirector.find(
      (item) => item.label === data.regionalDirector
    );
    const selectedCityManager: any = cityManager.find(
      (item) => item.label === data.cityManager
    );
    const selectedDLM: any = districtLevelManager.find(
      (item) => item.label === data.districtLevelManager
    );
    const selectedCM: any = clusterManager.find(
      (item) => item.label === data.clusterManager
    );
    const selectedFunder: any = fetchedFunder.find(
      (item) => item.label === data.funder
    );
    const selectedRDM: any = regionalDataManager.find(
      (item) => item.label === data.regionalDataManager
    );
    const selectedPH: any = placementHead.find(
      (item) => item.label === data.placementHead
    );
    const tenureStartDate = dayjs(data.tenureStartDate).format("DD/MM/YYYY");
    const tenureEndDate = dayjs(data.tenureEndDate).format("DD/MM/YYYY");
    const mcpCenter: any = mcpCentre.find((item) => item.id === data.mcpCenter);
    // @ts-ignore
    // const selectedPT: any = fetchedProgramTypes.programTypes.find(
    //   (item: any) => item.label === data.programType
    // );
    // // @ts-ignore
    // const selectedPST: any = fetchedProgramTypes.programSubTypes.find(
    //   (item: any) => item.label === data.programSubType
    // );

    setCenterFormValue("centreDetail.centerId", data.id);
    setCenterFormValue("centreDetail.centerName", data.centerName);
    setCenterFormValue("centreDetail.centerType", data.centerType);
    setCenterFormValue("centreDetail.projectCode", data.projectCode);
    setCenterFormValue("centreDetail.region", selectedRegion.id);
    setCenterFormValue("centreDetail.state", data.state);
    setCenterFormValue("centreDetail.district", data.district);
    setCenterFormValue("centreDetail.city", data.city);
    setCenterFormValue(
      "centreDetail.regionalDirector",
      selectedRegionalDirector
    );
    setCenterFormValue("centreDetail.cityManager", selectedCityManager);
    setCenterFormValue("centreDetail.districtLevelManager", selectedDLM);
    setCenterFormValue("centreDetail.clusterManager", selectedCM);
    setCenterFormValue("centreDetail.funderId", selectedFunder);
    setCenterFormValue("centreDetail.regionalDataManager", selectedRDM);
    setCenterFormValue("centreDetail.placementHead", selectedPH);
    setCenterFormValue("centreDetail.tenureEndDate", tenureEndDate);
    setCenterFormValue("centreDetail.tenureStartDate", tenureStartDate);
    setCenterFormValue("centreDetail.mcpCenter", mcpCenter);
    // setCenterFormValue("centreDetail.programType", selectedPT);
    // setCenterFormValue("centreDetail.programSubType", selectedPST);

    setIsOpenEditCentreSidebar((prevState) => !prevState);
  };

  const handleImport = () => {
    console.log("Hit import btn");
  };

  const handleDownload = () => {
    // @ts-ignore
    triggerDownload();
  };

  /**
   * Catch selected state
   * filter cities of selected state
   */
  const handleStateSelect = (state: string) => {
    City.getCitiesOfState("IN", state).forEach((c) => cities.push(c.name));
  };

  const handleToggle = () => {
    console.log("handleToggle");
  };
  const handleDistrictSelect = (district: string) => {};

  const handleCenterSearch = (value: string | number) => {
    const searchValue = value.toString();
    const isLessThan3 = searchValue.length > 0 && searchValue.length < 3;
    setIsLessThen3Value(isLessThan3);

    if (searchValue.length >= 3) {
      setParams({ search: searchValue });
    } else if (searchValue.length === 0) {
      setParams({});
    }
  };

  const onPageChange = async (event: any, page: number) => {
    setParams({ pageSize: "10", pageNo: page.toString() });
  };

  // button of page header
  const buttons = [
    {
      text: "Import",
      variant: "outlined",
      startIcon: <ArrowDownwardIcon />,
      onClick: handleImport,
      sx: {
        color: "black",
        textTransform: "capitalize",
        border: "1px solid rgb(204, 204, 204)",
      },
    },
    {
      text: "Add Centre",
      variant: "contained",
      startIcon: <AddIcon />,
      onClick: toggleAddCentreSidebar,
      sx: {
        color: "black",
        textTransform: "capitalize",
        border: "1px solid rgb(176, 152, 65)",
        padding: "4.7px 16px",
      },
    },
  ];

  // table header buttons
  const tableHeaderBtn = [
    {
      text: "Add filter",
      variant: "outlined",
      startIcon: <ArrowDownwardIcon />,
      onClick: toggleAddFilterSidebar,
      sx: {
        color: "black",
        textTransform: "capitalize",
        border: "1px solid rgb(204, 204, 204)",
      },
    },
    {
      text: "Download",
      variant: "outlined",
      startIcon: <AddIcon />,
      onClick: handleDownload,
      loading: isDownloading,
      sx: {
        color: "black",
        textTransform: "capitalize",
        border: "1px solid rgb(204, 204, 204)",
        marginLeft: "6px",
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
      field: "status",
      headerName: "Status",
      minWidth: 100,
      renderCell: (props: { row: any }) => {
        return (
          // <Switch
          //   checked={props.row.status}
          //   sx={{
          //     "& .MuiSwitch-thumb": {
          //       backgroundColor: props.row.status ? "green" : "red",
          //     },
          //     "& .MuiSwitch-track": {
          //       backgroundColor: props.row.status ? "green" : "red",
          //     },
          //   }}
          // />

          <div style={{ padding: 12 }}>
            <OnOffButton
              checked={true}
              onChange={handleToggle}
              opacity={1}
              cursor="pointer"
              onText="On"
              offText="Off"
              disabled={false}
            />
          </div>
        );
      },
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
      minWidth: 200,
    },
    {
      field: "programSubType",
      headerName: "Program Sub Type",
      minWidth: 250,
    },
    {
      field: "programType",
      headerName: "Program Type",
      minWidth: 200,
    },
    {
      field: "mcpCenter",
      headerName: "MCP Center",
      minWidth: 150,
    },

    {
      field: "regionalDirector",
      headerName: "Regional Director",
      minWidth: 200,
    },
    {
      field: "regionalDirectorEmail",
      headerName: "RD email id",
      minWidth: 200,
    },
    {
      field: "cityManager",
      headerName: "City manager",
      minWidth: 200,
    },
    {
      field: "cityManagerEmail",
      headerName: "CM email id",
      minWidth: 200,
    },

    {
      field: "clusterManager",
      headerName: "Cluster Manager",
      minWidth: 200,
    },
    {
      field: "clusterManagerEmail",
      headerName: "Cluster manager email id",
      minWidth: 200,
    },

    {
      field: "districtLevelManager",
      headerName: "DML/SPOC",
      minWidth: 200,
    },
    {
      field: "districtLevelManagerEmail",
      headerName: "DML email id",
      minWidth: 200,
    },

    {
      field: "regionalDataManager",
      headerName: "Regional Data Manager",
      minWidth: 200,
    },
    {
      field: "placementHead",
      headerName: "Placement Head",
      minWidth: 200,
    },

    {
      field: "action",
      headerName: "Action",
      minWidth: 100,
      renderCell: (props: { row: any }) => {
        return (
          <Button
            variant="contained"
            sx={{
              textTransform: "capitalize",
              border: "1px solid rgb(176, 152, 65)",
            }}
            onClick={() => handleEditBtnClick(props.row)}
          >
            Edit
          </Button>
        );
      },
    },
  ];

  const centerFormStates = getCenterFormValues("centreDetail");

  console.log(fetchedCentre, "fetchedCentre");
  return (
    <>
      <Header
        title="All centres"
        subTitle="Here you can view the list of all centres."
        chipLabel={`${totalCenters} Centers`}
        buttons={buttons}
      />

      <TableHeader
        buttons={tableHeaderBtn}
        onSearchfieldChange={handleCenterSearch}
        isInvalidSearch={isLessThen3Value}
      />

      <Table
        columns={columns}
        // @ts-ignore
        rows={fetchedCentre.allCentres}
        count={totalPages}
        rowCellsSx={{ paddingLeft: "16px", textAlign: "start" }}
        headerSx={{
          paddingLeft: "16px",
          textAlign: "start",
          fontWeight: 600,
          color: "#242424",
          padding: "13px 16px",
        }}
        tableSx={{ height: "280px" }}
        handlePageChange={onPageChange}
        loading={isLoadingCenters}
      />

      {/* Add Centre form  sidebar*/}
      <Sidebar
        title="Add Centres"
        subTitle="Here you can Add Centre by filling the details"
        isOpen={isOpenAddCentreSidebar}
        onClose={toggleAddCentreSidebar}
        handleCancelBtn={handleAddCentreCancelBtn}
        handleDoneBtn={handleCentreFromSubmit(handleAddCentreDoneBtn)}
        cancelBtnTxt="Cancel"
        doneBtnTxt="Done"
        headerSx={{ paddingBottom: "15px" }}
        childrenSx={{ marginBottom: "60px" }}
        doneBtnLoading={isCreatingLoading}
      >
        {/* <AddCentreForm
          centerFormStates={centerFormStates}
          control={centreControl}
          errors={centreErrors}
          centerList={centerList}
          regionalDirector={regionalDirector}
          placementHead={placementHead}
          regionalDataManager={regionalDataManager}
          clusterManager={clusterManager}
          districtLevelManager={districtLevelManager}
          cityManager={cityManager}
          isLoadingPlacementHead={isLoadingPlacementHead}
          isLoadingRegionalDataManager={isLoadingRegionalDataManager}
          isLoadingClusterManager={isLoadingClusterManager}
          isLoadingDisLevelManager={isLoadingDisLevelManager}
          isLoadingCityManger={isLoadingCityManger}
          isLoadingRegionalDirector={isLoadingRegionalDirector}
          // @ts-ignore
          regions={fetchedRegion}
          funder={fetchedFunder}
          states={indianStates}
          cities={cities}
          mcpCentre={mcpCentre}
          handleStateSelect={handleStateSelect}
          handleDistrictSelect={handleDistrictSelect}
          // @ts-ignore
          programTypes={fetchedProgramTypes.programTypes}
          // @ts-ignore
          programSubTypes={fetchedProgramTypes.programSubTypes}
        /> */}
      </Sidebar>

      {/* Add Filter form sidebar*/}
      <Sidebar
        title="Add filter"
        subTitle="Here you can Add filter by filling the details"
        isOpen={isOpenAddFilterSidebar}
        onClose={toggleAddFilterSidebar}
        handleCancelBtn={handleAddFilterClearAllBtn}
        handleDoneBtn={handleAddFilterApplyBtn}
        cancelBtnTxt="Clear All"
        doneBtnTxt="Apply"
        headerSx={{ paddingBottom: "15px" }}
        childrenSx={{ marginBottom: "60px" }}
        doneBtnLoading={isLoadingCenters}
      >
        {/* <AddFilterForm
          districtLevelManager={districtLevelManager}
          regionalDataManager={regionalDataManager}
          regionalDirector={regionalDirector}
          placementHead={placementHead}
          clusterManager={clusterManager}
          cityManager={cityManager}
          regions={fetchedRegion}
          centerList={centerList}
          funder={fetchedFunder}
          mcpCentre={mcpCentre}
          filter={filter}
          isLoadingRegionalDataManager={isLoadingRegionalDataManager}
          isLoadingDisLevelManager={isLoadingDisLevelManager}
          isLoadingRegionalDirector={isLoadingRegionalDirector}
          isLoadingClusterManager={isLoadingClusterManager}
          isLoadingPlacementHead={isLoadingPlacementHead}
          isLoadingCityManger={isLoadingCityManger}
          handleFilterRegionSelect={handleFilterRegionSelect}
          handleFilterFormChange={handleFilterFormChange}
          // @ts-ignore
          programTypes={fetchedProgramTypes.programTypes}
          // @ts-ignore
          programSubTypes={fetchedProgramTypes.programSubTypes}
        /> */}
      </Sidebar>

      {/* Edit centre details form sidebar */}
      <Sidebar
        title="Edit details"
        subTitle="Here you can edit centre details"
        isOpen={isOpenEditCentreSidebar}
        onClose={toggleEditCentreDetailSidebar}
        handleCancelBtn={handleEditCentreCancelAllBtn}
        handleDoneBtn={handleCentreFromSubmit(handleEditCentreDetailDoneBtn)}
        cancelBtnTxt="Cancel"
        doneBtnTxt="Done"
        headerSx={{ paddingBottom: "15px" }}
        childrenSx={{ marginBottom: "60px" }}
        doneBtnLoading={isLoadingUpdateCenter}
      >
        {/* <AddCentreForm
          centerFormStates={centerFormStates}
          control={centreControl}
          errors={centreErrors}
          centerList={centerList}
          regionalDirector={regionalDirector}
          placementHead={placementHead}
          regionalDataManager={regionalDataManager}
          clusterManager={clusterManager}
          districtLevelManager={districtLevelManager}
          cityManager={cityManager}
          isLoadingPlacementHead={isLoadingPlacementHead}
          isLoadingRegionalDataManager={isLoadingRegionalDataManager}
          isLoadingClusterManager={isLoadingClusterManager}
          isLoadingDisLevelManager={isLoadingDisLevelManager}
          isLoadingCityManger={isLoadingCityManger}
          isLoadingRegionalDirector={isLoadingRegionalDirector}
          // @ts-ignore
          selectOptions={selectOptions}
          regions={fetchedRegion}
          funder={fetchedFunder}
          states={indianStates}
          cities={cities}
          mcpCentre={mcpCentre}
          handleStateSelect={handleStateSelect}
          handleDistrictSelect={handleDistrictSelect}
          // @ts-ignore
          programTypes={fetchedProgramTypes.programTypes}
          // @ts-ignore
          programSubTypes={fetchedProgramTypes.programSubTypes}
        /> */}
      </Sidebar>
    </>
  );
};

export default CentresContainers;
