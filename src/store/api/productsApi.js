import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import staticData from "../staticData";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: staticData.SERVER_URL + "/api/webpage",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ page, pageSize, category_id }) =>
        `/products/pagination?page=${page}&pageSize=${pageSize}&category=${category_id}`,
    }),

    getProduct: builder.query({
      query: ({ productId }) => `/product/${productId}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = productsApi;
