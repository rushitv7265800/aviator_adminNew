import axios from "axios";

import { GET_DASHBOARD } from "./types";
import { apiInstanceFetch } from "../../util/api";
export const getDashboard = () => (dispatch) => {
  apiInstanceFetch
    .get("/dashboard")
    .then((res) => {
      // console.log(res.data.data);
      dispatch({ type: GET_DASHBOARD, payload: res.data });
    })
    .catch((error) => console.log(error));
};
