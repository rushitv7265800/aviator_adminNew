import axios from "axios";

import { GET_PURCHASE_COIN_HISTORY } from "./types";
import { apiInstanceFetch } from "../../util/api";

export const getPurchaseCoinHistory = () => (dispatch) => {
  apiInstanceFetch
    .get("/history/admin/history")
    .then((res) => {
      dispatch({ type: GET_PURCHASE_COIN_HISTORY, payload: res.data });
    })
    .catch((error) => console.log(error));
};
