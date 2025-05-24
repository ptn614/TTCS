import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  theater: {
    display: (props) => (props.isMobileTheater ? "block" : "flex"),
    maxWidth: 1100,
    margin: "32px auto",
    borderRadius: 18,
    background: "rgba(245,245,250,0.98)", // nền sáng hơn
    boxShadow: "0 4px 32px 0 rgba(0,0,0,0.12), 0 0 0 2px #ff1744",
    overflow: "hidden",
    minHeight: 500,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      padding: "8px 0",
      minHeight: 0,
    },
  },
  taps: {
    background: "transparent",
    minWidth: 92,
    borderRight: "2px solid #ff1744",
    [theme.breakpoints.down("sm")]: {
      borderRight: "none",
      borderBottom: "2px solid #ff1744",
      minWidth: 0,
    },
  },
  tabs__indicator: {
    background: "linear-gradient(90deg, #ff1744 0%, #ff8a65 100%)",
    width: 4,
    borderRadius: 4,
    [theme.breakpoints.down("sm")]: {
      height: 4,
      width: "100%",
    },
  },
  tap: (props) => ({
    padding: 20,
    minWidth: 92,
    margin: "auto",
    borderRadius: 12,
    background: "#fff",
    transition: "background 0.2s, box-shadow 0.2s",
    ...props.underLine,
    "&:hover": {
      background: "#ffeaea",
      boxShadow: "0 2px 8px 0 rgba(255,23,68,0.10)",
    },
    [theme.breakpoints.down("sm")]: {
      margin: "0 8px",
      minWidth: 60,
    },
  }),
  textColorInherit: {
    color: "#222",
    opacity: 1,
    fontWeight: 600,
    fontSize: "1rem",
    textShadow: "0 0 8px #fff, 0 0 2px #ff1744",
  },
  cumRap: {
    flex: 1,
    padding: "0 16px",
    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },
  },
  rapChieu: {
    padding: "16px",
    borderBottom: "1px solid #e0e0e0",
    "&:last-child": {
      borderBottom: "none",
    },
    background: "#f9f9fb",
    borderRadius: 12,
    marginBottom: 16,
    boxShadow: "0 2px 8px 0 rgba(255,23,68,0.03)",
  },
  rapChieu__title: {
    fontSize: 16,
    fontWeight: 700,
    color: "#222",
    marginBottom: 12,
    display: "flex",
    alignItems: "center",
    gap: 8,
    textShadow: "0 0 8px #fff, 0 0 2px #ff1744",
  },
  rapChieu__address: {
    fontSize: 14,
    color: "#ff8a65",
    marginBottom: 16,
    fontStyle: "italic",
  },
  rapChieu__list: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: 16,
  },
  rapChieu__item: {
    padding: 12,
    border: "1px solid #e0e0e0",
    borderRadius: 8,
    cursor: "pointer",
    background: "#fff",
    color: "#222",
    transition: "all 0.2s",
    "&:hover": {
      borderColor: "#ff1744",
      boxShadow: "0 2px 16px 0 rgba(255,23,68,0.10)",
      background: "#fff3f3",
    },
  },
  rapChieu__item__title: {
    fontSize: 15,
    fontWeight: 600,
    color: "#222",
    marginBottom: 8,
    textShadow: "0 0 6px #fff, 0 0 2px #ff1744",
  },
  rapChieu__item__time: {
    fontSize: 14,
    color: "#ff8a65",
  },
}));

export default useStyles;