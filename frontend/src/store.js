import { configureStore } from "@reduxjs/toolkit";
// import productsReducer from "./features/Products/productsSlice";
import cartSlice from "./features/cart/cartSlice";
import userSlice from "./features/user/userSlice";
import productsSlice from "./features/Products/productsSlice";

export const store = configureStore({
  reducer: {
    // products: productsReducer,
    cart: cartSlice,
    user: userSlice,
    products: productsSlice,
  },
});
