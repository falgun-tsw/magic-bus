import { ProgramMasterApiDataInter, ProgramMasterApiParsedRes, ProgramMasterApiResponse, QuarterApiParsedResponse, QuarterMasterApiResponse } from "../types/header"

const headerParser: any = {}

headerParser.programWithYears = (res: ProgramMasterApiResponse): ProgramMasterApiParsedRes => {
    let data: ProgramMasterApiDataInter[] = [];
    if (Array.isArray(res.data) && res.data.length > 0) {
        data = res.data
    }
    const programs = data.map((program) => ({
        label: program.programMasterName,
        value: program.programMasterId,
    }));

    const years = data.flatMap((program) => {
        return program.ProgramYear.map((y) => ({
            label: y.year,
            value: y.ProgramYearId,
        }));
    });

    return { programs, years };
}

headerParser.quarter = (res: QuarterMasterApiResponse): QuarterApiParsedResponse[] => {
    if (Array.isArray(res.data) && res.data.length > 0) {
        return res.data;
    }
    return [];
}


export default headerParser;