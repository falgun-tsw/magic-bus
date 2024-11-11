import { createApi } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../utils/constants";
import { axiosBaseQuery } from "../baseQuery";

import userParser from "../parser/userParser";

import {
  FetchUserRequest,
  FetchUsersResponse,
  ParsedFetchUserResponse,
  CreateUserRequest,
  CreateUserResponse,
  EditUserRequest,
  EditUserResponse,
  FetchRolesResponse,
  ParsedRoleResponse,

  ParsedProgramResponse,
  FetchProgramResponse,
  updateUserStatusPayload,

  ResetPasswordRequest,
  ResetPasswordResponse,
} from "../types/user";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: axiosBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ["USER"],

  endpoints: (builder) => ({
    sendOtp: builder.mutation<void, { email: string }>({
      query: (data) => ({
        url: "/user/send-otp",
        method: "POST",
        data,
      }),
    }),

    verifyOtp: builder.mutation<void, { email: string; otp: string }>({
      query: (data) => ({
        url: "/user/verify-otp",
        method: "POST",
        data,
      }),
    }),

    fetchedUsers: builder.query<ParsedFetchUserResponse, FetchUserRequest>({
      query: (params) => ({
        url: `/user`,
        method: "GET",
        params: params,
      }),
      providesTags: ["USER"],

      transformResponse: (res: FetchUsersResponse) => {
        return (userParser.fetchedUsers(res))
      }
    }),

    userRoles: builder.query<ParsedRoleResponse[], void>({
      query: () => ({
        url: `/role`,
        method: "GET",
      }),

      transformResponse: (response: FetchRolesResponse) =>
        userParser.userRoles(response),
    }),

    //program type
    userProgram: builder.query<ParsedProgramResponse[], void>({
      query: () => ({
        url: `/program-master/list`,
        method: "GET",
      }),

      transformResponse: (response: FetchProgramResponse) => {
        return userParser.userProgram(response)
      }

    }),

    createUser: builder.mutation({
      query: (payload:any) => {
        return {
          url: `/user`,
          method: "POST",
          data: payload,
        };
      },
      invalidatesTags: ["USER"],
    }),

    editUser: builder.mutation({
      query: (payload:any) => {
        const { userId, ...params } = payload;
        return {
          url: `/user/${userId}`,
          method: "PUT",
          data: params,
        };
      }
    }),

    userLogin: builder.mutation<any, { email: string; password: string }>({
      query: (payload) => ({
        url: "/user/login",
        method: "POST",
        body: payload,
      }),
    }),

    updateUserStatus: builder.mutation<updateUserStatusPayload, { id: number; payload: any }>({
      query: ({ id, payload }) => ({
        url: `/user/${id}`,
        method: 'PATCH',
        data: payload,
      }),
      invalidatesTags: ["USER"],
    }),


    resetPasswordAction: builder.mutation<
      ResetPasswordResponse,
      ResetPasswordRequest
    >({
      query: ({ password, confirmPassword, resetToken }) => ({
        url: `/user/reset-password/${resetToken}`,
        method: "PUT",
        data: { confirmPassword, password },
      }),
    }),
  }),
});

export const {
  useSendOtpMutation, // sendOtp
  useVerifyOtpMutation, // verifyOtp
  useFetchedUsersQuery,  //fetchedUsers
  useCreateUserMutation, //userRoles
  useEditUserMutation, //createUser
  useUserRolesQuery, //editUser
  useUserProgramQuery, //list
  useUserLoginMutation, //userLogin
  useUpdateUserStatusMutation, //updateUserStatus //userLogin
  useResetPasswordActionMutation,

} = userApi;
