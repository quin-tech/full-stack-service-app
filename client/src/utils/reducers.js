import {
  UPDATE_SERVICES,
  ADD_TO_CART,
  UPDATE_CART_QUANTITY,
  REMOVE_FROM_CART,
  ADD_MULTIPLE_TO_CART,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  CLEAR_CART,
  TOGGLE_CART,
} from './actions';


const INITIAL_STATE = {
  services: [],
  cart: [],
  cartOpen: false,
  categories: [],
  currentCategory: '',
};


export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //   updating the products state with whatever
    //   we are getting from the action
    case UPDATE_SERVICES:
      return {
        ...state,
        services: [...action.services],
      };

    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.service],
      };

    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.services],
      };
    case UPDATE_CART_QUANTITY:
      // sets cartOpen to true to display the cart
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map((service) => {
          if (action._id === service._id) {
            service.purchaseQuantity = action.purchaseQuantity;
          }
          return service;
        }),
      };

    // TODO: Add a comment describing the functionality of the REMOVE_FROM_CART case
    // Your comment here
    case REMOVE_FROM_CART:
      // Creating a brand new array by removing all the items that match whatever action._id is
      let newState = state.cart.filter((service) => {
        return service._id !== action._id;
      });

      return {
        ...state,
        // if there are no more items in the cart, we are setting cartOpen to false
        cartOpen: newState.length > 0,
        // update the cart with the new filtered array
        cart: newState,
      };

    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: [],
      };

    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen,
      };

    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
      };

    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory,
      };
    //   in case we dont have a matching action type
    //   we return the current state by default in order to not lose any previous state at all
    default:
      return state;
  }
};
