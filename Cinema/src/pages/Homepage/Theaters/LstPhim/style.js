import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  lstPhim: (props) => ({
    display: "flex",
    flexDirection: "column",
    gap: 24,
    padding: "20px 0",
    background: "#f8f9fa",
    height: "calc(100vh - 200px)",
    overflowY: "auto",
    scrollbarWidth: "thin",
    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#f1f1f1",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#c1c1c1",
      borderRadius: "10px",
      "&:hover": {
        background: "#a8a8a8",
      },
    },
    ...props.customScrollbar,
    [theme.breakpoints.down("sm")]: {
      padding: "12px 0",
      gap: 16,
      height: "calc(100vh - 180px)",
    },
  }),
  phimWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    transition: "all 0.3s ease",
  },
  phim: (props) => ({
    background: "#ffffff",
    borderRadius: 16,
    boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
    padding: "20px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    cursor: "pointer",
    transition: "all 0.3s ease",
    ...props.underLine,
    border: "1px solid #eef0f5",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 8px 30px rgba(45,108,223,0.12)",
      borderColor: "#2d6cdf",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "12px",
      gap: 12,
    },
  }),
  phimActive: {
    background: "#f0f4ff",
    borderColor: "#2d6cdf",
    boxShadow: "0 4px 20px rgba(45,108,223,0.1)",
  },
  phim__info: {
    display: "flex",
    alignItems: "center",
    gap: 20,
    [theme.breakpoints.down("sm")]: {
      gap: 12,
    },
  },
  phim__img: {
    width: 120,
    height: 160,
    objectFit: "cover",
    borderRadius: 12,
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    background: "#f7f7fa",
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "scale(1.02)",
    },
    [theme.breakpoints.down("sm")]: {
      width: 90,
      height: 120,
    },
  },
  phim__text: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 8,
    paddingLeft: 20,
    width: "calc(100% - 120px)",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 12,
      width: "calc(100% - 90px)",
      gap: 6,
    },
  },
  phim__text_name: {
    fontWeight: 700,
    fontSize: 15,
    color: "#1a1a1a",
    margin: 0,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    [theme.breakpoints.down("sm")]: {
      fontSize: 16,
    },
  },
  groupTime: {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
    padding: "0 20px",
    [theme.breakpoints.down("sm")]: {
      padding: "0 12px",
      gap: 8,
    },
  },
  gioChieuItem: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "#ffffff",
    color: "#2d6cdf",
    borderRadius: 10,
    border: "1.5px solid #eef0f5",
    padding: "8px 16px",
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    transition: "all 0.2s ease",
    "&:hover": {
      background: "#f0f4ff",
      color: "#2d6cdf",
      borderColor: "#2d6cdf",
      boxShadow: "0 4px 12px rgba(45,108,223,0.1)",
      transform: "translateY(-1px)",
    },
    "&:active": {
      transform: "translateY(0)",
      boxShadow: "0 2px 8px rgba(45,108,223,0.08)",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "6px 12px",
      fontSize: 13,
    },
  },
  // ✅ Một số phần style cần chỉnh thêm trong style.js của LstPhim (chèn thêm hoặc chỉnh sửa nhẹ)
  phim__img: {
    width: 140,
    height: 200,
    borderRadius: 14,
    transition: "all 0.3s ease-in-out",
    objectFit: "cover",
    background: "#f7f7fa",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    '&:hover': {
      transform: "scale(1.05)",
    },
  },
  phim__text_name: {
    fontWeight: 700,
    fontSize: 18,
    color: "#2d6cdf",
    margin: 0,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },

  // ✅ dateSelector (nên thêm nền dịu hơn):
  dateSelector: {
    background: "#fafbfc",
    border: "1px solid #ececec",
    borderRadius: 8,
    padding: "10px 16px",
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: "16px"
  },
}));

export default useStyles;