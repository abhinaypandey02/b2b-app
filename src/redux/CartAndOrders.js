import { createSlice } from "@reduxjs/toolkit";

const CartAndOrdersReducer = createSlice({
  name: "CartAndOrders",
  initialState: { cart: [], orders: [], message: "" },
  reducers: {
    message: (state, action) => {
      state.message = action.payload;
    },
    clearMessage: (state, action) => {
      state.message = "";
    },
    addToCart: (state, action) => {
      state.cart.push(action.payload.data);
      state.message = action.payload.message;
    },
    removeFromCart: (state, action) => {
      state.cart.splice(action.payload.index, 1);
      state.message = action.payload.message;
    },
    addOrders: (state, action) => {
      state.orders.push(action.payload);
    },
    clearCart: (state, action) => {
      state.cart = [];
    },
  },
});

export const actions = { ...CartAndOrdersReducer.actions };

export const reducer = CartAndOrdersReducer.reducer;
