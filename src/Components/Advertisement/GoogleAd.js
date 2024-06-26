import React, { useState, useEffect, Fragment } from "react";

// Redux
import { useSelector, connect, useDispatch } from "react-redux";

import { getGoogleFbAd, showToggle } from "../../store/googleFbAd/action";

// MUI
import { Grid, Typography } from "@material-ui/core";

// Components
import AddField from "./AddField";
import IOSSwitch from "@material-ui/core/Switch";
import { permissionError } from "../../util/alert";

const GoogleAd = (props) => {
  const ad = useSelector((state) => state.googleFbAd.googleFb.google);

  const hasPermission = useSelector((state) => state.admin.user.flag);
  const dispatch = useDispatch();

  const [mongoID, setMongoID] = useState("");
  const [rewardId, setRewardId] = useState("");
  const [nativeId, setNativeId] = useState("");
  const [interstitial, setInterstitialId] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch(getGoogleFbAd());
  }, [dispatch]);

  useEffect(() => {
    setRewardId(ad?.reward);
    setNativeId(ad?.native);
    setInterstitialId(ad?.interstitial);
    setMongoID(ad?._id);
    setShow(ad?.show);
  }, [ad]);

  const handleShowChange = () => {
    if (!hasPermission) return permissionError();
    props.showToggle(mongoID);
    setShow(!show);
  };

  return (
    <Fragment>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Typography color="primary" variant="h6" style={{ marginBottom: 20 }}>
          Google Ad Revenue
          <IOSSwitch
            onChange={handleShowChange}
            checked={show}
            color="primary"
          />
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <AddField
          title="Interstitial ID"
          name="interstitial"
          mongoID={mongoID}
          value={interstitial}
          onChange={setInterstitialId}
          disabledShow={show}
        />
        <AddField
          title="Reward ID"
          name="reward"
          mongoID={mongoID}
          value={rewardId}
          onChange={setRewardId}
          disabledShow={show}
        />

        <AddField
          title="Native Id"
          name="native"
          mongoID={mongoID}
          value={nativeId}
          onChange={setNativeId}
          disabledShow={show}
        />
      </Grid>
    </Fragment>
  );
};

export default connect(null, {
  getGoogleFbAd,
  showToggle,
})(GoogleAd);
