import React from "react";
import { Link } from "react-router-dom";
const CartItem = ({ item, removeCart }) => {
  return (
    <div className="cartItem">
      <img src={item.image} alt="Remon" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: $${item.price}`}</span>
        <p onClick={() => removeCart(item.product)}>Remove</p>
      </div>
    </div>
  );
};

export default CartItem;
