import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import Fade from "@material-ui/core/Fade";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import useStyles from "./style";
import scroll from "../../../utilities/scroll";
import LichChieuDesktop from "./LichChieuDesktop";

function TabPanel(props) {
  const { isMobile, children, value, index, ...other } = props;
  return (
    <div hidden={value !== index} {...other}>
      <div style={{ padding: isMobile && index === 0 ? 0 : 3 }}>{children}</div>
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default function CenteredTabs({ data, onClickBtnMuave, isMobile }) {
  const [valueTab, setValueTab] = useState(0);
  const classes = useStyles({ isMobile });
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    setValueTab(0);
  }, []);

  useEffect(() => {
    if (onClickBtnMuave !== 0) {
      scroll("TapMovieDetail");
    }
  }, [onClickBtnMuave]);

  const handleChange = (event, newValue) => {
    setValueTab(newValue);
  };

  return (
    <div className={classes.root} id="TapMovieDetail">
      <AppBar position="static" color="default" classes={{ root: classes.appBarRoot }}>
        <Tabs
          value={valueTab}
          onChange={handleChange}
          centered
          classes={{ indicator: classes.indicator }}
        >
          {(!location.state?.comingMovie ? true : "") && (
            <Tab
              disableRipple
              label=""
              classes={{ selected: classes.selectedTap, root: classes.tapRoot }}
            />
          )}
        </Tabs>
      </AppBar>
      <Fade timeout={400} in={valueTab === (location.state?.comingMovie ? "hide" : 0)}>
        <TabPanel
          value={valueTab}
          index={location.state?.comingMovie ? "hide" : 0}
          isMobile={isMobile}
        >
          {<LichChieuDesktop data={data} />}
        </TabPanel>
      </Fade>
    </div>
  );
}