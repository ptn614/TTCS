import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  lstNgayChieu: {
    paddingTop: 15,
  },
  ngayChieu: {
    fontSize: 17,
    marginBottom: 8,
    fontWeight: 700,
    color: "#2d6cdf",
    letterSpacing: 1,
  },
  groupTime: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 8,
    justifyContent: "flex-start", // Căn trái các nút
    // Giới hạn chiều rộng mỗi nút để đảm bảo tối đa 4 nút trên một dòng
    "& > *": {
      flex: "0 0 calc(25% - 7.5px)", // 25% cho 4 nút, trừ đi 1/2 gap (10px / 2 = 5px)
      maxWidth: "calc(25% - 7.5px)",
      boxSizing: "border-box",
    },
  },
  gioChieuItem: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center", // Căn giữa nội dung trong ô
    gap: 8,
    background: "#fff",
    color: "#2d6cdf",
    borderRadius: 8,
    border: "1.5px solid #ececec",
    padding: "7px 16px",
    margin: "4px 6px 4px 0",
    fontWeight: 600,
    fontSize: 15,
    cursor: "pointer",
    boxShadow: "0 1px 4px rgba(60,60,60,0.04)",
    transition: "all 0.2s",
    width: "100%", // Đảm bảo ô chiếm toàn bộ chiều rộng của flex item
    minWidth: "100px", // Đặt chiều rộng tối thiểu để các ô đồng đều
    height: "40px", // Cố định chiều cao để đồng nhất
    boxSizing: "border-box", // Đảm bảo padding không làm tăng kích thước
    "&:hover": {
      background: "#e6eaf3",
      color: "#2d6cdf",
      borderColor: "#2d6cdf",
      boxShadow: "0 2px 8px rgba(45,108,223,0.08)",
      transform: "translateY(-2px) scale(1.04)",
    },
    "&:active": {
      background: "#e6eaf3",
      color: "#2d6cdf",
      borderColor: "#2d6cdf",
      boxShadow: "0 1px 4px rgba(45,108,223,0.08)",
    },
  },
  // Responsive: Điều chỉnh số cột trên các kích thước màn hình
  "@media (max-width: 960px)": {
    groupTime: {
      "& > *": {
        flex: "0 0 calc(33.33% - 6.67px)", // 3 cột trên tablet
        maxWidth: "calc(33.33% - 6.67px)",
      },
    },
  },
  "@media (max-width: 600px)": {
    groupTime: {
      "& > *": {
        flex: "0 0 calc(50% - 5px)", // 2 cột trên điện thoại
        maxWidth: "calc(50% - 5px)",
      },
    },
  },
});

export default useStyles;