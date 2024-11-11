export interface RetrieveCentreApiReq {
  centerId?: string;
  centerName?: string;
  region?: string;
  city?: string;
  funderId?: string;
  search?: string;
  pageNo?: string;
  pageSize?: number;
  regionalDataManager?: number;
  cityManager?: number;
  districtLevelManager?: number;
  clusterManager?: number;
  regionalDirector?: number;
  placementHead?: number;
  tenureStartDate?: string;
  tenureEndDate?: string;
  mcpCenter?: string;
  programType?: number;
  programSubType?: number;
  establishedDate?: string;
}

export interface RetrieveCentreApiParsedRes {
  totalCentres: number;
  allCentres: { [key: string]: any }[];
}

export interface CreateCentreApiRequest {
  centerName: string;
  centerType: string;
  projectCode: string;
  region: string;
  state: string;
  district: string;
  city: string;
  regionalDirector: number;
  cityManager: number;
  districtLevelManager: number;
  clusterManager: number;
  funderId: number;
  regionalDataManager: number;
  placementHead: number;
  tenureStartDate: string;
  tenureEndDate: string;
  mcpCenter: string;
  programType: number;
  programSubType: number;
  establishedDate: string;
  isActive: boolean;
}

export interface CreateCentreApiResponse {
  success: boolean;
  message: string;
  data: { [key: string]: any }[];
}

export interface ImportCentreApiParsedRes {
  isCreated: boolean;
  message: string;
  createCentreDetails: {
    centerId: number;
    centerName: string;
    genderType: string;
    projectCode: string;
    region: string;
    state: string;
    district: string;
    city: string;
    centerStatus: string;
    funderName: string;
    mcpCenter: boolean;
    programType: string;
    programSubType: string;
    centerBusinessType: string;
    biometricDeviceId: string;
    regionalDirectorEmail: string;
    regionalDirectorName: string;
    regionalDirectorPhoneNo: string;
    cityManagerEmail: string;
    cityManagerName: string;
    cityManagerPhoneNo: string;
    districtLevelManagerEmail: string;
    districtLevelManagerName: string;
    districtLevelManagerPhoneNo: string;
    clusterManagerEmail: string;
    clusterManagerName: string;
    clusterManagerPhoneNo: string;
    regionalDataManagerEmail: string;
    regionalDataManagerName: string;
    regionalDataManagerPhoneNo: string;
    placementHeadEmail: string;
    placementHeadName: string;
    placementHeadPhoneNo: string;
    nationalDirectorEmail: string;
    nationalDirectorName: string;
    nationalDirectorPhoneNo: string;
  };
}

export interface ImportCentreApiResponse {
  success: boolean;
  message: string;
  data: {
    // Assuming `data` is the newly created center information, matching the request body
    centerId: number;
    centerName: string;
    genderType: string;
    projectCode: string;
    region: string;
    state: string;
    district: string;
    city: string;
    centerStatus: string;
    funderName: string;
    mcpCenter: boolean;
    programType: string;
    programSubType: string;
    centerBusinessType: string;
    biometricDeviceId: string;
    regionalDirectorEmail: string;
    regionalDirectorName: string;
    regionalDirectorPhoneNo: string;
    cityManagerEmail: string;
    cityManagerName: string;
    cityManagerPhoneNo: string;
    districtLevelManagerEmail: string;
    districtLevelManagerName: string;
    districtLevelManagerPhoneNo: string;
    clusterManagerEmail: string;
    clusterManagerName: string;
    clusterManagerPhoneNo: string;
    regionalDataManagerEmail: string;
    regionalDataManagerName: string;
    regionalDataManagerPhoneNo: string;
    placementHeadEmail: string;
    placementHeadName: string;
    placementHeadPhoneNo: string;
    nationalDirectorEmail: string;
    nationalDirectorName: string;
    nationalDirectorPhoneNo: string;
  };
}
export interface ImportCentreApiRequest {
  centerId: number;
  centerName: string;
  genderType: string;
  projectCode: string;
  region: string;
  state: string;
  district: string;
  city: string;
  centerStatus: string;
  funderName: string;
  mcpCenter: boolean;
  programType: string;
  programSubType: string;
  centerBusinessType: string;
  biometricDeviceId: string;
  regionalDirectorEmail: string;
  regionalDirectorName: string;
  regionalDirectorPhoneNo: string;
  cityManagerEmail: string;
  cityManagerName: string;
  cityManagerPhoneNo: string;
  districtLevelManagerEmail: string;
  districtLevelManagerName: string;
  districtLevelManagerPhoneNo: string;
  clusterManagerEmail: string;
  clusterManagerName: string;
  clusterManagerPhoneNo: string;
  regionalDataManagerEmail: string;
  regionalDataManagerName: string;
  regionalDataManagerPhoneNo: string;
  placementHeadEmail: string;
  placementHeadName: string;
  placementHeadPhoneNo: string;
  nationalDirectorEmail: string;
  nationalDirectorName: string;
  nationalDirectorPhoneNo: string;
}


