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
import {
  getAcceptedRedeem,
  acceptRedeemRequest,
} from "../../store/redeem/action";
import FemaleImage from '../../assets/images/users/female.png'
import $ from "jquery";

//custom css
import "../../dist/css/style.min.css";
import "../../dist/css/style.css";

//MUI
import { TablePagination } from "@material-ui/core";

import TablePaginationActions from "./TablePagination";

const RedeemTable = (props) => {
  const dispatch = useDispatch();

  const [data, setData] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const redeem = useSelector((state) => state.redeem.acceptedRedeem);

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



  const id = props.match.params.id;

  useEffect(() => {
    dispatch(getAcceptedRedeem(id));
  }, [dispatch]);

  useEffect(() => {
    setData(redeem);
  }, [redeem]);

  const handleSearch = (e) => {
    const value = e.target.value.toUpperCase();
    if (value) {
      const data = redeem.filter((data) => {
        return (
          data?.host_id.name?.toUpperCase()?.indexOf(value) > -1 ||
          data?.paymentGateway?.toUpperCase()?.indexOf(value) > -1 ||
          data?.host_id.username?.toUpperCase()?.indexOf(value) > -1 ||
          data?.description?.toUpperCase()?.indexOf(value) > -1
        );
      });
      setData(data);
    } else {
      return setData(redeem);
    }
  };
  $(document).ready(function () {
    $("img").bind("error", function () {
      // Set the default image
      $(this).attr("src", FemaleImage);
    });
  });

  const { setting } = useSelector(
    (state) => state.setting
  );

  return (
    <>
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-8 mt-4 float-left">
                    <h3 class="card-title">Recharge History</h3>
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
                        <th>User Id</th>
                        <th>User Name</th>
                        <th>Transaction Id</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Create At</th>
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
                                  {data.userId}
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                  {data.name}
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                  {data.transactionId}
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                  {data.amount}
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                  {data.status}
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                  {dayjs(data.createAt).format("DD MMM, YYYY")}
                                </td>
                                <td style={{ verticalAlign: "middle" }}>
                                  {dayjs(data.createAt).format("DD MMM, YYYY")}
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
                        <th>Image</th>
                        <th>User Name</th>
                        <th>Payment Gateway</th>
                        <th>Coin</th> <th>Rupee</th>
                        <th>Description</th>
                        <th>Accepted On</th>
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
  getAcceptedRedeem,
  acceptRedeemRequest,
})(RedeemTable);
