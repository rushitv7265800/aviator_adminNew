import React, { useEffect, useState } from "react";

//redux
import { connect, useDispatch, useSelector } from "react-redux";

//MUI
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";

import FemaleImage from "../../assets/images/noImage.png"
import $ from "jquery" 

import { Cancel } from "@material-ui/icons";

//types
import { CLOSE_BANNER_DIALOG } from "../../store/banner/types";

//action
import { createNewBanner, editBanner } from "../../store/banner/action";
import { baseURL } from "../../util/serverPath";
import { permissionError } from "../../util/alert";

const BannerDialog = (props) => {
  const dispatch = useDispatch();

  const hasPermission = useSelector((state) => state.admin.user.flag);

  const { dialog: open, dialogData } = useSelector((state) => state.banner);

  const [mongoId, setMongoId] = useState("");
  const [link, setLink] = useState("");
  const [imageData, setImageData] = useState(null);
  const [imagePath, setImagePath] = useState(null);

  const [errors, setError] = useState({
    link: "",
    image: "",
  });

  useEffect(() => {
    if (dialogData) {
      setMongoId(dialogData._id);
      setLink(dialogData.link);
      setImagePath(baseURL + "/" + dialogData.image);
    }
  }, [dialogData]);

  useEffect(
    () => () => {
      setError({
        link: "",
        image: "",
      });
      setMongoId("");
      setLink("");
      setImageData(null);
      setImagePath(null);
    },
    [open]
  );

  const HandleInputImage = (e) => {
    if (e.target.files[0]) {
      setImageData(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImagePath(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
    if (!e.target.files[0]) {
      return setError({
        ...errors,
        image: "Banner image is Required!",
      });
    } else {
      return setError({
        ...errors,
        image: "",
      });
    }
  };

  const closePopup = () => {
    dispatch({ type: CLOSE_BANNER_DIALOG });
  };
  const isLink = (value) => {
    const val = value === "" ? 0 : value;
    const validLink = /^(ftp|http|https):\/\/[^\s/$.?#].[^\s]*$/.test(val);
    return validLink;
  };

  const handleSubmit = (e) => {
    const linkValidation = isLink(link);
    if (!link || !mongoId ? !imageData : !imagePath) {
      const errors = {};
      if (!link) {
        errors.link = "Banner Link is Required!";
      }

      if (!mongoId && !imageData) {
        errors.image = "Banner Image is Required!";
      }
      return setError({ ...errors });
    } else {
      if (!linkValidation) {
        return setError({ ...errors, link: "Banner link Invalid!" });
      }
      if (!mongoId) {
        if (!imageData || !imagePath) {
          return setError({ ...errors, image: "Banner Photo is Required!" });
        }
      } else {
        if (!imageData && !imagePath) {
          return setError({ ...errors, image: "Banner Photo is Required!" });
        }
      }
      e.preventDefault();
      if (!hasPermission) return permissionError();

      const formData = new FormData();

      formData.append("image", imageData);
      formData.append("link", link);
      if (mongoId) {
        props.editBanner(formData, mongoId);
      } else {
        props.createNewBanner(formData);
      }
    }
  };

  
  $(document).ready(function () {
    $("img").bind("error", function () {
      // Set the default image
      $(this).attr("src", FemaleImage);
    });
  });

  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="responsive-dialog-title"
        onClose={closePopup}
        disableBackdropClick
        disableEscapeKeyDown
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="responsive-dialog-title" style={{ marginLeft: 20 }}>
          {"Banner"}
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
                <div class="form-group">
                  <label class="float-left">Link</label>
                  <input
                    type="text"
                    class="form-control"
                    required=""
                    placeholder="https://www.google.com"
                    value={link}
                    onChange={(e) => {
                      setLink(e.target.value);
                      if (!e.target.value) {
                        return setError({
                          ...errors,
                          link: "Banner Link is Required!",
                        });
                      } else {
                        return setError({
                          ...errors,
                          link: "",
                        });
                      }
                    }}
                  />
                  {errors.link && (
                    <div class="pl-1 text-left">
                      <Typography
                        variant="caption"
                        color="error"
                        style={{ fontFamily: "Circular-Loom" }}
                      >
                        {errors.link}
                      </Typography>
                    </div>
                  )}
                </div>
                <div class="form-group">
                  <label class="float-left">Banner Image</label>
                  <input
                    type="file"
                    accept="image/jpg ,image/jpeg ,image/png"
                    class="form-control"
                    required=""
                    onChange={HandleInputImage}
                  />
                  {errors.image && (
                    <div class="pl-1 text-left">
                      <Typography
                        variant="caption"
                        color="error"
                        style={{ fontFamily: "Circular-Loom" }}
                      >
                        {errors.image}
                      </Typography>
                    </div>
                  )}
                  {imagePath && (
                    <>
                      <img
                        height="100px"
                        width="100px"
                        alt="app"
                        src={imagePath}
                        style={{
                          boxShadow: "0 5px 15px 0 rgb(105 103 103 / 50%)",
                          border: "2px solid #fff",
                          borderRadius: 10,
                          marginTop: 10,
                          float: "left",
                        }}
                      />
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
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default connect(null, { createNewBanner, editBanner })(BannerDialog);