export interface CreateCentreApiParsedRes {
  isCreated: boolean;
  message: string;
  createCentreDetails: { [key: string]: any }[];
}

export interface UpdateCenterStatusPayload {
  centerId: number;
  isActive: boolean;
}
export interface UpdateCenterApiReq {
  centerId: number;
  payload: {
    centerName: string;
    centerType: string;
    projectCode: string;
    region: string;
    state: string;
    district: string;
    city: string;
    regionalDirector: number;
    cityManager: number;
    districtLevelManager: number;
    clusterManager: number;
    funderId: number;
    regionalDataManager: number;
    placementHead: number;
    tenureStartDate: string;
    tenureEndDate: string;
    mcpCenter: boolean;
    programType: number;
    programSubType: number;
    establishedDate: string;
    isActive?: any;
  };
}

export interface RegionApiResponse {
  success: boolean;
  message: string;
  data: {
    North: string;
    South: string;
    West: string;
    East: string;
  };
}

export interface FetchRegionApiParsedRes {
  label: string;
  id: string;
}

export interface FunderApiResponse {
  success: boolean; // Indicates whether the operation was successful
  message: string; // A string message, not a boolean
  data: {
    funderId: number;
    funderName: string;
    isActive: boolean;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    publishedAt: string; // ISO date string
  }[];
}

export interface FetchedFunderApiParsedRes {
  label: string;
  id: number;
}

export interface ProgramSubType {
  programSubTypeId: number;
  programTypeId: number;
  programSubType: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ProgramType {
  programTypeId: number;
  programType: string;
  programSubType: ProgramSubType[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ProgramTypeApiResponse {
  success: boolean;
  message: string;
  data: ProgramType[];
}

export interface FetchedProgramTypeApiParsedRes {
  programTypes: { label: string; id: number }[];
  programSubTypes: { label: string; id: number }[];
}

export interface CenterListApiRequest {
  centerId?: string | undefined;
  centerName?: string | undefined;
  centerType?: string | undefined;
  pageNo?: string | undefined;
  pageSize?: string | undefined;
}

export interface CenterListApiData {
  centerId: number;
  centerName: string;
  centerType: string;
  projectCode: string;
  region: string;
  state: string;
  district: string;
  city: string;
  funderId: number;
  tenureStartDate: string;
  tenureEndDate: string;
  mcpCenter: boolean;
  status: boolean;
  isActive: boolean;
  establishedDate: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface CenterListApiResponse {
  success: boolean;
  message: string;
  data: CenterListApiData[];
}

export interface UserListApiReq {
  username?: string;
  email?: string;
  role?: string;
  roleId?: string;
  pageNo?: string;
  pageSize?: string;
}

export interface UserListApiRes {
  success: boolean;
  message: string;
  data: {
    rowsCount: number;
    rows: {
      userId: number;
      username: string;
      phoneNo: string;
      email: string;
      role: { roleId: number; roleName: string };
      createdAt: string;
      updatedAt: string;
    }[];
  };
}
