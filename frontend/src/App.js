import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./component/layout/Header/Header";
import webFont from "webfontloader";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import MetaData from "./component/layout/MetaData";
import ProductDetails from "./component/product/ProductDetails";
import Products from "./component/product/Products";
import Search from "./component/product/Search";
import LoginSignUp from "./component/User/LoginSignUp";
import { loadUser } from "./component/Store/action/userAction";
import store from "../src/component/Store/index";
import { useSelector } from "react-redux";
import UserOptions from "./component/layout/Header/UserOptions";
import Profile from "./component/User/Profile";
import PrivetRoute from "./component/Route/PrivetRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Payment from "./component/Cart/Payment";
import Shipping from "./component/Shipping/Shipping";
import ConfirmOrder from "./component/Shipping/ConfirmOrder";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentSuccess from "./component/Cart/PaymentSuccess";
import Orders from "./component/Order/Orders";
import Order from "./component/Order/Order";
import Dashboard from "./component/admin/Dashboard";
import ProductList from "./component/admin/ProductList";
import NewProduct from "./component/admin/NewProduct";
import ProductEdit from "./component/admin/ProductEdit";
import OrderList from "./component/admin/OrderList";
import ProcessOrder from "./component/admin/ProcessOrder";
import UserList from "./component/admin/UserList";
import UserUpdated from "./component/admin/UserUpdated";
import UserReview from "./component/admin/UserReview";
import About from "./component/layout/About/About";
import Contact from "./component/layout/Contact/Contact";

function App() {
  <MetaData title="E-commerce" />;

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");
  console.log("api key", stripeApiKey);
  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<LoginSignUp />} />

        <Route
          path="/account"
          element={
            <PrivetRoute>
              <Profile />
            </PrivetRoute>
          }
        />

        <Route
          path="/me/update"
          element={
            <PrivetRoute>
              <UpdateProfile />
            </PrivetRoute>
          }
        />

        <Route
          path="/password/update"
          element={
            <PrivetRoute>
              <UpdatePassword />
            </PrivetRoute>
          }
        />

        <Route path="/password/forget" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/shipping"
          element={
            <PrivetRoute>
              <Shipping />
            </PrivetRoute>
          }
        />
        <Route
          path="/order/confirm"
          element={
            <PrivetRoute>
              <ConfirmOrder />
            </PrivetRoute>
          }
        />

        <Route
          path="/process/payment"
          element={
            <Elements stripe={loadStripe(stripeApiKey)}>
              <PrivetRoute>
                <Payment />
              </PrivetRoute>
            </Elements>
          }
        />
        <Route
          path="/success"
          element={
            <PrivetRoute>
              <PaymentSuccess />
            </PrivetRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivetRoute>
              <Orders />
            </PrivetRoute>
          }
        />
        <Route
          path="/order/:id"
          element={
            <PrivetRoute>
              <Order />
            </PrivetRoute>
          }
        />
        <Route
          path="/admin/dashboard" //admin
          element={
            <PrivetRoute>
              <Dashboard />
            </PrivetRoute>
          }
        />
        <Route
          path="/admin/products" //admin
          element={
            <PrivetRoute>
              <ProductList />
            </PrivetRoute>
          }
        />
        <Route
          path="/admin/product" //admin
          element={
            <PrivetRoute>
              <NewProduct />
            </PrivetRoute>
          }
        />
        <Route
          path="/admin/product/:id" //admin
          element={
            <PrivetRoute>
              <ProductEdit />
            </PrivetRoute>
          }
        />
        <Route
          path="/admin/orders" //admin
          element={
            <PrivetRoute>
              <OrderList />
            </PrivetRoute>
          }
        />
        <Route
          path="/admin/orders/:id" //admin
          element={
            <PrivetRoute>
              <ProcessOrder />
            </PrivetRoute>
          }
        />
        <Route
          path="/admin/users/" //admin
          element={
            <PrivetRoute>
              <UserList />
            </PrivetRoute>
          }
        />
        <Route
          path="/admin/users/:id" //admin
          element={
            <PrivetRoute>
              <UserUpdated />
            </PrivetRoute>
          }
        />
        <Route
          path="/admin/reviews" //admin
          element={
            <PrivetRoute>
              <UserReview />
            </PrivetRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
