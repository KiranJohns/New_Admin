import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  loadingToggleAction,
  loginAction,
} from "../../store/actions/AuthActions";

// image

import BgImage from "../../images/bg1.png";
import logo from "../../images/logo-full.png";
import logolight from "../../images/logo-white.png";
import pol from "../../images/pol.jpg";
import careLogo from "../../images/activity-img/logo7.png";

function Login(props) {
  let errorsObj = { email: "", password: "" };
  const [errors, setErrors] = useState(errorsObj);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [superAdmin, setSuperAdmin] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
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
	let url = ""
    if (!superAdmin) {
      url = "/auth/login";
    } else {
      url = "/sub-admin/login";
    }
    dispatch(loadingToggleAction(true));
    dispatch(loginAction(url, email, password, navigate));
  }

  const element = document.querySelector("body");
  let dataTheme = element.getAttribute("data-theme-version");

  return (
    <div className="container h-100">
      <div className="row h-100 align-items-center justify-contain-center">
        <div className="col-xl-12">
          <div className="card">
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
                      <div className="mb-3">
                        <label className="mb-1">
                          <strong>Password</strong>
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          value={password}
                          placeholder="Type Your Password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && (
                          <div className="text-danger fs-12">
                            {errors.password}
                          </div>
                        )}
                      </div>
                      <div className="row d-flex justify-content-between mt-4 mb-2">
                        <div className="mb-3">
                          {/* <div className="form-check custom-checkbox ms-1">
														<input type="checkbox" className="form-check-input" id="basic_checkbox_1" />
														<label className="form-check-label" htmlFor="basic_checkbox_1">Remember my preference</label>
													</div> */}
                        </div>

                        <div className="form-group mb-3">
                          <div className="form-check form-check-inline">
                            <label className="form-check-label">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                value={superAdmin}
                                onChange={(e) => setSuperAdmin((prev) => !prev)}
                              />
                              Super-Admin
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="text-center mb-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                        >
                          Sign Me In
                        </button>
                      </div>
                      <div className="mb-3">
                        <Link to="/page-register">Forgot Password</Link>
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

// //
// import React, { useState } from "react";
// import { connect, useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   loadingToggleAction,
//   loginAction,
// } from "../../store/actions/AuthActions";

// // image

