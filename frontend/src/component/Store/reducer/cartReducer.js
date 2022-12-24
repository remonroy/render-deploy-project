import * as Types from "../action/types";

export const cartReducer = (
  state = { cartItems: [], shipping: {} },
  action
) => {
  switch (action.type) {
    case Types.ADD_TO_CART:
      const item = action.payload;
      const isExits = state.cartItems.find((i) => i.product === item.product);

      if (isExits) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === isExits.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
          //   cartItems: item,
        };
      }
    case Types.REMOVE_TO_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product !== action.payload
        ),
      };
    case Types.SAVE_SHIPPING_INFO:
      return {
        ...state,
        shipping: action.payload,
      };
    default:
      return state;
  }
};
