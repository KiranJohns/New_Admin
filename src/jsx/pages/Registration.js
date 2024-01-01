import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { connect, useDispatch } from "react-redux";
import {
  loadingToggleAction,
  signupAction,
} from "../../store/actions/AuthActions";
// image

import careLogo from "../../images/activity-img/logo7.png";

import ReactDOM from "react-dom";
import Modal from "react-modal";
import fetchData from "../../axios";
import { ToastContainer, toast } from "react-toastify";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function Register(props) {
  const [confirmPassword, setConfirmPassword] = useState("");
  let errorsObj = { email: "", password: "" };
  const [errors, setErrors] = useState(errorsObj);
  const [password, setPassword] = useState("");
  const makeRequest = fetchData();

  function onSignUp(e) {
    e.preventDefault();
    if(password != confirmPassword) {
      toast.warn("Password Is Not Matching");
      return;
    }
    makeRequest("PATCH", "/auth/update-password",{
      password
    })
      .then((res) => {
        console.log(res);
        window.location.href = "/login";
      })
      .catch((err) => {
        toast.warn("Please Check Your Password");
        console.log(err);
      });
  }
  return (
    <div className="authincation h-100 p-meddle">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="container h-100">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-6">
            <div className="authincation-content">
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <div className="auth-form">
                    <div className="text-center mb-3">
                      <Link to="/login">
                        <img style={{ width: "17rem" }} src={careLogo} alt="" />
                      </Link>
                    </div>
                    <h4 className="text-center mb-4 ">Change your password</h4>
                    {props.errorMessage && (
                      <div className="">{props.errorMessage}</div>
                    )}
                    {props.successMessage && (
                      <div className="">{props.successMessage}</div>
                    )}
                    <form onSubmit={onSignUp}>
                      {/* <div className="form-group mb-3">
                        <label className="mb-1 ">
                          <strong>Email</strong>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Registered Email"
                        />
                      </div> */}
                      <div className="form-group mb-3">
                        <label className="mb-1">
                          <strong>Password</strong>
                        </label>
                        <input
                          defaultValue={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="form-control"
                          placeholder="Enter New Password"
                          //defaultValue="Password"
                        />
                      </div>
                      {/* {errors.password && <div>{errors.password}</div>} */}
                      <div className="form-group mb-3">
                        <label className="mb-1 ">
                          <strong>Confirm Password</strong>
                        </label>
                        <input
                          defaultValue={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="form-control"
                          placeholder="Confirm Password"
                        />
                      </div>
                      {errors.password && <div>{errors.password}</div>}
                      <div className="text-center mt-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                          // onClick={openModal}
                        >
                          Change Password
                        </button>
                      </div>
                    </form>
                    <div className="new-account mt-3">
                      <p className="">
                        No need to change password{" "}
                        <Link className="text-primary" to="/login">
                          Sign in
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     errorMessage: state.auth.errorMessage,
//     successMessage: state.auth.successMessage,
//     showLoading: state.auth.showLoading,
//   };
// };

export default Register;
