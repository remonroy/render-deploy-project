import React, { Fragment, useEffect } from "react";
import * as Types from "../Store/action/types";
import "./ProductList.css";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import {
  getAllProductAdmin,
  clearErrors,
  adminDeleteProduct,
} from "../Store/action/productAction";
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Loader from "../layout/Loader/Loader";
import SideBar from "./SideBar";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { loading, error, products } = useSelector((state) => state.products);
  const { error: isDeleteError, success } = useSelector(
    (state) => state.isDeleted
  );
  const deleteProductHandler = (id) => {
    dispatch(adminDeleteProduct(id));
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
    if (success) {
      alert.success("Product delete successfully.");
      navigate("/admin/dashboard");
      dispatch({ type: Types.ADMIN_PRODUCT_DELETE_RESET });
    }
    dispatch(getAllProductAdmin());
  }, [dispatch, error, alert, navigate, success, isDeleteError]);
  const rows = [];
  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 150,
      //   flex: ,
    },

    {
      field: "name",
      headerName: "name",
      minWidth: 150,
      type: "number",
      editable: true,
      flex: 0.3,
    },
    {
      field: "stock",
      headerName: "stock",
      type: "number",
      minWidth: 150,
      editable: true,
      flex: 0.3,
    },
    {
      field: "price",
      headerName: "price",
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
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];
  products &&
    products.forEach((item, index) => {
      rows.push({
        id: item._id,
        name: item.name,
        stock: item.stock,
        price: item.price,
      });
    });

  return (
    <Fragment>
      <MetaData title="All Products -- Admin" />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="dashboard">
            <SideBar />
            <div className="productListContainer">
              <h3>Products list</h3>
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

export default ProductList;
