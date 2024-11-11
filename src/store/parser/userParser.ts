import { Label } from "@mui/icons-material";
import { FetchRolesResponse, FetchUsersResponse, ParsedFetchUserResponse, ParsedRoleResponse, Role, User, FetchProgramResponse, ParsedProgramResponse, program } from "../types/user";

const userParser: any = {}


userParser.fetchedUsers = (response: FetchUsersResponse): ParsedFetchUserResponse => {
    let data: User[] = []

    if (
        response.success &&
        typeof response.data === "object" &&
        response.data !== null &&
        Array.isArray(response.data.rows) &&
        response.data.rows.length > 0) {
        data = response.data.rows;
    }
    let total = response?.data?.rowsCount;
    const userRows = data.map((user: User) => ({

        id: user.userId,
        username: user.username,
        department: user.department,
        email: user.email,
        roleId: user.roleId,
        roleName: user.roleName,
        phoneNo: user.phoneNo,
        location: user.location,
        empId: user.empId,
        createdBy: user.createdBy,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        publishedAt: user.publishedAt,
        isActive: user.isActive,
        program: user.programs,
        center: user.center
    }));

    return {
        // @ts-ignore
        users: userRows,
        totalUsers: total
    }
}

userParser.userRoles = (res: FetchRolesResponse): ParsedRoleResponse[] => {
    let data: Role[] = []

    if (
        res.success && res.data !== null && res.data.rows.length > 0 &&
        typeof res.data === "object" && Array.isArray(res.data.rows)
    ) {
        data = res.data.rows;
    }


    return data.map((role) => ({
        label: role.roleName,
        value: role.roleId,
        isAdmin: role.isAdmin,
        isActive: role.isActive,
        userAccessControl: role.userAccessControl,
        createdAt: role.createdAt,
    }));
}


userParser.userProgram = (res: FetchProgramResponse): ParsedProgramResponse[] => {
    let data: program[] = [];
    if (
        res.success &&
        res.data !== null &&
        Array.isArray(res.data) &&
        res.data.length > 0
    ) {
        data = res.data;
    }
    return data.map((program) => {

        return {
            label: program.programMasterName,
            value: program.programMasterId,
        };
    });
};





export default userParser;