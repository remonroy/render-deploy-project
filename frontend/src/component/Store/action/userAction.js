import * as Types from "./types";
import axios from "axios";

//login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: Types.LOGIN_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      "/api/v1/login",
      { email, password },
      config
    );
    dispatch({
      type: Types.LOGIN_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: Types.LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

//register
export const register = (formData) => async (dispatch) => {
  try {
    dispatch({ type: Types.REGISTER_USER_REQUEST });
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post("/api/v1/register", formData, config);
    dispatch({
      type: Types.REGISTER_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: Types.REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: Types.LOAD_USER_REQUEST });

    const { data } = await axios.get("/api/v1/me");
    dispatch({
      type: Types.LOAD_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: Types.LOAD_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// logout user
export const logoutUser = () => async (dispatch) => {
  try {
    await axios.get("/api/v1/logout");
    dispatch({ type: Types.LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({
      type: Types.LOGOUT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//updateProfile
export const updateProfile = (formData) => async (dispatch) => {
  try {
    dispatch({ type: Types.UPDATE_PROFILE_REQUEST });
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.put("/api/v1/me/update", formData, config);

    dispatch({
      type: Types.UPDATE_PROFILE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: Types.UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};
//updatePassword
export const updatePassword = (password) => async (dispatch) => {
  try {
    dispatch({ type: Types.UPDATE_PASSWORD_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      "/api/v1/password/update",
      password,
      config
    );

    dispatch({
      type: Types.UPDATE_PASSWORD_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: Types.UPDATE_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

//forgotPassword
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: Types.FORGOT_USER_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post("/api/v1/password/forgot", email, config);
    dispatch({
      type: Types.FORGOT_USER_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: Types.FORGOT_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//resetPassword
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: Types.RESET_PASSWORD_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      `/api/v1/password/reset/${token}`,
      passwords,
      config
    );
    dispatch({
      type: Types.RESET_PASSWORD_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: Types.RESET_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// admin get all user ...
export const adminGetAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: Types.ADMIN_ALL_USER_REQUEST });
    const { data } = await axios.get("/api/v1/admin/users");
    dispatch({ type: Types.ADMIN_ALL_USER_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({
      type: Types.ADMIN_ALL_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// admin get all user details ...
export const adminGetAllUsersDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: Types.ADMIN_ALL_USER_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/admin/user/${id}`);
    dispatch({
      type: Types.ADMIN_ALL_USER_DETAILS_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: Types.ADMIN_ALL_USER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};
// admin get all updated user ...
export const adminGetAllUsersUpdated = (id, allData) => async (dispatch) => {
  try {
    dispatch({ type: Types.ADMIN_ALL_USER_UPDATED_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.put(
      `/api/v1/admin/user/${id}`,
      allData,
      config
    );
    dispatch({
      type: Types.ADMIN_ALL_USER_UPDATED_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: Types.ADMIN_ALL_USER_UPDATED_FAIL,
      payload: error.response.data.message,
    });
  }
};
// admin delete all  user ...
export const adminGetAllUsersDeleted = (id) => async (dispatch) => {
  try {
    dispatch({ type: Types.ADMIN_ALL_USER_DELETE_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/user/${id}`);
    dispatch({ type: Types.ADMIN_ALL_USER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: Types.ADMIN_ALL_USER_DELETE_FAIL,
      payload: error.response.data.message,
    });
  }
};
//clear Error
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: Types.CLEAR_ERROR });
};
