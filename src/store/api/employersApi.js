import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import staticData from "../staticData";

const getToken = () => {
  return localStorage.getItem("token");
};

export const employersApi = createApi({
  reducerPath: "employersApi",
  tagTypes: ["employersApi", "employersOneApi"],
  baseQuery: fetchBaseQuery({
    baseUrl: staticData.SERVER_URL + "/api/employer",
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("Authorization", token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getEmployers: builder.query({
      query: () => "/all",
      transformErrorResponse: (response) => {
        return response;
      },
      providesTags: ["employersApi"],
    }),

    getEmployer: builder.query({
      query: (id) => `/one/${id}`,
      providesTags: ["employersOneApi"],
    }),

    createEmployer: builder.mutation({
      query: (employer) => ({
        url: "/register",
        method: "POST",
        body: employer,
      }),
      invalidatesTags: ["employersApi"],
    }),

    updateEmployer: builder.mutation({
      query: (payload) => ({
        url: `/update/${payload.id}`,
        method: "PUT",
        body: payload.employer,
      }),
      invalidatesTags: ["employersApi"],
    }),
    
    deleteEmployer: builder.mutation({
      query: ({ id }) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["employersApi"],
    }),
  }),
});

export const {
  useGetEmployersQuery,
  useCreateEmployerMutation,
  useDeleteEmployerMutation,
  useGetEmployerQuery,
  useUpdateEmployerMutation,
} = employersApi;
