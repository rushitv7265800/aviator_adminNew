import React, { Fragment, useRef, useState, useEffect } from "react";


//alert
import { permissionError } from "../../util/alert";

//redux
import { useSelector, useDispatch, connect } from "react-redux";
import { CLOSE_EMOJI_DIALOG } from "../../store/emoji/types";
import { createNewEmoji, editEmoji } from "../../store/emoji/action";
import FemaleImage from "../../assets/images/noImage.png"

import $ from "jquery"
import ReactDropzone from "react-dropzone";

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

//dropzone
import DropZone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";

const EmojiDialog = (props) => {
  const dispatch = useDispatch();
  const {
    dialog: open,
    dialogData,
    emoji,
  } = useSelector((state) => state.emoji);

  const hasPermission = useSelector((state) => state.admin.user.flag);

  const [images, setImages] = useState([]);
  const [imageData, setImageData] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [mongoId, setMongoId] = useState("");

  const [errors, setError] = useState({
    image: "",
  });

  useEffect(() => {
    if (dialogData) {
      setMongoId(dialogData._id);

      setImagePath(baseURL + "/" + dialogData.emoji);
    }
  }, [dialogData]);

  useEffect(
    () => () => {
      setError({
        image: "",
      });
      setMongoId("");
      setImages([]);
      setImageData("");
      setImagePath("");
    },
    [open]
  );

  const onPreviewDrop = (files) => {
    setError({ ...errors, image: "" });
    files.map((file) =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    );
    setImages(images.concat(files));
  };

  const removeImage = (file) => {
    if (file.preview) {
      const image = images.filter((ele) => {
        return ele.preview !== file.preview;
      });
      setImages(image);
    }
  };
  const HandleInputImage = (e) => {
    if (e.target.files[0]) {
      setImages(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImagePath(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    if ((!mongoId && images.length === 0) || (mongoId && !imagePath)) {
      return setError({ ...errors, image: "Please select an Sticker!" });
    } else {
      if (!hasPermission) return permissionError();

      const formData = new FormData();
      if (mongoId) {
        formData.append("emoji", images);
      } else {
        for (let i = 0; i < images.length; i++) {
          formData.append("emoji", images[i]);
        }
      }
      if (mongoId) {
        props.editEmoji(formData, mongoId);
      } else {
        props.createNewEmoji(formData);
      }
    }
  };

  const closePopup = () => {
    dispatch({ type: CLOSE_EMOJI_DIALOG });
  };

  // Payload data and url to upload files
  const getUploadParams = ({ meta }) => {
    return { url: "https://httpbin.org/post" };
  };

  // Return the current status of files being uploaded
  const handleChangeStatus = ({ meta, file }, status) => {
    if (status === "removed") {
      const filteredItems = images.filter((item) => item !== file);
      setImages(filteredItems);
    }

    if (status === "done") {
      images.push(file);
    }
  };

  
  $(document).ready(function () {
    $("img").bind("error", function () {
      // Set the default image
      $(this).attr("src", FemaleImage);
    });
  });

  return (
    <Fragment>
      <Dialog
        open={open}
        aria-labelledby="responsive-dialog-title"
        onClose={closePopup}
        disableBackdropClick
        disableEscapeKeyDown
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="responsive-dialog-title">{"Emoji"}</DialogTitle>

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
            <form>
              <div class="form-group d-flex flex-column">
                {!mongoId ? (
                  <>
                    <label class="float-left">Select (Multiple) Emoji</label>
                    <div className="row mt-4">
                      <div className="col-6">
                        <>
                          <ReactDropzone
                            onDrop={(acceptedFiles) =>
                              onPreviewDrop(acceptedFiles)
                            }
                            accept="image/gif"
                          >
                            {({ getRootProps, getInputProps }) => (
                              <section>
                                <div {...getRootProps()}>
                                  <input {...getInputProps()} />
                                  <div
                                    style={{
                                      height: 130,
                                      width: 130,
                                      border: "2px dashed gray",
                                      textAlign: "center",
                                      marginTop: "10px",
                                    }}
                                  >
                                    <i
                                      className="fas fa-plus"
                                      style={{ paddingTop: 30, fontSize: 70 }}
                                    ></i>
                                  </div>
                                </div>
                              </section>
                            )}
                          </ReactDropzone>
                        </>
                      </div>
                      <div className="col-lg-6 mt-4">
                        {images.length > 0 && (
                          <>
                            {images.map((file, index) => {
                              return (
                                file.type?.split("image")[0] === "" && (
                                  <>
                                    <img
                                      height="60px"
                                      width="60px"
                                      alt="app"
                                      src={file.preview}
                                      style={{
                                        boxShadow:
                                          "0 5px 15px 0 rgb(105 103 103 / 00%)",
                                        border: "2px solid #fff",
                                        borderRadius: 10,
                                        marginTop: 10,
                                        float: "left",
                                        objectFit: "contain",
                                        marginRight: 15,
                                      }}
                                      draggable="false"
                                    />
                                    <div
                                      class="img-container"
                                      style={{
                                        display: "inline",
                                        position: "relative",
                                        float: "left",
                                      }}
                                    >
                                      <i
                                        class="fas fa-times-circle text-danger"
                                        style={{
                                          position: "absolute",
                                          right: "10px",
                                          top: "4px",
                                          cursor: "pointer",
                                        }}
                                        onClick={() => removeImage(file)}
                                      ></i>
                                    </div>
                                  </>
                                )
                              );
                            })}
                          </>
                        )}
                      </div>
                      {errors.image && (
                        <div class="pl-1 text-left">
                          <Typography variant="caption" color="error">
                            {errors.image}
                          </Typography>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <label class="float-left">Emoji</label>
                    <input
                      type="file"
                      accept="image/jpg ,image/jpeg ,image/png"
                      className="form-control"
                      required=""
                      onChange={HandleInputImage}
                    />
                    {errors.image && (
                      <div class="pl-1 text-left">
                        <Typography variant="caption" color="error">
                          {errors.image}
                        </Typography>
                      </div>
                    )}
                    {imagePath && (
                      <Fragment>
                        <img
                          alt=""
                          src={imagePath}
                          class="mt-3 rounded float-left mb-2"
                          height="100px"
                          width="100px"
                        />
                        <div
                          class="img-container"
                          style={{
                            display: "inline",
                            position: "relative",
                            float: "left",
                          }}
                        >
                          <i
                            class="fas fa-times-circle material-icons remove_img text-primary"
                            style={{
                              position: "absolute",
                              right: "-6px",
                              top: "10px",
                              cursor: "pointer",
                            }}
                            onClick={removeImage}
                          ></i>
                        </div>
                      </Fragment>
                    )}
                  </>
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
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default connect(null, { createNewEmoji, editEmoji })(EmojiDialog);
