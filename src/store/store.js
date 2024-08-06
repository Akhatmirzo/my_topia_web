import { configureStore } from "@reduxjs/toolkit";
import { categoriesApi } from "./api/categoriesApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import TableSlice from "./slices/TableSlice";
import { productsApi } from "./api/productsApi";
import { authApi } from "./api/authApi";
import { employersApi } from "./api/employersApi";
import { tablesApi } from "./api/tablesApi";

const store = configureStore({
  reducer: {
    // Define your reducers here

    table: TableSlice,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [employersApi.reducerPath]: employersApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [tablesApi.reducerPath]: tablesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      categoriesApi.middleware,
      employersApi.middleware,
      productsApi.middleware,
      tablesApi.middleware,
      authApi.middleware,
      // Other middleware you want to use can go here.
    ),
});

export default store;

setupListeners(store.dispatch);
