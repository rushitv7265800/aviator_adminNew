import React, { useState, useEffect } from "react";

//router
import { Link } from "react-router-dom";

//alert
import { permissionError } from "../util/alert";

//redux
import { connect, useDispatch, useSelector } from "react-redux";
import { editCoin } from "../store/user/action";
import { getUser } from "../store/user/action";

//MUI
import { Snackbar, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { UNSET_UPDATE_USER_DONE } from "../store/user/types";

const SettingPage = (props) => {
  const dispatch = useDispatch();

  //const [mongoId, setMongoId] = useState(null);
  const [userId, setUserId] = useState("");
  const [coin, setCoin] = useState("");
  const [openSuccess, setOpenSuccess] = useState(false);

  const [error, setError] = useState({
    userId: "",
    coin: "",
  });

  const { user, updateDone } = useSelector((state) => state.user);

  const hasPermission = useSelector((state) => state.admin.user.flag);
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (updateDone) {
      setCoin("");
      setUserId("");
      setOpenSuccess(true);
      dispatch({ type: UNSET_UPDATE_USER_DONE });
    }
  }, [updateDone, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hasPermission) return permissionError();

    if (!userId || !coin) {
      const errors = {};
      if (!userId) errors.userId = "User Id is Required!";
      if (!coin) errors.coin = "Coin is Required!";

      return setError({ ...errors });
    }
    
    const index = user.find((user) => user.uniqueId === userId);
    if (index !== undefined) {
      props.editCoin(index._id, { coin });
      // setOpenSuccess(true);
      // if (index.uniqueId === userId) {
      // } else {
      //   return setError({ ...error, userId: "User Id does not exist!" });
      // }
    } else {
      return setError({ ...error, userId: "User Id does not exist!" });
    }
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };

  return (
    <div class="main-content mt-5" id="panel">
      <Snackbar
        open={openSuccess}
        autoHideDuration={2000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSuccess} severity="success">
          Success! Coin added successfully!
        </Alert>
      </Snackbar>
      {/* <!-- Page content --> */}
      <div class="page-breadcrumb pt-1 mb-4">
        <div class="row">
          <div class="col-7 align-self-center">
            <div class="d-flex align-items-center">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb m-0 p-0">
                  <li class="breadcrumb-item">
                    
                  </li>
                  <li class="breadcrumb-item text-muted active" aria-current="page">
                    Offline Recharge
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid mt--6">
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-xl-8">
            <div class="card card-profile">
              <div class="card-header">
                <div class="row align-items-center">
                  <div class="col-8">
                    <h3 class="mb-0">Offline Recharge to User </h3>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <form autoComplete="off">
                  <div class="pl-lg-4">
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="form-group">
                          <label class="form-control-label" for="input-username">
                            User Id
                          </label>
                          <input
                            type="number"
                            id="input-username"
                            class="form-control"
                            value={userId}
                            onChange={(e) => {
                              setUserId(e.target.value);

                              if (!e.target.value) {
                                return setError({
                                  ...error,
                                  userId: "User Id is Required!",
                                });
                              } else {
                                return setError({
                                  ...error,
                                  userId: "",
                                });
                              }
                            }}
                          />
                          {error.userId && (
                            <div class="pl-1 text-left">
                              <Typography variant="caption" color="error">
                                {error.userId}
                              </Typography>
                            </div>
                          )}
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="form-group">
                          <label class="form-control-label" for="input-username">
                            Coin
                          </label>
                          <input
                            type="number"
                            id="input-username"
                            class="form-control"
                            value={coin}
                            onChange={(e) => {
                              setCoin(e.target.value);

                              if (!e.target.value) {
                                return setError({
                                  ...error,
                                  coin: "Coin is Required!",
                                });
                              } else {
                                return setError({
                                  ...error,
                                  coin: "",
                                });
                              }
                            }}
                          />
                          {error.coin && (
                            <div class="pl-1 text-left">
                              <Typography variant="caption" color="error">
                                {error.coin}
                              </Typography>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-12">
                      <a href="#!" class="btn btn-default float-right" onClick={handleSubmit}>
                        Submit
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="col-md-2"></div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, {
  editCoin,
  getUser,
})(SettingPage);
