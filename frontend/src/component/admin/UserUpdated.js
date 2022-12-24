import React, { Fragment, useEffect, useState } from "react";
import "./NewProduct.css";
import * as Types from "../Store/action/types";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";

import { useNavigate, useParams } from "react-router-dom";

import PersonIcon from "@mui/icons-material/Person";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import {
  clearErrors,
  adminGetAllUsersDetails,
  adminGetAllUsersUpdated,
} from "../Store/action/userAction";
import SideBar from "./SideBar";

const UserUpdated = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const navigate = useNavigate();

  const { error, user } = useSelector((state) => state.adminDetailsUser);
  const {
    loading: updatedLoading,
    error: updatedError,
    isUpdated,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (user && user._id !== id) {
      dispatch(adminGetAllUsersDetails(id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updatedError) {
      alert.error(updatedError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("User Updated successfully");
      navigate("/admin/users");
      dispatch({ type: Types.ADMIN_ALL_USER_UPDATED_RESET });
    }
  }, [dispatch, error, alert, navigate, updatedError, isUpdated, id, user]);

  const userUpdatedSubmitHandler = (e) => {
    e.preventDefault();
    const newForm = new FormData();
    newForm.set("name", name);
    newForm.set("email", email);
    newForm.set("role", role);
    dispatch(adminGetAllUsersUpdated(id, newForm));
  };

  return (
    <Fragment>
      <div className="dashboard">
        <SideBar />
        <div className="createProductContainer">
          <form
            className="createProductForm"
            onSubmit={userUpdatedSubmitHandler}
          >
            <h1>User Updated</h1>

            <div>
              <PersonIcon />
              <input
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <VerifiedUserIcon />
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option>Choose Category</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <input
              id="createProductBtn"
              type="submit"
              value="Update"
              disabled={
                updatedLoading ? true : false || role === "" ? true : false
              }
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UserUpdated;
