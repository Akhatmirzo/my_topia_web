import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import staticData from "../staticData";

export const FoodsApi = createApi({
  reducerPath: "foodsApi",
  tagTypes: ["foodsApi", "foodApi"],
  baseQuery: fetchBaseQuery({
    baseUrl: staticData.SERVER_URL + "/api/products",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `${token}`);
      }
    },
  }),
  endpoints: (builder) => ({
    getFoods: builder.query({
      query: ({ category_id }) => ({
        url: `/all?category_id=${category_id ? category_id : ""}`,
      }),
      providesTags: ["foodsApi"],
    }),

    getFood: builder.query({
      query: (id) => `/one/${id}`,
      providesTags: ["foodApi"],
    }),

    createFood: builder.mutation({
      query: (food) => ({
        url: "/create",
        method: "POST",
        body: food,
      }),
      invalidatesTags: ["foodsApi"],
    }),

    updateFood: builder.mutation({
      query: ({ id, food }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body: food,
      }),
      invalidatesTags: ["foodsApi"],
    }),

    deleteFood: builder.mutation({
      query: ({ id }) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["foodsApi", "foodsApi"],
    }),

    deleteSwapFood: builder.mutation({
      query: ({ id }) => ({
        url: `/deleted/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["foodsApi", "foodsApi"],
    }),
  }),
});

export const {
  useGetFoodsQuery,
  useGetFoodQuery,
  useCreateFoodMutation,
  useUpdateFoodMutation,
  useDeleteFoodMutation,
} = FoodsApi;
