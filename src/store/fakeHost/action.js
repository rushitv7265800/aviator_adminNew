import axios from "axios";
import * as ActionType from "./types";
import { apiInstanceFetch } from "../../util/api";

export const getAllFakeHost = () => (dispatch) => {
  apiInstanceFetch
    .get("/fakeHost/getAll")
    .then((res) => {
      if (res.status) {
        dispatch({
          type: ActionType.ALL_FAKE_HOST,
          payload: { data: res.data, total: res.total },
        });
      }
    })
    .catch((error) => console.log(error));
};

export const createFakeHost = (formData) => (dispatch) => {
  axios
    .post("/fakeHost", formData)
    .then((res) => {
      dispatch({
        type: ActionType.CREATE_NEW_FAKE_HOST,
        payload: res?.data?.data,
      });
      dispatch({ type: ActionType.CLOSE_FAKE_HOST_DIALOG });
      dispatch({ type: ActionType.SET_CREATE_AGENCY_DONE });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const editFakeHost = (formData, id) => (dispatch) => {
  axios
    .patch("/fakeHost/update/" + id, formData)
    .then((res) => {
      dispatch({
        type: ActionType.EDIT_FAKE_HOST,
        payload: { data: res.data.data, id },
      });
      dispatch({ type: ActionType.CLOSE_FAKE_HOST_DIALOG });
      dispatch({ type: ActionType.SET_UPDATE_AGENCY_DONE });
    })
    .catch((error) => console.log(error));
};

export const handleOnlineSwitch = (id) => (dispatch) => {
  axios
    .patch(`/fakeHost/isOnlineSwitch/${id}`)
    .then((res) => {
      dispatch({
        type: ActionType.IS_ONLINE_FAKE_HOST,
        payload: res.data.data,
      });
    })
    .catch((error) => console.log(error));
};
