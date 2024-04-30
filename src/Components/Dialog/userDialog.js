import React, { Fragment, useState, useEffect } from "react";

//alert
import { permissionError } from "../../util/alert";

//redux
import { useSelector, useDispatch, connect } from "react-redux";
import { CLOSE_USER_DIALOG } from "../../store/user/types";
import { editUser } from "../../store/user/action";

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

const HostDialog = (props) => {
  const dispatch = useDispatch();
  const hasPermission = useSelector((state) => state.admin.user.flag);

  const { dialog: open, dialogData, user } = useSelector((state) => state.user);

  const [imageData, setImageData] = useState(null);
  const [imagePath, setImagePath] = useState(null);
  const [mongoId, setMongoId] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [username, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [country, setCountry] = useState("");
  // const [coin, setCoin] = useState(0);
  const [mobileNo, setMobileNo] = useState("");
  const [errors, setError] = useState({
    name: "",
    image: "",
    username: "",
    // bio: "",
    gender: "",
    country: "",
  });

  useEffect(() => {
    if (dialogData) {
    console.log('dialogData', dialogData)
      setMongoId(dialogData?._id);
      setUserName(dialogData.username);
      setCountry(dialogData.country);
      setName(dialogData?.name);
      setImagePath(dialogData?.image);
      setGender(dialogData.gender);
      setBio(dialogData.bio);
      // setCoin(dialogData.coin);
      setMobileNo(dialogData.mobileNo);
    }
  }, [dialogData]);

  useEffect(
    () => () => {
      setError({
        name: "",
        image: "",
        username: "",
        // bio: "",
        gender: "",
        country: "",
      });
      setMongoId("");
      setGender("");
      setName("");
      setCountry("");
      setUserName("");
      setBio("");
      // setCoin(0);
      setMobileNo("");
      setImageData(null);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !username || gender === "" || !country) {
      const errors = {};
      if (!name) {
        errors.name = "Name can't be a blank!";
      }
      if (!username) {
        errors.username = "User Name can't be a blank!";
      }

      if (!country) errors.country = "Country can't be a blank!";

      if (!imageData && !imagePath) {
        errors.image = "Please select an Image!";
      }

      if (gender === "") {
        errors.gender = "Please select a Gender!";
      }

      return setError({ ...errors });
    }

    if (!hasPermission) return permissionError();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("image", imageData);
    formData.append("username", name);
    formData.append("bio", bio);
    formData.append("gender", gender);
    // formData.append("coin", coin);
    formData.append("mobileNo", mobileNo);
    formData.append("country", country);

    if (mongoId) {
      props.editUser(formData, mongoId);
    } else {
      props.createNewHost(formData);
    }
  };

  const closePopup = () => {
    dispatch({ type: CLOSE_USER_DIALOG });
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
        <DialogTitle id="responsive-dialog-title"  >
          User
        </DialogTitle>

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
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label class="float-left">Name</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter Name"
                        required
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);

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
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label class="float-left">UserName</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter Username"
                        required
                        value={username}
                        onChange={(e) => {
                          setUserName(e.target.value);

                          if (!e.target.value) {
                            return setError({
                              ...errors,
                              username: "User Name can't be a blank!",
                            });
                          } else {
                            return setError({
                              ...errors,
                              username: "",
                            });
                          }
                        }}
                      />
                      {errors.username && (
                        <div class="pl-1 text-left">
                          <Typography variant="caption" color="error">
                            {errors.username}
                          </Typography>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div class="form-group ">
                  <label class="float-left">Bio</label>
                  <textarea
                    type="text"
                    rows="3"
                    class="form-control"
                    placeholder="Enter bio"
                    required
                    value={bio}
                    onChange={(e) => {
                      setBio(e.target.value);

                      // if (!e.target.value) {
                      //   return setError({
                      //     ...errors,
                      //     bio: "Bio can't be a blank!",
                      //   });
                      // } else {
                      //   return setError({
                      //     ...errors,
                      //     bio: "",
                      //   });
                      // }
                    }}
                  />
                  {/* {errors.bio && (
                    <div class="pl-1 text-left">
                      <Typography variant="caption" color="error">
                        {errors.bio}
                      </Typography>
                    </div>
                  )} */}
                </div>

                <div class="row">
                  <div class="col-md-6">
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
                  </div>
                  <div class="col-md-6">
                    <label class="float-left">Gender</label>
                    <div className="row" style={{ marginTop: 43 }}>
                      <div className="col-md-6 p-0" style={{ marginLeft: -23 }}>
                        <input
                          type="radio"
                          id="customRadioInline1"
                          name="gender"
                          value="MALE"
                          checked={
                            gender.toUpperCase() === "MALE" ? true : false
                          }
                          onChange={(e) => setGender(e.target.value)}
                        />
                        &nbsp;&nbsp;
                        <label
                          for="customRadioInline1"
                          class="font-weight-bold"
                        >
                          Male
                        </label>
                      </div>
                      <div className="col-md-6 p-0" style={{ marginLeft: -40 }}>
                        <input
                          type="radio"
                          id="customRadioInline2"
                          name="gender"
                          value="FEMALE"
                          checked={
                            gender.toUpperCase() === "FEMALE" ? true : false
                          }
                          onChange={(e) => setGender(e.target.value)}
                        />
                        &nbsp;&nbsp;
                        <label
                          for="customRadioInline2"
                          class="font-weight-bold"
                        >
                          Female
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  {/* <div class="col-md-6">
                    <div class="form-group">
                      <label class="float-left">Coin</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter Name"
                        required
                        value={coin}
                        onChange={(e) => {
                          setCoin(e.target.value);
                        }}
                      />
                    </div>
                  </div> */}
                  <div class="col-md-12">
                    <div class="form-group">
                      <label class="float-left">Mobile No</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter Mobile No"
                        required
                        value={mobileNo}
                        maxLength={10}
                        onChange={(e) => {
                          setMobileNo(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div class="form-group ">
                  <label class="float-left">Country</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="India"
                    required
                    value={country}
                    onChange={(e) => {
                      setCountry(e.target.value);

                      if (!e.target.value) {
                        return setError({
                          ...errors,
                          country: "Country can't be a blank!",
                        });
                      } else {
                        return setError({
                          ...errors,
                          country: "",
                        });
                      }
                    }}
                  />
                  {errors.country && (
                    <div class="pl-1 text-left">
                      <Typography variant="caption" color="error">
                        {errors.country}
                      </Typography>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  class="btn btn-primary btn-block btn-round"
                  onClick={handleSubmit}
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

export default connect(null, { editUser })(HostDialog);
