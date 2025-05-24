import React, { useEffect, useState } from "react";
import axios from "axios";
import { URL_BANNER } from "../../../constants/config";
import Slider from "react-slick";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import { useHistory } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import SearchStickets from "./SearchTickets";
import useStyles from "./styles";
import BtnPlay from "../../../components/BtnPlay";
import { LOADING_BACKTO_HOME_COMPLETED } from "../../../reducers/constants/Lazy";
import "./carousel.css";
import moviesApi from "../../../api/moviesApi";

export default function Carousel() {


  const [listFilmBanner, setListFilmBanner] = useState([]);
  const getFilmBanner = async () => {
    try {
      const res = await moviesApi.getDanhSachBanner();
      setListFilmBanner(res.data.content);
    } catch (err) {
      console.error("Lỗi API:", err); // In chi tiết
      if (err.response) {
        console.error("Lỗi response:", err.response); // status, data, headers
      } else if (err.request) {
        console.error("Lỗi request:", err.request); // Không nhận được phản hồi
      } else {
        console.error("Lỗi khác:", err.message); // Lỗi setup
      }
    }
  };

  const dispatch = useDispatch();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const history = useHistory();
  const classes = useStyles();
  const settings = {
    dots: true,
    infinite: true,
    autoplaySpeed: 5000, //speed per sence
    autoplay: true,
    speed: 500,
    swipeToSlide: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    dotsClass: "slickdotsbanner",
  };

  useEffect(() => {
    dispatch({ type: LOADING_BACKTO_HOME_COMPLETED });

    getFilmBanner();
  }, []);


  function NextArrow(props) {
    const { onClick } = props;
    return (
      <ArrowForwardIosRoundedIcon
        style={{ right: "15px" }}
        onClick={onClick}
        className={classes.Arrow}
      />
    );
  }

  function PrevArrow(props) {
    const { onClick } = props;
    return (
      <ArrowBackIosRoundedIcon
        style={{ left: "15px" }}
        onClick={onClick}
        className={classes.Arrow}
      />
    );
  }

  return (
    <div id="carousel" className={classes.carousel}>

      <Slider {...settings}>
        {listFilmBanner.map((banner) => {
          return (
            <div key={banner.maPhim} className={classes.itemSlider}>
              <img src={banner?.hinhAnh} alt="banner" className={classes.img} />
              <div
                className={classes.backgroundLinear}
                onClick={() => history.push(`/detail/${banner.maPhim}`)}
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
