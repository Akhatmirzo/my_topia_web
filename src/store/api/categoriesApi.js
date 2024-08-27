import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import staticData from "../staticData";

const getToken = () => {
  return localStorage.getItem("token");
};

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: staticData.SERVER_URL + "/api/categories",
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("Authorization", token);
      }
      return headers;
    },
  }),
  tagTypes: ["categoriesApi", "categoriesOneApi"],
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => "/all",
      providesTags: ["categoriesApi"],
    }),

    getCategoryById: builder.query({
      query: ({ categoryId }) => `/one/${categoryId}`,
      providesTags: ["categoriesOneApi"],
    }),

    categoryEdit: builder.mutation({
      query: (payload) => ({
        url: `/update/${payload.categoryId}`,
        method: "PUT",
        body: payload.category,
      }),
      invalidatesTags: ["categoriesApi"],
    }),
    
    categoryDelete: builder.mutation({
      query: ({ categoryId }) => ({
        url: `/delete/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["categoriesApi"],
    }),

    createCategory: builder.mutation({
      query: (category) => ({
        url: "/create",
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["categoriesApi"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetCategoryByIdQuery,
  useCategoryEditMutation,
  useCategoryDeleteMutation,
  useCreateCategoryMutation,
} = categoriesApi;
