import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  flexCumRap: {
    display: "flex",
    gap: 32,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      gap: 16,
    },
  },
  lstCumRap: {
    minWidth: 260,
    maxWidth: 320,
    background: "#fff",
    borderRadius: 16,
    boxShadow: "0 2px 16px 0 rgba(255,23,68,0.08)",
    padding: "16px 0",
    overflowY: "auto",
    ...theme.customScrollbar,
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "row",
      overflowX: "auto",
      minWidth: 0,
      maxWidth: "100%",
      padding: "8px 0",
    },
  },
  cumRap: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    padding: "12px 18px",
    borderBottom: "1px solid #eee",
    cursor: "pointer",
    borderRadius: 10,
    background: "#fff",
    transition: "background 0.2s, box-shadow 0.2s, opacity 0.2s",
    "&:hover": {
      background: "#fff3f3",
      boxShadow: "0 2px 8px 0 rgba(255,23,68,0.10)",
      opacity: 1,
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
      minWidth: 180,
      borderBottom: "none",
      margin: "0 8px",
    },
  },
  cumRap__img: {
    width: 48,
    height: 48,
    borderRadius: 8,
    objectFit: "cover",
    boxShadow: "0 2px 8px 0 rgba(255,23,68,0.10)",
    background: "#f9f9fb",
    [theme.breakpoints.down("sm")]: {
      width: 40,
      height: 40,
    },
  },
  cumRap__info: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      alignItems: "center",
      textAlign: "center",
    },
  },
  cumRap__address: {
    fontSize: 13,
    color: "#ff8a65",
    marginTop: 2,
    fontStyle: "italic",
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
    },
  },
  cumRapActive: {

    background: "#fff0f3",
    boxShadow: "0 2px 12px 0 rgba(255,23,68,0.12)",
    opacity: 1,
    transition: "background 0.2s, box-shadow 0.2s, border-color 0.2s",
  },
}));

export default useStyles;