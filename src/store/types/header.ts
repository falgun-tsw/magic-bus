export interface ProgramMasterApiRequest {
    pageNo?: string;
} 

interface ProgramYearInter {
    ProgramYearId: number;
    year: string;
}

export interface ProgramMasterApiDataInter {
    programMasterId: number;
    programMasterName: string;
    ProgramYear: ProgramYearInter[];
    isActive: boolean;
    createdAt:string;
    updatedAt:string;
    publishedAt: string;
}

export interface ProgramMasterApiResponse {
    success: string
    message: string
    data: ProgramMasterApiDataInter[]
}

export interface ProgramMasterApiParsedRes {
    programs: {label:string ,value:number | string}[]
    years: { label: string, value: number | string }[]
}



// quarter-master API request interface
export interface QuarterMasterApiRequest {
    programMasterId?: number;
    ProgramYearId?: number;
    quarterMasterId?: number;
    quarterMasterName?: string;
    pageNo?: number;
    pageSize?: number;
}

export interface QuarterApiParsedResponse {
    "quarterMasterId": number;
    "quarterMasterName": string;
    "programMasterId": number;
    "ProgramYearId": number;
    "isActive": boolean;
    "createdAt": string;
    "updatedAt": string;
    "publishedAt": string;
}

export interface QuarterMasterApiResponse {
    success: boolean;
    message: string;
    data: QuarterApiParsedResponse[]

}