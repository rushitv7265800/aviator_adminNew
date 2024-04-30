import setToken from "../../util/SetToken";
import setDevKey from "../../util/SetDevKey";
import jwt_decode from "jwt-decode";

import {
  SET_ADMIN,
  UNSET_ADMIN,
  SET_LOGIN_ERROR,
  CLEAR_LOGIN_ERROR,
  UPDATE_PROFILE,
  SET_REGISTER_ERROR,
  CLEAR_REGISTER_ERROR,
  CLEAR_UPDATE_CODE_ERROR,
  SET_UPDATE_CODE_ERROR,
  GET_PROFILE,
} from "./types";

import { devKey } from "../../util/serverPath";

const initialState = {
  isAuth: false,
  user: {},
  loginError: [],
  registerError: [],
  updateCodeError: [],
};

const AdminReducer = (state = initialState, action) => {
  let decoded;

  switch (action.type) {
    case SET_ADMIN:
      if (action.payload) {
        decoded = jwt_decode(action.payload);
      }
      setToken(action.payload);
      setDevKey(devKey);
      sessionStorage.setItem("token", action.payload);
      sessionStorage.setItem("devKey", devKey);
      return {
        ...state,
        isAuth: true,
        user: decoded,
      };
    case UNSET_ADMIN:
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("devKey");
      sessionStorage.removeItem("firstLoad");

      setToken(null);
      setDevKey(null);
      return {
        ...state,
        user: {},
        isAuth: false,
      };
    case GET_PROFILE:
      return {
        ...state,
        user: {
          ...state.data,
          id: action.payload._id,
          name: action.payload.name,
          email: action.payload.email,
          image: action.payload.image,
          flag: action.payload.flag,
        },
      };
    case SET_LOGIN_ERROR: {
      return {
        ...state,
        loginError: action.payload,
      };
    }
    case CLEAR_LOGIN_ERROR: {
      return {
        ...state,
        loginError: [],
      };
    }
    case SET_REGISTER_ERROR: {
      return {
        ...state,
        registerError: action.payload,
      };
    }
    case CLEAR_REGISTER_ERROR: {
      return {
        ...state,
        registerError: [],
      };
    }
    case SET_UPDATE_CODE_ERROR: {
      return {
        ...state,
        updateCodeError: action.payload,
      };
    }
    case CLEAR_UPDATE_CODE_ERROR: {
      return {
        ...state,
        updateCodeError: [],
      };
    }
    default:
      return state;
  }
};

export default AdminReducer;
