import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import staticData from "../staticData";

export const getUpdateData = createAsyncThunk(
  "clientOrder/updateData",
  async (ids) => {
    const API_URL = staticData.SERVER_URL + "/api/orders/check/orders";
    try {
      console.log(ids);

      const response = await axios.post(API_URL, {
        ids,
      });

      return response.data;
    } catch (error) {
      throw new Error("Error fetching orders: " + error.message);
    }
  }
);

const OrderSlice = createSlice({
  name: "clientOrder",
  initialState: {
    orders: JSON.parse(localStorage.getItem("clientOrder")) || [],
    isLoading: false,
    error: null,
  },
  reducers: {
    addOrder(state, action) {
      state.orders.push(action.payload);
      localStorage.setItem("clientOrder", JSON.stringify(state.orders));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUpdateData.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getUpdateData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orders = action.payload.orders;
      localStorage.setItem("clientOrder", JSON.stringify(state.orders));
    });
    builder.addCase(getUpdateData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { addOrder } = OrderSlice.actions;
export default OrderSlice.reducer;
