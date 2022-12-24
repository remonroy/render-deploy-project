import axios from "axios";
import * as Types from "./types";

export const getProduct =
  (keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: Types.ALL_PRODUCT_REQUEST });

      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
      if (category) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
      }
      const { data } = await axios.get(link);

      dispatch({
        type: Types.ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: Types.ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//getProduct Details
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: Types.PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({
      type: Types.PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: Types.PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};
//admin Delete Product..
export const adminDeleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: Types.ADMIN_PRODUCT_DELETE_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/product/${id}`);

    dispatch({
      type: Types.ADMIN_PRODUCT_DELETE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: Types.ADMIN_PRODUCT_DELETE_FAIL,
      payload: error.response.data.message,
    });
  }
};
//admin Edit product..
export const adminEditProduct = (id, allData) => async (dispatch) => {
  try {
    dispatch({ type: Types.ADMIN_PRODUCT_EDIT_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.put(
      `/api/v1/admin/product/${id}`,
      allData,
      config
    );

    dispatch({
      type: Types.ADMIN_PRODUCT_EDIT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: Types.ADMIN_PRODUCT_EDIT_FAIL,
      payload: error.response.data.message,
    });
  }
};
//get admin all products
export const getAllProductAdmin = () => async (dispatch) => {
  try {
    dispatch({ type: Types.ADMIN_PRODUCT_REQUEST });

    const { data } = await axios.get(`/api/v1/admin/products`);

    dispatch({
      type: Types.ADMIN_PRODUCT_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: Types.ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};
//Product Review
export const productReview = (allInfo) => async (dispatch) => {
  try {
    dispatch({ type: Types.NEW_REVIEW_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.put(`/api/v1/review`, allInfo, config);

    dispatch({
      type: Types.NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: Types.NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};
//admin create product..
export const adminCreateProduct = (allData) => async (dispatch) => {
  try {
    dispatch({ type: Types.ADMIN_NEW_REVIEW_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.post(
      `/api/v1/admin/products/new`,
      allData,
      config
    );

    dispatch({
      type: Types.ADMIN_NEW_REVIEW_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: Types.ADMIN_NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};
//admin get all reviews..
export const adminGetAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: Types.ADMIN_ALL_USER_REVIEW_REQUEST });

    const { data } = await axios.get(`/api/v1/reviews?id=${id}`);

    dispatch({
      type: Types.ADMIN_ALL_USER_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: Types.ADMIN_ALL_USER_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};
//admin deleted all reviews..s
export const adminDeletedAllReviews =
  (reviewId, productId) => async (dispatch) => {
    try {
      dispatch({ type: Types.ADMIN_ALL_REVIEW_DELETED_REQUEST });

      const { data } = await axios.delete(
        `/api/v1/reviews?id=${reviewId}&productId=${productId}`
      );

      dispatch({
        type: Types.ADMIN_ALL_REVIEW_DELETED_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: Types.ADMIN_ALL_REVIEW_DELETED_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//clear Error
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: Types.CLEAR_ERROR });
};
