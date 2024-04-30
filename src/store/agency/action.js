import { apiInstanceFetch } from "../../util/api";
import {
  GET_AGENCY,
  CREATE_NEW_AGENCY,
  EDIT_AGENCY,
  CLOSE_AGENCY_DIALOG,
  SET_CREATE_AGENCY_DONE,
  SET_UPDATE_AGENCY_DONE,
  ENABLE_DISABLE_AGENCY,
  GET_AGENCY_DROPDOWN,
} from "./types";

import axios from "axios";

export const getAgency = () => (dispatch) => {
  apiInstanceFetch
    .get("/agency/show")
    .then((res) => {
      dispatch({ type: GET_AGENCY, payload: res.data });
    })
    .catch((error) => console.log(error));
};

export const getAgencyDropdown = () => (dispatch) => {
  apiInstanceFetch
    .get("/agency/agencyDropDown")
    .then((res) => {
      if (res.status) {
        dispatch({ type: GET_AGENCY_DROPDOWN, payload: res.data });
      }
    })
    .catch((error) => console.log(error));
};

export const createNewAgency = (formData) => (dispatch) => {
  axios
    .post("/agency", formData)
    .then((res) => {
      dispatch({ type: CREATE_NEW_AGENCY, payload: res.data.data });
      dispatch({ type: CLOSE_AGENCY_DIALOG });
      dispatch({ type: SET_CREATE_AGENCY_DONE });
    })
    .catch((error) => console.log(error));
};
export const editAgency = (formData, id) => (dispatch) => {
  axios
    .patch("/agency/" + id, formData)
    .then((res) => {
      dispatch({
        type: EDIT_AGENCY,
        payload: { data: res.data.data, id },
      });
      dispatch({ type: CLOSE_AGENCY_DIALOG });
      dispatch({ type: SET_UPDATE_AGENCY_DONE });
    })
    .catch((error) => console.log(error));
};

export const enableDisableAgency = (id) => (dispatch) => {
  axios
    .patch(`/agency/enableDisable/${id}`)
    .then((res) => {
      dispatch({ type: ENABLE_DISABLE_AGENCY, payload: res.data.data });
    })
    .catch((error) => console.log(error));
};
