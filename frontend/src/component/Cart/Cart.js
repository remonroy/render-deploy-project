import React, { Fragment } from "react";
import "./Cart.css";
import CartItem from "./CartItem";
import { useSelector, useDispatch } from "react-redux";
import { addToCarts, removeToCart } from "../Store/action/cartAction";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";
import MetaData from "../layout/MetaData";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const increment = (id, quantity, stock) => {
    const qty = quantity + 1;
    if (stock <= quantity) return;
    dispatch(addToCarts(id, qty));
  };
  const decrement = (id, quantity) => {
    const qty = quantity - 1;
    if (1 >= quantity) return;
    dispatch(addToCarts(id, qty));
  };

  const colorR = {
    backgroundColor: "tomato",
  };
  const colorRr = {
    backgroundColor: "black",
  };
  const removeCart = (id) => {
    dispatch(removeToCart(id));
  };
  const checkOutHandler = () => {
    navigate("/shipping");
    // Navigate("/shipping");
  };
  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="removeCartItem">
          <RemoveShoppingCartIcon />
          <Typography> No product in your cart </Typography>
          <Link to="/products">View products</Link>
        </div>
      ) : (
        <Fragment>
          <MetaData title="cart product" />
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>
            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer">
                  <CartItem item={item} removeCart={removeCart} />
                  <div className="cartInput">
                    <button
                      style={item.quantity === 1 ? colorR : colorRr}
                      onClick={() => decrement(item.product, item.quantity)}
                    >
                      -
                    </button>
                    <input readOnly value={item.quantity} type="number" />
                    <button
                      onClick={() =>
                        increment(item.product, item.quantity, item.stock)
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="cartSubtotal">{`$${
                    item.price * item.quantity
                  }`}</p>
                </div>
              ))}

            <div className="totalInfo">
              <div></div>
              <div className="grosTotal">
                <p>Total</p>
                <p>
                  $
                  {cartItems.reduce((total, item) => {
                    return total + item.quantity * item.price;
                  }, 0)}
                </p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkOutHandler}>Checkout</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
