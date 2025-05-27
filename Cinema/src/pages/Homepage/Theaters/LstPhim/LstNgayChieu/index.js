import React, { Fragment } from 'react';
import formatDate from '../../../../../utilities/formatDate';
import ButtonCheckout from '../../../../../components/ButtonCheckout';
import useStyles from './style';

export default function LstNgayChieu({ lstLichChieuTheoPhim, isOpen, onTimeClick }) {
  const classes = useStyles();

  if (!isOpen) return null; // Không hiển thị nếu không được mở

  const mangChiChuaNgay = lstLichChieuTheoPhim.map(item => {
    return item.ngayChieuGioChieu.slice(0, 10); // Tạo mảng mới chỉ chứa ngày
  });
  const MangNgayKhongTrungLap = [...new Set(mangChiChuaNgay)]; // Xóa ngày trùng lặp

  const filterByDay = (date) => {
    return lstLichChieuTheoPhim.filter(item => item.ngayChieuGioChieu.slice(0, 10) === date);
  };

  return (
    <div className={classes.lstNgayChieu}>
      {MangNgayKhongTrungLap.map(date => (
        <Fragment key={date}>
          <p className={classes.ngayChieu}>{formatDate(date).dateFull}</p>
          <div className={classes.groupTime}>
            {filterByDay(date).map(lichChieuTheoPhim => (
              <Fragment key={lichChieuTheoPhim.maLichChieu}>
                <ButtonCheckout
                  lichChieuTheoPhim={lichChieuTheoPhim}
                  className={classes.gioChieuItem}
                  onClick={() => onTimeClick(lichChieuTheoPhim.maLichChieu)}
                />
              </Fragment>
            ))}
          </div>
        </Fragment>
      ))}
    </div>
  );
}