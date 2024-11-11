const centerParser: any = {};

centerParser.getCenter = (response: any) => {
  let centresData: { [key: string]: string | number }[] = [];
  let totalCentresCount: number = 0;

  if (response.success && Array.isArray(response.data.rows)) {
    centresData = response.data.rows; // Directly use the data array
    totalCentresCount = response.data.rowsCount; // Total count from the array length
  }

  // This function is for Date Formatting
  function formatDate(apiDate: string): string {
    const date = new Date(apiDate); // Create a Date object from the API date
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    return date.toLocaleDateString("en-GB", options).replace(",", "");
  }

  const parseManagerRole = (managers: any[]) => {
    return managers.map((manager: any) => ({
      roleId: manager.roleId,
      roleName: manager.roleName,
      userId: manager.userId,
      username: manager.username,
      email: manager.email,
      phoneNo: manager.phoneNo,
    }));
  };
  
  const centres = centresData?.map((center: any) => ({
    id: center.centerId || "-",
    centerName: center.centerName || "-",
    region: center.region || "-",
    tenure: `${formatDate(center.tenureStartDate)} - ${formatDate(center.tenureEndDate)}`,
    state: center.state || "-",
    district: center.district || "-",
    city: center.city || "-",
    centerBusinessType: center.centerBusinessType || "-",
    centerStatus: center.centerStatus || "-",
    isActive: center.isActive,
    projectCode: center.projectCode || "-",
    funderName: center.funderName || "-",
    funderId: center.funderId || "-",
    genderType: center.genderType || "-",
    programType: center.programType || "-",
    programSubType: center.programSubType || "-",
    status: center.status || "-",
    mcpCenter: center.mcpCenter ? "Yes" : "No",
    biometricCenters: center.biometricCenters,
    createdAt: center.createdAt || "-",
    updatedAt: center.updatedAt || "-",
    publishedAt: center.publishedAt || "-",
    nationalDirectors: parseManagerRole(center.nationalDirector),
    regionalDirectors: parseManagerRole(center.regionalDirector),
    cityManagers: parseManagerRole(center.cityManager),
    clusterManagers: parseManagerRole(center.clusterManager),
    centerManagers: parseManagerRole(center.centerManager),
    districtLevelManagers: parseManagerRole(center.districtLevelManager),
    placementHeads: parseManagerRole(center.placementHead),
    regionalDataManagers: parseManagerRole(center.regionalDataManager),
  }));

  

  return {
    allCentres: centres,
    totalCentres: totalCentresCount,
  };
};

centerParser.getRegion = (res: any) => {
  return Object.entries(res.data).map(([key, value]) => ({
    id: value,
    label: key,
  }));
};

centerParser.getFunder = (res: any) => {
  return res.data.map((funder: any) => ({
    label: funder.funderName,
    id: funder.funderId,
  }));
};

centerParser.getProgramTypes = (response: any) => {
  let programTypes: { label: string; id: number }[] = [];
  let programSubTypes: { label: string; id: number }[] = [];

  if (
    response.success &&
    Array.isArray(response.data) &&
    response.data.length > 0
  ) {
    // Map program types
    programTypes = response.data.map((program: any) => ({
      label: program.programType,
      id: program.programTypeId,
    }));

    // Map program sub-types
    programSubTypes = response.data.flatMap((program: any) =>
      program.programSubType.map((subType: any) => ({
        label: subType.programSubType,
        id: subType.programSubTypeId,
      }))
    );
  }

  return { programTypes, programSubTypes };
};

centerParser.getUserList = (res: any) => {
  return res.data?.rows.map((user: any) => ({
    label: user.username,
    id: user.userId,
  }));
};

centerParser.getCenterList = (res: any) => {
  let data: any = [];
  const stateSelect: string[] = [];
  const districtSelect: string[] = [];
  const citySelect: string[] = [];
  const centerTypeSelect: string[] = [];

    if (Array.isArray(res.data) && res.data.length > 0) { data = res.data }

  const centerSelect = data.map((center: any) => ({
    label: center.centerName,
    id: center.centerId,
  }));

  data.forEach((value: any) => {
    stateSelect.push(value.state);
    districtSelect.push(value.district);
    citySelect.push(value.city);
    centerTypeSelect.push(value.centerType);
  });
  return {
    centerSelect,
    centerTypeSelect,
    stateSelect,
    districtSelect,
    citySelect,
  };
};

export default centerParser;
