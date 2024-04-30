import React, { Fragment, useRef, useState, useEffect } from "react";
import axios from "axios";

//alert
import { permissionError } from "../../util/alert";

//redux
import { useSelector, useDispatch, connect } from "react-redux";
import { CLOSE_STICKER_DIALOG } from "../../store/sticker/types";
import { createNewSticker, editSticker } from "../../store/sticker/action";

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

import ReactDropzone from "react-dropzone";

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

import $ from "jquery";
import FemaleImage from "../../assets/images/noImage.png";

//dropzone
import DropZone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";

const StickerDialog = (props) => {
  const dispatch = useDispatch();
  const {
    dialog: open,
    dialogData,
    sticker,
  } = useSelector((state) => state.sticker);

  const hasPermission = useSelector((state) => state.admin.user.flag);

  const [images, setImages] = useState([]);
  const [imageData, setImageData] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [mongoId, setMongoId] = useState("");
  const [submitTrue, setSubmitTrue] = useState(false);
  const [errors, setError] = useState({
    image: "",
  });

  useEffect(() => {
    if (dialogData) {
      setMongoId(dialogData._id);

      setImagePath(baseURL + "/" + dialogData.sticker);
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

  $(document).ready(function () {
    $("img").bind("error", function () {
      // Set the default image
      $(this).attr("src", FemaleImage);
    });
  });

  // const handleSubmit = (e) => {
  //   if((!mongoId && images.length === 0)){
  //    if((!mongoId && images.length === 0)){
  //      errors.image = "Please select an Sticker!";
  //    }
  //    return setError({ ...errors });
  //   }else{
  //    e.preventDefault();
  //    if (!hasPermission) return permissionError();
  //    if (mongoId && imagePath   == null) {
  //      return setError({ ...errors, image: "Please select an Image!" });
  //    }

  //    const formData = new FormData();

  //    if (mongoId) {
  //      formData.append("sticker", images);
  //    } else {
  //     for (let i = 0; i < images.length; i++) {
  //       if (images[i].type !== "image/gif") {
  //         return setError({ ...errors, image: "Please select Gif Sticker!" });
  //       }
  //     }
  //     for (let i = 0; i < images.length; i++) {
  //       formData.append("sticker", images[i]);
  //       props.createNewSticker(formData);
  //     }
  //    }

  //    if (mongoId) {
  //      props.editSticker(formData, mongoId);
  //    } else {
  //      props.createNewSticker(formData);
  //    }
  //   }
  //  };

  const handleSubmit = (e) => {
    if (!mongoId && images.length === 0) {
      errors.image = "Please select a Sticker!";
      setError({ ...errors });
    } else {
      e.preventDefault();
      if (!hasPermission) return permissionError();
      if (mongoId && imagePath == null) {
        setError({ ...errors, image: "Please select an Image!" });
      } else {
        const formData = new FormData();

        if (mongoId) {
          formData.append("sticker", images);
          props.editSticker(formData, mongoId);
        } else {
          for (let i = 0; i < images.length; i++) {
            if (images[i].type !== "image/gif") {
              setError({ ...errors, image: "Please select Gif Sticker!" });
              return; // Stop the loop if an invalid image is found
            }
            formData.append("sticker", images[i]);
          }
          props.createNewSticker(formData);
        }
      }
    }
  };

  const closePopup = () => {
    dispatch({ type: CLOSE_STICKER_DIALOG });
  };

  const HandleInputImage = (e) => {
    if (e.target.files[0]) {
      if (e.target.files[0].type !== "image/gif") {
        return setError({ ...errors, image: "Please select Gif Sticker!" });
      }
      setImages(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImagePath(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <>
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
          <DialogTitle id="responsive-dialog-title">{"Sticker"}</DialogTitle>

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
                    {!mongoId ? (
                      <div className="row mt-4">
                        <label class="float-left">
                          Select (Multiple) Sticker or GIF
                        </label>
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
                    ) : (
                      <>
                        <label class="float-left">Sticker</label>
                        <input
                          type="file"
                          className="form-control"
                          accept="image/gif"
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
                    disabled={submitTrue}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </Fragment>
    </>
  );
};

export default connect(null, { createNewSticker, editSticker })(StickerDialog);
