export interface ParameterType {
    parameterTypeId: number;
    parameterTypeName: string;
    isActive?: boolean;
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
}

export interface ParameterTypeResponse {
    success: boolean;
    message: string;
    data: ParameterType[];
}



// --------------------Manage Score API related interfaces-----------------

export interface ManageScoreApiReq {
    programMasterId?: number;
    quarterMasterId?: number;
    ProgramYearId?: number;
    manageScoreId?: number;
    parameterName?: string;
    parameterTypeId?: number;
    createdBy?: string;
    pageNo?: number;
    pageSize?: number

}

export interface ManageScore {
    manageScoreId: number;
    parameterName: string;
    parameterTypeId: number;
    parameterType: ParameterType;
    weightage: Weightage[];
    programMasterId: number;
    ProgramYearId: number;
    quarterMasterId: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

export interface ManageScoreResponse {
    success: boolean;
    message: string;
    data: {
        rawsCount: number;
        raws: ManageScore[];
    };
}



export interface ParameterType {
    parameterTypeName: string;
}



export interface MeasurementCriteria {
    measurementCriteriaId: number;
    region: string;
    operator: string;
    measurementCriteria: string;
    highestScoreCanBeObtained: number;
    score: number;
}



export interface Weightage {
    weightageId: number;
    weightage: string;
    measurementCriteria: MeasurementCriteria[];
}

export interface ManageScoreResponse {
    success: boolean;
    message: string;
    data: {
        rawsCount: number;
        raws: ManageScore[];
    };
}