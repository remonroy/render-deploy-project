import * as Types from "../action/types";

export const newOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case Types.CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case Types.CREATE_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case Types.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
export const myOrderReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case Types.MY_ORDER_REQUEST:
      return {
        loading: true,
      };
    case Types.MY_ORDER_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case Types.MY_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case Types.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
//get admin all orders
export const adminALLOrderReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case Types.ADMIN_ALL_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.ADMIN_ALL_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case Types.ADMIN_ALL_ORDERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case Types.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
//get admin updated all orders
export const adminOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case Types.ADMIN_ALL_ORDERS_UPDATED_REQUEST:
    case Types.ADMIN_ALL_ORDERS_DELETED_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.ADMIN_ALL_ORDERS_UPDATED_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case Types.ADMIN_ALL_ORDERS_DELETED_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case Types.ADMIN_ALL_ORDERS_UPDATED_FAIL:
    case Types.ADMIN_ALL_ORDERS_DELETED_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case Types.ADMIN_ALL_ORDERS_UPDATED_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case Types.ADMIN_ALL_ORDERS_DELETED_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case Types.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

//singleOrderDetails
export const singleOrderReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case Types.ORDER_DETAIL_REQUEST:
      return {
        loading: true,
      };
    case Types.ORDER_DETAIL_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case Types.ORDER_DETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case Types.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
