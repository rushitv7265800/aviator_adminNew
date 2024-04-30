import React, { useState, useEffect } from "react";

//axios
import axios from "axios";

//router
import { Link } from "react-router-dom";

//redux
import { useSelector, connect } from "react-redux";
import { updateCode } from "../store/admin/action";

import "../dist/css/style.min.css";
import "../dist/css/style.css";

//jquery
import $ from "jquery";

import Logo from "../assets/images/GiluLive.jpeg";

//MUI
import { Snackbar, Typography } from "@material-ui/core";
import { state } from "./Admin";
import { Alert } from "@material-ui/lab";

const UpdateCode = (props) => {
  // $(".preloader ").fadeOut();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [purchaseCode, setPurchaseCode] = useState("");


  const [openEmailError, setOpenEmailError] = useState(false);
  const [openPasswordError, setOpenPasswordError] = useState(false);
  const [openCoreError, setOpenCoreError] = useState(false);

  // const [hasError, setHasError] = useState(false);
  // const [core, setCore] = useState(null);
  // const [paper, setPaper] = useState(null);
  // const [hasAdmin, setHasAdmin] = useState(false);

  const [error, setError] = useState({
    email: "",
    password:"",
    purchaseCode:""
  });
  const [errorMessage, setErrorMessage] = useState(null);

  const [openErrorMessage, setOpenErrorMessage] = useState(false);
  // const [errors_, setErrors] = useState({
  //   core: "",
  //   paper: "",
  // });

  const errors = useSelector((state) => state.admin.updateCodeError);

  useEffect(() => {
  setError({
    email: "",
    password:"",
    purchaseCode:""
  })
  }, []);

  const handleSubmit =  (e) => {
    e.preventDefault();
    if (!email || !password  || !purchaseCode) {
      const error = {};

      if (!email) {
        error.email = "Email is Required!";
      }
      if (!password) {
        error.password = "New Password is Required!";
      }
      if (!purchaseCode) {
        error.purchaseCode = "Purchase Code is Required!";
      }

      return setError({ ...error });
    }else{
      let updateCodeData = {
        "email":email,
        "password":password,
        "code":purchaseCode
      };
      props.updateCode(updateCodeData);
    }
  };
  // const handleKeyPress = (event) => {
  //   if (event.key === "Enter") {
  //     handleSubmit();
  //   }
  // };
  useEffect(() => {
    if(errors?.length > 2){
      setOpenErrorMessage(true);
      setErrorMessage(errors)
    }
}, [errors]);

const handleCloseError = () => {
setOpenErrorMessage(false);
};

  return (
    <div class="main-wrapper">
        <Snackbar
        open={openErrorMessage}
        autoHideDuration={2000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseError} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
      <div
        class="auth-wrapper d-flex no-block justify-content-center align-items-center position-relative"
        id="auth"
      >
        <div class="auth-box row">
          <div class="col-lg-6 col-md-5 modal-bg-img" id="modal"></div>
          <div class="col-lg-6 col-md-7 bg-white">
            <div class="p-3">
              <div class="text-center">
                <img
                  src={Logo}
                  alt="wrapkit"
                  height="60"
                  width="60"
                  style={{ borderRadius: "20%", objectFit: "cover" }}
                />
              </div>
              <h2 class="mt-3 text-center">Update Purchase Code</h2>
              <form class="mt-4">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="form-group">
                      <label class="text-dark" for="uname">
                        Email
                      </label>
                      <input
                        class="form-control"
                        placeholder="Email"
                        type="email"
                        required
                        value={email}
                        // onKeyPress={handleKeyPress}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (!e.target.value) {
                            return setError({
                              ...error,
                              email: "Email is Required!",
                            });
                          } else {
                            return setError({
                              ...error,
                              email: "",
                            });
                          }
                        }}
                      />
                      {error.email && (
                        <div class="pl-1 text-left">
                          <Typography variant="caption" color="error">
                            {error.email}
                          </Typography>
                        </div>
                      )}
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="form-group">
                      <label class="text-dark" for="pwd">
                         Password
                      </label>
                      <input
                        class="form-control"
                        placeholder="Password"
                        type="password"
                        required
                        value={password}
                        // onKeyPress={handleKeyPress}
                        onChange={(e) => {
                          setPassword(e.target.value);

                          if (!e.target.value) {
                            return setError({
                              ...error,
                              password: "Password is Required!",
                            });
                          } else {
                            return setError({
                              ...error,
                              password: "",
                            });
                          }
                        }}
                      />
                      {error.password && (
                        <div class="pl-1 text-left">
                          <Typography variant="caption" color="error">
                            {error.password}
                          </Typography>
                        </div>
                      )}
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="form-group">
                      <label class="text-dark" for="pwd">
                      Purchase Code
                      </label>
                      <input
                        class="form-control"
                        placeholder="Purchase Code"
                        type="password"
                        required
                        value={purchaseCode}
                        // onKeyPress={handleKeyPress}
                        onChange={(e) => {
                          setPurchaseCode(e.target.value);

                          if (!e.target.value) {
                            return setError({
                              ...error,
                              purchaseCode: "Purchase Code is Required!",
                            });
                          } else {
                            return setError({
                              ...error,
                              purchaseCode: "",
                            });
                          }
                        }}
                      />
                      {error.purchaseCode && (
                        <div class="pl-1 text-left">
                          <Typography variant="caption" color="error">
                            {error.purchaseCode}
                          </Typography>
                        </div>
                      )}
                    </div>
                  </div>
                  <div class="col-lg-12 text-center">
                    <button
                      onClick={handleSubmit}
                      type="button"
                      class="btn btn-block btn-dark rounded"
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { updateCode })(UpdateCode);
