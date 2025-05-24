import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  desktop: {
  },
  bannerBlur: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,

  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    background: "linear-gradient(to top, rgb(10, 32, 41), transparent 100%)"
  },
  topInfo: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#e9e9e9",
    height: '100vh',
    // marginTop: '100px'

  },
  imgTrailer: {
    width: "25%",
    height: "100%",
    position: "relative",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    '&:hover > div ': { opacity: 1 },
  },
  img: {
    width: "100%",
    borderRadius: 4,

  },
  shortInfo: {
    display: "flex",
    gap: 18,
    marginTop: 24,
    marginBottom: 8,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      gap: 10,
      marginTop: 16,
    },
  },
  movieName: {
    fontSize: 24,
  },
  c18: {
    marginRight: "6px",
    verticalAlign: "13%",
    backgroundColor: "rgb(238, 130, 59)",
    color: "#fff",
    fontSize: "16px",
    borderRadius: "4px",
    padding: "0 5px",
    display: "inline-block",
    textAlign: "center",
    minWidth: "33px"
  },
  btnMuaVe: {
    background: "linear-gradient(90deg, #ff1744 0%, #ff8a65 100%)",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "12px 32px",
    fontWeight: 700,
    fontSize: 17,
    letterSpacing: 1,
    cursor: "pointer",
    boxShadow: "0 2px 12px 0 rgba(255,23,68,0.10)",
    transition: "background 0.2s, box-shadow 0.2s, transform 0.15s",
    marginTop: "25px",
    marginBottom: "20px",
    margin: '0 10px',
    "&:hover": {
      background: "linear-gradient(90deg, #ff8a65 0%, #ff1744 100%)",
      boxShadow: "0 4px 24px 0 rgba(255,23,68,0.18)",
      transform: "translateY(-2px) scale(1.03)",
    },
    "&:active": {
      background: "#ff1744",
    },
  },

  rate: {
    width: "16%",
    height: "100%",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  circular: {
    position: 'relative',
    height: 126,
    width: 126,
  },
  danhGia: {
    fontSize: 53,
    position: 'absolute',
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },
  fabProgress: {
    color: "#7ed321",
    position: 'absolute',
    top: 0,
    left: 0,
  },
  behined: {
    color: "#829869",
    position: 'absolute',
    top: 0,
    left: 0,
  },
  rateStar: {
    width: "fit-content",
    '& .MuiRating-iconEmpty': {
      color: "rgba(255, 180, 0, 0.3)",
    }
  },

  withOutImage: {
    width: 200,
    height: 300,
    background: "#eee",
    borderRadius: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#bbb",
    fontSize: 22,
    fontWeight: 600,
    margin: "0 auto",
  },
  "@keyframes myEffect": {
    "0%": { backgroundPosition: "0% 50%" },
    "50%": { backgroundPosition: "100% 50%" },
    "100%": { backgroundPosition: "0% 50%" },
  },

}))
export default useStyles