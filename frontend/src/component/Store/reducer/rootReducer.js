import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";
import {
  newOrderReducer,
  myOrderReducer,
  singleOrderReducer,
  adminALLOrderReducer,
  adminOrderReducer,
} from "./newOrderReducer";
import {
  adminCreateProduct,
  productDetailsReducer,
  productReducer,
  productReviewReducer,
  adminDeleteProduct,
  adminGetAllReviews,
  adminDeletedAllReviews,
} from "./productReducer";
import {
  userInfoReducer,
  profileReducer,
  forgotPasswordReducer,
  adminAllUserReducer,
  adminAllUserDetailsReducer,
} from "./userReducer";

const reducer = combineReducers({
  products: productReducer,
  productDetail: productDetailsReducer,
  user: userInfoReducer,
  profile: profileReducer,
  forgotPasswordReducer: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrder: myOrderReducer,
  singleOrder: singleOrderReducer,
  review: productReviewReducer,
  newProduct: adminCreateProduct,
  isDeleted: adminDeleteProduct,
  allOrders: adminALLOrderReducer,
  order: adminOrderReducer,
  adminAllUser: adminAllUserReducer,
  adminDetailsUser: adminAllUserDetailsReducer,
  allReviews: adminGetAllReviews,
  reviews: adminDeletedAllReviews,
});

export default reducer;
