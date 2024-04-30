import { apiInstanceFetch } from "../../util/api";
import {
  GET_LEVEL,
  CREATE_NEW_LEVEL,
  EDIT_LEVEL,
  DELETE_LEVEL,
  CLOSE_LEVEL_DIALOG,
  SET_EDIT_LEVEL_DONE,
  SET_CREATE_LEVEL_DONE,
} from "./types";

import axios from "axios";

export const getLevel = (type) => (dispatch) => {
  apiInstanceFetch
    .get(`/level?type=${type}`)
    .then((res) => {
      dispatch({ type: GET_LEVEL, payload: res.data });
    })
    .catch((error) => console.log(error));
};

export const createNewLevel = (level) => (dispatch) => {
  axios
    .post("/level", level)
    .then((res) => {
      dispatch({ type: CREATE_NEW_LEVEL, payload: res.data.data });
      dispatch({ type: CLOSE_LEVEL_DIALOG });
      dispatch({ type: SET_CREATE_LEVEL_DONE });
    })
    .catch((error) => console.log(error));
};
export const editLevel = (level, id) => (dispatch) => {
  axios
    .patch("/level/" + id, level)
    .then((res) => {
      dispatch({
        type: EDIT_LEVEL,
        payload: { data: res.data.data, id },
      });
      dispatch({ type: CLOSE_LEVEL_DIALOG });
      dispatch({ type: SET_EDIT_LEVEL_DONE });
    })
    .catch((error) => console.log(error));
};

export const deleteLevel = (id) => (dispatch) => {
  axios
    .delete(`/level/${id}`)
    .then((res) => {
      dispatch({ type: DELETE_LEVEL, payload: id });
    })
    .catch((error) => console.log(error));
};
