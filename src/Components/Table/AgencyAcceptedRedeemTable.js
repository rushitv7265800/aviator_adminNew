// (window, $);
import React, { Fragment, useEffect, useState } from "react";

//router
import { Link } from "react-router-dom";

//dayjs
import dayjs from "dayjs";

//alert
import { permissionError } from "../../util/alert";

//redux
import { connect, useDispatch, useSelector } from "react-redux";
import { getAgencyAcceptedRedeem } from "../../store/redeem/action";

//datatable
import $ from "jquery";

//custom css
import "../../dist/css/style.min.css";
import "../../dist/css/style.css";

//MUI
import { TablePagination } from "@material-ui/core";

import TablePaginationActions from "./TablePagination";

const AgencyAcceptedRedeemTable = (props) => {
  const dispatch = useDispatch();

  const [data, setData] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const redeem = useSelector((state) => state.redeem.agencyAcceptedRedeem);

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
    dispatch(getAgencyAcceptedRedeem());
  }, [dispatch]);

  useEffect(() => {
    setData(redeem);
  }, [redeem]);

  const handleSearch = (e) => {
    const value = e.target.value.toUpperCase();
    if (value) {
      const data = redeem.filter((data) => {
        return data?.name?.toUpperCase()?.indexOf(value) > -1;
      });
      setData(data);
    } else {
      return setData(redeem);
    }
  };

  const { setting } = useSelector((state) => state.setting);

  return (
    <>
      <div class="page-breadcrumb">
        <div class="row">
          <div class="col-7 align-self-center">
            <div class="d-flex align-items-center">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb m-0 p-0">
                  <li class="breadcrumb-item"></li>
                  <li
                    class="breadcrumb-item text-muted active"
                    aria-current="page"
                  >
                    Agency Pending Redeem
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-8 mt-4 float-left">
                    <h3 class="card-title">Accepted Redeem Request</h3>
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
                        <th>Name</th>
                        <th>Count</th>
                        <th>View Detail</th>
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
                                  {data.name}
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                  {data.count}
                                </td>

                                <td style={{ verticalAlign: "middle" }}>
                                  <Link
                                    to={
                                      "/admin/redeem_/accepted/agency/" +
                                      data._id
                                    }
                                  >
                                    <button
                                      type="button"
                                      class="btn waves-effect waves-light btn-primary btn-sm"
                                      data-toggle="modal"
                                      style={{ borderRadius: 5 }}
                                      // onClick={() => redeemRequest(data)}
                                    >
                                      <i class="fas fa-eye"></i> View Detail
                                    </button>
                                  </Link>
                                </td>
                              </tr>
                            );
                          })}
                        </Fragment>
                      ) : (
                        <tr>
                          <td colSpan="8" align="center">
                            Nothing to show!!
                          </td>
                        </tr>
                      )}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>Name</th>
                        <th>Count</th>

                        <th>View Detail</th>
                      </tr>
                    </tfoot>
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
    </>
  );
};

export default connect(null, {
  getAgencyAcceptedRedeem,
})(AgencyAcceptedRedeemTable);
