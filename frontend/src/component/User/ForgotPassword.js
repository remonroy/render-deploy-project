import React, { Fragment, useState, useEffect } from "react";
import "./ForgotPassword.css";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../Store/action/userAction";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [email, setEmail] = useState("");
  const { error, message, loading } = useSelector(
    (state) => state.forgotPasswordReducer
  );

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("email", email);

    dispatch(forgotPassword(myForm));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      alert.success(message);
    }
  }, [error, dispatch, alert, message]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Forgot profile" />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>
              <form
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="forgotPasswordEmail">
                  <MailOutlineIcon />
                  <input
                    value={email}
                    type="text"
                    name="email"
                    required
                    placeholder="Enter email.."
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="send"
                  className="forgotPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ForgotPassword;
