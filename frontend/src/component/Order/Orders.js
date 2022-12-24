import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import "./Orders.css";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { clearErrors, myOrders } from "../Store/action/orderAction";
import Loader from "../layout/Loader/Loader";
import LaunchIcon from "@mui/icons-material/Launch";

const Orders = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, orders } = useSelector((state) => state.myOrder);
  const { user } = useSelector((state) => state.user);
  const rows = [];
  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      cellClassName: "bangla",
      width: 300,
      flex: 1,
    },
    {
      field: "Status",
      headerName: "Status",
      width: 150,
      editable: true,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "Status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "ItemsQty",
      headerName: "Items Qty",
      width: 150,
      type: "number",
      editable: true,
      flex: 0.3,
    },
    {
      field: "Amount",
      headerName: "Amount",
      type: "number",
      width: 150,
      editable: true,
      flex: 0.5,
    },
    {
      field: "Action",
      headerName: "Action",
      type: "number",
      width: 270,
      editable: false,
      sortable: false,
      flex: 0.3,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  orders &&
    orders.forEach((item, index) => {
      rows.push({
        ItemsQty: item.orderItems.length,
        id: item._id,
        Status: item.orderStatus,
        Amount: item.totalPrice,
      });
    });
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [dispatch, error, alert]);
  return (
    <Fragment>
      <MetaData title={`${user.name} - orders`} />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="myOrderPage">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="ordersTables"
              autoHeight
            />

            <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Orders;
