import {
  formatError,
  login,
  runLogoutTimer,
  saveTokenInLocalStorage,
  signUp,
} from "../../services/AuthService";

export const SIGNUP_CONFIRMED_ACTION = "[signup action] confirmed signup";
export const SIGNUP_FAILED_ACTION = "[signup action] failed signup";
export const LOGIN_CONFIRMED_ACTION = "[login action] confirmed login";
export const LOGIN_FAILED_ACTION = "[login action] failed login";
export const LOADING_TOGGLE_ACTION = "[Loading action] toggle loading";
export const LOGOUT_ACTION = "[Logout action] logout action";
export const NAVTOGGLE = "NAVTOGGLE";

export function signupAction(email, password, navigate) {
  return (dispatch) => {
    signUp(email, password)
      .then((response) => {
        saveTokenInLocalStorage(response.data);
        runLogoutTimer(
          dispatch,
          response.data.expiresIn * 1000
          //history,
        );
        dispatch(confirmedSignupAction(response.data));
        navigate("/dashboard");
        //history.push('/dashboard');
      })
      .catch((error) => {
        const errorMessage = formatError(error.response.data);
        dispatch(signupFailedAction(errorMessage));
      });
  };
}

export function Logout(navigate) {
  localStorage.removeItem("userDetails");
  navigate("/login");
  //history.push('/login');

  return {
    type: LOGOUT_ACTION,
  };
}

export function loginAction(url, email, password, navigate) {
  return (dispatch) => {
    login(url, email, password)
      .then((res) => {
        localStorage.setItem(
          `admin_learnforcare_access`,
          res.data.data.jwt_access_token
        );
        localStorage.setItem(
          `admin-learnforcare_refresh`,
          res.data.data.jwt_re_fresh_token
        );

        let response = {
          data: {
            displayName: "learnforcare",
            email: email,
            expiresIn: 86400,
            idToken: res.data.data.jwt_access_token,
            kind: "identitytoolkit#VerifyPasswordResponse",
            localId: "qmt6dRyipIad8UCc0QpMV2MENSy1",
            refreshToken: res.data.data.jwt_access_token,
            registered: true,
          },
        };
        saveTokenInLocalStorage(response.data);
        runLogoutTimer(dispatch, response.data.expiresIn * 1000, navigate);
        dispatch(loginConfirmedAction(response.data));
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error.response.data);
        let err = error.response.data;
        let data = {
          error: {
            code: err.errors[0]?.code,
            errors: {
              domain: "",
              reason: err.errors[0]?.error,
              message: err.errors[0]?.message,
            },
            message: "",
          },
        };
        const errorMessage = formatError(data);
        dispatch(loginFailedAction(errorMessage));
      });
  };
}

export function loginFailedAction(data) {
  return {
    type: LOGIN_FAILED_ACTION,
    payload: data,
  };
}

export function loginConfirmedAction(data) {
  return {
    type: LOGIN_CONFIRMED_ACTION,
    payload: data,
  };
}

export function confirmedSignupAction(payload) {
  return {
    type: SIGNUP_CONFIRMED_ACTION,
    payload,
  };
}

export function signupFailedAction(message) {
  return {
    type: SIGNUP_FAILED_ACTION,
    payload: message,
  };
}

export function loadingToggleAction(status) {
  return {
    type: LOADING_TOGGLE_ACTION,
    payload: status,
  };
}
export const navtoggle = () => {
  return {
    type: "NAVTOGGLE",
  };
};
