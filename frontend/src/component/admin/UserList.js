import React, { Fragment, useEffect } from "react";
import * as Types from "../Store/action/types";
import "./ProductList.css";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { clearErrors } from "../Store/action/productAction";
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Loader from "../layout/Loader/Loader";
import SideBar from "./SideBar";

import {
  adminGetAllUsers,
  adminGetAllUsersDeleted,
} from "../Store/action/userAction";

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { loading, error, users } = useSelector((state) => state.adminAllUser);
  const {
    error: isDeleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);
  const deleteUserHandler = (id) => {
    dispatch(adminGetAllUsersDeleted(id));
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
      alert.success(message);
      navigate("/admin/users");
      dispatch({ type: Types.ADMIN_ALL_USER_DELETE_RESET });
    }
    dispatch(adminGetAllUsers());
  }, [dispatch, error, alert, navigate, isDeleteError, isDeleted, message]);
  const rows = [];
  const columns = [
    {
      field: "id",
      headerName: "User ID",
      minWidth: 150,
      flex: 0.4,
    },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,

      editable: true,
      flex: 0.6,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      editable: true,
      flex: 0.3,
    },
    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      editable: true,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor";
      },
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
            <Link to={`/admin/users/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];
  users &&
    users.forEach((item, index) => {
      rows.push({
        id: item._id,
        email: item.email,
        name: item.name,
        role: item.role,
      });
    });

  return (
    <Fragment>
      <MetaData title="User List -- Admin" />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="dashboard">
            <SideBar />
            <div className="productListContainer">
              <h3>User list</h3>
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

export default UserList;
