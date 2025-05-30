  import React, { useState, useRef, useEffect } from "react";
  import { useParams } from "react-router-dom";
  import CircularProgress from "@material-ui/core/CircularProgress";
  import { useLocation } from "react-router-dom";
  import "./style.css";
  import useStyles from "./style";
  import formatDate from "../../../utilities/formatDate";
  import useApiThoiLuongDanhGia from "../../../utilities/useApiThoiLuongDanhGia";
  import Tap from "../Tap";
  import { useDispatch } from "react-redux";
  import { OPEN_MODAL } from "../../../reducers/constants/ModalTrailer";
  import axios from "axios";

  const play = "/img/carousel/play-video.png";

  export default function Desktop({ movieDetailShowtimes: data, isMobile }) {
    const [onClickBtnMuave, setOnClickBtnMuave] = useState(0);
    const param = useParams();
    const { thoiLuong } = useApiThoiLuongDanhGia(param.maPhim);
    const classes = useStyles({ bannerImg: data?.hinhAnh });
    const [imagePage404, setImagePage404] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [shouldShowReadMore, setShouldShowReadMore] = useState(false);
    let location = useLocation();
    const [dsTheLoai, setDsTheLoai] = useState([]);

    const descriptionRef = useRef(null);

    const handleBtnMuaVe = () => {
      setOnClickBtnMuave(Date.now());
    };

    const dispatch = useDispatch();

    const openModal = () => {
      dispatch({
        type: OPEN_MODAL,
        payload: {
          open: true,
          urlYoutube: data.trailer,
        },
      });
    };

    // Đo chiều cao nội dung để kiểm tra có vượt quá 1.5 dòng không
    useEffect(() => {
      if (descriptionRef.current) {
        const lineHeight = 1.5 * 14; // line-height: 1.5, font-size: 14px
        const maxHeight = lineHeight * 1.5; // 1.5 dòng
        const contentHeight = descriptionRef.current.scrollHeight;
        setShouldShowReadMore(contentHeight > maxHeight);
      }
    }, [data?.moTa]);

    useEffect(() => {
      axios.get("http://localhost:4000/api/QuanLyRap/LayThongTinTheLoaiPhim")
        .then(res => setDsTheLoai(res.data))
        .catch(() => setDsTheLoai([]));
    }, []);

    const getTenTheLoai = (ma) => {
      const found = dsTheLoai.find(tl => Number(tl.id) === Number(ma));
      return found ? found.tenTheLoai : ma;
    };

    return (
      <div
        className="detail-bg"
        style={{
          position: "relative",
          width: "100vw",
          minHeight: "100vh",
          left: "50%",
          right: "50%",
          marginTop: "55px",
          marginLeft: "-50vw",
          marginRight: "-50vw",
          overflow: "hidden",
        }}
      >
        {/* Ảnh nền động, overlay mờ */}
        {data?.hinhAnh && (
          <>
            <div
              style={{
                backgroundImage: `url(${data.hinhAnh})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "absolute",
                inset: 0,
                zIndex: 0,
                filter: "blur(8px) brightness(0.4)",
                transition: "background-image 0.3s",
                width: "100%",
                height: "700px",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "700px",
                background: "rgba(0,0,0,0.7)",
                zIndex: 1,
              }}
            />
          </>
        )}
        <div className="detail-flex" style={{ position: "relative", zIndex: 2, padding: "20px 50px" }}>
          {/* Poster phim */}
          <div className="detail-poster-container">
            <img
              src={data.hinhAnh}
              alt="poster"
              className="detail-poster"
              onError={(e) => {
                e.target.onerror = null;
                setImagePage404(true);
              }}
            />
            {imagePage404 && <div className={classes.withOutImage}></div>}
          </div>
          {/* Thông tin phim */}
          <div className="detail-content">
            <div className="detail-title">{data?.tenPhim || "Tên phim"}</div>
            <div className="detail-meta">
              {data?.tenPhim}   {data?.namSX || ""}   {thoiLuong || data?.thoiLuong || ""} phút
            </div>

            {/* Nội dung phim */}
            <div className="detail-desc-container">
              <p className="detail-desc-label">Nội dung</p>
              <div>
                <div
                  ref={descriptionRef}
                  className={`detail-desc${showFullDescription ? ' expanded' : ''}`}
                >
                  {data?.moTa || "Không có mô tả."}
                </div>
                {shouldShowReadMore && !showFullDescription && (
                  <button
                    className="read-more-btn"
                    onClick={() => setShowFullDescription(true)}
                  >
                    Xem thêm
                  </button>
                )}
                {showFullDescription && (
                  <button
                    className="read-more-btn hide-btn"
                    onClick={() => setShowFullDescription(false)}
                  >
                    Ẩn bớt
                  </button>
                )}
              </div>
            </div>

            {/* Thông tin chi tiết */}
            <div className="detail-info">
              <div className="detail-info-row">
                <div className="detail-info-label">Ngày chiếu</div>
                <div className="detail-info-value">
                  {formatDate(data.ngayKhoiChieu?.slice(0, 10)).YyMmDd}
                </div>
              </div>
              {data?.daoDien && (
                <div className="detail-info-row">
                  <div className="detail-info-label">Đạo diễn</div>
                  <div className="detail-info-value">{data.daoDien}</div>
                </div>
              )}
              {data?.dienVien && (
                <div className="detail-info-row">
                  <div className="detail-info-label">Diễn viên</div>
                  <div className="detail-info-value">{data.dienVien}</div>
                </div>
              )}
              {data?.maTheLoaiPhim && (
                <div className="detail-info-row">
                  <div className="detail-info-label">Thể loại</div>
                  <div className="detail-info-value">
                    {Array.isArray(data.maTheLoaiPhim)
                      ? data.maTheLoaiPhim.map(getTenTheLoai).join(', ')
                      : getTenTheLoai(data.maTheLoaiPhim)
                    }
                  </div>
                </div>
              )}
              {data?.dinhDang && (
                <div className="detail-info-row">
                  <div className="detail-info-label">Định dạng</div>
                  <div className="detail-info-value">{data.dinhDang}</div>
                </div>
              )}
              {data?.nhaSanXuat && (
                <div className="detail-info-row">
                  <div className="detail-info-label">Quốc gia SX</div>
                  <div className="detail-info-value">{data.nhaSanXuat}</div>
                </div>
              )}
            </div>

            {/* Nút */}
            <div className="detail-btns">
              <button className="detail-btn" onClick={handleBtnMuaVe}>
                {location.state?.comingMovie ? "Thông tin phim" : "Mua vé"}
              </button>
              <button className="detail-btn" onClick={() => openModal()}>
                {location.state?.comingMovie ? "Thông tin phim" : "Xem demo"}
              </button>
            </div>
          </div>
        </div>
        <Tap data={data} onClickBtnMuave={onClickBtnMuave} isMobile={isMobile} />
      </div>
    );
  }