// (window, $);
import React, { Fragment, useEffect, useState } from "react";

//router
import { Link } from "react-router-dom";

//category dialog
import AgencyDialog from "../Dialog/agencyDialog";

//dayjs
import dayjs from "dayjs";

//alert
import { warning, alert, permissionError } from "../../util/alert";

//redux
import { useDispatch, connect, useSelector } from "react-redux";
import { getAgency, enableDisableAgency } from "../../store/agency/action";
import {
  OPEN_AGENCY_DIALOG,
  UNSET_CREATE_AGENCY_DONE,
  UNSET_UPDATE_AGENCY_DONE,
} from "../../store/agency/types";

//datatable
import $ from "jquery";

//custom css
import "../../dist/css/style.min.css";
import "../../dist/css/style.css";
import FemaleImage from '../../assets/images/users/female.png'
//MUI
import { Snackbar, TablePagination } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import TablePaginationActions from "./TablePagination";

//server path
import { baseURL } from "../../util/serverPath";

const PlanCrash = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openUpdateSuccess, setOpenUpdateSuccess] = useState(false);
  const [openDeleteCount, setOpenDeleteCount] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { agency, createDone, updateDone } = useSelector(
    (state) => state.agency
  );

  const hasPermission = useSelector((state) => state.admin.user.flag);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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


  useEffect(() => {
    dispatch(getAgency());
  }, [dispatch]);

  useEffect(() => {
    setData(agency);
  }, [agency]);

  // $(document).ready(function () {
  //   $("#zero_config").DataTable();
  //   $(".dataTables_empty").empty();
  // });


  const handleOpen = () => {
    // if (!hasPermission) return permissionError();
    dispatch({ type: OPEN_AGENCY_DIALOG });
  };

  const handleEdit = (data) => {
    // if (!hasPermission) return permissionError();
    dispatch({ type: OPEN_AGENCY_DIALOG, payload: data });
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };
  const handleCloseUpdateSuccess = () => {
    setOpenUpdateSuccess(false);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toUpperCase();
    if (value) {
      const data = agency.filter((data) => {
        return (
          data?.name?.toUpperCase()?.indexOf(value) > -1 ||
          data?.email?.toUpperCase()?.indexOf(value) > -1
        );
      });
      setData(data);
    } else {
      return setData(agency);
    }
  };
  $(document).ready(function () {
    $("img").bind("error", function () {
      // Set the default image
      $(this).attr("src", FemaleImage);
    });
  });

  const handleDisable = (data) => {
    if (!hasPermission) return permissionError();
    props.enableDisableAgency(data._id);
  };

  return (
    <>
      <Snackbar
        open={openSuccess}
        autoHideDuration={3000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSuccess} severity="success">
          <span style={{ color: "#184d47" }}>
            <b>Success!</b> Agency add successfully.
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
            <b>Success!</b> Agency update successfully.
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
                    <button
                      type="button"
                      class="btn waves-effect waves-light btn-primary btn-sm"
                      data-toggle="modal"
                      // data-target="#country-modal"
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
                          onChange={handleSearch}
                        />
                      </div>
                    </form>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-8 mt-3 float-left mb-0"></div>
                </div>
                <div class="table-responsive">
                  <table
                    id="zero_config"
                    class="table table-striped table-bordered no-wrap"
                  >
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Title</th>
                        <th>Value</th>
                        <th>Created At</th>
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
                                  {data.name}
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                  {data.code}
                                </td>

                                <td style={{ verticalAlign: "middle" }}>
                                  {dayjs(data.createdAt).format("DD MMM, YYYY")}
                                </td>
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
                          <td colSpan="7" align="center">
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
        <div className="rule">
          <h5>Rules</h5>
<h6><span>Rule 1:</span>Set Value 10 Means 1.0 to 1.9</h6>
<h6><span>Rule 2:</span>Set Value 20 Means 2.0 to 2.9</h6>
<h6><span>Rule 3:</span>Set Value 30 Means 3.0 to 3.9</h6>
<h6><span>Rule 4:</span>Set Value 10 Means 4.0 to 4.9</h6>
<h6><span>Rule 5:</span>Set Value 100 Means Random result</h6>

        </div>
      </div>
      <AgencyDialog />
    </>
  );
};

export default connect(null, {
  getAgency,
  enableDisableAgency,
})(PlanCrash);
