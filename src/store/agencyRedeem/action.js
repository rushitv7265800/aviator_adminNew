import axios from "axios";

import {
  GET_ACCEPTED_REDEEM,
  GET_PENDING_REDEEM,
  ACCEPT_REDEEM_REQUEST,
  DELETE_REDEEM,
  DECLINE_REDEEM,
  ACCEPT_SUCCESS,
  CLOSE_REDEEM_ACCEPT_DIALOG,
} from "./types";
import { apiInstanceFetch } from "../../util/api";

export const getAcceptedRedeem = () => (dispatch) => {
  apiInstanceFetch
    .get(`/agencyRedeem/accepted`)
    .then((res) => {
      dispatch({ type: GET_ACCEPTED_REDEEM, payload: res.data });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getPendingRedeem = () => (dispatch) => {
  apiInstanceFetch
    .get(`/agencyRedeem/unaccepted`)
    .then((res) => {
      dispatch({ type: GET_PENDING_REDEEM, payload: res.data });
    })
    .catch((error) => {
      console.log(error);
    });
};
export const deleteRedeem = (id) => (dispatch) => {
  axios
    .delete(`/agencyRedeem/${id}`)
    .then((res) => {
      dispatch({ type: DELETE_REDEEM, payload: id });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const acceptRedeemRequest = (id, data) => (dispatch) => {
  axios
    .put(`/agencyRedeem/${id}`, data)
    .then((res) => {
      dispatch({ type: ACCEPT_REDEEM_REQUEST, payload: res.data.data });
      dispatch({ type: CLOSE_REDEEM_ACCEPT_DIALOG });
      dispatch({ type: ACCEPT_SUCCESS });
    })
    .catch((error) => console.log(error));
};

export const declineRedeemRequest = (id) => (dispatch) => {
  axios
    .patch(`/agencyRedeem/decline/${id}`)
    .then((res) => {
      dispatch({ type: DECLINE_REDEEM, payload: { data: res.data.data, id } });
    })
    .catch((error) => console.log(error));
};
