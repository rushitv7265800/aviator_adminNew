import axios from "axios";

import {
  CLEAR_LOGIN_ERROR,
  SET_ADMIN,
  SET_LOGIN_ERROR,
  UPDATE_PROFILE,
  SIGNUP_ADMIN,
  CLEAR_REGISTER_ERROR,
  SET_REGISTER_ERROR,
  SET_UPDATE_CODE_ERROR,
  CLEAR_UPDATE_CODE_ERROR,
  GET_PROFILE
} from "./types";
import { apiInstanceFetch } from "../../util/api";

export const login = (email, password, key, package_) => (dispatch) => {
  dispatch({ type: CLEAR_LOGIN_ERROR });
  axios
    .post("/admin/login", { email, password, key, package_ })
    .then((res) => {
      if(res.data.status){
        // window.location.reload();
        dispatch({ type: SET_ADMIN, payload: res.data.token });
      }else{
        dispatch({ type: SET_LOGIN_ERROR, payload: res.data.message });
      }
    })
    .catch((error) => {
      dispatch({ type: SET_LOGIN_ERROR, payload: error });
    });
};

export const updateProfile = (profileData) => (dispatch) => {
  axios
    .patch("/admin", profileData)
    .then((res) => {
      dispatch({ type: UPDATE_PROFILE, payload: res.data.data });
    })
    .catch(({ response }) => {
      console.log(response?.data);
    });
};

export const getProfile = () => (dispatch) => {
  apiInstanceFetch
    .get("/admin")
    .then((res) => {
      dispatch({ type: GET_PROFILE, payload: res.data });
    })
    .catch((error) => console.log(error));
};

export const signupAdmin = (signup) => (dispatch) => {
  console.log("createAdmin", signup);
  dispatch({ type: CLEAR_REGISTER_ERROR });
  axios
    .post("admin/signup", signup)
    .then((res) => {
      console.log(res);
      if(res.data.status){
        dispatch({ type:SIGNUP_ADMIN });
       if(res.data.status){
        setTimeout(() => {
          window.location.href = "/loginAdmin";
        }, 3000);
       }
      }else{
        dispatch({ type: SET_REGISTER_ERROR, payload: res.data.message });
      }
    })
    .catch((error) => {
      dispatch({ type: SET_REGISTER_ERROR, payload: error });
    });
};
export const updateCode = (signup) => (dispatch) => {
  console.log("updateCode", signup);
  dispatch({ type: CLEAR_UPDATE_CODE_ERROR });
  axios
    .patch("admin/updateCode", signup)
    .then((res) => {
     if(res.data.status){
      console.log(res);
      setTimeout(() => {
        window.location.href = "/loginAdmin";
      }, 3000);
     }else{
      dispatch({ type: SET_UPDATE_CODE_ERROR, payload: res.data.message });
     }
    })
    .catch((error) => {
      dispatch({ type: SET_UPDATE_CODE_ERROR, payload: error });
    });
};