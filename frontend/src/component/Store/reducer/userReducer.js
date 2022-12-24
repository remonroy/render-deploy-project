import * as Types from "../action/types";

export const userInfoReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case Types.LOGIN_REQUEST:
    case Types.REGISTER_USER_REQUEST:
    case Types.LOAD_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };

    case Types.LOGIN_SUCCESS:
    case Types.REGISTER_USER_SUCCESS:
    case Types.LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case Types.LOGOUT_SUCCESS:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
      };
    case Types.LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case Types.LOGIN_FAIL:
    case Types.REGISTER_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case Types.LOAD_USER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case Types.CLEAR_ERROR: {
      return {
        ...state,
        error: null,
      };
    }
    default:
      return state;
  }
};

export const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case Types.UPDATE_PROFILE_REQUEST:
    case Types.UPDATE_PASSWORD_REQUEST:
    case Types.ADMIN_ALL_USER_UPDATED_REQUEST:
    case Types.ADMIN_ALL_USER_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case Types.UPDATE_PROFILE_SUCCESS:
    case Types.UPDATE_PASSWORD_SUCCESS:
    case Types.ADMIN_ALL_USER_UPDATED_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case Types.ADMIN_ALL_USER_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
        message: action.payload.message,
      };
    case Types.UPDATE_PROFILE_RESET:
    case Types.UPDATE_PASSWORD_RESET:
    case Types.ADMIN_ALL_USER_UPDATED_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case Types.ADMIN_ALL_USER_DELETE_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case Types.UPDATE_PROFILE_FAIL:
    case Types.UPDATE_PASSWORD_FAIL:
    case Types.ADMIN_ALL_USER_UPDATED_FAIL:
    case Types.ADMIN_ALL_USER_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case Types.CLEAR_ERROR: {
      return {
        ...state,
        error: null,
      };
    }
    default:
      return state;
  }
};

//admin all user request..
export const adminAllUserReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case Types.ADMIN_ALL_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case Types.ADMIN_ALL_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case Types.ADMIN_ALL_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case Types.CLEAR_ERROR: {
      return {
        ...state,
        error: null,
      };
    }
    default:
      return state;
  }
};
export const adminAllUserDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case Types.ADMIN_ALL_USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case Types.ADMIN_ALL_USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case Types.ADMIN_ALL_USER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case Types.CLEAR_ERROR: {
      return {
        ...state,
        error: null,
      };
    }
    default:
      return state;
  }
};
export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case Types.FORGOT_USER_REQUEST:
    case Types.RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case Types.FORGOT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case Types.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };

    case Types.FORGOT_USER_FAIL:
    case Types.RESET_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case Types.CLEAR_ERROR: {
      return {
        ...state,
        error: null,
      };
    }
    default:
      return state;
  }
};
