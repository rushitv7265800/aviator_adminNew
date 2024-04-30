/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useState, useEffect } from "react";

//alert
import { permissionError } from "../../util/alert";

//redux
import { useSelector, useDispatch, connect } from "react-redux";
import { CLOSE_FAKE_HOST_DIALOG } from "../../store/fakeHost/types";
import { editFakeHost, createFakeHost } from "../../store/fakeHost/action.js";
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

const FakeHostDialog = (props) => {
  const dispatch = useDispatch();
  const hasPermission = useSelector((state) => state.admin.user.flag);

  const {
    dialog: open,
    dialogData,
    fakeHost,
  } = useSelector((state) => state.fakeHost);

  const [imageData, setImageData] = useState([]);
  const [imagePath, setImagePath] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [video, setVideo] = useState("");
  const [videoPath, setVideoPath] = useState("");

  const [errors, setError] = useState({
    name: "",
    image: "",
    bio: "",
    video: "",
  });

  useEffect(() => {
    if (dialogData) {
      setName(dialogData?.name);
      setImagePath( dialogData?.image);
      setBio(dialogData?.bio);
      setVideoPath( dialogData?.video);
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
        bio: "",
        image: "",
        video: "",
      });
      setName("");
      setBio("");
      setImageData([]);
      setImagePath(null);
      setVideo([]);
      setVideoPath(null);
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

  const handleInputVideo = (e) => {
    if (e.target.files[0]) {
      setVideo(e.target.files[0]);
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        setVideoPath(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = (e) => {
    if (!name || !bio || !imagePath || !video || !videoPath) {
      const errors = {};
      if (!name) {
        errors.name = "Name can't be a blank!";
      }
      if (!bio) {
        errors.bio = "bio can't be blank!";
      }

      if (imageData.length === 0) {
        errors.image = "Please select an Image!";
      }
      if (video.length === 0) {
        errors.video = "Please select a video!";
      }
      return setError({ ...errors });
    } else {
      if (!hasPermission) return permissionError();

      const formData = new FormData();
      formData?.append("image", imageData);
      formData?.append("name", name);
      formData?.append("bio", bio);
      formData?.append("video", video);

      if (dialogData) {
        props.editFakeHost(formData, dialogData._id);
      } else {
        props.createFakeHost(formData);
      }
    }
  };

  const closePopup = () => {
    dispatch({ type: CLOSE_FAKE_HOST_DIALOG });
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
        <DialogTitle id="responsive-dialog-title">Fake Host</DialogTitle>

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

                <div class="form-group ">
                  <label class="float-left">Bio</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter Bio"
                    required
                    value={bio}
                    onKeyPress={handleKeyPress}
                    onChange={(e) => {
                      setBio(e.target.value);

                      if (!e.target.value) {
                        return setError({
                          ...errors,
                          bio: "bio can't be a blank!",
                        });
                      } else {
                        return setError({
                          ...errors,
                          bio: "",
                        });
                      }
                    }}
                  />
                  {errors.bio && (
                    <div class="pl-1 text-left">
                      <Typography variant="caption" color="error">
                        {errors.bio}
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

                <div className="form-group">
                  <label className="float-left">Video</label>
                  <input
                    className="form-control"
                    type="file"
                    accept="video/mp4, video/webm"
                    required=""
                    onChange={handleInputVideo}
                  />
                  {errors.video && (
                    <div className="pl-1 text-left">
                      <Typography variant="caption" color="error">
                        {errors.video}
                      </Typography>
                    </div>
                  )}
                  <div className="row mb-0 ml-2">
                    {videoPath && (
                      <Fragment>
                        <video
                          controls
                          src={videoPath}
                          className="mt-3 rounded float-left mb-2"
                          height="100px"
                          width="150px"
                        />
                      </Fragment>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  class="btn btn-primary btn-block btn-round"
                  onClick={() => handleSubmit()}
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

export default connect(null, { createFakeHost, editFakeHost })(FakeHostDialog);
