export interface Role {
    roleId: number;
    roleName: string;
    isAdmin: boolean;
    isActive: boolean;
    userAccessControl: any[];
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    program: string;
    center: string
}

// export interface User {
//     userId: number;
//     username: string;
//     phoneNo: string;
//     department: string;
//     email: string;
//     roleId: any;
//     role: Partial<Role>;
//     location: string
//     empId: number,
//     createdBy: string;
//     isActive: boolean;
//     createdAt: string;
//     updatedAt: string;
//     publishedAt: string;
//     program: string;
//     center: string,

// }

export interface Center {
    label: number;
    id: string;
}

export interface Program {
    label: number;
    value: string;
}

export interface User {
    userId: number;
    username: string;
    phoneNo: string;
    email: string;
    empId: string;
    channel: string;
    dateOfJoining: string; // ISO date format
    department: string;
    designation: string;
    docstatus: number;
    doctype: string;
    lastWorkingDate: string | null; // can be null
    location: string;
    owner: string;
    isActive: number;
    zone: string;
    createdAt: string; // ISO date format
    publishedAt: string; // ISO date format
    updatedAt: string; // ISO date format
    createdById: number | null; // can be null
    createdBy: string | null; // can be null
    roleId: number;
    roleName: string;
    center: Center[];
    programs: Program[];
}


interface UsersData {
  rowsCount: number;
  rows: User[];
}

export interface program {
    programMasterName: string
    programMasterId: number
}


// Get users api interface
export interface FetchUserRequest {
    userId?: string | undefined;
    pageNo?: string | undefined;
    pageSize?: string | undefined;
    role?: number[] | undefined;
    email?: string | undefined;
    phoneNo?: string | undefined;
    username?: string | undefined
    search?: string | undefined
}

export interface FetchUsersResponse {
  success: boolean;
  message: string;
  data: UsersData;
}

export interface ParsedFetchUserResponse {
    users: User[];
    totalUsers: number;
}

export interface RoleData {
  rowsCount: number;
  rows: Role[];
}

// Edit role api interface
export interface FetchRolesResponse {
  success: boolean;
  message: string;
  data: RoleData;
}

export interface ParsedRoleResponse {
  label: string; // Role name
  value: number; // Role ID
  isAdmin: boolean; // Whether the role is admin
  isActive: boolean; // Whether the role is active
  userAccessControl: any[]; // Define a more specific type if available
  createdAt: string; // Role creation date
}

// Edit Create new user api interface
export interface CreateUserRequest {
    username: string;
    phoneNo: string;
    email: string;
    programMasterId: number;
    center: string;
    location: string
    roleId: number

}

export interface CreateUserResponse {
  success: boolean;
  message: string;
  data: {
    userId: number;
  };
}

export interface ProgramData {
    rows: program[];
}

// program list interface
export interface FetchProgramResponse {
    success: boolean;
    message: string;
    data: ProgramData;
}


export interface ParsedProgramResponse {
    label: string;
    value: number;

}



// Edit user details api interface
export interface EditUserRequest {
    username?: string;
    phoneNo?: string;
    roleId?: number;
    empId?: string;
    isActive?: boolean;
    center?: number[];
    program?: number[];
    department?: string;
    location?: string;
    dateOfJoining?: string;
    designation?: string;
    lastWorkingDate?: string;
    zone?: string;
    docstatus?: boolean;
    doctype?: string;
    owner?: string;
    userId?: number;
}

export interface EditUserResponse {
  success: boolean;
  message: string;
  data: {
    userId: string;
  };
}

//---------------- container level interfaces----------------------------
export interface UserFormInterface {
    addUserDetails: {
        userId: number | null,
        username: string,
        email: string,
        phoneNo: string
        department: string,
        location: string,
        empId: number | null | undefined,
        publishedAt: string
        updatedAt: string,
        createdAt: string,
        programMasterId: any,
        program: any
        roleId: any;
        center: any,
        item: any,

        id: any


    }
}

export interface updateUserStatusPayload {
    userId: number;
    isActive: boolean;
}



// ---------Reset  Password interface--------------------
export interface ResetPasswordRequest {
  password: string;
  confirmPassword: string;
  resetToken: string | undefined | null;
}

export interface ResetPasswordResponse {
    success: boolean,
    message: string,
    data: null
}
