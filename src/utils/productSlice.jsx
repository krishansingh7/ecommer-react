import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "Products",
  initialState: {
    products: [],
    userInfo: null,
  },
  reducers: {
    addProducts: (state, action) => {
      const item = state.products.find((p) => p.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },
    removeProduct: (state, action) => {
      state.products.splice(action.payload, 1);
    },
    clearCart: (state) => {
      state.products.length = 0;
    },
    incQuantity: (state, action) => {
      const item = state.products.find((p) => p.id === action.payload.id);
      if (item) {
        item.quantity++;
      }
    },
    decQuantity: (state, action) => {
      const item = state.products.find((p) => p.id === action.payload.id);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    // =============== User Start here ==============
    addUser: (state, action) => {
      state.userInfo = action.payload;
    },
    removeUser: (state) => {
      state.userInfo = null;
    },
  },
});

export const {
  addProducts,
  removeProduct,
  clearCart,
  incQuantity,
  decQuantity,
  addUser,
  removeUser,
} = productSlice.actions;
export default productSlice.reducer;
