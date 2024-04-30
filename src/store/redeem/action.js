import axios from "axios";

import {
  GET_ACCEPTED_REDEEM,
  GET_PENDING_REDEEM,
  ACCEPT_REDEEM_REQUEST,
  GET_AGENCY_WISE_ACCEPTED_REDEEM,
  GET_AGENCY_WISE_PENDING_REDEEM,
  DECLINE_REDEEM,
  ACCEPT_SUCCESS,
  CLOSE_REDEEM_ACCEPT_DIALOG,
} from "./types";
import { apiInstanceFetch } from "../../util/api";

export const getAcceptedRedeem = (id) => (dispatch) => {
  apiInstanceFetch
    .get(`/redeem/accepted/${id}`)
    .then((res) => {
      dispatch({ type: GET_ACCEPTED_REDEEM, payload: res.data });
    })
    .catch((error) => console.log(error));
};

export const getPendingRedeem = (id) => (dispatch) => {
  apiInstanceFetch
    .get(`/redeem/unaccepted/${id}`)
    .then((res) => {
      dispatch({ type: GET_PENDING_REDEEM, payload: res.data });
    })
    .catch((error) => console.log(error));
};

export const acceptRedeemRequest = (id, data) => (dispatch) => {
  axios
    .patch(`/redeem/${id}`, data)
    .then((res) => {
      dispatch({ type: ACCEPT_REDEEM_REQUEST, payload: res.data.data });
      dispatch({ type: CLOSE_REDEEM_ACCEPT_DIALOG });
      dispatch({ type: ACCEPT_SUCCESS });
    })
    .catch((error) => console.log(error));
};

export const getAgencyPendingRedeem = () => (dispatch) => {
  apiInstanceFetch
    .get("/redeem/agencyPending")
    .then((res) => {
      dispatch({
        type: GET_AGENCY_WISE_PENDING_REDEEM,
        payload: res.data,
      });
    })
    .catch((error) => console.log(error));
};

export const getAgencyAcceptedRedeem = () => (dispatch) => {
  apiInstanceFetch
    .get("/redeem/agencyAccepted")
    .then((res) => {
      dispatch({
        type: GET_AGENCY_WISE_ACCEPTED_REDEEM,
        payload: res.data,
      });
    })
    .catch((error) => console.log(error));
};

export const declineRedeemRequest = (id) => (dispatch) => {
  axios
    .patch(`/redeem/decline/${id}`)
    .then((res) => {
      dispatch({ type: DECLINE_REDEEM, payload: { data: res.data.data, id } });
    })
    .catch((error) => console.log(error));
};
