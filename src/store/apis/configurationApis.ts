import { createApi } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../utils/constants";
import { axiosBaseQuery } from "../baseQuery";

import configurationParser from "../parser/configurationParser"

import {
    ParameterType,
    ParameterTypeResponse,
    ManageScoreResponse,
    ManageScoreApiReq
} from "../types/configuration";

export const configurationApis = createApi({
    reducerPath: "configurationApis",
    baseQuery: axiosBaseQuery({ baseUrl: API_BASE_URL }),

    endpoints: (builder) => ({

        parameterType: builder.query<ParameterType[], void>({
            query: (params) => ({
                url: "/parameter-type",
                method: "GET",
                params: params
            }),

            transformResponse: (res: ParameterTypeResponse) => configurationParser.parameterType(res)
        }),

        manageScore: builder.query<any, ManageScoreApiReq | undefined>({
            query: (payload) => {
                return {
                    url: "/manage-score",
                    method: "GET",
                    params: payload
                };
            },
            transformResponse: (res: ManageScoreResponse) => {
               console.log("res ----------->", res)
            }
        })

    }),
});

export const {
    useParameterTypeQuery,
    useManageScoreQuery
} = configurationApis

