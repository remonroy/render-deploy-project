import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ResetPassword.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../Store/action/userAction";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { token } = useParams();
  const navigate = useNavigate();
  const { error, success, loading } = useSelector(
    (state) => state.forgotPasswordReducer
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(resetPassword(token, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Reset password successfully");
      navigate("/login");
    }
  }, [error, dispatch, alert, navigate, success]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Reset password" />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Reset Password</h2>
              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <div>
                  <LockOpenIcon />
                  <input
                    value={password}
                    type="password"
                    required
                    placeholder="New Password.."
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <LockIcon />
                  <input
                    value={confirmPassword}
                    type="password"
                    required
                    placeholder="Confirm Password.."
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="change"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ResetPassword;
