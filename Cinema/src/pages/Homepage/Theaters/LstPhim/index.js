import React, { memo, useState } from 'react';
import useStyles from './style';
import { useHistory } from "react-router-dom";
import ThoiLuongDanhGia from '../../../../components/ThoiLuongDanhGia/thoiLuongDanhGia';
import { customScrollbar } from '../../../../styles/materialUi';
import { underLine } from '../../../../styles/materialUi';
import ButtonCheckout from '../../../../components/ButtonCheckout';

function Index(props) {
  const history = useHistory();
  const classes = useStyles({ customScrollbar, underLine });

  // Trạng thái để quản lý phim được chọn
  const [selectedPhimId, setSelectedPhimId] = useState(null);

  // Xử lý click vào giờ để chuyển trang
  const handleTimeClick = (maPhim, maLichChieu) => {
    history.push(`/detail/${maPhim}?maLichChieu=${maLichChieu}`);
  };

  return (
    <div className={classes.lstPhim}>
      {props.lstPhim.map(phim => (
        <div key={phim.maPhim} className={classes.phimWrapper}>
          <div className={`${classes.phim} ${selectedPhimId === phim.maPhim ? classes.phimActive : ''}`}>
            <div className={classes.phim__info}>
              <img
                src={phim.hinhAnh}
                className={classes.phim__img}
                alt={phim.tenPhim}
                style={{ cursor: "pointer" }}
                onClick={() => history.push(`/detail/${phim.maPhim}`)}
              />
              <div className={classes.phim__text}>
                <p className={classes.phim__text_name}>{phim.tenPhim}</p>
                {/* Các ô thời gian */}
                <div className={classes.groupTime}>
                  {(props.selectedDate
                    ? phim.lstLichChieuTheoPhim?.filter(lc => lc.ngayChieuGioChieu?.slice(0, 10) === props.selectedDate)
                    : phim.lstLichChieuTheoPhim
                  )?.map((lc) => (
                    <ButtonCheckout
                      key={lc.maLichChieu}
                      lichChieuTheoPhim={lc}
                      className={classes.gioChieuItem}
                      onClick={() => handleTimeClick(phim.maPhim, lc.maLichChieu)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default memo(Index);