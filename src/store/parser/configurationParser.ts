import { ManageScoreResponse, ParameterType, ParameterTypeResponse } from "../types/configuration"

const configurationParser: any = {}

configurationParser.parameterType = (res: ParameterTypeResponse): ParameterType[] => {
    return res.data.map((pra) => ({
        parameterTypeId: pra.parameterTypeId,
        parameterTypeName: pra.parameterTypeName
    }));
}
configurationParser.manageScore = (res: ManageScoreResponse) => {
    console.log("res--------->", res)
}

export default configurationParser
