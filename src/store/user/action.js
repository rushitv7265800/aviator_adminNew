import axios from "axios";

import {
  GET_USER,
  BLOCK_UNBLOCK_USER,
  EDIT_USER,
  CLOSE_USER_DIALOG,
  SET_UPDATE_USER_DONE,
} from "./types";
import { apiInstanceFetch } from "../../util/api";

export const getUser = () => (dispatch) => {
  apiInstanceFetch
    .get("/user")
    .then((res) => {
      dispatch({ type: GET_USER, payload: res.data });
    })
    .catch((error) => console.log(error));
};

export const blockUnblockUser = (id) => (dispatch) => {
  apiInstanceFetch
    .get(`/user/${id}`)
    .then((res) => {
      dispatch({ type: BLOCK_UNBLOCK_USER, payload: res.data });
    })
    .catch((error) => console.log(error));
};

export const editUser = (formData, id) => (dispatch) => {
  axios
    .patch("/user/" + id, formData)
    .then((res) => {
      dispatch({
        type: EDIT_USER,
        payload: { data: res.data.user, id },
      });
      dispatch({ type: CLOSE_USER_DIALOG });
      dispatch({ type: SET_UPDATE_USER_DONE });
    })
    .catch((error) => console.log(error));
};

export const editCoin = (id, data) => (dispatch) => {
  axios
    .patch(`/user/coin/${id}`, data)
    .then((res) => {
      dispatch({ type: EDIT_USER, payload: res.data.user });
      dispatch({ type: SET_UPDATE_USER_DONE });

    })
    .catch((error) => console.log(error));
};
