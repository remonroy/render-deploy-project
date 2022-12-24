import { Typography } from "@mui/material";
import React, { useRef, Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "../Shipping/CheckoutSteps";
import { useNavigate } from "react-router-dom";
import {
  CardNumberElement,
  CardCvcElement,
  useStripe,
  useElements,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import "./Payment.css";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, clearErrors } from "../Store/action/orderAction";

const Payment = () => {
  const order = JSON.parse(sessionStorage.getItem("orderInfo"));

  const navigate = useNavigate();
  const payBtn = useRef(null);
  const stripe = useStripe();
  const dispatch = useDispatch();
  const elements = useElements();
  const alert = useAlert();

  const { shipping, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(order.totalPrice * 100),
  };

  const dataInfo = {
    shippingInfo: shipping,
    orderItems: cartItems,
    itemsPrice: order.subtotal,
    taxPrice: order.tax,
    shippingPrice: order.shippingCharges,
    totalPrice: order.totalPrice,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/process/payment",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shipping.address,
              city: shipping.city,
              state: shipping.state,
              postal_code: shipping.pinCode,
              country: shipping.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;

        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          dataInfo.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(createOrder(dataInfo));
          navigate("/success");
        } else {
          alert.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.response.data.message);
    }
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [alert, dispatch, error]);

  return (
    <Fragment>
      <MetaData title="payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form onSubmit={(e) => handleSubmit(e)} className="paymentForm">
          <Typography>Payment </Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>
          <input
            type="submit"
            className="paymentFormBtn"
            ref={payBtn}
            value={`pay -$${order && order.totalPrice}`}
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;
