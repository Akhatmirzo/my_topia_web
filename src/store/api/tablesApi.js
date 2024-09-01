import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import staticData from "../staticData";

export const tablesApi = createApi({
  reducerPath: "tablesApi",
  tagTypes: ["tablesApi", "tablesOneApi"],
  baseQuery: fetchBaseQuery({
    baseUrl: staticData.SERVER_URL + "/api/table",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getTables: builder.query({
      query: () => "/all",
      providesTags: ["tablesApi"],
    }),

    getTable: builder.query({
      query: (id) => `/one/${id}`,
      providesTags: ["tablesOneApi"],
    }),

    changeTableOrder: builder.mutation({
      query: ({ tableId, status }) => ({
        url: `/update/order/${tableId}`,
        method: "PUT",
        body: { status },
      }),
    }),

    createTable: builder.mutation({
      query: (table) => ({
        url: "/create",
        method: "POST",
        body: table,
      }),
      invalidatesTags: ["tablesApi"],
    }),

    deleteTable: builder.mutation({
      query: ({ id }) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["tablesApi"],
    }),
  }),
});

export const {
  useCreateTableMutation,
  useDeleteTableMutation,
  useGetTableQuery,
  useGetTablesQuery,
  useChangeTableOrderMutation,
} = tablesApi;
