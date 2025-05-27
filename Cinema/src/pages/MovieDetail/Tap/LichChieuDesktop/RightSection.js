import React, { useState, useMemo } from "react";
import useStyles from "./style";
import formatDate from "../../../../utilities/formatDate";
import ItemCumRap from "../../../../components/ItemCumRap";
import { selectDesktopData } from "../../../../reducers/selector/MovieDetail";

export default function RightSection({ currentSelectedHeThongRapChieu }) {
  const [indexSelected, setIndexSelected] = useState(0);
  const [selectedRapIndex, setSelectedRapIndex] = useState(null); // Trạng thái rạp được chọn
  const desktopData = useMemo(
    () => selectDesktopData(currentSelectedHeThongRapChieu),
    [currentSelectedHeThongRapChieu]
  );
  const classes = useStyles();

  const handleSelectDay = (i) => {
    setIndexSelected(i);
    setSelectedRapIndex(null); // Đóng tất cả rạp khi thay đổi ngày
  };

  const handleSelectRap = (rapIndex, event) => {
    // Ngăn chặn sự kiện onChange của Accordion tự động mở/đóng
    event.stopPropagation();
    // Nếu rạp đã được chọn, nhấn lại để đóng; nếu chọn rạp khác, mở rạp mới
    setSelectedRapIndex(selectedRapIndex === rapIndex ? null : rapIndex);
  };

  const handleAccordionChange = (rapIndex, event, isExpanded) => {
    // Đồng bộ trạng thái với Accordion
    if (!isExpanded) {
      setSelectedRapIndex(null); // Đóng khi người dùng đóng tay
    }
  };

  if (!desktopData?.arrayDay?.length) {
    return <p style={{ padding: 10 }}>Hiện tại chưa có lịch chiếu cho hệ thống rạp này</p>;
  }

  return (
    <div>
      <div className={classes.listDay}>
        {desktopData.arrayDay.map((day, i) => (
          <div
            className={`${classes.dayItem} ${i === indexSelected ? classes.dayItemActive : ''}`}
            key={day}
            onClick={() => handleSelectDay(i)}
          >
            <p>{formatDate(day).dayMonth}</p>
            <p style={{ transition: "all .2s" }}>
              {formatDate(day).dayToday}
            </p>
          </div>
        ))}
      </div>
      {/* Thêm đường thẳng ngang */}
      <div className={classes.divider} />
      {desktopData.allArrayCumRapChieuFilterByDay.map((arrayCumRapChieuFilterByDay, i) => (
        <div
          key={i}
          style={{ display: indexSelected === i ? "block" : "none" }}
        >
          {arrayCumRapChieuFilterByDay.map((item, rapIndex) => (
            <div
              key={item.tenCumRap}
              className={`${classes.rapItem} ${selectedRapIndex === rapIndex ? classes.rapItemActive : ''}`}
              onClick={(event) => handleSelectRap(rapIndex, event)}
            >
              <ItemCumRap
                tenCumRap={item.tenCumRap}
                maLichChieu={item.maLichChieu}
                lichChieuPhim={item.lichChieuPhim}
                diaChi={item.diaChi}
                expanded={selectedRapIndex === rapIndex}
                onChange={(event, isExpanded) => handleAccordionChange(rapIndex, event, isExpanded)}
              />
              {/* Thêm đường thẳng ngang */}
              <div className={classes.divider} />
            </div>
          ))}

        </div>
      ))}
    </div>
  );
}