import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import staticData from "../staticData";
import { toast } from "react-toastify";

export const OrderApi = createApi({
  reducerPath: "orders",
  tagTypes: ["orders", "order"],
  baseQuery: fetchBaseQuery({
    baseUrl: staticData.SERVER_URL + "/api/orders",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `${token}`);
      }
    },
  }),
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: "/create",
        method: "POST",
        body: order,
      }),
      transformResponse: (response) => {
        toast.success(response.message);
        return response.order;
      },
      transformErrorResponse: (response) => {
        toast.error(response.data.message);
        return [];
      },
      invalidatesTags: ["orders"],
    }),
    getAllOrders: builder.query({
      query: ({ page }) => ({
        url: `/all?page=${page}`,
      }),
      transformResponse: (response) => {
        toast.success(response.message);
        return response;
      },
      transformErrorResponse: (response) => {
        toast.error(response.data.message);
        return [];
      },
      providesTags: ["orders"],
    }),
    getOrderById: builder.query({
      query: (id) => ({
        url: `/${id}`,
      }),
      transformResponse: (response) => {
        toast.success(response.message);
        return response;
      },
      transformErrorResponse: (response) => {
        toast.error(response.data.message);
        return [];
      },
      providesTags: ["orders"],
    }),
    deleteOrder: builder.mutation({
      query: ({ id }) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["orders", "order"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useDeleteOrderMutation,
} = OrderApi;
