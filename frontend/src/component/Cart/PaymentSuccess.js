import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import "./PaymentSuccess.css";

const PaymentSuccess = () => {
  return (
    <div className="orderSuccess">
      <CheckCircleIcon />
      <Typography>Your order has been placed successfully</Typography>
      <Link to="/orders">View Orders</Link>
    </div>
  );
};

export default PaymentSuccess;
