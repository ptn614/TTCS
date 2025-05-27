import React, { memo, useState } from "react";
import LstPhim from "../LstPhim";
import useStyles from "./style";
import { underLine, customScrollbar } from "../../../../styles/materialUi";
import TheaterImg from "../../../../components/TheaterImg/TheaterImg";
import TenCumRap from "../../../../components/TenCumRap";
import formatDate from "../../../../utilities/formatDate"; // Import formatDate

function LstCumRap(props) {
  const { lstCumRap, color } = props;
  const [valueCumRap, setValueCumRap] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const classes = useStyles({ underLine, customScrollbar, color });

  const handleChangeCumRap = (e) => {
    setValueCumRap(Number(e.currentTarget.getAttribute("index")));
    setSelectedDate(null);
  };

  // Lọc rạp theo từ khóa tìm kiếm
  const filteredCumRap = lstCumRap.filter(cumRap =>
    cumRap.tenCumRap.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Lấy ra các ngày chiếu duy nhất của rạp đang chọn
  const allDates = React.useMemo(() => {
    if (!lstCumRap[valueCumRap]) return [];
    const allLichChieu = lstCumRap[valueCumRap].danhSachPhim?.flatMap(phim =>
      phim.lstLichChieuTheoPhim?.map(lc => lc.ngayChieuGioChieu) || []
    ) || [];
    const arrayAllDay = allLichChieu.map(item => item?.slice(0, 10)).filter(Boolean);
    return Array.from(new Set(arrayAllDay)).sort();
  }, [lstCumRap, valueCumRap]);

  // Lọc phim theo ngày đã chọn
  const filteredPhim = React.useMemo(() => {
    if (!lstCumRap[valueCumRap]) return [];
    if (!selectedDate) return lstCumRap[valueCumRap].danhSachPhim;
    return lstCumRap[valueCumRap].danhSachPhim.filter(phim =>
      phim.lstLichChieuTheoPhim?.some(lc => lc.ngayChieuGioChieu?.slice(0, 10) === selectedDate)
    );
  }, [lstCumRap, valueCumRap, selectedDate]);

  return (
    <div className={classes.flexCumRap}>
      {/* Cột trái: Thanh tìm kiếm và danh sách rạp */}
      <div className={classes.lstCumRapContainer}>
        <div className={classes.searchContainer}>
          <input
            type="text"
            placeholder="Tìm theo tên rạp..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={classes.searchInput}
          />
        </div>
        <div className={classes.lstCumRap}>
          {filteredCumRap.map((cumRap, index) => (
            <div
              className={`${classes.cumRap} ${valueCumRap === index ? classes.cumRapActive : ""}`}
              index={index}
              onClick={handleChangeCumRap}
              key={cumRap.maCumRap}
              style={{ opacity: valueCumRap === index ? "1" : ".5" }}
            >
              <TheaterImg nameTheater={cumRap.tenCumRap} imgStyle={classes.cumRap__img} />
              <div className={classes.cumRap__info}>
                <TenCumRap tenCumRap={cumRap.tenCumRap} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cột phải: Thông tin rạp, ngày và danh sách phim */}
      <div className={classes.rightSection}>
        {lstCumRap[valueCumRap] && (
          <div className={classes.theaterInfo}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <TheaterImg
                nameTheater={lstCumRap[valueCumRap].tenCumRap}
                imgStyle={classes.cumRap__img}
              />
              <div>
                <h3 style={{ margin: 0 }}>{lstCumRap[valueCumRap].tenCumRap}</h3>
                <p style={{ margin: 0 }}>{lstCumRap[valueCumRap].diaChi}</p>
              </div>
            </div>
          </div>
        )}

        {/* Hàng thứ hai: Chọn ngày */}
        {allDates.length > 0 && (
          <div className={classes.dateSelector}>
            {allDates.map(date => {
              const { dayToday, dayMonth } = formatDate(date); // Sử dụng formatDate
              return (
                <div
                  key={date}
                  className={`${classes.dateItem} ${selectedDate === date ? classes.dateItemActive : ""}`}
                  onClick={() => setSelectedDate(date)}
                >
                  <div className={classes.dateText}>{dayMonth}</div>
                  <div className={classes.dayText}>{dayToday}</div>
                </div>
              );
            })}
          </div>
        )}

        {/* Hàng tiếp theo: Danh sách phim với khung giờ */}
        <div className={classes.lstPhim}>
          {lstCumRap.map((cumRap, index) => (
            <div key={cumRap.maCumRap} hidden={valueCumRap !== index}>
              <LstPhim lstPhim={selectedDate ? filteredPhim : cumRap.danhSachPhim} selectedDate={selectedDate} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(LstCumRap);