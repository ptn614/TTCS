import React, { Fragment } from "react";
import Address from "./Address";
import TheaterImg from "../TheaterImg/TheaterImg";
import ButtonCheckout from "../ButtonCheckout";
import TenCumRap from "../TenCumRap";
import { useStyles, Accordion, AccordionSummary, AccordionDetails } from "./style";

export default function ItemCumRap({
  tenCumRap,
  maLichChieu,
  lichChieuPhim,
  diaChi,
  expanded,
  onChange,
}) {
  const classes = useStyles();

  return (
    <Accordion
      key={tenCumRap}
      square
      expanded={expanded} // Sử dụng prop expanded để kiểm soát
      onChange={onChange} // Xử lý sự kiện thay đổi
    >
      <AccordionSummary>
        <TheaterImg nameTheater={tenCumRap} imgStyle={classes.imgTheater} />
        <div className={classes.wrapInfo}>
          <TenCumRap tenCumRap={tenCumRap} />
          <Address maLichChieu={maLichChieu} diaChiAlreadyExist={diaChi} />
        </div>
      </AccordionSummary>
      <AccordionDetails>
        {lichChieuPhim.map((lcp) => (
          <Fragment key={lcp.maLichChieu}>
            <ButtonCheckout lichChieuTheoPhim={lcp} />
          </Fragment>
        ))}
      </AccordionDetails>
    </Accordion>
  );
}