import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CustomPopper from "./popper";
import "./style.css"
import theatersApi from "../../../../api/theatersApi";
import useStyles from "./styles";
import formatDate from "../../../../utilities/formatDate";
import { HIDDEN_SEARCHTICKET } from "../../../../constants/config";
import { makeStyles } from "@material-ui/core/styles";

const useStyles2 = makeStyles((theme) => ({
    option: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(1),
        '&:hover': {
            backgroundColor: 'rgba(238, 130, 59, 0.1)',
        },
    },
    movieImage: {
        width: 50,
        height: 70,
        marginRight: theme.spacing(2),
        objectFit: 'cover',
        borderRadius: 4,
    },
    movieInfo: {
        display: 'flex',
        flexDirection: 'column',
    },
    movieTitle: {
        fontWeight: 'bold',
        marginBottom: theme.spacing(0.5),
    },
    movieDetails: {
        fontSize: '0.875rem',
        color: theme.palette.text.secondary,
    },
}));

export default function SearchStickets() {
    const { movieList: movieRender, errorMovieList } = useSelector(
        (state) => state.movieReducer
    );
    const history = useHistory();
    const down992px = useMediaQuery(HIDDEN_SEARCHTICKET);
    const [data, setData] = useState({
        // handleSelectPhim
        setPhim: "",
        rapRender: [],
        cumRapChieuData: [],
        startRequest: false,
        errorCallApi: "",
        setRap: "",
        ngayChieuRender: [],
        lichChieuPhimData: [],

        setNgayXem: "",
        suatChieuRender: [],
        lichChieuPhimDataSelected: [],
        setSuatChieu: "",
        maLichChieu: "",
        openCtr: { phim: false, rap: false, ngayXem: false, suatChieu: false },
        rootElementPopup: null,
    });
    const [topPopup, setTopPopup] = useState(false);
    const classes = useStyles({
        down992px,
        openPhim: data.openCtr.phim || data.setPhim?.maPhim,
    });
    const [currentPhimPopup, setcurrentPhimPopup] = useState(null);
    const classes2 = useStyles2();
    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        let mounted = true;
        if (!data.openCtr.phim) {
            return undefined;
        }
        setTimeout(() => {
            const placementPopup = document.querySelector(
                'div[role="presentation"].MuiAutocomplete-popper'
            );
            if (placementPopup?.getAttribute("x-placement") === "bottom" && mounted) {
                setTopPopup(false);
            } else if (
                placementPopup?.getAttribute("x-placement") === "top" &&
                mounted
            ) {
                setTopPopup(true);
            }
            setData((data) => ({
                ...data,
                rootElementPopup: placementPopup,
            }));
        }, 50);
        return () => {
            mounted = false;
        };
    }, [data.openCtr.phim]);

    const handleOpenPhim = () => {
        setData((data) => ({
            ...data,
            openCtr: { ...data.openCtr, phim: true },
        }));
    };
    const handleOpenRap = () => {
        setData((data) => ({ ...data, openCtr: { ...data.openCtr, rap: true } }));
    };
    const handleOpenNgayXem = () => {
        setData((data) => ({
            ...data,
            openCtr: { ...data.openCtr, ngayXem: true },
        }));
    };
    const handleOpenSuatChieu = () => {
        setData((data) => ({
            ...data,
            openCtr: { ...data.openCtr, suatChieu: true },
        }));
    };
    const handleClosePhim = () => {
        setData((data) => ({ ...data, openCtr: { ...data.openCtr, phim: false } }));
    };
    const handleCloseRap = () => {
        setData((data) => ({ ...data, openCtr: { ...data.openCtr, rap: false } }));
    };
    const handleCloseNgayXem = () => {
        setData((data) => ({
            ...data,
            openCtr: { ...data.openCtr, ngayXem: false },
        }));
    };
    const handleCloseSuatChieu = () => {
        setData((data) => ({
            ...data,
            openCtr: { ...data.openCtr, suatChieu: false },
        }));
    };
    const handleSelectPhim = (phim) => {
        if (!phim) {
            return undefined;
        }
        setData((data) => ({
            ...data,
            setPhim: phim,
            startRequest: true,
            openCtr: { ...data.openCtr, rap: true },
            rapRender: [],
            cumRapChieuData: [],
            setRap: "",
            ngayChieuRender: [],
            lichChieuPhimData: [],
            setNgayXem: "",
            suatChieuRender: [],
            lichChieuPhimDataSelected: [],
            setSuatChieu: "",
            maLichChieu: "",
        }));
        theatersApi
            .getThongTinLichChieuPhim(phim.maPhim)
            .then((result) => {
                setData((data) => ({ ...data, startRequest: false }));
                const cumRapChieuData = result.data.heThongRapChieu.reduce(
                    (colect, item) => {
                        return [...colect, ...item.cumRapChieu];
                    },
                    []
                );
                const rapRender = cumRapChieuData.map((item) => item.tenCumRap);
                setData((data) => ({
                    ...data,
                    rapRender,
                    cumRapChieuData,
                }));
            })
            .catch(function (error) {
                if (error.response) {
                    setData((data) => ({ ...data, errorCallApi: error.response.data }));
                } else if (error.request) {
                    setData((data) => ({ ...data, errorCallApi: error.message }));
                }
            });
    };
    const handleSelectRap = (e) => {
        setData((data) => ({
            ...data,
            setRap: e.target.value,
            openCtr: { ...data.openCtr, ngayXem: true },
            // reset
            ngayChieuRender: [],
            lichChieuPhimData: [],
            setNgayXem: "",
            suatChieuRender: [],
            lichChieuPhimDataSelected: [],
            setSuatChieu: "",
            maLichChieu: "",
        }));
        const indexSelect = data.cumRapChieuData.findIndex(
            (item) => item.tenCumRap === e.target.value
        );
        const lichChieuPhimData = data.cumRapChieuData[indexSelect].lichChieuPhim;
        const ngayChieuRender = lichChieuPhimData.map((item) => {
            return item.ngayChieuGioChieu.slice(0, 10);
        });
        const ngayChieuRenderRemoveDuplicates = [...new Set(ngayChieuRender)];
        setData((data) => ({
            ...data,
            ngayChieuRender: ngayChieuRenderRemoveDuplicates,
            lichChieuPhimData,
        }));
    };
    const handleSelectNgayXem = (e) => {
        setData((data) => ({
            ...data,
            setNgayXem: e.target.value,
            openCtr: { ...data.openCtr, suatChieu: true },
            suatChieuRender: [],
            lichChieuPhimDataSelected: [],
            setSuatChieu: "",
            maLichChieu: "",
        }));

        const lichChieuPhimDataSelected = data.lichChieuPhimData.filter((item) => {
            if (item.ngayChieuGioChieu.slice(0, 10) === e.target.value) {
                return true;
            }
            return false;
        });
        const suatChieuRender = lichChieuPhimDataSelected.map((item) => {
            return item.ngayChieuGioChieu.slice(11, 16);
        });
        setData((data) => ({
            ...data,
            suatChieuRender,
            lichChieuPhimDataSelected,
        }));
    };
    const handleSelectSuatChieu = (e) => {
        setData((data) => ({
            ...data,
            setSuatChieu: e.target.value,
            // reset
            maLichChieu: "",
        }));
        const indexMaLichChieuSelect = data.lichChieuPhimDataSelected.findIndex(
            (item) => item.ngayChieuGioChieu.slice(11, 16) === e.target.value
        );
        const maLichChieu =
            data.lichChieuPhimDataSelected[indexMaLichChieuSelect].maLichChieu;
        setData((data) => ({ ...data, maLichChieu }));
    };

    const setNewPhim = (maPhim) => {
        setcurrentPhimPopup(maPhim);
    };
    const menuProps = {
        classes: { paper: classes.menu },
        getContentAnchorEl: null,
        anchorOrigin: {
            vertical: topPopup ? "top" : "bottom",
            horizontal: "left",
        },
        transformOrigin: {
            vertical: topPopup ? "bottom" : "top",
            horizontal: "left",
        },
    };

    const handleMovieSelect = (movie) => {
        if (movie) {
            history.push(`/movie/${movie.maPhim}`);
        }
    };

    if (errorMovieList) {
        return <p>{errorMovieList}</p>;
    }

    return (
        <div className="form-search responsive" style={{ marginTop: "0px" }}>
            <div className="input-group mb-3" id="searchTickets">
                <FormControl focused={false} className={classes.itemFirst}>
                    <Autocomplete
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                            handleMovieSelect(newValue);
                        }}
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                        }}
                        options={movieRender}
                        getOptionLabel={(option) => option.tenPhim || ''}
                        style={{ width: 300 }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Nhập tên phim"
                                variant="standard"
                                className={classes.textField}
                            />
                        )}
                        renderOption={(option) => (
                            <div className={classes2.option}>
                                <img
                                    src={option.hinhAnh}
                                    alt={option.tenPhim}
                                    className={classes2.movieImage}
                                />
                                <div className={classes2.movieInfo}>
                                    <div className={classes2.movieTitle}>{option.tenPhim}</div>
                                    <div className={classes2.movieDetails}>
                                        {option.ngayKhoiChieu && `Khởi chiếu: ${formatDate(option.ngayKhoiChieu)}`}
                                    </div>
                                </div>
                            </div>
                        )}
                        popupIcon={<ExpandMoreIcon />}
                        classes={{
                            popupIndicator: classes.popupIndicator,
                            option: classes.menu__item,
                            listbox: classes.listbox,
                            paper: classes.paper,
                            noOptions: classes.noOptions,
                        }}
                    />
                </FormControl>






            </div>
        </div>
    );
}
SearchStickets.propTypes = {
    smDown: PropTypes.bool,
};

