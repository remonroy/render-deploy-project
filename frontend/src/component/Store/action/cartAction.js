import * as Types from "./types";
import axios from "axios";

//add to cart
export const addToCarts = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/product/${id}`);
  dispatch({
    type: Types.ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.stock,
      quantity,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

//save shipping info.
export const shippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: Types.SAVE_SHIPPING_INFO,
    payload: data,
  });
  localStorage.setItem("shipping", JSON.stringify(data));
};
//remove cart item
export const removeToCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: Types.REMOVE_TO_CART,
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
