import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import useStyles from "./style";
import RightSection from "./RightSection";
import MovieSidebar from "./MovieSidebar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMovieList } from "../../../../reducers/actions/Movie";
import { logoTheater } from "../../../../constants/theaterData"; // ✅ Thêm dòng này

export default function LichChieuDesktop({ data }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [value, setValue] = React.useState(0);

  useEffect(() => {
    dispatch(getMovieList());
  }, [dispatch]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div
      style={{
        display: "flex",
        maxWidth: 1200,
        margin: "0px 100px",
        padding: "0 24px",
        gap: 32,
        alignItems: "flex-start",
      }}
    >
      {/* Cột trái: Tabs + lịch chiếu */}
      <div style={{ flex: 7, minWidth: 0 }}>
        <div className={classes.chonLichChieuWrapper}>
          {/* Tiêu đề lịch chiếu + tên phim */}
          <div
            className="lichchieuTitle"
            style={{
              fontWeight: 700,
              fontSize: 20,
              color: "#111",
              fontFamily: "Montserrat, sans-serif",
              marginBottom: 18,
              letterSpacing: 0.5,
            }}
          >
            Lịch chiếu {data?.tenPhim ? data.tenPhim : ""}
          </div>

          <Tabs
            variant="scrollable"
            value={value}
            onChange={handleChange}
            classes={{ root: classes.leftSection, indicator: classes.indicator }}
          >
            {data?.heThongRapChieu?.map((theater, idx) => (
              <Tab
                disableRipple
                key={theater.maHeThongRap}
                classes={{ wrapper: classes.wrapper, root: classes.tabRoot }}
                label={
                  <img
                    className={classes.logo}
                    src={
                      logoTheater[theater.maHeThongRap?.toUpperCase()] ??
                      "/img/logo-theater/default.png"
                    }
                    alt="logoTheater"
                    onError={(e) => {
                      e.target.src = "/img/logo-theater/default.png";
                    }}
                  />
                }
              />
            ))}
          </Tabs>

          <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
            {data?.heThongRapChieu?.map((theater, idx) => (
              <div
                key={theater.maHeThongRap}
                style={{
                  width: 70,
                  textAlign: "center",
                  fontWeight: value === idx ? 700 : 500,
                  color: value === idx ? "#2d6cdf" : "#888",
                  fontSize: 11,
                  margin: "0 10px",
                  whiteSpace: "nowrap",
                  textAlign: "center",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {theater.tenHeThongRap}
              </div>
            ))}
          </div>

          <div className={classes.divider} />
          <div className={classes.rightSection}>
            {data?.heThongRapChieu?.length === 0 && (
              <p style={{ padding: 10 }}>Hiện tại chưa có lịch chiếu cho phim này</p>
            )}
            {data?.heThongRapChieu?.map((theater, i) => (
              <div
                key={theater.maHeThongRap}
                style={{ display: value === i ? "block" : "none" }}
              >
                <RightSection currentSelectedHeThongRapChieu={theater} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cột phải: Danh sách phim gợi ý */}
      <div style={{ flex: 3, minWidth: 320 }}>
        <MovieSidebar maPhim={data?.maPhim} />
      </div>
    </div>
  );
}
