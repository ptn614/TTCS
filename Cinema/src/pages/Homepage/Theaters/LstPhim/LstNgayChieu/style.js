import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
  lstNgayChieu: {
    paddingTop: 15,
  },
  ngayChieu: {
    fontSize: 17,
    marginBottom: 8,
    fontWeight: 700,
    color: "#000",
    letterSpacing: 1,

  },
  groupTime: {
    display: 'flex',
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 8,
  },
  gioChieuItem: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "#fff",
    color: "#222",
    borderRadius: 10,
    border: "2px solid #ff8a65",
    padding: "8px 18px",
    margin: "4px 10px 4px 0",
    fontWeight: 700,
    fontSize: 16,
    cursor: "pointer",
    boxShadow: "0 2px 8px 0 rgba(255,23,68,0.08)",
    transition: "background 0.2s, color 0.2s, box-shadow 0.2s, border-color 0.2s, transform 0.15s",
    "&:hover": {
      background: "#fff0f3",
      color: "#ff1744",
      boxShadow: "0 4px 16px 0 rgba(255,23,68,0.15)",
      borderColor: "#ff1744",
      transform: "translateY(-2px) scale(1.04)",
    },
    "&:active": {
      background: "#ffeaea",
      color: "#ff1744",
      borderColor: "#ff1744",
      boxShadow: "0 2px 8px 0 rgba(255,23,68,0.10)",
    },
  },
});

export default useStyles