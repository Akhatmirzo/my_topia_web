import { configureStore } from "@reduxjs/toolkit";
import { categoriesApi } from "./api/categoriesApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import TableSlice from "./slices/TableSlice";
import { WebPageFoodsApi } from "./api/webPageFoodsApi";
import { authApi } from "./api/authApi";
import { employersApi } from "./api/employersApi";
import { tablesApi } from "./api/tablesApi";
import { FoodsApi } from "./api/foodsApi";
import CartSlice from "./slices/CartSlice";
import { OrderApi } from "./api/orderApi";

const store = configureStore({
  reducer: {
    // Define your reducers here

    table: TableSlice,
    cart: CartSlice,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [employersApi.reducerPath]: employersApi.reducer,
    [WebPageFoodsApi.reducerPath]: WebPageFoodsApi.reducer,
    [tablesApi.reducerPath]: tablesApi.reducer,
    [OrderApi.reducerPath]: OrderApi.reducer,
    [FoodsApi.reducerPath]: FoodsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      WebPageFoodsApi.middleware,
      categoriesApi.middleware,
      employersApi.middleware,
      tablesApi.middleware,
      OrderApi.middleware,
      FoodsApi.middleware,
      authApi.middleware,
      // Other middleware you want to use can go here.
    ),
});

export default store;

setupListeners(store.dispatch);
