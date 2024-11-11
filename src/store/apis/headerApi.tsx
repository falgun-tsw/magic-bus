import { createApi } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../utils/constants";
import { axiosBaseQuery } from "../baseQuery";

import headerParser from "../parser/headerParser";

// Types
import {
  ProgramMasterApiRequest,
  ProgramMasterApiResponse,
  ProgramMasterApiParsedRes,
  
  QuarterMasterApiRequest,
  QuarterMasterApiResponse,
  QuarterApiParsedResponse,
} from "../types/header";






export const headerApi = createApi({
  reducerPath: "headerApi",
  baseQuery: axiosBaseQuery({ baseUrl: API_BASE_URL }),

  endpoints: (builder) => ({
    programWithYears: builder.query<ProgramMasterApiParsedRes, ProgramMasterApiRequest>(
      {
        query: ({ pageNo }) => ({
          url: "/program-master",
          method: "GET",
          params: { pageNo },
        }),

        transformResponse: (res: ProgramMasterApiResponse) => headerParser.programWithYears(res),
      }
    ),

    quarter: builder.query<QuarterApiParsedResponse[], QuarterMasterApiRequest>(
      {
        query: (payload): any => ({
          url: "/quarter-master",
          method: "GET",
          params: payload,
        }),

        transformResponse: (res: QuarterMasterApiResponse) => headerParser.quarter(res)
      }
    ),
  }),
});

export const { useProgramWithYearsQuery, useQuarterQuery } = headerApi;
