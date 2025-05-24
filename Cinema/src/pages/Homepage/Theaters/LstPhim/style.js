import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  lstPhim: (props) => ({
    flex: "0 0 60%",
    height: 705,
    overflowY: "auto",
    borderLeft: "1px solid #ebebec",
    padding: "0 8px",
    background: "#f9f9fb",
    ...props.customScrollbar,
    [theme.breakpoints.down("sm")]: {
      height: 350,
      borderLeft: "none",
      padding: 0,
    },
  }),
  phim: (props) => ({
    background: "#fff",
    borderRadius: 14,
    boxShadow: "0 2px 12px 0 rgba(255,23,68,0.08)",
    marginBottom: 20,
    padding: "16px 18px",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    cursor: "pointer",
    transition: "background 0.2s, box-shadow 0.2s, transform 0.15s",
    ...props.underLine,
    "&:hover": {
      background: "#fff0f3",
      boxShadow: "0 4px 24px 0 rgba(255,23,68,0.15)",
      transform: "translateY(-2px) scale(1.01)",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "10px 8px",
      marginBottom: 12,
    },
  }),
  phim__info: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    [theme.breakpoints.down("sm")]: {
      gap: 10,
    },
  },
  phim__img: {
    width: 60,
    height: 80,
    objectFit: "cover",
    borderRadius: 8,
    boxShadow: "0 2px 8px 0 rgba(255,23,68,0.10)",
    background: "#f9f9fb",
    [theme.breakpoints.down("sm")]: {
      width: 44,
      height: 60,
    },
  },
  phim__text: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 4,
    paddingLeft: 15,
    width: "calc(100% - 60px)",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 8,
      width: "calc(100% - 44px)",
    },
  },
  phim__text_name: {
    fontWeight: 700,
    fontSize: 16,
    color: "#222",
    marginBottom: 2,
    textShadow: "0 0 6px #fff, 0 0 2px #ff1744",
    textTransform: "capitalize",
    [theme.breakpoints.down("sm")]: {
      fontSize: 14,
    },
  },
}));

export default useStyles;