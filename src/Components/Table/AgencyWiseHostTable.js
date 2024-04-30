import React, { Fragment, useEffect, useState } from "react";

//router
import { Link, useHistory } from "react-router-dom";

//dayjs
import dayjs from "dayjs";

//redux
import { connect, useDispatch, useSelector } from "react-redux";
import { getAgencyWiseHost } from "../../store/host/action";
import { getSetting } from "../../store/setting/action";
//custom css
import "../../dist/css/style.min.css";
import "../../dist/css/style.css";

//MUI
import { TablePagination } from "@material-ui/core";
import TablePaginationActions from "./TablePagination";

const HostTable = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [data, setData] = useState([]);

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
  const { agencyWiseHost } = useSelector((state) => state.host);
  const hasPermission = useSelector((state) => state.admin.user.flag);
  const { setting } = useSelector((state) => state.setting);
  useEffect(() => {
    dispatch(getAgencyWiseHost());
    dispatch(getSetting());
  }, [dispatch]);

  useEffect(() => {
    setData(agencyWiseHost);
  }, [agencyWiseHost]);

  const handleSearch = (e) => {
    const value = e.target.value.toUpperCase();
    if (value) {
      const data = agencyWiseHost.filter((data) => {
        return data?.name?.toUpperCase()?.indexOf(value) > -1;
      });
      setData(data);
    } else {
      return setData(agencyWiseHost);
    }
  };

  const showHost = (id) => {
    sessionStorage.setItem("agencyId", id);
    history.push("/admin/host");
  };

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
                    Agency wise Host
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
                    <h3 class="card-title">Agency wise Host</h3>
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
                        <th>Agency Name</th>
                        <th>Total Host</th>
                        <th>Total Earning Coin</th>
                        <th>Total Pay Rupee</th>
                        <th>Created At</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.length > 0 ? (
                        <>
                          {(rowsPerPage > 0
                            ? data.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                            : data
                          ).map((data, index) => {
                            return (
                              <tr key={index}>
                                <td> {data.name} </td>
                                <td> {data.count} </td>
                                <td> {data.earningCoin} </td>
                                <td>
                                  {" "}
                                  {data.earningCoin / setting?.howManyCoins}
                                  &nbsp; {setting?.currency}{" "}
                                </td>
                                <td>
                                  {" "}
                                  {dayjs(data.createdAt).format(
                                    "DD MMM, YYYY"
                                  )}{" "}
                                </td>
                                <td>
                                  <button
                                    type="button"
                                    class="btn btn-fill btn-primary btn-sm"
                                    style={{ borderRadius: 5 }}
                                    onClick={() => showHost(data._id)}
                                  >
                                    Host Detail
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </>
                      ) : (
                        <tr>
                          <td colSpan="6" align="center">
                            Nothing to show!!
                          </td>
                        </tr>
                      )}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>Agency Name</th>
                        <th>Total Host</th>
                        <th>Total Earning Coin</th>
                        <th>Total Pay Rupee</th>
                        <th>Created At</th>
                        <th>Action</th>
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

export default connect(null, { getAgencyWiseHost, getSetting })(HostTable);
