import * as Types from "./types";
import axios from "axios";

//create order
export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: Types.CREATE_ORDER_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.post("/api/v1/order/new", order, config);
    dispatch({ type: Types.CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: Types.CREATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//myOrders
export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: Types.MY_ORDER_REQUEST });

    const { data } = await axios.get("/api/v1/orders/me");
    dispatch({ type: Types.MY_ORDER_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: Types.MY_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};
//admin get all orders
export const adminGetAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: Types.ADMIN_ALL_ORDERS_REQUEST });

    const { data } = await axios.get("/api/v1/admin/orders");
    dispatch({ type: Types.ADMIN_ALL_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: Types.ADMIN_ALL_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};
//admin get all orders updated
export const adminUpdatedAllOrders = (id, allData) => async (dispatch) => {
  try {
    dispatch({ type: Types.ADMIN_ALL_ORDERS_UPDATED_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.put(
      `/api/v1/admin/order/${id}`,
      allData,
      config
    );
    dispatch({
      type: Types.ADMIN_ALL_ORDERS_UPDATED_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: Types.ADMIN_ALL_ORDERS_UPDATED_FAIL,
      payload: error.response.data.message,
    });
  }
};
//admin get all orders deleted
export const adminDeletedAllOrders = (id) => async (dispatch) => {
  try {
    dispatch({ type: Types.ADMIN_ALL_ORDERS_DELETED_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/order/${id}`);
    dispatch({
      type: Types.ADMIN_ALL_ORDERS_DELETED_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: Types.ADMIN_ALL_ORDERS_DELETED_FAIL,
      payload: error.response.data.message,
    });
  }
};

//single Order detail
export const singleOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: Types.ORDER_DETAIL_REQUEST });

    const { data } = await axios.get(`/api/v1/order/${id}`);
    dispatch({ type: Types.ORDER_DETAIL_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({
      type: Types.ORDER_DETAIL_FAIL,
      payload: error.response.data.message,
    });
  }
};

//clear Error
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: Types.CLEAR_ERROR });
};
