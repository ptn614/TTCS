import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  shortInfo: {
    display: "flex",
    gap: 18,
    marginTop: 24,
    marginBottom: 8,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      gap: 8,
      marginTop: 16,
    },
  },
  movieName: {
    fontSize: 42,
    color: "#fff",
    fontWeight: 700,
    marginBottom: 8,
    letterSpacing: 1,
  },
  c18: {
    marginRight: "6px",
    verticalAlign: "13%",
    backgroundColor: "#ffb74d",
    color: "#fff",
    fontSize: "16px",
    borderRadius: "4px",
    padding: "0 5px",
    display: "inline-block",
    textAlign: "center",
    minWidth: "33px"
  },
  btnMuaVe: {
    background: "#ffe082",
    color: "#222",
    border: "none",
    borderRadius: 8,
    fontWeight: 700,
    fontSize: 18,
    padding: "10px 32px",
    transition: "all 0.2s",

    cursor: "pointer",
    outline: "none",
    "&:hover": {
      background: "#fff",
      color: "#222",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 15,
      padding: "8px 16px",
    },
  },
  withOutImage: {
    width: "100%",
    height: 400,
    background: "#fff",
    borderRadius: 18,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#b0b0b0",
    fontSize: 15,
    fontWeight: 500,
  },
  "@global": {
    ".row > p, .row > div > p": {
      color: "#ffe082",
      fontWeight: 500,
      marginBottom: 4,
      marginTop: 0,
      fontSize: 15,
    },
    ".row": {
      marginBottom: 8,
    },
    ".content": {
      color: "#fff",
      fontSize: 16,
      lineHeight: 1.6,
    },
  },
}))
export default useStyles