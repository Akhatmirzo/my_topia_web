import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import staticData from "../staticData";
import { toast } from "react-toastify";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: staticData.SERVER_URL + "/api",
  }),
  tagTypes: ["authApi"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ role, auth }) => ({
        url: `/${role}/login`,
        method: "POST",
        body: auth,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response, meta, arg) => {
        toast.success(response.message || "Login successful");

        if (response.role) {
          localStorage.setItem("role", response.role);
          localStorage.setItem("token", response.token);

          window.location.href = "/" + response.role;
        }

        return response.data;
      },
      transformErrorResponse: (response, meta, arg) => {
        toast.error(response.data.message || "Error");
        throw new Error(response.data.message);
      },
      invalidatesTags: ["authApi"],
    }),
  }),
});

export const { useLoginMutation } = authApi;
