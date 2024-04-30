import React, { Fragment, useEffect, Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./dist/js/sidebarmenu";
//bounce loader
import { BounceLoader } from "react-spinners";

import { Switch, BrowserRouter, Route, useHistory } from "react-router-dom";

import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";
import AuthRoute from "./util/AuthRouter";
import PrivateRoute from "./util/PrivateRouter";
import Admin from "./pages/Admin";

import { SET_ADMIN, UNSET_ADMIN } from "./store/admin/types";

import { IdleTimeoutManager } from "idle-timer-manager";
import Registration from "./pages/Registration";
import UpdateCode from "./pages/UpdateCode";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import Spinner from "./Components/Spinner";

const App = () => {
  const history = useHistory();
  const [login, setLogin] = useState(true);
  const [open, setOpen] = useState(false);
  const isAuth = useSelector((state) => state.admin.isAuth);

  const dispatch = useDispatch();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    axios
      .get("/login")
      .then((res) => {
        setLogin(res.data.login);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const manager = new IdleTimeoutManager({
      timeout: 1800, //expired after 1800 secs (30 min)
      onExpired: (time) => {
        setOpen(true);
      },
    });
    return () => {
      manager.clear();
    };
  }, []);

  useEffect(() => {
    if (!token) {
      return;
    }
    dispatch({ type: SET_ADMIN, payload: token });
  }, [token, dispatch]);

  const handleClose = () => {
    setOpen(false);
    dispatch({ type: UNSET_ADMIN });
    window.location.href = "/loginAdmin";
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{ width: "300px", height: "152px" }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="session-dialog">
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Session TimeOut
            </DialogContentText>
          </DialogContent>
        </div>
        <DialogActions>
          <Button onClick={handleClose}>Log Out</Button>
        </DialogActions>
      </Dialog>
      <Suspense
        fallback={
          <div
            style={{
              width: "100vw",
              height: "100vh",
              display: "flex",
              alignItems: "center",
            }}
          >
            <BounceLoader
              css={`
                margin: auto;
              `}
              size={60}
              color="#3d4977"
            />
          </div>
        }
      >
        
        {" "}
        <BrowserRouter>
          <Switch>
            <AuthRoute
              exact
              path="/"
              component={login ? Login : Registration}
            />
            {isAuth && <Route path="/admin" component={Admin} />}
            {/* <PrivateRoute path="/admin" component={Admin} /> */}
            {/* <AuthRoute exact path="/" component={Login} /> */}
            <AuthRoute exact path="/loginAdmin" component={Login} />
            <AuthRoute exact path="/" component={Login} />
            <Route exact path="/forgot" component={ForgotPassword} />
            <Route exact path="/change/:id" component={ChangePassword} />
            {/* <Route exact path="/register" component={Registration} /> */}
            <AuthRoute path="/code" component={UpdateCode} />
          </Switch>
          <Spinner />
        </BrowserRouter>

      </Suspense>
    </>
  );
};

export default App;
