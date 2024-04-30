import axios from "axios";

import {
  GET_GOOGLE_FB_Ad,
  EDIT_GOOGLE_FB_AD,
  SET_UPDATE_GOOGLE_FB_AD_DONE,
  SHOW_TOGGLE,
} from "./types";
import { apiInstanceFetch } from "../../util/api";

export const getGoogleFbAd = () => (dispatch) => {
  apiInstanceFetch
    .get("/advertisement")
    .then((res) => dispatch({ type: GET_GOOGLE_FB_Ad, payload: res }))
    .catch((error) => console.log(error));
};

export const showToggle = (id) => (dispatch) => {
  axios
    .patch(`/advertisement/${id}`)
    .then((res) => {
      dispatch({ type: SHOW_TOGGLE, payload: res.data.data });
    })
    .catch((error) => console.log(error));
};

export const editGoogleFbAd = (adData, id) => (dispatch) => {
  axios
    .patch(`/advertisement/googlefb/${id}`, adData)
    .then((res) => {
      dispatch({
        type: EDIT_GOOGLE_FB_AD,
        payload: { data: res.data.data, id },
      });

      dispatch({ type: SET_UPDATE_GOOGLE_FB_AD_DONE });
    })

    .catch((error) => {
      console.log(error);
    });
};
