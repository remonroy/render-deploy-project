import React, { Fragment, useEffect } from "react";
import * as Types from "../Store/action/types";
import "./OrderList.css";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Loader from "../layout/Loader/Loader";
import SideBar from "./SideBar";

import {
  adminDeletedAllOrders,
  adminGetAllOrders,
  clearErrors,
} from "../Store/action/orderAction";

const OrderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { loading, error, orders } = useSelector((state) => state.allOrders);
  const { error: isDeleteError, isDeleted } = useSelector(
    (state) => state.order
  );
  const updateOrderHandler = (id) => {
    dispatch(adminDeletedAllOrders(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isDeleteError) {
      alert.error(isDeleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("Order delete successfully.");
      navigate("/admin/orders");
      dispatch({ type: Types.ADMIN_ALL_ORDERS_DELETED_RESET });
    }
    dispatch(adminGetAllOrders());
  }, [dispatch, error, alert, navigate, isDeleted, isDeleteError]);
  const rows = [];
  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 150,
      //   flex: ,
    },

    {
      field: "Status",
      headerName: "Status",
      minWidth: 150,
      type: "number",
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
      type: "number",
      minWidth: 150,
      editable: true,
      flex: 0.3,
    },
    {
      field: "Amount",
      headerName: "Amount",
      type: "number",
      minWidth: 150,
      editable: true,
      flex: 0.3,
    },
    {
      field: "Action",
      headerName: "Action",
      type: "number",
      minWidth: 150,
      editable: false,
      sortable: false,
      flex: 0.3,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/orders/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                updateOrderHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
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

  return (
    <Fragment>
      <MetaData title="All Orders -- Admin" />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="dashboard">
            <SideBar />
            <div className="productListContainer">
              <h3>Orders list</h3>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="productListTables"
                autoHeight
              />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderList;
