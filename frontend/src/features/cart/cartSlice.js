import {
  // createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

const cartFromLocalStorage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

const shippingFromLocalStorage = localStorage.getItem("shipping")
  ? JSON.parse(localStorage.getItem("shipping"))
  : {};

// function getPosition() {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// }

// async function getAddress({ latitude, longitude }) {
//   const res = await fetch(
//     `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
//   );
//   if (!res.ok) throw Error("Failed getting address");

//   const data = await res.json();
//   return data;
// }

// export const fetchAddress = createAsyncThunk(
//   "cart/fetchAddress",
//   async function () {
//     // 1) We get the user's geolocation position
//     const positionObj = await getPosition();
//     const position = {
//       latitude: positionObj.coords.latitude,
//       longitude: positionObj.coords.longitude,
//     };

//     // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
//     const addressObj = await getAddress(position);
//     console.log(addressObj);
//     const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

//     // 3) Then we return an object with the data that we are interested in.
//     // Payload of the FULFILLED state
//     return { position, address };
//   }
// );

const initialState = {
  cart: cartFromLocalStorage,
  // position: "",
  // address: "",
  // error: null,
  // state: "idle",
  shippingAddress: shippingFromLocalStorage,
  paymentMethod: "PayPal",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    deleteItem(state, action) {
      // payload = productId
      state.cart = state.cart.filter((item) => item._id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    updateShippingAddress: {
      prepare(shippingAddress, paymentMethod) {
        return { payload: { shippingAddress, paymentMethod } };
      },
      reducer(state, action) {
        state.shippingAddress = action.payload.shippingAddress;
        state.paymentMethod = action.payload.paymentMethod;
        localStorage.setItem("shipping", JSON.stringify(state.shippingAddress));
      },
    },

    updateItemQuantity: {
      prepare(id, qty) {
        return { payload: { id, qty } };
      },
      reducer(state, action) {
        // payload = id
        const item = state.cart.find((item) => item._id === action.payload.id);

        item.qty = action.payload.qty;
        item.totalPrice = item.qty * item.price;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      },
    },
    increaseItemQuantity(state, action) {
      // payload = id
      const item = state.cart.find((item) => item._id === action.payload);

      item.qty++;
      item.totalPrice = item.qty * item.price;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    decreaseItemQuantity(state, action) {
      // payload = id
      const item = state.cart.find((item) => item._id === action.payload);

      item.qty--;
      item.totalPrice = item.qty * item.price;

      if (item.qty === 0) cartSlice.caseReducers.deleteItem(state, action);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    clearCart(state) {
      state.cart = [];
      localStorage.removeItem("cart");
    },
  },
});

export const {
  updateShippingAddress,
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
  updateItemQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state) => state.cart.cart;
export const getShippingAddress = (state) => state.cart.shippingAddress;
export const getPaymentMethod = (state) => state.cart.paymentMethod;

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.qty, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.qty * item.price, 0);

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item._id === id)?.qty ?? 0;
