import React, { Fragment, useState, useEffect } from "react";

//redux
import { useSelector, useDispatch, connect } from "react-redux";
import { CLOSE_LEVEL_DIALOG } from "../../store/level/types";
import { createNewLevel, editLevel } from "../../store/level/action";

//alert
import { permissionError } from "../../util/alert";

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

const LevelDialog = (props) => {
  const dispatch = useDispatch();
  const {
    dialog: open,
    dialogData,
    level,
  } = useSelector((state) => state.level);

  const hasPermission = useSelector((state) => state.admin.user.flag);

  // const [imageData, setImageData] = useState(null);
  // const [imagePath, setImagePath] = useState(null);
  const [mongoId, setMongoId] = useState("");
  const [name, setName] = useState("");
  const [coin, setCoin] = useState("");

  const [errors, setError] = useState({
    name: "",
    coin: "",
  });

  useEffect(() => {
    if (dialogData) {
      setMongoId(dialogData._id);
      setName(dialogData.name);
      setCoin(dialogData.rupee);
    }
  }, [dialogData]);

  useEffect(
    () => () => {
      setError({
        name: "",
        coin: "",
      });
      setMongoId("");
      setName("");
      setCoin("");
    },
    [open]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !coin) {
      const errors = {};

      if (!name) {
        errors.name = "Level Name can't be a blank!";
      }

      if (!coin) {
        errors.coin = "Coin can't be a blank!";
      }

      return setError({ ...errors });
    }

    if (!mongoId) {
      const index = level.findIndex(
        (level) => level.name.toLowerCase() === name.toLowerCase()
      );
      if (index > -1) {
        return setError({ ...errors, name: "Level Name already exist." });
      }
    } else {
      const index = level.find(
        (level) => level.name.toLowerCase() === name.toLowerCase()
      );
      if (index !== undefined) {
        if (index._id === mongoId) {
        } else {
          return setError({ ...errors, name: "Level Name already exist." });
        }
      }
    }

    if (!hasPermission) return permissionError();

    const data = {
      name,
      type: "user",
      rupee: coin,
    };

    if (mongoId) {
      props.editLevel(data, mongoId);
    } else {
      props.createNewLevel(data);
    }
  };

  const closePopup = () => {
    dispatch({ type: CLOSE_LEVEL_DIALOG });
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
        maxWidth="xs"
      >
        <DialogTitle id="responsive-dialog-title">User Level</DialogTitle>

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
                    placeholder="Level Name"
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
                <div class="form-group">
                  <label class="float-left">coin</label>
                  <input
                    type="number"
                    class="form-control"
                    placeholder="0"
                    required
                    value={coin}
                    onChange={(e) => {
                      setCoin(Math.max(0, parseInt(e.target.value)));

                      if (!e.target.value) {
                        return setError({
                          ...errors,
                          coin: "coin can't be a blank!",
                        });
                      } else {
                        return setError({
                          ...errors,
                          coin: "",
                        });
                      }
                    }}
                  />
                  {errors.coin && (
                    <div class="pl-1 text-left">
                      <Typography variant="caption" color="error">
                        {errors.coin}
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

export default connect(null, { createNewLevel, editLevel })(LevelDialog);
