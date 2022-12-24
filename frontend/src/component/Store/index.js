import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducer/rootReducer";

const middleWare = applyMiddleware(thunk);
let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shipping: localStorage.getItem("shipping")
      ? JSON.parse(localStorage.getItem("shipping"))
      : {},
  },
};
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(middleWare)
);

export default store;
