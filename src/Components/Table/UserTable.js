// (window, $);
import React, { Fragment, useEffect, useState } from "react";

//router
import { Link } from "react-router-dom";

//alert
import { permissionError } from "../../util/alert";

//dayjs
import dayjs from "dayjs";

//redux
import { useDispatch, connect, useSelector } from "react-redux";
import { getUser, blockUnblockUser, editCoin } from "../../store/user/action";

//custom css
import "../../dist/css/style.min.css";
import "../../dist/css/style.css";

//MUI
import { Snackbar, TablePagination } from "@material-ui/core";
import TablePaginationActions from "./TablePagination";
import {
  OPEN_USER_DIALOG,
  UNSET_UPDATE_USER_DONE,
} from "../../store/user/types";
import { baseURL } from "../../util/serverPath";
import $ from "jquery";
import { Alert } from "@material-ui/lab";

import FemaleImage from "../../assets/images/users/female.png";
//edit text
import EdiText from "react-editext";
//dialog
const UserDialog = React.lazy(() => import("../Dialog/userDialog"));

const UserTable = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const [newCoin, setNewCoin] = useState();
  const [isCoin, setIsCoin] = useState(false);

  const [openSuccess, setOpenSuccess] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const { user, updateDone } = useSelector((state) => state.user);
  const hasPermission = useSelector((state) => state.admin.user.flag);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (updateDone) {
      setOpenSuccess(true);
      dispatch({ type: UNSET_UPDATE_USER_DONE });
    }
  }, [updateDone, dispatch]);

  useEffect(() => {
    setData(user);
  }, [user]);

  const blockUnblock = (data) => {
    if (!hasPermission) return permissionError();
    props.blockUnblockUser(data._id);
  };

  const handleUpdateCoin = (coin, id) => {
    setIsCoin(true);
    props.editCoin(id, { coin });
    setOpenSuccess(true);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toUpperCase();
    if (value) {
      const data = user.filter((data) => {
        return (
          data?.name?.toUpperCase()?.indexOf(value) > -1 ||
          data?.username?.toUpperCase()?.indexOf(value) > -1 ||
          data?.country?.toUpperCase()?.indexOf(value) > -1 ||
          data?.uniqueId?.indexOf(value) > -1
        );
      });
      setData(data);
    } else {
      return setData(user);
    }
  };

  const handleEdit = (data) => {
    dispatch({ type: OPEN_USER_DIALOG, payload: data });
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };

  $(document).ready(function () {
    $("img").bind("error", function () {
      // Set the default image
      $(this).attr("src", FemaleImage);
    });
  });

  return (
    <Fragment>
      <Snackbar
        open={openSuccess}
        autoHideDuration={3000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSuccess} severity="success">
          <span style={{ color: "#184d47" }}>
            <b>Success!</b> User updated successfully.
          </span>
        </Alert>
      </Snackbar>
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-8 mt-4 float-left">
                    <h3 class="card-title">User List</h3>
                  </div>
                  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 mt-3 float-right">
                    <form action="">
                      <div class="input-group mb-4 border rounded-pill p-1">
                        <div class="input-group-prepend border-0">
                          <div
                            id="button-addon4"
                            class="btn btn-link text-primary"
                          >
                            <i class="fa fa-search"></i>
                          </div>
                        </div>
                        <input
                          type="search"
                          placeholder="What're you searching for?"
                          aria-describedby="button-addon4"
                          class="form-control bg-none border-0 rounded-pill mr-1"
                          onChange={handleSearch}
                        />
                      </div>
                    </form>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-8 mt-3 float-left mb-0"></div>
                </div>
                {/* <hr class=" mb-4" />   */}
                {/* <div class="col-3"> */}

                {/* </div> */}
                <div class="table-responsive">
                  <table
                    id="zero_config"
                    class="table table-striped table-bordered no-wrap"
                  >
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>User Id</th>
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>Email</th>
                        <th>Wallet</th>
                        <th>Last Recharge</th>
                        <th>Status</th>
                        <th>Country</th>
                        <th>IP Address</th>
                        <th>Last Login</th>
                        <th>CreatedAt</th>
                        <th>Is Block</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.length > 0 ? (
                        <Fragment>
                          {(rowsPerPage > 0
                            ? data.slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            : data
                          ).map((data, index) => {
                            return (
                              <tr key={index}>
                                <td style={{ verticalAlign: "middle" }}>
                                  {(page * rowsPerPage) + (index + 1)}
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                  {data.uniqueId}
                                </td>
                                <td>
                                  {
                                    <img
                                      // src={
                                      //   data.gender.toLowerCase() === "male"
                                      //     ? `${baseURL}/storage/male.png`
                                      //     : `${baseURL}/storage/female.png`
                                      // }
                                      src={data.image}
                                      width="60px"
                                      height="60px"
                                      alt="img"
                                      style={{
                                        objectFit: "contain",
                                        borderRadius: "50%",
                                        border: " 1px solid #808080",
                                      }}
                                      class="mr-3"
                                    />
                                  }
                                  {data.name}
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                  {data?.mobile ? data?.mobile :"1234567890"}
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                  {data?.name+"@gmail.com"}
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                  {"$20"}
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                  <EdiText
                                    type="text"
                                    value={isCoin ? newCoin : data.coin}
                                    onSave={(val) =>
                                      handleUpdateCoin(val, data._id, data.coin)
                                    }
                                  />
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                  {data.isOnline ? (
                                    <span className="text-success font-weight-bold">
                                      Online
                                    </span>
                                  ) : (
                                    <span className="text-danger font-weight-bold">
                                      Offline
                                    </span>
                                  )}
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                  {data.country}
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                  {data.IPAddress}
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                  {dayjs(data.lastLoginDate).format(
                                    "DD MMM, YYYY"
                                  )}
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                  {dayjs(data.createdAt).format("DD MMM, YYYY")}
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                  <label class="switch">
                                    <input
                                      type="checkbox"
                                      checked={data.block}
                                      onChange={() => blockUnblock(data)}
                                    />
                                    <span class="slider">
                                      <p
                                        style={{
                                          fontSize: 12,
                                          marginLeft: `${data.block ? "5px" : "33px"
                                            }`,
                                          color: "white",
                                          marginTop: "6px",
                                        }}
                                      >
                                        {data.block ? "Yes" : "No"}
                                      </p>
                                    </span>
                                  </label>
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                  <a
                                    onClick={() => handleEdit(data)}
                                    style={{ cursor: "pointer" }}
                                  >
                                    <i class="fas fa-edit text-primary mr-3"></i>
                                  </a>

                                  {/* <a href="#">
                                <i class="fas fa-trash-alt text-danger"></i>
                              </a> */}
                                </td>
                              </tr>
                            );
                          })}
                        </Fragment>
                      ) : (
                        <tr>
                          <td colSpan="12" align="center">
                            Nothing to show!!
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div class="py-2">
                  <TablePagination
                    id="pagination"
                    component="div"
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      100,
                      { label: "All", value: -1 },
                    ]}
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { "aria-label": "rows per page" },
                      native: true,
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <UserDialog />
    </Fragment>
  );
};

export default connect(null, { getUser, blockUnblockUser, editCoin })(
  UserTable
);
