import {
  CART_ADD_ITEM,
  CART_CLEAR_ITEMS,
  CART_REMOVE_ITEM,
} from '../constants/cartConstants';

const cartState = {
  cartItems: [],
};

// checks if cartItems is available in localStorage or not
// If available add the previous localStoarge data in cartIems: [...localStorage data]
if (typeof window !== 'undefined') {
  if (localStorage.getItem('cartItems')) {
    cartState.cartItems = JSON.parse(localStorage.getItem('cartItems'));
  } else {
    cartState.cartItems = [];
  }
}

export const cartReducer = (state = cartState, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };

    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};
