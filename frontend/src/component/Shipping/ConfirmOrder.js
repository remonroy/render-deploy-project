import { Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import "./ConfirmOrder.css";
import { Link, useNavigate } from "react-router-dom";
const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { shipping, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingCharges = subtotal > 1000 ? 0 : 200;
  const tax = subtotal * 0.18;
  const totalPrice = subtotal + tax + shippingCharges;
  const address = `${shipping.address},${shipping.city},${shipping.state},${shipping.pinCode},${shipping.country}`;
  const handleProceedPayment = () => {
    const data = {
      subtotal,
      tax,
      shippingCharges,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
  };
  return (
    <Fragment>
      <MetaData title="Confirm order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmShippingOrder">
            <Typography>Shipping info</Typography>
            <div className="confirmShippingBox">
              <div>
                <p>Name : </p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone : </p>
                <span>{shipping.phoneNo}</span>
              </div>
              <div>
                <p>Address : </p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmItems">
            <Typography>Your carts items</Typography>
            <div className="confirmCartsItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="" />
                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                    <span>
                      {item.quantity} x ${item.price} =
                      <b> ${item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/* ** */}
        <div>
          <div className="orderSummery">
            <Typography>Your carts items</Typography>
            <div>
              <div>
                <p>Subtotal</p>
                <span>{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges</p>
                <span>${shippingCharges}</span>
              </div>
              <div>
                <p>GST</p>
                <span>${tax}</span>
              </div>
            </div>
            <div className="orderSummeryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>${totalPrice}</span>
            </div>
            <button onClick={handleProceedPayment}>Proceed to payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
