import { useEffect, useState, useRef } from "react";
import { State, City } from "country-state-city";
import { useForm, SubmitHandler, set } from "react-hook-form";
import AddCentreForm from "../components/centres/CentreForm";
import AddFilterForm from "../components/centres/FilterForm";
import TableHeader from "../components/common/MagicTableHeader";
import Header from "../components/common/MagicPageHeader";
import Table from "../components/common/MagicTable";
import Button from "../components/mui/Button";
import Text from "../components/mui/Text";
import Dialog from "../components/common/Dialog";
import ImageComponent from "../components/mui/Image";
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
  useUpdateCenterStatusMutation,
  useDownloadFetchListQuery,
} from "../store/apis/centerApis";
import dayjs from "dayjs";
import MagicDrawer from "../components/common/MagicDrawer_new";
import ImportCenterContent from "../components/centres/ImportCenterContent";
import ToggleButton from "../components/mui/ToggleButton";
import DownloadToXlsxFile from "../helper/DownloadToXlsxFile";
import Stack from "../components/mui/Stack";

interface CentreFormInterface {
  centreDetail: {
    [key: string]: string | number | null | boolean;
  };
}
interface programType {
  label: string;
  id: number;
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
    centerId: null,
    centerType: null,
    state: null,
    district: null,
    city: null,
    regionalDirector: null,
    cityManager: null,
    districtLevelManager: null,
    clusterManager: null,
    placementHead: null,
    funderId: null,
    regionalDataManager: null,
    mcpCentre: null,
    programType: null,
    programSubType: null,
    tenureStartDate: null,
    tenureEndDate: null,
    status: null,
    pageNo: "1",
    pageSize: "10",
    centerManagerData: null,
    biometricCenters: null,
  };
  const [importFileModal, setImportFileModal] = useState<boolean>(false);
  const [isOpenAddCentreSidebar, setIsOpenAddCentreSidebar] =
    useState<boolean>(false);
  const [isOpenAddFilterSidebar, setIsOpenAddFilterSidebar] =
    useState<boolean>(false);
  const [isOpenEditCentreSidebar, setIsOpenEditCentreSidebar] =
    useState<boolean>(false);
  const [params, setParams] = useState<{
    [key: string]: number | string | undefined;
  }>({});
  const [isLessThen3Value, setIsLessThen3Value] = useState<boolean>(false);
  // Use useRef to persist the timeout ID across renders
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [filter, setFilter] = useState({ ...initialFilterState });
  const [searchValue, setSearchValue] = useState("");
  const [importConfirmationModal, setImportConfirmationModal] = useState(false);
  // Actions:
  const [createCenter, { isLoading: isCreatingLoading }] =
    useCreateCentreMutation();
  const {
    data: fetchedCentre = { allCentres: [], totalCentres: 0 },
    isLoading: isLoadingCenters,
    refetch: centerRefetch,
  } = useFetchedCentreQuery(params);

  const downloadPayload = {
    pageNo: "1",
    pageSize: fetchedCentre.totalCentres,
  };

  const {
    data: downloadData = { allCentres: [], totalCentres: 0 },
    isLoading: downloadLoading,
    refetch: centerRefetchDownload,
  } = useDownloadFetchListQuery(downloadPayload);

  const { data: fetchedRegion = [] } = useFetchRegionQuery();
  const { data: fetchedFunder = [] } = useFetchedFunderQuery();
  const { data: fetchedProgramTypes = {} } = useFetchedProgramTypesQuery();
  const { data: centerList = {} } = useCenterListQuery({});

  const [centerUpdateAction, { isLoading: isLoadingUpdateCenter }] =
    useUpdateCenterMutation({});

  const [updateCenterStatus] = useUpdateCenterStatusMutation();
  // Calling same api for different use roles
  const { data: regionalDirector = [], isLoading: isLoadingRegionalDirector } =
    useUserListQuery({ roleId: "3" });
  const { data: nationalDirector = [], isLoading: isLoadingNationalDirector } =
    useUserListQuery({ roleId: "2" });
  const { data: centerManagerOptions = [], isLoading: isLoadingCenterManager } =
    useUserListQuery({ roleId: "6" });

  const { data: cityManager = [], isLoading: isLoadingCityManger } =
    useUserListQuery({ roleId: "4" });
  const {
    data: districtLevelManager = [],
    isLoading: isLoadingDisLevelManager,
  } = useUserListQuery({ roleId: "6" });
  const { data: clusterManager = [], isLoading: isLoadingClusterManager } =
    useUserListQuery({ roleId: "5" });
  const {
    data: regionalDataManager = [],
    isLoading: isLoadingRegionalDataManager,
  } = useUserListQuery({ roleId: "9" });
  const { data: placementHead = [], isLoading: isLoadingPlacementHead } =
    useUserListQuery({ roleId: "8" });

  const cities: string[] = [];
  // @ts-ignore
  const totalCenters = fetchedCentre.totalCentres;
  const totalPages = Number(Math.ceil(Number(totalCenters) / 10));
  const indianStates: { label: string; id: string }[] =
    State.getStatesOfCountry("IN")?.map((state) => ({
      label: state.name,
      id: state.isoCode,
    })) || [];

  const handleEditBtnClick = (data: any) => {
    let prepareformData: any = { ...data }; // <-- Using spread syntax to create a shallow copy

    let selectedRegion: any = fetchedRegion.find(
      (item: any) => item.label === data.region
    );
    prepareformData.regionId = selectedRegion?.id || null;

    const selectedRegionalDirector: any = regionalDirector.find(
      (item) => item.label === data.regionalDirector
    );

    const selectedNationalDirector: any = data?.nationalDirectors?.map(
      (item: any) => ({
        label: item.username,
        id: item.userId,
      })
    );

    prepareformData.nationalSrDirector = selectedNationalDirector || null; // Prefill nationalDirector

    prepareformData.regionalDirector = selectedRegionalDirector || null;

    prepareformData.genderType = data?.genderType;

    const selectedCityManager: any = cityManager.find(
      (item) => item.label === data.cityManager
    );
    prepareformData.cityManager = selectedCityManager || null;

    const selectedDLM: any = districtLevelManager.find(
      (item) => item.label === data.districtLevelManager
    );
    prepareformData.selectedDLM = selectedDLM || null;

    const selectedCM: any = clusterManager.find(
      (item) => item.label === data.clusterManager
    );
    prepareformData.clusterManager = selectedCM || null;

    const selectedFunder: any = fetchedFunder.find(
      (item) => item.label === data.funder
    );
    prepareformData.funder = selectedFunder || null;

    const selectedRDM: any = regionalDataManager.find(
      (item) => item.label === data.regionalDataManager
    );
    prepareformData.regionalDataManager = selectedRDM || null;

    const selectedPH: any = placementHead.find(
      (item) => item.label === data.placementHead
    );
    prepareformData.placementHead = selectedPH || null;

    const tenureStartDate = dayjs(data.tenureStartDate).format("DD/MM/YYYY");
    prepareformData.startDate = tenureStartDate || null;

    const tenureEndDate = dayjs(data.tenureEndDate).format("DD/MM/YYYY");
    prepareformData.endDate = tenureEndDate || null;

    const mcpCenter: any = mcpCentre.find((item) => item.id === data.mcpCenter);
    prepareformData.mcpCenter =
      mcpCenter !== null && mcpCenter === 1
        ? { label: "Yes", id: true }
        : { label: "No", id: false } || null;

    // @ts-ignore
    const selectedPT: any = fetchedProgramTypes.programTypes.find(
      (item: programType) => item.label === data.programType
    );
    prepareformData.programType = selectedPT || null;

    // @ts-ignore
    const selectedPST: any = fetchedProgramTypes.programSubTypes.find(
      (item: any) => item.label === data.programSubType
    );
    prepareformData.programSubTypes = selectedPST || null;

    setCenterForm(prepareformData);

    setIsOpenEditCentreSidebar((prevState) => !prevState);
  };

  const setCenterForm = (data: any = {}, getForm: boolean = false) => {
    const nationalFormatLabelId = data?.nationalDirectors?.map((item: any) => ({
      label: item?.username,
      id: item?.userId,
    }));
    const regionFormatLabelId = data?.regionalDirectors?.map((item: any) => ({
      label: item?.username,
      id: item?.userId,
    }));
    const regionDataManager = data?.regionalDataManagers?.map((item: any) => ({
      label: item?.username,
      id: item?.userId,
    }));
    const cityManager = data?.cityManagers?.map((item: any) => ({
      label: item?.username,
      id: item?.userId,
    }));
    const clusterManagerLabelId = data?.clusterManagers?.map((item: any) => ({
      label: item?.username,
      id: item?.userId,
    }));
    const crmPlacementHeads = data?.placementHeads?.map((item: any) => ({
      label: item?.username,
      id: item?.userId,
    }));
    const districtLevelManagerLabelId = data?.districtLevelManagers?.map(
      (item: any) => ({
        label: item?.username,
        id: item?.userId,
      })
    );
    const centermanagerData = data?.centerManagers?.map((item: any) => ({
      label: item?.username,
      id: item?.userId,
    }));

    const centreDetail: any = {
      centerId: data.id || null,
      centerName: data.centerName || null,
      centerType: data.centerType || null,
      projectCode: data.projectCode || null,
      region: data.regionId || null,
      state: data.state || null,
      district: data.district || null,
      city: data.city || null,
      regionalDirector: regionFormatLabelId || null,
      cityManager: cityManager || null,
      districtLevelManager: districtLevelManagerLabelId || null,
      clusterManager: clusterManagerLabelId || null,
      funderId:
        (data?.funderName &&
          data?.funderId && { label: data.funderName, id: data.funderId }) ||
        null,
      regionalDataManager: regionDataManager || null,
      placementHead: crmPlacementHeads || null,
      tenureStartDate: data.startDate || null,
      tenureEndDate: data.endDate || null,
      mcpCenter:
        data?.mcpCenter != null
          ? data.mcpCenter == 1
            ? { label: "Yes", id: true }
            : { label: "No", id: false }
          : { label: "", id: null },
      programType: data.programType || null,
      programSubType: data.programSubTypes || null,
      genderType: data?.genderType || null,
      centerBusinessType: data?.centerBusinessType || null,
      centerStatus: data?.centerStatus || null,
      biometricCenters: data.biometricCenters || null,
      isActive: data?.isActive != null ? (data.isActive == 1 ? 1 : 2) : null,
      nationalSrDirector: nationalFormatLabelId || null,
      centerManager: centermanagerData || null,
    };
    if (getForm) {
      return { centreDetail: centreDetail };
    }
    setCenterFormValue("centreDetail", centreDetail);
  };

  const {
    handleSubmit: handleCentreFromSubmit,
    control: centreControl,
    formState: { errors: centreErrors },
    reset: resetCentre,
    getValues: getCenterFormValues,
    setValue: setCenterFormValue,
    watch: watchCenterForm,
  } = useForm<CentreFormInterface>({
    defaultValues: setCenterForm({}, true),
  });
  
  const toggleAddCentreSidebar = () =>
    setIsOpenAddCentreSidebar((prevState) => !prevState);
  const toggleAddFilterSidebar = () => {
    setIsOpenAddFilterSidebar((prevState) => !prevState);
  };
  const toggleEditCentreDetailSidebar = () => {
    resetCentre();
    setIsOpenEditCentreSidebar((prevState) => !prevState);
  };
  const handleAddCentreCancelBtn = () => {
    resetCentre();
    setIsOpenAddCentreSidebar((prevState) => !prevState);
  };
  const handleEditCentreCancelAllBtn = () => {
    resetCentre();
    setIsOpenEditCentreSidebar((prevState) => !prevState);
  };

  const handleAddFilterClearAllBtn = () => {
    setFilter({ ...initialFilterState });
    setParams({
      search: searchValue === "" ? undefined : searchValue,
      pageNo: "1",
      pageSize: "10",
    });
    setIsOpenAddFilterSidebar(!isOpenAddFilterSidebar);
  };
  const handleAddCentreDoneBtn: SubmitHandler<CentreFormInterface> = async (
    data
  ) => {
    const formData: any = data.centreDetail;

    // Extract cityManager ids from the array of objects
    const formattedCityManager =
      formData.cityManager?.map((item: any) => item.id) || [];
    // Extract ids for regionalDirector, clusterManager, regionalDataManager, and placementHead
    const formattedRegionalDirector =
      formData.regionalDirector?.map((item: any) => item.id) || [];
    const formattedClusterManager =
      formData.clusterManager?.map((item: any) => item.id) || [];
    const formattedRegionalDataManager =
      formData.regionalDataManager?.map((item: any) => item.id) || [];
    const formattedNationalDirector =
      formData.nationalSrDirector?.map((item: any) => item.id) || [];
    const formattedDistrictLevelManager =
      formData.districtLevelManager?.map((item: any) => item.id) || [];
    const formattedPlacementHead =
      formData.placementHead?.map((item: any) => item.id) || [];
    const formattedIsActive =
      formData.isActive !== null && formData.isActive !== undefined
        ? formData.isActive == 1
          ? true
          : false
        : null;

    // Construct the payload

    const biometricCenter =
      Array.isArray(formData?.biometricCenters) &&
      formData.biometricCenters.length
        ? formData.biometricCenters.map((item: any) => ({
            biometricDeviceId: item,
          }))
        : formData?.biometricCenters
        ? [
            {
              biometricDeviceId: formData.biometricCenters,
            },
          ]
        : []; // Return an empty array if biometricCenters is not present

    const payload = {
      centerName: formData.centerName,
      genderType: formData.genderType,
      region: formData.region,
      state: formData.state || null,
      isActive: formattedIsActive || null,
      district: formData.district || null,
      city: formData.city || null,
      centerStatus: formData.centerStatus || null,
      mcpCenter: formData.mcpCenter.id || null,
      centerBusinessType: formData.centerBusinessType || null,
      programType: formData.programType.id || null,
      regionalDirector: formattedRegionalDirector,
      cityManager: formattedCityManager,
      districtLevelManager: formattedDistrictLevelManager || null,
      clusterManager: formattedClusterManager,
      regionalDataManager: formattedRegionalDataManager,
      placementHead: formattedPlacementHead,
      nationalDirector: formattedNationalDirector || null,
      funderId: formData.funderId?.id || null,
      biometricCenter: biometricCenter || null,
    };

    // @ts-ignore
    const res = await createCenter(payload);

    // Handle the response and reset state if successful
    if (res) {
      if (!res.error) {
        resetCentre();
        setIsOpenAddCentreSidebar((prevState) => !prevState);
      }
    }
  };

  const preparePayload = (filter: any) => {
    const {
      region,
      centerId,
      centerType,
      state,
      district,
      city,
      regionalDirector,
      cityManager,
      districtLevelManager,
      clusterManager,
      placementHead,
      funderId,
      regionalDataManager,
      mcpCentre,
      programType,
      programSubType,
      tenureStartDate,
      tenureEndDate,
      status,
      centerStatus,
      nationalDirector,
      placement,
      centerManagerData,
    } = filter;

    const payload: any = {
      pageNo: "1",
      pageSize: "10",
      region: region.length > 0 ? region.join(",") : undefined,
      search: searchValue === "" ? undefined : searchValue,
      centerId: centerId?.id,
      centerType: centerType,
      state: state?.label,
      centerStatus: centerStatus?.id,
      district: district,
      city: city,
      regionalDirector: regionalDirector?.id,
      centerManager: centerManagerData?.id,
      cityManager: cityManager?.id,
      districtLevelManager: districtLevelManager,
      clusterManager: clusterManager?.id,
      placementHead: placementHead,
      funderId: funderId,
      regionalDataManager: regionalDataManager?.id,
      mcpCentre: mcpCentre?.id,
      programType: programType?.id,
      placement: placement?.id,
      nationalDirector: nationalDirector?.id,
      programSubType: programSubType,
      tenureStartDate: tenureStartDate,
      tenureEndDate: tenureEndDate,
      isActive:
        status !== null && status?.length > 0 ? status.join(",") : undefined,
    };

    return payload;
  };

  const handleAddFilterApplyBtn = async () => {
    try {
      setParams(preparePayload(filter));
      setIsOpenAddFilterSidebar((prevState) => !prevState);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleFilterFormChange = (name: string, value: any) => {
    setFilter((prevState) => ({
      ...prevState,
      [name]: value,
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

    // Utility function to extract IDs
    const extractIds = (field: any): any[] => {
      if (Array.isArray(field)) {
        return field.map((item: any) => item.id); // If it's already an array, map through it
      } else if (field && field.id) {
        return [field.id]; // If it's a single object, return its ID wrapped in an array
      }
      return []; // Return an empty array if it's not an array or object with an id
    };

    // Extracting the fields and formatting them
    const formattedCityManager = extractIds(formData.cityManager);
    const formattedClusterManager = extractIds(formData.clusterManager);
    const formattedRegionalDataManager = extractIds(
      formData.regionalDataManager
    );
    const formattedPlacementHead = extractIds(formData.placementHead);
    const formattedRegionalDirector = extractIds(formData.regionalDirector);

    // Additional fields (for mcpCenter and isActive)

    const formattedIsActive = formData.isActive == 1 ? true : false;

    const payload = {
      centerName: formData.centerName,
      genderType: formData.genderType,
      region: formData.region || null,
      state: formData.state || null,
      isActive: formattedIsActive,
      district: formData.district || null,
      city: formData.city || null,
      centerStatus: formData.centerStatus || null,
      mcpCenter: formData.mcpCenter === 1 ? true : false, // Ensure mcpCenter is correctly formatted
      centerBusinessType: formData.centerBusinessType || null,
      regionalDirector: formattedRegionalDirector, // Always an array of IDs
      cityManager: formattedCityManager, // Always an array of IDs
      clusterManager: formattedClusterManager, // Always an array of IDs
      regionalDataManager: formattedRegionalDataManager, // Always an array of IDs
      placementHead: formattedPlacementHead, // Always an array of IDs
      nationalDirector: extractIds(formData.nationalSrDirector), // Handle nationalSrDirector as well
      funderId: formData.funderId?.id || null, // Extract funderId.id
      programType: formData.programType?.id || null, // Extract programType.id
      biometricCenter: formData.biometricCenters || null, // Handle biometricCenter, ensure it's an array if present
    };

    const centerId = getCenterFormValues("centreDetail.centerId");

    // @ts-ignore
    const res = await centerUpdateAction({ centerId, payload });

    if (!res.error) {
      resetCentre();
      setIsOpenEditCentreSidebar((prevState) => !prevState);
    }
  };

  const handleImport = () => {
    setImportFileModal(true);
  };

  const handleDialogClose = (
    event: {},
    reason: "backdropClick" | "escapeKeyDown"
  ) => {
    setImportFileModal(false);
  };

  const handleDownload = async () => {
    const downloadData: any = await centerRefetchDownload();
    try {
      const sheetData = [
        [
          "Region",
          "#",
          "SC Centre Name",
          "Biometric device id",
          "Status",
          "Funder",
          "District",
          "State",
          "Gender Type",
          "Centre Business Type",
          "Physical/Virtual Status",
          "Program Type",
          "MCP Centre",
          "National Director",
          "National Director Email",
          "Regional Director",
          "Regional Director Email",
          "City Manager",
          "City Manager Email",
          "Cluster Manager",
          "Cluster Manager Email",
          "Centre Manager",
          "Centre Manager Email",
          "CRM/SPOC",
          "CRM/SPOC Email",
          "Regional Data Manager",
          "Regional Data Manager Email",
        ],
        ...(downloadData?.data?.allCentres.map((center: any) => [
          center.region || "",
          center.id || "",
          center.centerName || "",
          center.projectCode || "",
          center.status === 1 ? "Active" : "Inactive",
          center.funderName || "",
          center.district || "",
          center.state || "",
          center.genderType || "",
          center.centerBusinessType || "",
          center.centerStatus || "",
          center.programType || "",
          center.mcpCenter || "",
          center.nationalDirectors?.map((director: any) => director.username) ||
            "",
          center.nationalDirectors?.map((director: any) => director.email) ||
            "",
          center.regionalDirectors?.map((director: any) => director.username) ||
            "",
          center.regionalDirectors?.map((director: any) => director.email) ||
            "",
          center.cityManagers?.map((manager: any) => manager.username) || "",
          center.cityManagers?.map((manager: any) => manager.email) || "",
          center.clusterManagers?.map((manager: any) => manager.username) || "",
          center.clusterManagers?.map((email: any) => email.email) || "",
          center.centerManagers?.map((manager: any) => manager.username) || "",
          center.centerManagers?.map((manager: any) => manager.email) || "",
          center.placementHeads?.map((manager: any) => manager.username) || "",
          center.placementHeads?.map((manager: any) => manager.emal) || "",
          center.regionalDataManagers?.map((item: any) => item?.username) || "",
          center.regionalDataManagers?.map((item: any) => item?.email) || "",
        ]) || []),
      ];

      console.log("sheetData", sheetData, downloadData?.data?.allCentres);

      DownloadToXlsxFile({ fileNamePrifix: "center-management", sheetData });
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleStateSelect = (state: string) => {
    City.getCitiesOfState("IN", state).forEach((c) => cities.push(c.name));
  };

  const handleToggle = (rowData: any) => {
    const updatedStatus = rowData.isActive === 1 ? false : true;
    const centerId = rowData.id;
    const payload = {
      isActive: updatedStatus,
    };

    try {
      updateCenterStatus({ centerId, payload });
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleDistrictSelect = (district: string) => {};

  const handleCenterSearch = (value: string | number) => {
    const searchValue = value.toString();
    const isLessThan3 = searchValue.length > 0 && searchValue.length < 3;
    setIsLessThen3Value(isLessThan3);
    setSearchValue(searchValue);

    // Clear the previous timeout to reset the timer if the user is typing quickly
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Only set params after 1.5 seconds of no new typing
    timeoutRef.current = setTimeout(() => {
      if (searchValue.length >= 3) {
        setParams({ search: searchValue, pageNo: "1", pageSize: "10" });
      } else if (searchValue.length === 0) {
        setParams({
          pageNo: "1",
          pageSize: "10",
        });
      }
    }, 1500); // 1.5 seconds delay
  };
  const handleFinalImport = () => {
    setImportConfirmationModal(true); // Open the success modal
    setImportFileModal(false);
    setTimeout(() => {
      setImportConfirmationModal(false); // Automatically close it after 5 seconds
    }, 5000);
  };
  const onPageChange = async (event: any, page: number) => {
    setParams((prevParams) => ({
      ...prevParams,
      pageSize: "10",
      pageNo: page.toString(),
    }));
  };

  // button of page header
  const buttons = [
    {
      text: "Export",
      variant: "outlined",
      startIcon: (
        <ImageComponent
          src="/assets/images/login/exportIcon.svg"
          alt="AddIcon"
        />
      ),
      onClick: handleDownload,
      loading: downloadLoading,
      sx: {
        background: "white",
        border: "1px solid #D0D5DD", // Corrected here
        borderRadius: "8px",
        color: "black",
      },
    },

    {
      text: "Import",
      variant: "outlined",
      startIcon: (
        <ImageComponent
          src="/assets/images/login/importIcon.svg"
          alt="ImportIcon"
        />
      ),
      onClick: handleImport,
      sx: {
        background: "white",
        border: "1px solid #D0D5DD", // Corrected here
        borderRadius: "8px",
        color: "black",
      },
    },
    {
      text: "Add Centre",
      variant: "outlined",
      startIcon: (
        <ImageComponent src="/assets/images/login/addIcon.svg" alt="AddIcon" />
      ),
      onClick: toggleAddCentreSidebar,
      sx: {
        border: "1px solid #997906", // Corrected here
        borderRadius: "8px",
        backgroundColor: "#FFF1B7",
        color: "black",
      },
    },
  ];

  // table header buttons
  const tableHeaderBtn = [
    {
      text: "Add filter",
      variant: "outlined",
      startIcon: (
        <ImageComponent
          src="/assets/images/login/addFilterIcon.svg"
          alt="AddFilterIcon"
        />
      ),
      onClick: toggleAddFilterSidebar,
      sx: {
        background: "white",
        border: "1px solid #D0D5DD", // Corrected here
        borderRadius: "8px",
        color: "black",
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
      field: "#",
      headerName: "#",
      width: 50,
      renderCell: (params: any) => {
        return params.row.id;
      },
    },
    {
      field: "centerName",
      headerName: "SC Centre Name",
      minWidth: 250,
    },
    {
      field: "biometricCenters",
      headerName: "Biometric device id",
      minWidth: 250,
      renderCell: (params: any) => {
        return (
          <>
            <Stack
              direction="row"
              gap="5px"
              sx={{
                height: "auto",
                overflowY: "auto",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                "&::-webkit-scrollbar-track": {
                  background: "#f1f1f1",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#888",
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "#555",
                },
              }}
            >
              {params?.row?.biometricCenters?.length > 0 ? (
                params?.row?.biometricCenters?.map((item: any) => (
                  <Text
                    key={item}
                    sx={{
                      border: "1px solid #FEF7DA",
                      background: "#FEF7DA",
                      padding: "0px 10px",
                      borderRadius: "20px",
                      height: "fit-content",
                      fontSize: "14px",
                    }}
                  >
                    {item.biometricDeviceId}
                  </Text>
                ))
              ) : (
                <Text>-</Text>
              )}
            </Stack>
          </>
        );
      },
    },
    {
      field: "isActive",
      headerName: "Status",
      minWidth: 100,
      renderCell: (params: any) => {
        return (
          <>
            <ToggleButton
              sx={{
                "& .MuiSwitch-track": {
                  backgroundColor: params.row.isActive
                    ? "#17A03B !important"
                    : "#A03717 !important",
                },
              }}
              checked={params.row.isActive}
              onChange={() => handleToggle(params.row)}
            />
            {/* </div> */}
          </>
        );
      },
    },
    {
      field: "funderName",
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
      field: "genderType",
      headerName: "Gender Type",
      minWidth: 200,
    },
    {
      field: "centerBusinessType",
      headerName: "Center Business Type",
      minWidth: 200,
    },
    {
      field: "centerStatus",
      headerName: "Physical/Virtual Status",
      minWidth: 200,
    },
    {
      field: "programType",
      headerName: "Program Type",
      minWidth: 200,
    },
    {
      field: "mcpCenter",
      headerName: "MCP Centre",
      minWidth: 150,
    },
    {
      field: "nationalUserName",
      headerName: "National Sr. Director",
      minWidth: 150,
      renderCell: (params: any) => {
        return (
          <>
            <Stack
              direction="row"
              gap="5px"
              sx={{
                height: "auto",
                overflowY: "auto",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                "&::-webkit-scrollbar-track": {
                  background: "#f1f1f1",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#888",
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "#555",
                },
              }}
            >
              {params?.row?.nationalDirectors?.length > 0 ? (
                <Text
                  sx={{
                    border: "1px solid #FEF7DA",
                    background: "#FEF7DA",
                    padding: "0px 10px",
                    borderRadius: "20px",
                    height: "fit-content",
                    fontSize: "14px",
                  }}
                >
                  {params?.row?.nationalDirectors?.map(
                    (director: any) => `${director.username}`
                  )}
                </Text>
              ) : (
                <Text>-</Text>
              )}
            </Stack>
          </>
        );
      },
    },
    {
      field: "nationalDirectoeEmailId",
      headerName: "National Director Email id",
      minWidth: 150,
      renderCell: (params: any) => {
        return (
          <>
            <Stack
              direction="row"
              gap="5px"
              sx={{
                height: "auto",
                overflowY: "auto",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                "&::-webkit-scrollbar-track": {
                  background: "#f1f1f1",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#888",
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "#555",
                },
              }}
            >
              {params?.row?.nationalDirectors?.length > 0 ? (
                <Text
                  sx={{
                    border: "1px solid #FEF7DA",
                    background: "#FEF7DA",
                    padding: "0px 10px",
                    borderRadius: "20px",
                    height: "fit-content",
                    fontSize: "14px",
                  }}
                >
                  {params?.row?.nationalDirectors?.map(
                    (director: any) => `${director.email} `
                  )}
                </Text>
              ) : (
                <Text>-</Text>
              )}
            </Stack>
          </>
        );
      },
    },
    {
      field: "regionalDirector",
      headerName: "Regional Director",
      minWidth: 200,
      renderCell: (params: any) => {
        return (
          <>
            <Stack
              direction="row"
              gap="5px"
              sx={{
                height: "auto",
                overflowY: "auto",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                "&::-webkit-scrollbar-track": {
                  background: "#f1f1f1",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#888",
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "#555",
                },
              }}
            >
              {params?.row?.regionalDirectors?.length > 0 ? (
                <Text
                  sx={{
                    border: "1px solid #FEF7DA",
                    background: "#FEF7DA",
                    padding: "0px 10px",
                    borderRadius: "20px",
                    height: "fit-content",
                    fontSize: "14px",
                  }}
                >
                  {params?.row?.regionalDirectors?.map(
                    (director: any) => `${director.username} `
                  )}
                </Text>
              ) : (
                <Text>-</Text>
              )}
            </Stack>
          </>
        );
      },
    },
    {
      field: "regionalDirectorEmail",
      headerName: "RD email id",
      minWidth: 200,
      renderCell: (params: any) => {
        return (
          <>
            <Stack
              direction="row"
              gap="5px"
              sx={{
                height: "auto",
                overflowY: "auto",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                "&::-webkit-scrollbar-track": {
                  background: "#f1f1f1",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#888",
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "#555",
                },
              }}
            >
              {params?.row?.regionalDirectors?.length > 0 ? (
                <Text
                  sx={{
                    border: "1px solid #FEF7DA",
                    background: "#FEF7DA",
                    padding: "0px 10px",
                    borderRadius: "20px",
                    height: "fit-content",
                    fontSize: "14px",
                  }}
                >
                  {params?.row?.regionalDirectors?.map(
                    (director: any) => `${director.email} `
                  )}
                </Text>
              ) : (
                <Text>-</Text>
              )}
            </Stack>
          </>
        );
      },
    },

    {
      field: "cityManager",
      headerName: "City manager",
      minWidth: 200,
      renderCell: (params: any) => {
        return (
          <>
            <Stack
              direction="row"
              gap="5px"
              sx={{
                height: "auto",
                overflowY: "auto",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                "&::-webkit-scrollbar-track": {
                  background: "#f1f1f1",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#888",
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "#555",
                },
              }}
            >
              {params?.row?.cityManagers?.length > 0 ? (
                <Text
                  sx={{
                    border: "1px solid #FEF7DA",
                    background: "#FEF7DA",
                    padding: "0px 10px",
                    borderRadius: "20px",
                    height: "fit-content",
                    fontSize: "14px",
                  }}
                >
                  {params?.row?.cityManagers?.map(
                    (director: any) => `${director.username} `
                  )}
                </Text>
              ) : (
                <Text>-</Text>
              )}
            </Stack>
          </>
        );
      },
    },
    {
      field: "cityManagerEmail",
      headerName: "CM email id",
      minWidth: 200,
      renderCell: (params: any) => {
        return (
          <>
            <Stack
              direction="row"
              gap="5px"
              sx={{
                height: "auto",
                overflowY: "auto",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                "&::-webkit-scrollbar-track": {
                  background: "#f1f1f1",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#888",
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "#555",
                },
              }}
            >
              {params?.row?.cityManagers?.length > 0 ? (
                <Text
                  sx={{
                    border: "1px solid #FEF7DA",
                    background: "#FEF7DA",
                    padding: "0px 10px",
                    borderRadius: "20px",
                    height: "fit-content",
                    fontSize: "14px",
                  }}
                >
                  {params?.row?.cityManagers?.map(
                    (director: any) => `${director.email} `
                  )}
                </Text>
              ) : (
                <Text>-</Text>
              )}
            </Stack>
          </>
        );
      },
    },

    {
      field: "clusterManager",
      headerName: "Cluster Manager",
      minWidth: 200,
      renderCell: (params: any) => {
        return (
          <>
            <Stack
              direction="row"
              gap="5px"
              sx={{
                height: "auto",
                overflowY: "auto",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                "&::-webkit-scrollbar-track": {
                  background: "#f1f1f1",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#888",
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "#555",
                },
              }}
            >
              {params?.row?.clusterManagers?.length > 0 ? (
                <Text
                  sx={{
                    border: "1px solid #FEF7DA",
                    background: "#FEF7DA",
                    padding: "0px 10px",
                    borderRadius: "20px",
                    height: "fit-content",
                    fontSize: "14px",
                  }}
                >
                  {params?.row?.clusterManagers?.map(
                    (director: any) => `${director.username} `
                  )}
                </Text>
              ) : (
                <Text>-</Text>
              )}
            </Stack>
          </>
        );
      },
    },
    {
      field: "clusterManagerEmail",
      headerName: "Cluster manager email id",
      minWidth: 200,
      renderCell: (params: any) => {
        return (
          <>
            <Stack
              direction="row"
              gap="5px"
              sx={{
                height: "auto",
                overflowY: "auto",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                "&::-webkit-scrollbar-track": {
                  background: "#f1f1f1",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#888",
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "#555",
                },
              }}
            >
              {params?.row?.clusterManagers?.length > 0 ? (
                <Text
                  sx={{
                    border: "1px solid #FEF7DA",
                    background: "#FEF7DA",
                    padding: "0px 10px",
                    borderRadius: "20px",
                    height: "fit-content",
                    fontSize: "14px",
                  }}
                >
                  {params?.row?.clusterManagers?.map(
                    (director: any) => `${director.email} `
                  )}
                </Text>
              ) : (
                <Text>-</Text>
              )}{" "}
            </Stack>
          </>
        );
      },
    },
    {
      field: "centerManager",
      headerName: "Centre Manager",
      minWidth: 200,
      renderCell: (params: any) => {
        return (
          <>
            <Stack
              direction="row"
              gap="5px"
              sx={{
                height: "auto",
                overflowY: "auto",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                "&::-webkit-scrollbar-track": {
                  background: "#f1f1f1",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#888",
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "#555",
                },
              }}
            >
              {params?.row?.centerManagers?.length > 0 ? (
                <Text
                  sx={{
                    border: "1px solid #FEF7DA",
                    background: "#FEF7DA",
                    padding: "0px 10px",
                    borderRadius: "20px",
                    height: "fit-content",
                    fontSize: "14px",
                  }}
                >
                  {params?.row?.centerManagers?.map(
                    (manager: any) => `${manager.username} `
                  )}
                </Text>
              ) : (
                <Text>-</Text>
              )}
            </Stack>
          </>
        );
      },
    },
    {
      field: "centerManagerEmail",
      headerName: "Centre Manager Email ID",
      minWidth: 200,
      renderCell: (params: any) => {
        return (
          <>
            <Stack
              direction="row"
              gap="5px"
              sx={{
                height: "auto",
                overflowY: "auto",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                "&::-webkit-scrollbar-track": {
                  background: "#f1f1f1",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#888",
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "#555",
                },
              }}
            >
              {params?.row?.centerManagers?.length > 0 ? (
                <Text
                  sx={{
                    border: "1px solid #FEF7DA",
                    background: "#FEF7DA",
                    padding: "0px 10px",
                    borderRadius: "20px",
                    height: "fit-content",
                    fontSize: "14px",
                  }}
                >
                  {params?.row?.centerManagers?.map(
                    (manager: any) => `${manager.email} `
                  )}
                </Text>
              ) : (
                <Text>-</Text>
              )}
            </Stack>
          </>
        );
      },
    },

    {
      field: "districtLevelManager",
      headerName: "CRM/SPOC",
      minWidth: 200,
      renderCell: (params: any) => {
        return (
          <>
            <Stack
              direction="row"
              gap="5px"
              sx={{
                height: "auto",
                overflowY: "auto",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                "&::-webkit-scrollbar-track": {
                  background: "#f1f1f1",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#888",
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "#555",
                },
              }}
            >
              {params?.row?.placementHeads?.length > 0 ? (
                <Text
                  sx={{
                    border: "1px solid #FEF7DA",
                    background: "#FEF7DA",
                    padding: "0px 10px",
                    borderRadius: "20px",
                    height: "fit-content",
                    fontSize: "14px",
                  }}
                >
                  {params?.row?.placementHeads?.map(
                    (director: any) => `${director.username} `
                  )}
                </Text>
              ) : (
                <Text>-</Text>
              )}
            </Stack>
          </>
        );
      },
    },
    {
      field: "districtLevelManagerEmail",
      headerName: "CRM/SPOC email id",
      minWidth: 200,
      renderCell: (params: any) => {
        return (
          <>
            <Stack
              direction="row"
              gap="5px"
              sx={{
                height: "auto",
                overflowY: "auto",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                "&::-webkit-scrollbar-track": {
                  background: "#f1f1f1",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#888",
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "#555",
                },
              }}
            >
              {params?.row?.placementHeads?.length > 0 ? (
                <Text
                  sx={{
                    border: "1px solid #FEF7DA",
                    background: "#FEF7DA",
                    padding: "0px 10px",
                    borderRadius: "20px",
                    height: "fit-content",
                    fontSize: "14px",
                  }}
                >
                  {params?.row?.placementHeads?.map(
                    (director: any) => `${director.email} `
                  )}
                </Text>
              ) : (
                <Text>-</Text>
              )}
            </Stack>
          </>
        );
      },
    },

    {
      field: "regionalDataManager",
      headerName: "Regional Data Manager",
      minWidth: 200,
      renderCell: (params: any) => {
        return (
          <>
            <Stack
              direction="row"
              gap="5px"
              sx={{
                height: "auto",
                overflowY: "auto",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                "&::-webkit-scrollbar-track": {
                  background: "#f1f1f1",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#888",
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "#555",
                },
              }}
            >
              {params?.row?.regionalDataManagers?.length > 0 ? (
                <Text
                  sx={{
                    border: "1px solid #FEF7DA",
                    background: "#FEF7DA",
                    padding: "0px 10px",
                    borderRadius: "20px",
                    height: "fit-content",
                    fontSize: "14px",
                  }}
                >
                  {params?.row?.regionalDataManagers?.map(
                    (director: any) => `${director.username} `
                  )}
                </Text>
              ) : (
                <Text>-</Text>
              )}
            </Stack>
          </>
        );
      },
    },
    {
      field: "regionalDataManagerEmail",
      headerName: "RDM Email id",
      minWidth: 200,
      renderCell: (params: any) => {
        return (
          <>
            <Stack
              direction="row"
              gap="5px"
              sx={{
                height: "auto",
                overflowY: "auto",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                "&::-webkit-scrollbar-track": {
                  background: "#f1f1f1",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#888",
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "#555",
                },
              }}
            >
              {params?.row?.regionalDataManagers?.length > 0 ? (
                <Text
                  sx={{
                    border: "1px solid #FEF7DA",
                    background: "#FEF7DA",
                    padding: "0px 10px",
                    borderRadius: "20px",
                    height: "fit-content",
                    fontSize: "14px",
                  }}
                >
                  {params?.row?.regionalDataManagers?.map(
                    (director: any) => `${director.email} `
                  )}
                </Text>
              ) : (
                <Text>-</Text>
              )}
            </Stack>
          </>
        );
      },
    },
    // {
    //   field: "placementHead",
    //   headerName: "Placement Head",
    //   minWidth: 200,
    //   renderCell: (params: any) => {
    //     return (
    //       <>
    //         <Stack
    //           direction="row"
    //           gap="5px"
    //           sx={{
    //             height: "auto",
    //             overflowY: "auto",
    //             "&::-webkit-scrollbar": {
    //               width: "8px",
    //               height: "2px",
    //             },
    //             "&::-webkit-scrollbar-track": {
    //               background: "#f1f1f1",
    //             },
    //             "&::-webkit-scrollbar-thumb": {
    //               background: "#888",
    //               borderRadius: "10px",
    //             },
    //             "&::-webkit-scrollbar-thumb:hover": {
    //               background: "#555",
    //             },
    //           }}
    //         >
    //           {params?.row?.placementHeads?.length > 0 ? (
    //             <Text>
    //               {params?.row?.placementHeads?.map(
    //                 (director: any) => `${director.username} `
    //               )}
    //             </Text>
    //           ) : (
    //             <Text>-</Text>
    //           )}
    //         </Stack>
    //       </>
    //     );
    //   },
    // },
    // {
    //   field: "projectCode",
    //   headerName: "Project Code",
    //   minWidth: 100,
    // },
    // {
    //   field: "tenure",
    //   headerName: "Tenure",
    //   minWidth: 190,
    // },
    // {
    //   field: "programSubType",
    //   headerName: "Program Sub Type",
    //   minWidth: 250,
    // },

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
              border: "1px solid #997906",
              borderRadius: "8px",
              backgroundColor: "#FFF1B7",
              color: "black",
              boxShadow: "none !important",
            }}
            onClick={() => {
              handleEditBtnClick(props.row);
            }}
          >
            Edit
          </Button>
        );
      },
    },
  ];

  const centerFormStates = getCenterFormValues("centreDetail");
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
        tableSx={{ minHeight: "300px", width: "100%" }}
        handlePageChange={onPageChange}
        loading={isLoadingCenters}
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
        currentPage={Number(params?.pageNo) || 1}
      />

      {/* Add Centre form  MagicDrawer*/}
      <MagicDrawer
        title="Add Centres"
        subtitle="Here you can Add Centre by filling the details"
        drawerOpen={isOpenAddCentreSidebar}
        onDrawerToggle={handleAddCentreCancelBtn}
        actionComponent={() => (
          <>
            <Button
              className="bun-outline"
              onClick={handleAddCentreCancelBtn}
              disabled={isCreatingLoading}
            >
              Cancel
            </Button>
            <Button
              className="bun-filled"
              onClick={handleCentreFromSubmit(handleAddCentreDoneBtn)}
              loading={isCreatingLoading}
              disabled={isCreatingLoading}
              s
            >
              Done
            </Button>
          </>
        )}
      >
        <AddCentreForm
          centerFormStates={centerFormStates}
          control={centreControl}
          errors={centreErrors}
          centerList={centerList}
          regionalDirector={regionalDirector}
          nationalSrDirector={nationalDirector}
          placementHead={placementHead}
          regionalDataManager={regionalDataManager}
          clusterManager={clusterManager}
          districtLevelManager={districtLevelManager}
          cityManager={cityManager}
          centerManager={centerManagerOptions}
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
        />
      </MagicDrawer>

      {/* Add Filter form MagicDrawer*/}

      <MagicDrawer
        title="Add filter"
        subtitle="Here you can Add filter by filling the details"
        drawerOpen={isOpenAddFilterSidebar}
        onDrawerToggle={handleAddFilterClearAllBtn}
        actionComponent={() => (
          <>
            <Button
              className="bun-outline"
              onClick={handleAddFilterClearAllBtn}
              disabled={isLoadingCenters}
            >
              Clear All
            </Button>
            <Button
              className="bun-filled"
              onClick={handleAddFilterApplyBtn}
              loading={isLoadingCenters}
            >
              Apply
            </Button>
          </>
        )}
      >
        <AddFilterForm
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
          states={indianStates}
          filter={filter}
          centerManager={centerManagerOptions}
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
        />
      </MagicDrawer>

      {/* Edit centre details form MagicDrawer */}
      <MagicDrawer
        title="Edit details"
        subtitle="Here you can edit centre details"
        drawerOpen={isOpenEditCentreSidebar}
        onDrawerToggle={handleEditCentreCancelAllBtn}
        actionComponent={() => (
          <>
            <Button
              className="bun-outline"
              onClick={handleEditCentreCancelAllBtn}
              disabled={isLoadingUpdateCenter}
            >
              Cancel
            </Button>
            <Button
              className="bun-filled"
              onClick={handleCentreFromSubmit(handleEditCentreDetailDoneBtn)}
              loading={isLoadingUpdateCenter}
              disabled={isLoadingUpdateCenter}
            >
              Done
            </Button>
          </>
        )}
      >
        <AddCentreForm
          centerFormStates={centerFormStates}
          control={centreControl}
          errors={centreErrors}
          centerList={centerList}
          regionalDirector={regionalDirector}
          placementHead={placementHead}
          nationalSrDirector={nationalDirector}
          regionalDataManager={regionalDataManager}
          // clusterManager={clusterManager}
          clusterManager={clusterManager}
          districtLevelManager={districtLevelManager}
          cityManager={cityManager}
          centerManager={centerManagerOptions}
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
          biometricData={watchCenterForm()}
        />
      </MagicDrawer>

      <Dialog
        open={importFileModal}
        onOpen={() => {}}
        onClose={handleDialogClose}
        maxWidth="sm"
      >
        <ImportCenterContent
          onClose={handleDialogClose}
          onSuccess={handleFinalImport}
        />
      </Dialog>

      <Dialog
        open={importConfirmationModal}
        onOpen={() => {}}
        onClose={() => {
          setImportConfirmationModal(false);
          handleDialogClose("", "backdropClick");
        }}
        maxWidth="sm"
      >
        <div
          style={{
            padding: "40px 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          {/* Icon Section */}
          <div style={{ marginBottom: "28px" }}>
            <ImageComponent
              sx={{ height: "34px", width: "34px" }}
              src="assets/images/login/SucessfullyImportIcon.svg"
              alt="Successfully Import Icon"
            />
          </div>

          {/* Title Text */}
          <div>
            <text
              style={{ color: "#101828", fontSize: "20px", fontWeight: "600" }}
            >
              The centers list has been successfully uploaded.
            </text>
          </div>

          {/* Description Text */}
          <div>
            <text
              style={{ color: "#667085", fontSize: "14px", fontWeight: "400" }}
            >
              The center list has been uploaded seamlessly, ensuring all data is
              now available for access and review.
            </text>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default CentresContainers;
