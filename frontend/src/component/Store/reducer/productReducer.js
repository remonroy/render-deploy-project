import * as Types from "../action/types";

export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case Types.ALL_PRODUCT_REQUEST:
    case Types.ADMIN_PRODUCT_REQUEST:
      return {
        loading: true,
        products: [],
      };

    case Types.ALL_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productsCount,
        resultPerPage: action.payload.resultPerPage,
      };
    case Types.ADMIN_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };

    case Types.ALL_PRODUCT_FAIL:
    case Types.ADMIN_PRODUCT_FAIL:
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

//product details
export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case Types.PRODUCT_DETAILS_REQUEST: {
      return {
        loading: true,
        ...state,
      };
    }
    case Types.PRODUCT_DETAILS_SUCCESS: {
      return {
        loading: false,
        product: action.payload,
      };
    }
    case Types.PRODUCT_DETAILS_FAIL: {
      return {
        loading: false,
        error: action.payload,
      };
    }
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
//Delete product ---admin
export const adminDeleteProduct = (state = {}, action) => {
  switch (action.type) {
    case Types.ADMIN_PRODUCT_DELETE_REQUEST:
    case Types.ADMIN_PRODUCT_EDIT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case Types.ADMIN_PRODUCT_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };
    case Types.ADMIN_PRODUCT_EDIT_SUCCESS:
      return {
        ...state,
        loading: false,
        isEdit: action.payload,
      };

    case Types.ADMIN_PRODUCT_DELETE_FAIL:
    case Types.ADMIN_PRODUCT_EDIT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case Types.ADMIN_PRODUCT_DELETE_RESET: {
      return {
        ...state,
        success: false,
      };
    }
    case Types.ADMIN_PRODUCT_EDIT_RESET: {
      return {
        ...state,
        isEdit: false,
      };
    }
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

//product Review
export const productReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case Types.NEW_REVIEW_REQUEST: {
      return {
        loading: true,
        ...state,
      };
    }
    case Types.NEW_REVIEW_SUCCESS: {
      return {
        loading: false,
        success: action.payload,
      };
    }
    case Types.NEW_REVIEW_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case Types.NEW_REVIEW_RESET: {
      return {
        ...state,
        success: false,
      };
    }
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
//Create product ---admin
export const adminCreateProduct = (state = { products: {} }, action) => {
  switch (action.type) {
    case Types.ADMIN_NEW_REVIEW_REQUEST: {
      return {
        loading: true,
        ...state,
      };
    }
    case Types.ADMIN_NEW_REVIEW_SUCCESS: {
      return {
        loading: false,
        success: action.payload.success,
        products: action.payload.product,
      };
    }
    case Types.ADMIN_NEW_REVIEW_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case Types.ADMIN_NEW_REVIEW_RESET: {
      return {
        ...state,
        success: false,
      };
    }
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

//admin get all review
export const adminGetAllReviews = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case Types.ADMIN_ALL_USER_REVIEW_REQUEST: {
      return {
        loading: true,
        ...state,
      };
    }
    case Types.ADMIN_ALL_USER_REVIEW_SUCCESS: {
      return {
        ...state,
        loading: false,
        reviews: action.payload,
      };
    }
    case Types.ADMIN_ALL_USER_REVIEW_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

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
//admin delete user reviews
export const adminDeletedAllReviews = (state = {}, action) => {
  switch (action.type) {
    case Types.ADMIN_ALL_REVIEW_DELETED_REQUEST: {
      return {
        loading: true,
        ...state,
      };
    }
    case Types.ADMIN_ALL_REVIEW_DELETED_SUCCESS: {
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    }
    case Types.ADMIN_ALL_REVIEW_DELETED_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case Types.ADMIN_ALL_REVIEW_DELETED_RESET: {
      return {
        ...state,
        isDeleted: false,
      };
    }
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
