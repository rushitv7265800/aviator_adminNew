import axios from "axios";

import {
  GET_COMPLAIN,
  SOLVED_COMPLAIN,
  GET_AGENCY_TOTAL_COMPLAIN,
} from "./types";
import { apiInstanceFetch } from "../../util/api";

export const getComplain = (type, id) => (dispatch) => {
  apiInstanceFetch
    .get(`/complain/host?type=${type}&agency_id=${id}`)
    .then((res) => {
      dispatch({ type: GET_COMPLAIN, payload: res.data });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getUserComplain = (type) => (dispatch) => {
  apiInstanceFetch
    .get(`/complain/user?type=${type}`)
    .then((res) => {
      dispatch({ type: GET_COMPLAIN, payload: res.data });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const solvedComplain = (id) => (dispatch) => {
  axios
    .patch(`/complain/${id}`)
    .then((res) => {
      dispatch({ type: SOLVED_COMPLAIN, payload: res.data.data });
    })
    .catch((error) => console.log(error));
};

export const getAgencyTotal = (type) => (dispatch) => {
  apiInstanceFetch
    .get(`/complain?type=${type}`)
    .then((res) => {
      dispatch({ type: GET_AGENCY_TOTAL_COMPLAIN, payload: res.data });
    })
    .catch((error) => {
      console.log(error);
    });
};
