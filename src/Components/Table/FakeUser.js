/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useEffect, useState } from "react";

//router
import { Link, useHistory } from "react-router-dom";

//alert
import { permissionError } from "../../util/alert";

//server path
import { baseURL } from "../../util/serverPath";

//dialog
import HostDialog from "../Dialog/hostDialog";

import $ from "jquery"
import IOSSwitch from "@material-ui/core/Switch";

//dayjs
import dayjs from "dayjs";

//redux
import { useDispatch, connect, useSelector } from "react-redux";
import { getHost, blockUnblockHost, extraBonus } from "../../store/host/action";
import { getAllFakeHost, handleOnlineSwitch } from "../../store/fakeHost/action";

import {
  OPEN_FAKE_HOST_DIALOG,
  CLOSE_FAKE_HOST_DIALOG,
  UNSET_UPDATE_AGENCY_DONE,
  UNSET_CREATE_AGENCY_DONE
} from "../../store/fakeHost/types"

//custom css
import "../../dist/css/style.min.css";
import "../../dist/css/style.css";

//MUI
import { Snackbar, TablePagination } from "@material-ui/core";
import TablePaginationActions from "./TablePagination";
import { Alert } from "@material-ui/lab";
import FakeHostDialog from "../Dialog/FakeHostDialog";

import male from "../../assets/images/male.png"

const FakeUser = (props) => {
  //   const agencyId = sessionStorage.getItem("agencyId");
  const { fakeHost, total } = useSelector((state) => state.fakeHost)
  const dispatch = useDispatch();
  const history = useHistory();
  const [data, setData] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openUpdateSuccess, setOpenUpdateSuccess] = useState(false);

  const [status, setStatus] = useState("")



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const { host, createDone, updateDone } = useSelector((state) => state.host);
  const hasPermission = useSelector((state) => state.admin.user.flag);

  useEffect(() => {
    dispatch(getAllFakeHost());
  }, []);

  useEffect(() => {
    setData(fakeHost);
    console.log("fakeHost", fakeHost);
  }, [fakeHost]);

  const blockUnblock = (data) => {
    if (!hasPermission) return permissionError();
    props.blockUnblockHost(data?._id);
  };

  const handleOpen = () => {
    dispatch({ type: OPEN_FAKE_HOST_DIALOG });
  };

  const handleEdit = (data) => {
    dispatch({ type: OPEN_FAKE_HOST_DIALOG, payload: data });
  };

  useEffect(() => {
    if (createDone) {
      setOpenSuccess(true);
      dispatch({ type: UNSET_CREATE_AGENCY_DONE });
    }
  }, [createDone, dispatch]);
  useEffect(() => {
    if (updateDone) {
      setOpenUpdateSuccess(true);
      dispatch({ type: UNSET_UPDATE_AGENCY_DONE });
    }
  }, [updateDone, dispatch]);

  const handleSearch = (e) => {
    const value = e.target.value.toUpperCase();
    if (value) {
      const data = host.filter((data) => {
        return (
          data?.name?.toUpperCase()?.indexOf(value) > -1 ||
          data?.country?.toUpperCase()?.indexOf(value) > -1 ||
          data?.bio?.toUpperCase()?.indexOf(value) > -1
        );
      });
      setData(data);
    } else {
      return setData(host);
    }
  };

  const liveSwitch = (id) => {

    if (!hasPermission) return permissionError();
    props.handleOnlineSwitch(id);
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };
  const handleCloseUpdateSuccess = () => {
    setOpenUpdateSuccess(false);
  };

  useEffect(() => {
    if (status === "online") {
      const data = host.filter((data) =>
        data.isOnline
      );
      setData(data);
    }
    else if (status === "live") {
      const data = host.filter((data) =>
        data.isLive
      );
      setData(data);
    } else {
      return setData(host);
    }
  }, [status])


  $(document).ready(function () {
    $("img").bind("error", function () {
      // Set the default image
      $(this).attr("src", male);
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
            <b>Success!</b> Host add successfully.
          </span>
        </Alert>
      </Snackbar>
      <Snackbar
        open={openUpdateSuccess}
        autoHideDuration={3000}
        onClose={handleCloseUpdateSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseUpdateSuccess} severity="success">
          <span style={{ color: "#184d47" }}>
            <b>Success!</b> Host update successfully.
          </span>
        </Alert>
      </Snackbar>

      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-6">
                    <h4 class="card-title mb-4">Fake User</h4>
                  </div>
                  <div class="col-6"></div>
                </div>
                {/* <div class="container"> */}
                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-8 mt-3 float-left mb-0">
                    <button
                      type="button"
                      class="btn waves-effect waves-light btn-primary btn-sm float-left mt-2"
                      data-toggle="modal"
                      data-target="#country-modal"
                      style={{ borderRadius: 5 }}
                      onClick={handleOpen}
                    >
                      <i class="fas fa-plus"></i> New
                    </button>
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
                        // onChange={handleSearch}
                        />
                      </div>
                    </form>
                  </div>
                </div>

                <div class="table-responsive">
                  <table
                    id="zero_config"
                    class="table table-striped table-bordered no-wrap"
                  >
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Unique Id</th>
                        <th>Wallet</th>
                        <th>Country</th>
                        {/* <th>IsLive</th> */}
                        <th>Created At</th>
                        {/* <th>Block</th> */}
                        <th>Edit</th>
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
                                <td>
                                  {
                                    <img
                                      src={data.image}
                                      width="70px"
                                      height="70px"
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
                                  {data?.uniqueId}
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                  {data?.coin}
                                </td>

                                <td style={{ verticalAlign: "middle" }}>
                                  {data?.country}
                                </td>

                                {/* <td style={{ verticalAlign: "middle" }}>
                                  <IOSSwitch
                                    onChange={()=>liveSwitch(data?._id)}
                                    checked={data?.isLive === true}
                                    color="primary"
                                    className="ms-2"
                                  />
                                </td> */}

                                <td style={{ verticalAlign: "middle" }}>
                                  {dayjs(data?.createdAt).format("DD MMM, YYYY")}
                                </td>

                                {/* <td
                                  align="center"
                                  style={{ verticalAlign: "middle" }}
                                >
                                  <label class="switch">
                                    <input
                                      type="checkbox"
                                      checked={data?.block}
                                      onChange={() => blockUnblock(data)}
                                    />
                                    <span class="slider">
                                      <p
                                        style={{
                                          fontSize: 12,
                                          marginLeft: `${data.block ? "-25px" : "25px"
                                            }`,
                                          color: "white",
                                          marginTop: "6px",
                                        }}
                                      >
                                        {data?.block ? "Yes" : "No"}
                                      </p>
                                    </span>
                                  </label>
                                </td> */}

                                <td style={{ verticalAlign: "middle" }}>
                                  <a
                                    class="ml-3"
                                    onClick={() => handleEdit(data)}
                                    style={{ cursor: "pointer" }}
                                  >
                                    <i class="fas fa-edit text-primary mr-3"></i>
                                  </a>

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
                    count={total}
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
      <FakeHostDialog />
    </Fragment>
  );
};

export default connect(null, { getHost, blockUnblockHost, extraBonus, handleOnlineSwitch })(
  FakeUser
);
