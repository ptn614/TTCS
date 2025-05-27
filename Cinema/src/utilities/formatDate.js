import PropTypes from 'prop-types';

const formatDate = (dateIn) => { // ISODate ~ 2021-3-31
  if (!dateIn) {
    return { dayToday: "loading...", dateShort: "loading...", dateFull: "loading...", YyMmDd: "loading...", dayMonth: "loading..." };
  }
  if (dateIn?.indexOf("/") !== -1) { // if input 31/3/2021 > output 2021-3-31
    const arr = dateIn?.split('/');
    dateIn = `${arr[2]}-${arr[1]}-${arr[0]}`;
  }
  const dateObj = new Date(dateIn);
  const dayNumber = dateObj.getDay(); // trả về thứ dưới dạng một số từ 0 > 6

  // Lấy ngày hiện tại để so sánh
  const today = new Date();
  const dateNowFormat = today.toISOString().slice(0, 10); // VD: "2025-05-24"
  const dateObjFormat = dateObj.toISOString().slice(0, 10); // VD: "2023-10-19"

  // Xác định tên thứ
  let dayToday = '';
  if (dayNumber === 0) {
    dayToday = "Chủ nhật";
  }
  if (dayNumber === 1) {
    dayToday = "Thứ 2";
  }
  if (dayNumber === 2) {
    dayToday = "Thứ 3";
  }
  if (dayNumber === 3) {
    dayToday = "Thứ 4";
  }
  if (dayNumber === 4) {
    dayToday = "Thứ 5";
  }
  if (dayNumber === 5) {
    dayToday = "Thứ 6";
  }
  if (dayNumber === 6) {
    dayToday = "Thứ 7";
  }

  // Nếu ngày trùng với hôm nay, đặt dayToday thành "Hôm nay"
  if (dateNowFormat === dateObjFormat) {
    dayToday = "Hôm nay";
  }

  const date = `0${dateObj.getDate()}`.slice(-2); // Đảm bảo 2 chữ số: "19"
  const month = `0${dateObj.getMonth() + 1}`.slice(-2); // Đảm bảo 2 chữ số: "10"
  const year = dateObj.getFullYear();

  const dayMonth = `${date}/${month}`; // Định dạng "Ngày/Tháng": "19/10"

  const dateFull = dayToday + ', ' + date + ' tháng ' + month + ', ' + year;

  const getTime = dateObj.getTime();

  return { dayToday, dateShort: dateIn, dateFull, YyMmDd: `${year}.${month}.${date}`, getTime, dayMonth };
};

export default formatDate;

formatDate.propTypes = {
  ISODate: PropTypes.string.isRequired,
};