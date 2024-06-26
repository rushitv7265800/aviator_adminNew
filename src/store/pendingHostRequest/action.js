import axios from "axios";

import {
  GET_PENDING_REQUEST,
  ACCEPT_PENDING_REQUEST,
  CLOSE_REQUEST_DIALOG,
  SET_ACCEPT_REQUEST_DONE,
} from "./types";
import { apiInstanceFetch } from "../../util/api";

export const getPendingRequest = () => (dispatch) => {
  apiInstanceFetch
    .get("/request")
    .then((res) => {
      dispatch({ type: GET_PENDING_REQUEST, payload: res.data });
    })
    .catch((error) => console.log(error));
};

export const acceptPendingRequest = (data, id) => (dispatch) => {
  axios
    .post(`/request/${id}`, data)
    .then((res) => {
      dispatch({ type: ACCEPT_PENDING_REQUEST, payload: id });
      dispatch({ type: CLOSE_REQUEST_DIALOG });
      dispatch({ type: SET_ACCEPT_REQUEST_DONE });
    })
    .catch((error) => {
      console.log(error);
    });
};
