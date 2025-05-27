import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";
import { getMovieList } from "../../reducers/actions/Movie";
import { Link } from "react-router-dom";
import MovieSearchBar from "../../components/MovieSearchBar";
import Pagination from "@material-ui/lab/Pagination";
import { useStyles } from "./style";


function getRandomMovies(movies, n) {
    if (!movies || movies.length <= n) return movies;
    const shuffled = [...movies].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
}

const MOVIES_PER_PAGE = 5;
const MOVIES_PER_ROW = 4;

export default function MovieShowings() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { movieList } = useSelector((state) => state.movieReducer);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [recommendMovies, setRecommendMovies] = useState([]);
    const totalPages = movieList ? Math.ceil((movieList.length || 0) / MOVIES_PER_PAGE) : 1;
    const [topStart, setTopStart] = useState(0);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedMovie, setSelectedMovie] = useState('');
    const [searchKeyword, setSearchKeyword] = useState('');

    // Option cố định cho thể loại và quốc gia
    const genreOptions = [
        'Hai người tình cảm',
        'Hài dón',
    ];
    const countryOptions = [
        'Hàn Quốc',
        'Việt Nam',
        'Nhật Bản',
    ];

    useEffect(() => {
        dispatch(getMovieList());
    }, []);

    useEffect(() => {
        setFilteredMovies(movieList || []);
        setPage(1);
    }, [movieList]);

    useEffect(() => {
        if (filteredMovies.length === (movieList || []).length) {
            setRecommendMovies(getRandomMovies(movieList, MOVIES_PER_PAGE));
        }
    }, [page, movieList, filteredMovies]);

    const handleInputChange = (inputValue) => {
        if (!inputValue) {
            setFilteredMovies(movieList || []);
            setPage(1);
            return;
        }
        const lower = inputValue.toLowerCase();
        setFilteredMovies(
            (movieList || []).filter((movie) =>
                movie.tenPhim.toLowerCase().includes(lower)
            )
        );
        setPage(1);
    };

    const handleMovieChange = (movie) => {
        if (!movie) {
            setFilteredMovies(movieList || []);
            setPage(1);
            return;
        }
        setFilteredMovies(
            (movieList || []).filter((m) => m.maPhim === movie.maPhim)
        );
        setPage(1);
    };

    // Top 5 phim nổi bật (lấy 5 phim đầu danh sách)
    const topMoviesToShow = (movieList || []).slice(topStart, topStart + 5);
    const canSlideLeft = topStart > 0;
    const canSlideRight = (movieList || []).length > topStart + 5;

    // Phim dành cho bạn: random 20 phim mỗi trang nếu không lọc, nếu lọc thì chỉ hiển thị kết quả lọc
    const showRecommend = filteredMovies.length === (movieList || []).length && !searchKeyword && !selectedGenre && !selectedCountry;
    const moviesToShow = filteredMovies.slice((page - 1) * MOVIES_PER_PAGE, page * MOVIES_PER_PAGE);
    const pageCount = Math.max(1, Math.ceil(filteredMovies.length / MOVIES_PER_PAGE));
    const showPagination = pageCount > 1;
    const filteredPagination = filteredMovies.length > MOVIES_PER_PAGE;

    // Lấy danh sách thể loại và quốc gia duy nhất, chuẩn hóa về mảng, loại bỏ khoảng trắng, chữ thường
    const genreList = Array.from(new Set((movieList || []).flatMap(m => m.theLoai ? (Array.isArray(m.theLoai) ? m.theLoai : m.theLoai.split(',').map(s => s.trim())) : []))).filter(Boolean);
    const countryList = Array.from(new Set((movieList || []).flatMap(m => m.quocGia ? (Array.isArray(m.quocGia) ? m.quocGia : m.quocGia.split(',').map(s => s.trim())) : []))).filter(Boolean);

    // Lọc phim theo tên, thể loại, quốc gia (so sánh với option cố định, không phân biệt hoa thường)
    const filterMovies = (list) => {
        return (list || []).filter(movie => {
            const movieGenres = movie.theLoai
                ? (Array.isArray(movie.theLoai)
                    ? movie.theLoai.map(s => s.trim().toLowerCase())
                    : movie.theLoai.split(',').map(s => s.trim().toLowerCase()))
                : [];
            const movieCountries = movie.quocGia
                ? (Array.isArray(movie.quocGia)
                    ? movie.quocGia.map(s => s.trim().toLowerCase())
                    : movie.quocGia.split(',').map(s => s.trim().toLowerCase()))
                : [];
            const matchKeyword = !searchKeyword || movie.tenPhim.toLowerCase().includes(searchKeyword.toLowerCase());
            const matchGenre = !selectedGenre || movieGenres.includes(selectedGenre.toLowerCase());
            const matchCountry = !selectedCountry || movieCountries.includes(selectedCountry.toLowerCase());
            return matchKeyword && matchGenre && matchCountry;
        });
    };

    // Sửa lại các nơi dùng movieList để dùng filterMovies(movieList)
    useEffect(() => {
        setFilteredMovies(filterMovies(movieList));
        setPage(1);
    }, [movieList, selectedGenre, selectedCountry, searchKeyword]);

    const handleGenreChange = (e) => {
        setSelectedGenre(e.target.value);
    };
    const handleCountryChange = (e) => {
        setSelectedCountry(e.target.value);
    };

    // Khi chọn tên phim, chỉ hiển thị phim đó (lọc danh sách bên dưới)
    const handleMovieSelect = (e) => {
        setSelectedMovie(e.target.value);
        setPage(1);
    };

    return (
        <div className={classes.root}>
            {/* Section phim đang chiếu nổi bật */}
            <div className={classes.topMoviesSection}>
                <div className={classes.topMoviesOverlay}></div>
                <div className={classes.topMoviesContent}>
                    <div className={classes.topMoviesTitle}>Phim đang chiếu</div>
                    <div style={{ position: 'relative', width: '100%' }}>
                        {canSlideLeft && (
                            <button
                                className={classes.topMoviesSliderBtn + ' ' + classes.topMoviesSliderBtnLeft}
                                onClick={() => setTopStart(topStart - 1)}
                                aria-label="Xem phim trước"
                            >
                                &#8592;
                            </button>
                        )}
                        {canSlideRight && (
                            <button
                                className={classes.topMoviesSliderBtn}
                                onClick={() => setTopStart(topStart + 1)}
                                aria-label="Xem phim tiếp"
                            >
                                &#8594;
                            </button>
                        )}
                        <div className={classes.topMoviesRow}>
                            {topMoviesToShow.map((movie, idx) => (
                                <div
                                    key={movie.maPhim}
                                    className={classes.topMovieCard}
                                    onClick={() => window.location.href = `/detail/${movie.maPhim}`}
                                >
                                    <img
                                        src={movie.hinhAnh}
                                        alt={movie.tenPhim}
                                        className={classes.topMovieImage}
                                    />
                                    <div className={classes.topMoviePosterOverlay}></div>
                                    <div className={classes.movieOverlay}>
                                        <div className={classes.overlayButtons}>
                                            <button
                                                className={classes.overlayBtn}
                                                onClick={e => {
                                                    e.stopPropagation();
                                                    window.location.href = `/detail/${movie.maPhim}`;
                                                }}
                                            >
                                                Đặt vé
                                            </button>
                                            <button
                                                className={classes.overlayBtn}
                                                onClick={e => {
                                                    e.stopPropagation();
                                                    window.location.href = `/detail/${movie.maPhim}`;
                                                }}
                                            >
                                                Chi tiết
                                            </button>
                                        </div>
                                    </div>
                                    <div className={classes.topMovieIndex}>{topStart + idx + 1}</div>
                                    <div className={classes.topMovieTitle}>{movie.tenPhim}</div>
                                    <div className={classes.topMovieDivider}></div>
                                    <div className={classes.topMovieMeta}>
                                        {movie.thoiLuong}Phút
                                        {movie.ngayKhoiChieu ? ` | ${new Date(movie.ngayKhoiChieu).toLocaleDateString('vi-VN')}` : ''}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>


            {/* Section tìm kiếm phim */}
            <div style={{
                width: '100vw',
                position: 'relative',
                left: '50%',
                right: '50%',
                marginLeft: '-50vw',
                marginRight: '-50vw',
                backgroundColor: '#fff5f8',
                padding: '40px 0'
            }}>
                <div className={classes.searchBarRow}>
                    <div className={classes.sectionTitle}>Tìm kiếm phim trên Phú Lê Movie</div>
                    <select className={classes.filterSelect} value={selectedGenre} onChange={handleGenreChange}>
                        <option value="">Thể loại</option>
                        {genreOptions.map((g) => (
                            <option key={g} value={g}>{g}</option>
                        ))}
                    </select>
                    <select className={classes.filterSelect} value={selectedCountry} onChange={handleCountryChange}>
                        <option value="">Quốc gia</option>
                        {countryOptions.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                    <input
                        className={classes.searchInput}
                        type="text"
                        placeholder="Tìm kiếm phim"
                        value={searchKeyword}
                        onChange={e => { setSearchKeyword(e.target.value); setPage(1); }}
                    />
                </div>

                <div className={classes.movieGrid}>
                    {moviesToShow.map((movie) => (
                        <div
                            key={movie.maPhim}
                            className={classes.movieCard}
                            onClick={() => window.location.href = `/detail/${movie.maPhim}`}
                        >
                            <img
                                src={movie.hinhAnh}
                                alt={movie.tenPhim}
                                className={classes.movieImage}
                            />
                            <div className={classes.movieOverlay}>
                                <div className={classes.overlayButtons}>
                                    <button
                                        className={classes.overlayBtn}
                                        onClick={e => {
                                            e.stopPropagation();
                                            window.location.href = `/detail/${movie.maPhim}`;
                                        }}
                                    >
                                        Đặt vé
                                    </button>
                                    <button
                                        className={classes.overlayBtn}
                                        onClick={e => {
                                            e.stopPropagation();
                                            window.location.href = `/detail/${movie.maPhim}`;
                                        }}
                                    >
                                        Chi tiết
                                    </button>
                                </div>
                            </div>
                            <div className={classes.movieInfo}>
                                <div className={classes.movieTitle}>{movie.tenPhim}</div>
                                <div className={classes.movieDivider}></div>
                                <div className={classes.movieMeta}>
                                    {movie.thoiLuong}Phút
                                    {movie.ngayKhoiChieu ? ` | ${new Date(movie.ngayKhoiChieu).toLocaleDateString('vi-VN')}` : ''}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Phân trang cho phần tìm kiếm phim */}
                {showPagination && (
                    <div className={classes.paginationWrap}>
                        <Pagination
                            count={pageCount}
                            page={page}
                            onChange={(_, value) => setPage(value)}
                            color="primary"
                            shape="rounded"
                        />
                    </div>
                )}
            </div>
        </div>
    );
} 