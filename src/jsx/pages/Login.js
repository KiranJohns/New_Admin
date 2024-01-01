import React, { useRef, useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  loadingToggleAction,
  loginAction,
} from "../../store/actions/AuthActions";
import { FaEye } from "react-icons/fa";
// image

import BgImage from "../../images/bg1.png";
import logo from "../../images/logo-full.png";
import logolight from "../../images/logo-white.png";
import pol from "../../images/pol.jpg";
import careLogo from "../../images/activity-img/logo7.png";
import { FaEyeSlash } from "react-icons/fa";
import Modal from "react-responsive-modal";
import { ToastContainer, toast } from "react-toastify";
import fetchData from "../../axios";

function Login(props) {
  const Ref = useRef();
  const navRef = useRef();
  const [activeSubmit, setActiveSubmit] = useState(true);
  let errorsObj = { email: "", password: "" };
  const [errors, setErrors] = useState(errorsObj);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [superAdmin, setSuperAdmin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState("00:00:45");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const makeRequest = fetchData();
  function onLogin(e) {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    if (email === "") {
      errorObj.email = "Email is Required";
      error = true;
    }
    if (password === "") {
      errorObj.password = "Password is Required";
      error = true;
    }
    setErrors(errorObj);
    if (error) {
      return;
    }

    let url = "";
    if (!superAdmin) {
      url = "/auth/login";
    } else {
      url = "/sub-admin/login";
    }
    dispatch(loadingToggleAction(true));
    dispatch(loginAction(url, email, password, navigate));
  }
  const [timerValue, setTimerValue] = useState({ seconds: 45 });

  function getTimeRemaining(e) {
    const total = Date.parse(e) - Date.parse(new Date());
    const hour = Math.floor((total / (1000 * 60 * 60)) % 24);
    const seconds = Math.floor((total / 1000) % 60);
    const minute = Math.floor((total / (1000 * 60)) % 60);
    setTimerValue((prev) => {
      console.log(prev);
      return { seconds: --prev.seconds };
    });
    return { total, hour, minute, seconds };
  }

  function startTimer(e) {
    let { total, hour, minute, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (hour > 9 ? hour : "0" + hour) +
          ":" +
          (minute > 9 ? minute : "0" + minute) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    } else {
      if (activeSubmit == true) {
        setActiveSubmit(false);
      }
    }
  }

  function clearTimer(e) {
    setTimer("00:00:60");
    if (Ref.current) {
      clearInterval(Ref.current);
    }

    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  }

  function getDeadTime() {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 45);
    return deadline;
  }

  function Reset() {
    clearTimer(getDeadTime());
  }

  function resend(event) {
    event.preventDefault();
    makeRequest("PATCH", "/auth/resend-otp")
      .then(() => {
        Reset();
        setTimerValue({ seconds: 45 });
        setActiveSubmit(true);
        toast.success("A new OTP send to your email");
      })
      .catch((error) => {
        toast(error.errors[0].message);
      });
  }
  const handleOtp = (event) => {
    event.persist();
    event.preventDefault();
    makeRequest("POST", "/auth/validate-otp", {
      otp: otp,
    })
      .then((res) => {
        toast("OTP is Accepted");
        navRef.current.click();
        // window.location.href = "/reset-password";
      })
      .catch((err) => {
        toast("OTP is Incorrect");
      });
    console.log(otp);
  };

  const element = document.querySelector("body");
  let dataTheme = element.getAttribute("data-theme-version");
  const onOpenModal = () => {
    // setOpen(true);
    setOpen((prev) => !prev);
    resend()
    clearTimer(getDeadTime());
  };

  const onCloseModal = () => {
    console.log("hi");
    setOpen((prev) => !prev);
  };
  return (
    <>
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
      <Link ref={navRef} to="/reset-password"></Link>
      <div className="container h-100">
        <div className="row h-100 align-items-center justify-contain-center">
          <div className="col-xl-12">
            <div className="card">
              {open && (
                <Modal
                  onClose={onCloseModal}
                  open={open}
                  styles={{
                    closeIcon: {
                      position: "absolute",
                      top: "3%",
                      right: "4%",
                    },
                    modal: {
                      zIndex: "10001",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%,-50%)",
                      maxWidth: "unset",
                      minWidth: "35%",
                      background: "#fff",
                      padding: "unset",
                      borderRadius: "1rem",
                    },
                    overlay: {
                      background: "rgba(0, 0, 0, 0.5)",
                    },
                    closeButton: {
                      background: "white",
                    },
                  }}
                  center
                >
                  <div className="main p-5">
                    <div className="heading">
                      <h4>One time Password (OTP) verification</h4>
                    </div>
                    <div className="info">
                      An OTP has been sent to your registered email address.
                    </div>
                    <div className="py-3">
                      <div className="form-group">
                        <label htmlFor="otp">Enter OTP</label>
                        <input
                          type="text"
                          className="form-control"
                          name="otp"
                          value={otp}
                          onKeyUp={(e) => e.key == "Enter" && handleOtp(e)}
                          onChange={(e) => setOtp(e.target.value)}
                          id="otp"
                        />
                        <div className="d-flex justify-content-between">
                          <div className="">
                            <button
                              type="button"
                              className="my-4 width-100 btn btn-primary"
                              onClick={handleOtp}
                              disabled={!timerValue.seconds >= 0 ? false : true}
                            >
                              Submit
                            </button>
                          </div>

                          <div className="mt-4">
                            {timerValue.seconds <= 0 ? (
                              <>
                                <span>Didn't recieve? </span>
                                <a
                                  style={{ cursor: "pointer" }}
                                  onClick={resend}
                                  className="text-primary mt-2 width-100"
                                >
                                  Resend
                                </a>
                              </>
                            ) : (
                              <div className="my-4">
                                <h5>{timer}</h5>
                                {/* <button className="btn btn-primary" onClick={}>
                          Reset
                        </button> */}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Modal>
              )}
              <div className="card-body p-0">
                <div className="row m-0">
                  <div
                    className="col-xl-6 col-md-6 sign text-center sign-bg"
                    style={{ backgroundImage: "url(" + pol + ")" }}
                  >
                    <div>
                      <div className="text-center my-5">
                        <Link to={"#"}>
                          <img
                            className="logo-abbr dark-logo"
                            width="200"
                            src={careLogo}
                            alt=""
                          />
                          {/* <img className="logo-abbr dark-logo" width="200" src={logo} alt="" />
										      	<img className="logo-abbr light-logo text-center m-auto" width="200" src={logolight} alt="" /> */}
                        </Link>
                      </div>
                      {dataTheme === "light" ? (
                        <img
                          src={BgImage}
                          className="slideskew img-fix bitcoin-img"
                        />
                      ) : (
                        <img
                          src={BgImage}
                          className=" slideskew img-fix bitcoin-img "
                        />
                      )}
                    </div>
                  </div>
                  <div className="col-xl-6 col-md-6">
                    <div className="sign-in-your px-2">
                      <h4 className="fs-20 mb-4">Sign in your account</h4>
                      <span>Welcome back! Login with your data </span>
                      <div
                        className="login-social"
                        style={{ marginBottom: "3rem" }}
                      >
                        {/* <Link to={"#"} className="btn btn-primary  d-block my-3"><i className="fab fa-google me-2"></i>Login with Google</Link>
											<Link to={"#"} className="btn btn-secondary  d-block my-3"><i className="fab fa-facebook-f me-2 facebook-log"></i>Login with Facebook</Link> */}
                      </div>
                      {props.errorMessage && (
                        <div className="bg-red-300 text-red-900 border border-red-900 p-1 my-2">
                          {props.errorMessage}
                        </div>
                      )}
                      {props.successMessage && (
                        <div className="bg-green-300 text-green-900 border border-green-900 p-1 my-2">
                          {props.successMessage}
                        </div>
                      )}
                      <form onSubmit={onLogin}>
                        <div className="mb-3">
                          <label className="mb-1">
                            <strong>Email</strong>
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Type Your Email Address"
                          />

                          {errors.email && (
                            <div className="text-danger fs-12">
                              {errors.email}
                            </div>
                          )}
                        </div>
                        <div className="mb-3" style={{ position: "relative" }}>
                          <label className="mb-1">
                            <strong>Password</strong>
                          </label>
                          <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            value={password}
                            placeholder="Type Your Password"
                            onChange={(e) => setPassword(e.target.value)}
                            onClick={() => setShowPassword((prev) => !prev)}
                          />
                          <div
                            id="pasToggle"
                            style={{ cursor: "pointer" }}
                            onClick={() => setShowPassword((prev) => !prev)}
                          >
                            {
                              <FaEye
                                style={{
                                  position: "absolute",
                                  top: "37",
                                  right: "10",
                                  font: "1.3rem",
                                }}
                              />
                            }
                          </div>
                          {errors.password && (
                            <div className="text-danger fs-12">
                              {errors.password}
                            </div>
                          )}
                        </div>
                        <div className="row d-flex justify-content-between mt-4 mb-2">
                          <div className="mb-3"></div>

                          <div className="form-group mb-3">
                            <div className="form-check form-check-inline">
                              <label className="form-check-label">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  value={superAdmin}
                                  onChange={(e) =>
                                    setSuperAdmin((prev) => !prev)
                                  }
                                />
                                Super-Admin
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="text-center mb-4 ">
                          <button
                            type="submit"
                            className="btn btn-primary btn-block"
                          >
                            Sign Me In
                          </button>
                        </div>
                        <div className="mb-3" onClick={onOpenModal}>
                          <span>Forgot Password</span>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};
export default connect(mapStateToProps)(Login);
