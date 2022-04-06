import * as userService from "../services/user";
export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const SIGNUP_USER = "SIGNUP_USER";

export const SET_USER = "SET_USER";

export function loginUser(credential) {
  return async function (dispatch) {
    try {
      const data = await userService.loginUser(credential);
      dispatch(login(data));
    } catch (err) {
      console.log(err);
    }
  };
}

export function signupUser(userDetail) {
  return async function (dispatch) {
    try {
      const data = await userService.signupUser(userDetail);
      dispatch(signup(data));
    } catch (err) {
      console.log(err);
    }
  };
}

export function logoutUser() {
  return async function (dispatch) {
    try {

      const isLogout = await userService.logoutUser();
      if(isLogout){
        dispatch(logout());
      }
    } catch (err) {
      console.log(err);
    }
  };
}

export function fetchUser() {
  return async function (dispatch) {
    try {
      const response = await userService.fetchUser();
      dispatch(setUser(response));
    } catch (err) {
      console.log(err);
    }
  };
}

const login = (data) => {
  return {
    type: LOGIN_USER,
    payload: data,
  };
};

const signup = (data) => {
  return {
    type: SIGNUP_USER,
    payload: data,
  };
};

const logout = () => {
  return {
    type: LOGOUT_USER,
  };
};

const setUser = (data) => {
  return {
    type: SET_USER,
    payload:data,
  };
};
