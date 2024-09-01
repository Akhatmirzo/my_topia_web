import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import staticData from "../staticData";

const statisticsApi = createApi({
  reducerPath: "statisticsApi",
  tagTypes: ["statisticsApi"],
  baseQuery: fetchBaseQuery({
    baseUrl: staticData.SERVER_URL + "/api/statistics",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getStatistics: builder.query({
      query: ({ dateType, date }) => ({
        url: `/?dateType=${dateType}&date=${date}`,
      }),
      providesTags: ["statisticsApi"],
    }),
    updateStatistics: builder.mutation({
      query: ({ dateType, date }) => ({
        url: `/?dateType=${dateType}&date=${date}`,
        method: "GET",
      }),
      invalidatesTags: ["statisticsApi"],
    }),
  }),
});

export const { useGetStatisticsQuery, useUpdateStatisticsMutation } =
  statisticsApi;

export default statisticsApi;
