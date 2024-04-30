import { apiInstanceFetch } from "../../util/api";
import {
  GET_BANNER,
  CREATE_NEW_BANNER,
  EDIT_BANNER,
  DELETE_BANNER,
  CLOSE_BANNER_DIALOG,
  SET_CREATE_BANNER_DONE,
  SET_UPDATE_BANNER_DONE,
} from "./types";

import axios from "axios";

export const getBanner = () => (dispatch) => {
  apiInstanceFetch
    .get("/banner")
    .then((res) => {
      dispatch({ type: GET_BANNER, payload: res.banner });
    })
    .catch((error) => console.log(error));
};

export const createNewBanner = (data) => (dispatch) => {
  axios
    .post("/banner", data)
    .then((res) => {
      dispatch({ type: CREATE_NEW_BANNER, payload: res.data.banner });
      dispatch({ type: CLOSE_BANNER_DIALOG });
      dispatch({ type: SET_CREATE_BANNER_DONE });
    })
    .catch((error) => console.log(error));
};
export const editBanner = (data, id) => (dispatch) => {
  axios
    .patch("/banner/" + id, data)
    .then((res) => {
      dispatch({
        type: EDIT_BANNER,
        payload: { data: res.data.banner, id },
      });
      dispatch({ type: CLOSE_BANNER_DIALOG });
      dispatch({ type: SET_UPDATE_BANNER_DONE });
    })
    .catch((error) => console.log(error));
};

export const deleteBanner = (id) => (dispatch) => {
  axios
    .delete(`/banner/${id}`)
    .then((res) => {
      dispatch({ type: DELETE_BANNER, payload: id });
    })
    .catch((error) => console.log(error));
};
