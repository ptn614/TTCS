import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useSelector } from "react-redux";
import { useTheme } from "@material-ui/core/styles";
import LstCumRap from "./LstCumRap";
import useStyles from "./style";
import { underLine } from "../../../styles/materialUi";
import { colorTheater } from "../../../constants/theaterData";
import MobileLstCumrap from "./MobileLstCumrap";
import DetailTheater from "./DetailTheater";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function HeThongRap() {
  const theme = useTheme();
  const isMobileTheater = useMediaQuery(theme.breakpoints.down("sm"));
  const { theaterList, errorTheaterList } = useSelector(
    (state) => state.theaterReducer
  );
  const [valueHeThongRap, setValueHeThongRap] = React.useState(0);
  const classes = useStyles({ isMobileTheater, underLine });

  const query = useQuery();
  const selectedHeThongRap = query.get("heThongRap");
  const selectedCumRap = query.get("cumRap");

  // Lấy thông tin hệ thống rạp và cụm rạp đã chọn
  const heThong = theaterList.find(htr => htr.maHeThongRap === selectedHeThongRap);
  const cumRap = heThong?.lstCumRap.find(cr => cr.maCumRap === selectedCumRap);

  if (errorTheaterList) {
    return <div>{errorTheaterList}</div>;
  }

  return (
    <div id="cumrap">

      {/* Tabs chọn hệ thống rạp giữ nguyên nếu muốn */}
      <Tabs
        variant="scrollable"
        scrollButtons="on"
        orientation="horizontal"
        value={valueHeThongRap}
        classes={{ indicator: classes.tabs__indicator, root: classes.taps }}
      >
        {theaterList.map((theater, index) => (
          <Tab
            onClick={() => setValueHeThongRap(index)}
            disableRipple
            classes={{
              root: classes.tap,
              textColorInherit: classes.textColorInherit,
            }}
            key={theater.maHeThongRap}
            label={
              <img
                style={{ width: "60px", height: "60px" }}
                src={theater.logo}
                alt="theaterLogo"
              />
            }
          />
        ))}
      </Tabs>

      <div style={{ padding: "20px 50px" }}>
        {theaterList.map((theater, index2) => (
          <div
            hidden={valueHeThongRap !== index2}
            key={theater.maHeThongRap}
            className={classes.cumRap}
          >
            {isMobileTheater ? (
              <MobileLstCumrap lstCumRap={theater.lstCumRap} />
            ) : (
              <LstCumRap
                lstCumRap={theater.lstCumRap}
                color={
                  colorTheater[
                  (theater.lstCumRap && theater.lstCumRap.length > 0
                    ? theater.lstCumRap[0].tenCumRap.slice(0, 3).toUpperCase()
                    : "")
                  ]
                }
                maHeThongRap={theater.maHeThongRap}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}