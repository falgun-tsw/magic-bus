
import { createApi } from "@reduxjs/toolkit/query/react";

import { API_BASE_URL } from "../../utils/constants";
import { axiosBaseQuery } from "../baseQuery";

// parser
import centerParser from "../parser/centerParser";

// interfaces
import { 
    RetrieveCentreApiReq, 
    RetrieveCentreApiParsedRes, 
    CreateCentreApiRequest, 
    CreateCentreApiParsedRes, 
    FetchRegionApiParsedRes, 
    FetchedFunderApiParsedRes,
    FetchedProgramTypeApiParsedRes,
    CenterListApiRequest,
    UserListApiReq,
    UserListApiRes,
    ProgramTypeApiResponse,
    RegionApiResponse,
    FunderApiResponse,
    CenterListApiResponse,
    UpdateCenterApiReq,
    UpdateCenterStatusPayload,
    CreateCentreApiResponse,
    ImportCentreApiParsedRes,
    ImportCentreApiResponse,
    ImportCentreApiRequest

} from "../types/center";



export const centerApis = createApi({
    reducerPath: "centerApi",
    baseQuery: axiosBaseQuery({ baseUrl: API_BASE_URL }),
    tagTypes: ["CENTER"],

    endpoints: (builder) => ({

        fetchedCentre: builder.query<RetrieveCentreApiParsedRes, RetrieveCentreApiReq | undefined>({
            query: (params) => {
                return {
                    url: "/center",
                    method: "GET",
                    params: params
                }
            },
            providesTags: ["CENTER"],

            transformResponse: (response: any) =>{
             return centerParser.getCenter(response)
            }
                
        }),

        downloadFetchList: builder.query<RetrieveCentreApiParsedRes, RetrieveCentreApiReq | undefined>({
            query: (params) => {
                return {
                    url: "/center",
                    method: "GET",
                    params: params
                }
            },
            providesTags: ["CENTER"],

            transformResponse: (response: any) =>{
             return centerParser.getCenter(response)
            }
                
        }),

        createCentre: builder.mutation<CreateCentreApiParsedRes, CreateCentreApiRequest>({
            query: (payload) => {
                return ({
                    url: `/center`,
                    method: 'POST',
                    data: payload,
                })
            },

            invalidatesTags: ["CENTER"],

            transformResponse: (response: CreateCentreApiResponse) => {
                return {
                    isCreated: response.success,
                    message: response.message,
                    createCentreDetails: response.data
                }
            }
        }),

        fetchRegion: builder.query<FetchRegionApiParsedRes[], void>({
            query: () => ({
                url: "/master/region",
                method: "GET",
            }),

            transformResponse: (res: RegionApiResponse) => centerParser.getRegion(res)
        }),

        fetchedFunder: builder.query<FetchedFunderApiParsedRes[], void>({
            query: () => ({
                url: "/funder",
                method: "GET",
            }),

            transformResponse: (res: FunderApiResponse) => centerParser.getFunder(res)
        }),

        fetchedProgramTypes: builder.query<FetchedProgramTypeApiParsedRes, void>({

            query: () => ({
                url: "/program-type",
                method: "GET",
            }),

            transformResponse: (response: ProgramTypeApiResponse) => centerParser.getProgramTypes(response)
        }),

        download: builder.query<any, any>({
            query: () => ({
                url: "/center/download",
                method: "GET",
            }),
        }),

        userList: builder.query<{ label: string, id: number }[], UserListApiReq>({
            query: (payload) => {
              return {
                url: "/user/list",
                method: "GET",
                params: payload // This will pass only `roleId` if it is the only parameter
              };
            },
          
            transformResponse: (res: UserListApiRes) => centerParser.getUserList(res)
          }),

        centerList: builder.query<any, CenterListApiRequest>({
            query: ({ centerId, centerName, centerType, pageNo, pageSize }) => {
                return {
                    url: "/center/list",
                    method: "GET",
                    params: { centerId, centerName, centerType, pageNo, pageSize }
                }
            },

            transformResponse: (res: CenterListApiResponse) => centerParser.getCenterList(res)
        }),

        updateCenter: builder.mutation<any, UpdateCenterApiReq>({
            query: ({ centerId, payload }) => {
                return {
                    url: `/center/${centerId}`,
                    method: "PUT",
                    data: payload
                }
            },
            invalidatesTags: ["CENTER"]
        }),

        updateCenterStatus: builder.mutation<UpdateCenterStatusPayload, {centerId: number; payload: any}>({
            query: ({ centerId, payload }) => {
                return {
                    url: `/center/${centerId}`,
                    method: "PATCH",
                    data: payload
                }
            },
            invalidatesTags: ["CENTER"]
        }),

        // importCentre: builder.mutation<ImportCentreApiParsedRes, ImportCentreApiRequest>({
        importCentre: builder.mutation({
            query: (payload) => ({
              url: `/center/import`,
              method: 'POST',
              data: payload,
            }),
            invalidatesTags: ["CENTER"],
            // transformResponse: (response: ImportCentreApiResponse) => {
                transformResponse: (response: any) => {
              return {
                isCreated: response.success,
                message: response.message,
                createCentreDetails: response.data,
              };
            }
          }),
          
    }),
})

export const {
    useFetchedCentreQuery,
    useCreateCentreMutation,
    useFetchRegionQuery,
    useFetchedFunderQuery,
    useFetchedProgramTypesQuery,
    useLazyDownloadQuery,
    useUserListQuery,
    useCenterListQuery,
    useUpdateCenterMutation,
    useUpdateCenterStatusMutation,
    useImportCentreMutation,
    useDownloadFetchListQuery,
} = centerApis;

