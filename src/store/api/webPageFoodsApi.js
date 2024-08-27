import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import staticData from "../staticData";

export const WebPageFoodsApi = createApi({
  reducerPath: "WebPageFoodsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: staticData.SERVER_URL + "/api/webpage",
  }),
  tagTypes: ["WebPageFoodsApi", "WebPageFoodApi"],
  endpoints: (builder) => ({
    getWebPageFoods: builder.query({
      query: ({ category_id }) =>
        `/products/all?category=${category_id}`,
      transformResponse: (response) => {
        console.log(response);
        return response.products;
      },
      providesTags: ["WebPageFoodsApi"],
    }),

    getWebPageFood: builder.query({
      query: ({ foodId }) => `/product/${foodId}`,
      providesTags: ["WebPageFoodApi"],
      transformResponse: (response) => {
        console.log(response);
        return response.product;
      },
    }),
  }),
});

export const { useGetWebPageFoodsQuery, useGetWebPageFoodQuery } = WebPageFoodsApi;
