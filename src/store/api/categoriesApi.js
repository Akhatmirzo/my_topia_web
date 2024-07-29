import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import staticData from "../staticData";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: staticData.SERVER_URL + "/api/categories",
  }),
  tagTypes: ["categoriesApi", "categoriesOneApi"],
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => "/all",
      providesTags: ["categoriesApi"],
    }),
    getCategoryById: builder.query({
      query: (categoryId) => `/one/${categoryId}`,
      providesTags: ["categoriesOneApi"],
    }),
  }),
});

export const { useGetAllCategoriesQuery, useGetCategoryByIdQuery } = categoriesApi;
