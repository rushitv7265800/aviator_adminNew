import React, { Fragment, useState, useEffect } from "react";

//alert
import { permissionError } from "../../util/alert";

//redux
import { useSelector, useDispatch, connect } from "react-redux";
import { CLOSE_AGENCY_DIALOG } from "../../store/agency/types";
import { createNewAgency, editAgency } from "../../store/agency/action";

//server path
import { baseURL } from "../../util/serverPath";

//custom css
import "../../dist/css/style.min.css";
import "../../dist/css/style.css";

//custom javascript
import "../../dist/js/custom.min.js";
import "../../dist/js/app-style-switcher";
import "../../dist/js/sidebarmenu";
import "../../dist/js/feather.min.js";
import "../../assets/libs/perfect-scrollbar/dist/perfect-scrollbar.jquery.min.js";

//icon
import Cancel from "@material-ui/icons/Cancel";
import {
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";

//dialog
import Dialog from "@material-ui/core/Dialog";

const AgencyDialog = (props) => {
  const dispatch = useDispatch();
  const hasPermission = useSelector((state) => state.admin.user.flag);

  const {
    dialog: open,
    dialogData,
    agency,
  } = useSelector((state) => state.agency);

  const [imageData, setImageData] = useState([]);
  const [imagePath, setImagePath] = useState(null);
  const [mongoId, setMongoId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState({
    value: "",
    show: false,
  });
  const [code, setCode] = useState("");

  const [errors, setError] = useState({
    name: "",
    email: "",
    password: "",
    code: "",
    image: "",
    mobileNo: "",
  });

  useEffect(() => {
    if (dialogData) {
      setMongoId(dialogData?._id);
      setName(dialogData?.name);
      setImagePath(baseURL + "/" + dialogData?.image);
      setEmail(dialogData?.email);
      setPassword({ value: dialogData?.password });
      setCode(dialogData?.code);
      setMobileNo(dialogData?.mobileNo);
    }
  }, [dialogData]);

  const removeImage = () => {
    setImageData([]);
    setImagePath(null);
  };

  useEffect(
    () => () => {
      setError({
        name: "",
        email: "",
        password: "",
        code: "",
        image: "",
        mobileNo: "",
      });
      setMongoId("");
      setName("");
      setEmail("");
      setPassword("");
      setCode("");
      setMobileNo("");
      setImageData([]);
      setImagePath(null);
    },
    [open]
  );

  const handleInputImage = (e) => {
    if (e.target.files[0]) {
      setImageData(e.target.files[0]);
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        setImagePath(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleShowPassword = () => {
    setPassword({ ...password, show: !password.show });
  };

  const createCode = () => {
    const randomChars = "0123456789";
    let code_ = "";
    for (let i = 0; i < 6; i++) {
      code_ += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
      setCode(code_);
    }
  };

  const createPassword = () => {
    const randomChars = "0123456789";
    let pass = "";
    for (let i = 0; i < 10; i++) {
      pass += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
      setPassword({ value: pass });
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const mobileRegex = /^[0-9]{10,12}$/;

  const isEmail = (value) => {
    const val = value === "" ? 0 : value;
    const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      val
    );
    return emailValid;
  };

  const handleSubmit = (e) => {
    const emailValid = isEmail(email);
    if (
      !name ||
      !email ||
      !password.value ||
      !code ||
      !emailValid ||
      !mobileNo
    ) {
      const errors = {};
      if (!name) {
        errors.name = "Name can't be a blank!";
      }
      if (!email) {
        errors.email = "Email can't be blank!";
      } else if (!emailValid) {
        errors.email = "Invalid email address!";
      }
      if (!password.value) {
        errors.password = "Password can't be a blank!";
      }
      if (!code) {
        errors.code = "Code can't be a blank!";
      }
      if (!mobileNo) {
        errors.mobileNo = "Mobile No can't be blank!";
      } else if (!mobileRegex.test(mobileNo)) {
        errors.mobileNo = "Invalid mobile number!";
      }

      if (imageData) {
        errors.image = "Please select an Image!";
      }

      return setError({ ...errors });
    }
    if (code.toString().length > 6) {
      return setError({
        ...errors,
        code: "Maximum 6 Digits are Allowed!",
      });
    }

    if (code.toString().length < 6) {
      return setError({
        ...errors,
        code: "Minimum 6 Digits are Allowed!",
      });
    }

    if (!mongoId) {
      const index = agency.findIndex(
        (agency) => agency.code.toString() === code
      );
      if (index > -1) {
        return setError({ ...errors, code: "Code already exist." });
      }
      if (imageData.length === 0 || !imagePath) {
        return setError({ ...errors, image: "Please select an Image!" });
      }
    } else {
      const index = agency.find((agency) => agency.code.toString() === code);
      if (index !== undefined) {
        if (index._id === mongoId) {
        } else {
          return setError({ ...errors, code: "Code already exist." });
        }
      }
      if (imageData?.length == 0 || !imagePath) {
        return setError({ ...errors, image: "Please select an Image!" });
      }
    }

    if (mobileNo.length < 10 || mobileNo.length > 12) {
      return setError({ ...errors, mobileNo: "Invalid Number!" });
    }

    if (!hasPermission) return permissionError();

    const formData = new FormData();
    formData.append("image", imageData);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password.value);
    formData.append("code", code);
    formData.append("mobileNo", mobileNo);

    if (mongoId) {
      props.editAgency(formData, mongoId);
    } else {
      props.createNewAgency(formData);
    }
  };

  const closePopup = () => {
    dispatch({ type: CLOSE_AGENCY_DIALOG });
  };

  return (
    <Fragment>
      <Dialog
        open={open}
        aria-labelledby="responsive-dialog-title"
        onClose={closePopup}
        disableBackdropClick
        disableEscapeKeyDown
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="responsive-dialog-title">Agency</DialogTitle>

        <IconButton
          style={{
            position: "absolute",
            right: 0,
            color: "#5E72E4",
          }}
        >
          <Tooltip title="Close">
            <Cancel onClick={closePopup} />
          </Tooltip>
        </IconButton>
        <DialogContent>
          <div class="modal-body pt-1 px-1 pb-3">
            <div class="d-flex flex-column text-center">
              <form>
                <div class="form-group">
                  <label class="float-left">Name</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Name"
                    required
                    value={name}
                    onKeyPress={handleKeyPress}
                    onChange={(e) => {
                      setName(e.target.value.trim());

                      if (!e.target.value) {
                        return setError({
                          ...errors,
                          name: "Name can't be a blank!",
                        });
                      } else {
                        return setError({
                          ...errors,
                          name: "",
                        });
                      }
                    }}
                  />
                  {errors.name && (
                    <div class="pl-1 text-left">
                      <Typography variant="caption" color="error">
                        {errors.name}
                      </Typography>
                    </div>
                  )}
                </div>

                <div class="form-group">
                  <label class="float-left">Image</label>
                  <input
                    class="form-control"
                    type="file"
                    accept="image/jpg ,image/jpeg ,image/png"
                    required=""
                    onChange={handleInputImage}
                  />
                  {errors.image && (
                    <div class="pl-1 text-left">
                      <Typography variant="caption" color="error">
                        {errors.image}
                      </Typography>
                    </div>
                  )}
                  <div className="row mb-0 ml-2">
                    {imagePath && (
                      <Fragment>
                        <img
                          src={imagePath}
                          class="mt-3 rounded float-left mb-2"
                          height="50px"
                          width="50px"
                        />
                      </Fragment>
                    )}
                  </div>
                </div>
                <div class="form-group ">
                  <div class="row">
                    <div class="col-md-6">
                      <label class="float-left">Email</label>
                      <input
                        type="email"
                        class="form-control"
                        placeholder="Enter Email"
                        required
                        value={email}
                        onKeyPress={handleKeyPress}
                        onChange={(e) => {
                          setEmail(e.target.value.trim());

                          if (!e.target.value) {
                            return setError({
                              ...errors,
                              email: "Email can't be a blank!",
                            });
                          } else {
                            return setError({
                              ...errors,
                              email: "",
                            });
                          }
                        }}
                      />
                      {errors.email && (
                        <div class="pl-1 text-left">
                          <Typography variant="caption" color="error">
                            {errors.email}
                          </Typography>
                        </div>
                      )}
                    </div>
                    <div class="col-md-6">
                      <label class="float-left">Mobile No</label>
                      <input
                        type="number"
                        class="form-control"
                        placeholder="Enter Mobile No"
                        required
                        min="0"
                        value={mobileNo}
                        onKeyPress={handleKeyPress}
                        onChange={(e) => {
                          setMobileNo(
                            (e.target.value = Math.max(
                              0,
                              parseInt(e.target.value)
                            )
                              .toString()
                              .slice(0, 10))
                          );
                          if (!e.target.value) {
                            return setError({
                              ...errors,
                              mobileNo: "mobile No is Required!",
                            });
                          } else {
                            return setError({ ...errors, mobileNo: "" });
                          }
                        }}
                      />
                      {errors.mobileNo && (
                        <div class="pl-1 text-left">
                          <Typography variant="caption" color="error">
                            {errors.mobileNo}
                          </Typography>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div class="row d-flex">
                  <div class="col-md-9">
                    <div class="form-group">
                      <label class="float-left">Password</label>
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="basic-addon1">
                            {password.show ? (
                              <i
                                class="fas fa-eye icon"
                                onClick={handleShowPassword}
                              ></i>
                            ) : (
                              <i
                                class="fas fa-eye-slash icon"
                                onClick={handleShowPassword}
                              ></i>
                            )}
                          </span>
                        </div>
                        <input
                          readOnly
                          type={password.show ? "text" : "password"}
                          class="form-control"
                          placeholder="Enter Password"
                          required
                          onKeyPress={handleKeyPress}
                          value={password.value}
                          onChange={(e) => {
                            setPassword({ value: e.target.value });

                            if (!e.target.value) {
                              return setError({
                                ...errors,
                                password: "Password can't be a blank!",
                              });
                            } else {
                              return setError({
                                ...errors,
                                password: "",
                              });
                            }
                          }}
                        />
                      </div>
                      {errors.password && (
                        <div class="pl-1 text-left">
                          <Typography variant="caption" color="error">
                            {errors.password}
                          </Typography>
                        </div>
                      )}
                    </div>
                  </div>
                  <div class="col-md-3 pl-0">
                    <label class="float-right text-white"> AUTO </label>

                    <button
                      type="button"
                      class="btn btn-fill btn-warning btn-sm ml-2 mt-lg-2 float-left"
                      style={{ borderRadius: 5 }}
                      onClick={createPassword}
                    >
                      Auto Generate
                    </button>
                  </div>
                </div>
                <div class="row d-flex">
                  <div class="col-md-9">
                    <div class="form-group">
                      <label class="float-left">Agency Code</label>
                      <input
                        readOnly
                        type="number"
                        class="form-control"
                        placeholder="Enter Code"
                        required
                        value={code}
                        onKeyPress={handleKeyPress}
                        onChange={(e) => {
                          setCode(e.target.value);

                          if (!e.target.value) {
                            return setError({
                              ...errors,
                              code: "Code can't be a blank!",
                            });
                          } else {
                            return setError({
                              ...errors,
                              code: "",
                            });
                          }
                        }}
                      />
                      {errors.code && (
                        <div class="pl-1 text-left">
                          <Typography variant="caption" color="error">
                            {errors.code}
                          </Typography>
                        </div>
                      )}
                    </div>
                  </div>

                  <div class="col-md-3 pl-0">
                    <label class="float-right text-white"> AUTO </label>

                    <button
                      type="button"
                      class="btn btn-fill btn-warning btn-sm ml-2 mt-lg-2 float-left"
                      style={{ borderRadius: 5 }}
                      onClick={createCode}
                    >
                      Auto Generate
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  class="btn btn-primary btn-block btn-round"
                  onClick={handleSubmit}
                  onKeyPress={handleKeyPress}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default connect(null, { createNewAgency, editAgency })(AgencyDialog);
