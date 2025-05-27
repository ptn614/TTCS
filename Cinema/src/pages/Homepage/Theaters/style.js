import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  theater: {
    display: (props) => (props.isMobileTheater ? "block" : "flex"),
    maxWidth: 1100,
    margin: "32px auto",
    borderRadius: 18,
    background: "#f7f7fa",
    boxShadow: "0 4px 32px 0 rgba(60,60,60,0.10)",
    overflow: "hidden",
    minHeight: 500,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      padding: "8px 0",
      minHeight: 0,
    },
  },
  tabs__indicator: {
    background: "#2d6cdf",
    height: 4,
    borderRadius: 2,
  },
  tap: {
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "#f0f4ff",
      boxShadow: "0 4px 10px rgba(45,108,223,0.08)",
      transform: "translateY(-2px)",
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
    border: "1.5px solid #ececec",
    color: "#2d6cdf",
    fontWeight: 600,
    fontSize: "1rem",
    "&:hover": {
      background: "#e6eaf3",
      boxShadow: "0 2px 8px 0 rgba(45,108,223,0.10)",
      borderColor: "#2d6cdf",
    },
    [theme.breakpoints.down("sm")]: {
      margin: "0 8px",
      minWidth: 60,
    },
  }),
  textColorInherit: {
    color: "#2d6cdf",
    opacity: 1,
    fontWeight: 600,
    fontSize: "1rem",
    textShadow: "0 0 8px #fff, 0 0 2px #e6eaf3",
  },
  cumRapContainer: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    padding: "16px 0",
    marginBottom: "24px", // Thêm khoảng cách ở dưới
    overflow: "hidden",
  },
  cumRapWrapper: {
    display: "flex",
    overflowX: "auto",
    scrollBehavior: "smooth",
    gap: 16,
    padding: "0 16px",
    "&::-webkit-scrollbar": {
      display: "none", // Ẩn thanh cuộn mặc định
    },
    "-ms-overflow-style": "none", // Ẩn thanh cuộn trên IE
    scrollbarWidth: "none", // Ẩn thanh cuộn trên Firefox
  },
  cumRap: {
    flex: "0 0 auto", // Không co giãn, giữ kích thước cố định
    padding: "0 16px",
    minWidth: "250px", // Kích thước tối thiểu cho mỗi ô cụm rạp
    background: "#fff",
    borderRadius: 12,
    border: "1.5px solid #ececec",
    boxShadow: "0 2px 8px rgba(60,60,60,0.03)",
    transition: "all 0.2s",
    "&:hover": {
      borderColor: "#2d6cdf",
      boxShadow: "0 2px 16px rgba(45,108,223,0.10)",
      background: "#e6eaf3",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "8px",
      minWidth: "200px",
    },
  },
  scrollButton: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    background: "#fff",
    border: "1px solid #ececec",
    borderRadius: "50%",
    width: 40,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(60,60,60,0.1)",
    zIndex: 1,
    "&:hover": {
      background: "#e6eaf3",
      borderColor: "#2d6cdf",
    },
  },
  scrollLeft: {
    left: 0,
  },
  scrollRight: {
    right: 0,
  },
  rapChieu: {
    padding: "16px",
    borderBottom: "1px solid #ececec",
    "&:last-child": {
      borderBottom: "none",
    },
    background: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    boxShadow: "0 2px 8px 0 rgba(60,60,60,0.03)",
  },
  rapChieu__title: {
    fontSize: 16,
    fontWeight: 700,
    color: "#2d6cdf",
    marginBottom: 12,
    display: "flex",
    alignItems: "center",
    gap: 8,
    textShadow: "0 0 8px #fff, 0 0 2px #e6eaf3",
  },
  rapChieu__address: {
    fontSize: 14,
    color: "#2d6cdf",
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
    border: "1px solid #ececec",
    borderRadius: 8,
    cursor: "pointer",
    background: "#fff",
    color: "#2d6cdf",
    transition: "all 0.2s",
    "&:hover": {
      borderColor: "#2d6cdf",
      boxShadow: "0 2px 16px 0 rgba(45,108,223,0.10)",
      background: "#e6eaf3",
    },
  },
  rapChieu__item__title: {
    fontSize: 15,
    fontWeight: 600,
    color: "#2d6cdf",
    marginBottom: 8,
    textShadow: "0 0 6px #fff, 0 0 2px #e6eaf3",
  },
  rapChieu__item__time: {
    fontSize: 14,
    color: "#2d6cdf",
  },
}));

export default useStyles;