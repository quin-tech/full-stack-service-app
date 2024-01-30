import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  services: [],
  cart: [],
  cartOpen: false,
  categories: [],
  currentCategory: "",
};

const stateSlice = createSlice({
  name: "globalState",
  initialState: INITIAL_STATE,
  // this will create all of our "action creators"
  // and make our reducer that this "slice" will use
  // to automatically listen for the actionTypes that we will be dispatching
  reducers: {
    updateServices: (state, action) => {
      // console.log(action.payload);
      state.services = [...action.payload];
    },
    addToCart: (state, action) => {
      state.cartOpen = true;
      state.cart.push(action.payload);
    },
    addMultipleToCart: (state, action) => {
      state.cart.push(...action.payload);
    },
    updateCartQuantity: (state, action) => {
      state.cartOpen = true;
      state.cart = state.cart.map((service) => {
        if (action.payload._id === service._id) {
          service.purchaseQuantity = action.payload.purchaseQuantity;
        }
        return service;
      });
    },
    removeFromCart: (state, action) => {
      const newState = state.cart.filter((service) => {
        return service._id !== action.payload;
      });
      state.cartOpen = newState.length > 0;
      state.cart = newState;
    },
    clearCart: (state, action) => {
      state.cartOpen = false;
      state.cart = [];
    },
    toggleCart: (state) => {
      state.cartOpen = !state.cartOpen;
    },
    updateCategories: (state, action) => {
      state.categories = [...action.payload];
    },
    updateCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
  },
});

export const stateActions = stateSlice.actions;
export const stateReducer = stateSlice.reducer;
