import { configureStore } from "@reduxjs/toolkit";
import { categoriesApi } from "./api/categoriesApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import TableSlice from "./slices/TableSlice";
import { productsApi } from "./api/productsApi";

const store = configureStore({
  reducer: {
    // Define your reducers here

    table: TableSlice,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(categoriesApi.middleware, productsApi.middleware),
});

export default store;

setupListeners(store.dispatch)