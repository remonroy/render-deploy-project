import React, { Fragment, useEffect, useState } from "react";
import "./ProcessOrder.css";
import * as Types from "../Store/action/types";
import { Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link, useParams, useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import { singleOrder } from "../Store/action/orderAction";
import Loader from "../layout/Loader/Loader";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import {
  adminUpdatedAllOrders,
  clearErrors,
} from "../Store/action/orderAction";
import { useAlert } from "react-alert";

const ProcessOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const [status, setStatus] = useState("");
  const { loading, error, order } = useSelector((state) => state.singleOrder);
  const { error: updateOrder, isUpdated } = useSelector((state) => state.order);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateOrder) {
      alert.error(updateOrder);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Orders Updated Successfully");
      navigate("/admin/orders");
      dispatch({ type: Types.ADMIN_ALL_ORDERS_UPDATED_RESET });
    }
    dispatch(singleOrder(id));
  }, [dispatch, error, updateOrder, isUpdated, alert, id, navigate]);

  const processOrderHandler = (e) => {
    e.preventDefault();
    const newForm = new FormData();
    newForm.set("status", status);
    dispatch(adminUpdatedAllOrders(id, newForm));
  };

  return (
    <Fragment>
      <MetaData title="Admin Order Processing" />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          {loading ? (
            <Loader />
          ) : (
            <Fragment>
              <div
                className="confirmOrderPage"
                style={{
                  display: order.orderStatus === "Delivered" ? "block" : "grid",
                }}
              >
                <div>
                  <div className="orderDetailsContainer">
                    <Typography>Shipping Info</Typography>
                    <div className="orderDetailsContainerBox">
                      <div>
                        <p>Name:</p>
                        <span>{order.user && order.user.name}</span>
                      </div>
                      <div>
                        <p>Phone:</p>
                        <span>
                          {order.shippingInfo && order.shippingInfo.phoneNo}
                        </span>
                      </div>
                      <div>
                        <p>Address:</p>
                        <span>
                          {order.shippingInfo &&
                            `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                        </span>
                      </div>
                    </div>
                    <Typography>Payment</Typography>
                    <div className="orderDetailsContainerBox">
                      <div>
                        <p
                          className={
                            order.paymentInfo &&
                            order.paymentInfo.status === "succeeded"
                              ? "greenColor"
                              : "redColor"
                          }
                        >
                          {order.paymentInfo &&
                          order.paymentInfo.status === "succeeded"
                            ? "PAID"
                            : "NOT PAID"}
                        </p>
                      </div>

                      <div>
                        <p>Amount:</p>
                        <span>{order.totalPrice && order.totalPrice}</span>
                      </div>
                    </div>

                    <Typography>Order Status</Typography>
                    <div className="orderDetailsContainerBox">
                      <div>
                        <p
                          className={
                            order.orderStatus &&
                            order.orderStatus === "Delivered"
                              ? "greenColor"
                              : "redColor"
                          }
                        >
                          {order.orderStatus && order.orderStatus}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="confirmItems">
                    <Typography>Your carts items</Typography>
                    <div className="confirmCartsItemsContainer">
                      {order.orderItems &&
                        order.orderItems.map((item) => (
                          <div key={item.product}>
                            <img src={item.image} alt="" />
                            <Link to={`/products/${item.product}`}>
                              {item.name}
                            </Link>
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
                <div
                  style={{
                    display:
                      order.orderStatus === "Delivered" ? "none" : "block",
                  }}
                >
                  <form
                    className="createProductForm"
                    onSubmit={processOrderHandler}
                  >
                    <h1> Process Order</h1>

                    <div>
                      <AccountTreeIcon />
                      <select onChange={(e) => setStatus(e.target.value)}>
                        <option>Choose Category</option>
                        {order.orderStatus === "Processing" && (
                          <option value="Shipped">Shipped</option>
                        )}
                        {order.orderStatus === "Shipped" && (
                          <option value="Delivered">Delivered</option>
                        )}
                      </select>
                    </div>

                    {/* <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button> */}
                    <input
                      id="createProductBtn"
                      type="submit"
                      value="submit"
                      disabled={
                        loading ? true : false || status === "" ? true : false
                      }
                    />
                  </form>
                </div>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
