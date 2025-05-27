import { makeStyles } from "@material-ui/core";


const useStyles = makeStyles({
  // ✅ Style cho giờ chiếu dạng CGV
  // ButtonCheckout styles.js
  button: {
    backgroundColor: '#fff',
    border: '1.5px solid #3f51b5',
    borderRadius: '8px',
    padding: '6px 12px',
    fontWeight: 600,
    fontSize: 14,
    color: '#3f51b5',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#e0e7ff',
      color: '#3f51b5',
      transform: 'translateY(-1px)',
    },
  },
  inTime: {
    fontSize: 14,
    fontWeight: 700,
  },
  outTime: {
    fontSize: 10,
    fontWeight: 400,
    color: '#999',
  },
});


export default useStyles;