// import BgImage from "../../images/bg1.png";
// import logo from "../../images/logo-full.png";
// import logolight from "../../images/logo-white.png";
// import pol from "../../images/pol.jpg";
// import careLogo from "../../images/activity-img/logo7.png";
// import fetchData from "../../axios/index";
// import { saveTokenInLocalStorage } from "../../services/AuthService";
// function Login(props) {
//   let errorsObj = { email: "", password: "" };
//   const [errors, setErrors] = useState(errorsObj);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [superAdmin, setSuperAdmin] = useState(true);
//   const makeRequest = fetchData()
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   function onLogin(e) {
//     e.preventDefault();
//     let error = false;
//     const errorObj = { ...errorsObj };
//     if (email === "") {
//       errorObj.email = "Email is Required";
//       error = true;
//     }
//     if (password === "") {
//       errorObj.password = "Password is Required";
//       error = true;
//     }
//     setErrors(errorObj);
//     if (error) {
//       return;
//     }
//     let url = "";
//     if (!superAdmin) {
//       url = "/auth/login";
//     } else {
//       url = "/sub-admin/login";
//     }

//     // setLoading((prev) => true);
//     makeRequest("POST", url, {
//       email,
//       password
//     })
//       .then(async (res) => {
//         console.log(res);

//         // setLoading((prev) => false);
//         localStorage.setItem(`admin_learnforcare_access`, res.data.jwt_access_token);
//         localStorage.setItem(
//           `admin-learnforcare_refresh`,
//           res.data.jwt_re_fresh_token
//         );
//         localStorage.setItem("adminType", res.data.adminType);

//         if (res.data.adminType == "admin") {
//           navigate("/dashboard")
//           // saveTokenInLocalStorage({token: res.data.jwt_access_token});
//           // dispatch(loadingToggleAction(true));
//           // dispatch(loginAction(email, password, navigate));
//         } else {
//         }
//       })
//       .catch((err) => {
//         // setLoading((prev) => false);
//         console.log(err?.data?.errors[0]);

//         // toast.error(err?.data?.errors[0].error);
//       });
//   }

//   const element = document.querySelector("body");
//   let dataTheme = element.getAttribute("data-theme-version");

//   return (
//     <div className="container h-100">
//       <div className="row h-100 align-items-center justify-contain-center">
//         <div className="col-xl-12">
//           <div className="card">
//             <div className="card-body p-0">
//               <div className="row m-0">
//                 <div
//                   className="col-xl-6 col-md-6 sign text-center sign-bg"
//                   style={{ backgroundImage: "url(" + pol + ")" }}
//                 >
//                   <div>
//                     <div className="text-center my-5">
//                       <Link to={"#"}>
//                         <img
//                           className="logo-abbr dark-logo"
//                           width="200"
//                           src={careLogo}
//                           alt=""
//                         />
//                         {/* <img className="logo-abbr dark-logo" width="200" src={logo} alt="" />
// 										      	<img className="logo-abbr light-logo text-center m-auto" width="200" src={logolight} alt="" /> */}
//                       </Link>
//                     </div>
//                     {dataTheme === "light" ? (
//                       <img
//                         src={BgImage}
//                         className="slideskew img-fix bitcoin-img"
//                       />
//                     ) : (
//                       <img
//                         src={BgImage}
//                         className=" slideskew img-fix bitcoin-img "
//                       />
//                     )}
//                   </div>
//                 </div>
//                 <div className="col-xl-6 col-md-6">
//                   <div className="sign-in-your px-2">
//                     <h4 className="fs-20 mb-4">Sign in your account</h4>
//                     <span>Welcome back! Login with your data </span>
//                     <div
//                       className="login-social"
//                       style={{ marginBottom: "3rem" }}
//                     >
//                       {/* <Link to={"#"} className="btn btn-primary  d-block my-3"><i className="fab fa-google me-2"></i>Login with Google</Link>
// 											<Link to={"#"} className="btn btn-secondary  d-block my-3"><i className="fab fa-facebook-f me-2 facebook-log"></i>Login with Facebook</Link> */}
//                     </div>
//                     {props.errorMessage && (
//                       <div className="bg-red-300 text-red-900 border border-red-900 p-1 my-2">
//                         {props.errorMessage}
//                       </div>
//                     )}
//                     {props.successMessage && (
//                       <div className="bg-green-300 text-green-900 border border-green-900 p-1 my-2">
//                         {props.successMessage}
//                       </div>
//                     )}
//                     <form onSubmit={onLogin}>
//                       <div className="mb-3">
//                         <label className="mb-1">
//                           <strong>Email</strong>
//                         </label>
//                         <input
//                           type="email"
//                           className="form-control"
//                           value={email}
//                           onChange={(e) => setEmail(e.target.value)}
//                           placeholder="Type Your Email Address"
//                         />

//                         {errors.email && (
//                           <div className="text-danger fs-12">
//                             {errors.email}
//                           </div>
//                         )}
//                       </div>
//                       <div className="mb-3">
//                         <label className="mb-1">
//                           <strong>Password</strong>
//                         </label>
//                         <input
//                           type="password"
//                           className="form-control"
//                           placeholder="Type Your Password"
//                           value={password}
//                           onChange={(e) => setPassword(e.target.value)}
//                         />
//                         {errors.password && (
//                           <div className="text-danger fs-12">
//                             {errors.password}
//                           </div>
//                         )}
//                       </div>
//                       <div className="row d-flex justify-content-between mt-4 mb-2">
//                         <div className="mb-3">
//                           {/* <div className="form-check custom-checkbox ms-1">
// 														<input type="checkbox" className="form-check-input" id="basic_checkbox_1" />
// 														<label className="form-check-label" htmlFor="basic_checkbox_1">Remember my preference</label>
// 													</div> */}
//                         </div>

//                         <div className="form-group mb-3">
//                           <div className="form-check form-check-inline">
//                             <label className="form-check-label">
//                               <input
//                                 type="checkbox"
//                                 className="form-check-input"
//                                 value={superAdmin}
//                                 onChange={(e) => setSuperAdmin((prev) => !prev)}
//                               />
//                               Super-Admin
//                             </label>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="text-center mb-4">
//                         <button
//                           type="submit"
//                           className="btn btn-primary btn-block"
//                         >
//                           Sign Me In
//                         </button>
//                       </div>
//                       <div className="mb-3">
//                         <Link to="/page-register">Forgot Password</Link>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// const mapStateToProps = (state) => {
//   return {
//     errorMessage: state.auth.errorMessage,
//     successMessage: state.auth.successMessage,
//     showLoading: state.auth.showLoading,
//   };
// };
// export default connect(mapStateToProps)(Login);
// //
