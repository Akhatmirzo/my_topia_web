import { createSlice } from "@reduxjs/toolkit";
import { checkTotalPriceFn } from "../../utils/helpers";

function calculateTotalPrice(items) {
  return items.reduce((total, item) => {
    return total + item.totalPrice;
  }, 0);
}

const cartSlice = createSlice({
  name: "cart",
  initialState: JSON.parse(localStorage.getItem("cart")) || {
    products: [],
    total: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      state.products.push(action.payload);
      state.total = calculateTotalPrice(state.products);
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      const itemToRemove = state.products.find(
        (item) => item.itemId === action.payload
      );
      if (itemToRemove) {
        state.products = state.products.filter(
          (item) => item.itemId !== action.payload
        );
        state.total = calculateTotalPrice(state.products);
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    incrementQuantity: (state, action) => {
      const itemToUpdate = state.products.map((item) => {
        if (item.itemId === action.payload) {
          const quantity = Number(item.quantity) + 1;
          const totalPrice = checkTotalPriceFn(
            item.price,
            quantity,
            item.additions,
            item.options
          );
          return { ...item, quantity, totalPrice };
        } else {
          return item;
        }
      });

      state.products = itemToUpdate;
      state.total = calculateTotalPrice(state.products);
      localStorage.setItem("cart", JSON.stringify(state));
    },
    decrementQuantity: (state, action) => {
      const itemToUpdate = state.products.map((item) => {
        if (item.itemId === action.payload && item.quantity > 1) {
          const quantity = Number(item.quantity) - 1;
          const totalPrice = checkTotalPriceFn(
            item.price,
            quantity,
            item.additions,
            item.options
          );
          return { ...item, quantity, totalPrice };
        } else {
          return item;
        }
      });
      state.products = itemToUpdate;
      state.total = calculateTotalPrice(state.products);
      localStorage.setItem("cart", JSON.stringify(state));
    },
    updateAddition: (state, action) => {
      const itemToUpdate = state.products.map((item) => {
        if (item.itemId === action.payload.itemId) {
          const addition = action.payload.addition;
          const totalPrice = checkTotalPriceFn(
            item.price,
            item.quantity,
            addition,
            item.options
          );
          return { ...item, additions: addition, totalPrice };
        } else {
          return item;
        }
      });
      state.products = itemToUpdate;
      state.total = calculateTotalPrice(state.products);
      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCart: (state) => {
      state.products = [];
      state.total = 0;
      localStorage.setItem(
        "cart",
        JSON.stringify({
          products: [],
          total: 0,
        })
      );
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  updateAddition,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
