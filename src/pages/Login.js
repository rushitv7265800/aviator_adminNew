import React, { useState, useEffect } from "react";

//axios
import axios from "axios";

//router
import { Link } from "react-router-dom";

//redux
import { useSelector, connect } from "react-redux";
import { login } from "../store/admin/action";

import "../dist/css/style.min.css";
import "../dist/css/style.css";

//jquery
import $ from "jquery";

import Logo from "../assets/images/GiluLive.jpeg";

//MUI
import { Snackbar, Typography } from "@material-ui/core";
import { state } from "./Admin";
import { Alert } from "@material-ui/lab";

const LoginPage = (props) => {
  // $(".preloader ").fadeOut();

  const [email, setEmail] = useState("demo@admin.com");
  const [password, setPassword] = useState("123456");
  const [demoLogin,setDemoLogin]=useState()


  const [errorMessage, setErrorMessage] = useState(null);

  const [openErrorMessage, setOpenErrorMessage] = useState(false);

  // const [hasError, setHasError] = useState(false);
  // const [core, setCore] = useState(null);
  // const [paper, setPaper] = useState(null);
  // const [hasAdmin, setHasAdmin] = useState(false);

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  // const [errors_, setErrors] = useState({
  //   core: "",
  //   paper: "",
  // });

  useEffect(() => {
    if (demoLogin) {
      setEmail("demo@admin.com");
      setPassword("123456");
      setError({
        email: "",
        password: "",
      });
      setDemoLogin(false); // Reset demoLogin state
    }
  }, [demoLogin]);

  const errors = useSelector((state) => state.admin.loginError);

  const handleDemoLogin = async (e) => {
    e.preventDefault();
    setDemoLogin(true);

    
    props.login(email,password);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      const error = {};

      if (!email) {
        error.email = "Email is Required!";
      }
      if (!password) {
        error.password = "Password is Required!";
      }

      return setError({ ...error });
    }

    props.login(email, password);
  };

  useEffect(() => {
    if (errors?.length > 2) {
      setOpenErrorMessage(true);
      setErrorMessage(errors);
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
              <h2 class="mt-3 text-center">Sign In</h2>
              <p class="text-center">
                Enter your email address and password to access admin panel.
              </p>
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

                  {/* {hasAdmin && (
                    <>
                      <div class="col-lg-12">
                        <div class="form-group">
                          <label class="text-dark" for="uname">
                            Key
                          </label>
                          <input
                            class="form-control"
                            placeholder="Key"
                            type="password"
                            required
                            value={core}
                            onChange={(e) => {
                              setCore(e.target.value);
                              if (!e.target.value) {
                                return setErrors({
                                  ...errors_,
                                  core: "This Field is Required!",
                                });
                              } else {
                                return setErrors({
                                  ...errors_,
                                  core: "",
                                });
                              }
                            }}
                          />
                          {errors_.core && (
                            <div class="pl-1 text-left">
                              <Typography variant="caption" color="error">
                                {errors_.core}
                              </Typography>
                            </div>
                          )}
                        </div>
                      </div>
                      <div class="col-lg-12">
                        <div class="form-group">
                          <label class="text-dark" for="uname">
                            Package
                          </label>
                          <input
                            class="form-control"
                            placeholder="package"
                            type="text"
                            required
                            value={paper}
                            onChange={(e) => {
                              setPaper(e.target.value);
                              if (!e.target.value) {
                                return setErrors({
                                  ...errors_,
                                  paper: "This Field is Required!",
                                });
                              } else {
                                return setErrors({
                                  ...errors_,
                                  paper: "",
                                });
                              }
                            }}
                          />
                          {errors_.paper && (
                            <div class="pl-1 text-left">
                              <Typography variant="caption" color="error">
                                {errors_.paper}
                              </Typography>
                            </div>
                          )}
                        </div>
                      </div>
                      {hasError && (
                        <Snackbar
                          open={openCoreError}
                          autoHideDuration={3000}
                          onClose={handleCloseError}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                        >
                          <Alert onClose={handleCloseError} severity="error">
                            Incorrect Key or Password !!
                          </Alert>
                        </Snackbar>
                      )}
                    </>
                  )} */}
                  <div class="col-lg-12 text-center">
                    <button
                      onClick={handleDemoLogin}
                      type="button"
                      class="btn btn-block btn-dark rounded"
                    >
                      Demo LogIn
                    </button>
                    <button
                      onClick={handleSubmit}
                      type="button"
                      class="btn btn-block btn-dark rounded"
                    >
                      Log In
                    </button>
                  </div>
                  <div class="col-lg-12 text-center mt-5">
                    <Link to="/forgot" class="text-danger">
                      {/* <a href="/forgot" class="text-danger"> */}
                      <u>Forgot password?</u>
                    </Link>
                    {/* </a> */}
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

export default connect(null, { login })(LoginPage);
