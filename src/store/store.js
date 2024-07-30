import { configureStore } from "@reduxjs/toolkit";
import { categoriesApi } from "./api/categoriesApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import TableSlice from "./slices/TableSlice";
import { productsApi } from "./api/productsApi";
import { authApi } from "./api/authApi";

const store = configureStore({
  reducer: {
    // Define your reducers here

    table: TableSlice,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      categoriesApi.middleware,
      productsApi.middleware,
      authApi.middleware
    ),
});

export default store;

setupListeners(store.dispatch);
