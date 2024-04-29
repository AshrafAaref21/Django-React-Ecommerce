import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProducts(state, action) {
      state.products = action.payload;
    },
    deleteProductReducer(state, action) {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },
    addProductReducer(state, action) {
      state.products.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addProducts, deleteProductReducer, addProductReducer } =
  productsSlice.actions;

export default productsSlice.reducer;

export const getProductsRedux = (state) => state.products.products;
