import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMovieList } from "../../reducers/actions/Movie";
import { useStyles } from "./style";
import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";

function getRandomMovies(movies, n) {
    if (!movies || movies.length <= n) return movies;
    const shuffled = [...movies].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
}

const MOVIES_PER_PAGE = 5;

export default function MovieShowings() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { movieList } = useSelector((state) => state.movieReducer);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [recommendMovies, setRecommendMovies] = useState([]);
    const totalPages = movieList ? Math.ceil((movieList.length || 0) / MOVIES_PER_PAGE) : 1;
    const [recommendStart, setRecommendStart] = useState(0);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [dsTheLoai, setDsTheLoai] = useState([]);
    const [loadingRecommend, setLoadingRecommend] = useState(false);

    useEffect(() => {
        dispatch(getMovieList());
    }, []);

    useEffect(() => {
        axios.get("http://localhost:4000/api/QuanLyRap/LayThongTinTheLoaiPhim")
            .then(res => setDsTheLoai(res.data))
            .catch(() => setDsTheLoai([]));
    }, []);

    // Load AI recommendations
    useEffect(() => {
        const loadRecommendations = async () => {
            const userInfo = localStorage.getItem('UserLogin');
            if (userInfo) {
                try {
                    const user = JSON.parse(userInfo);
                    const taiKhoan = user.taiKhoan;
                    
                    setLoadingRecommend(true);
                    const response = await axios.get("http://localhost:4000/api/AI/GoiyPhim", {
                        params: { taiKhoan: taiKhoan }
                    });
                    
                    if (response.data && Array.isArray(response.data)) {
                        setRecommendMovies(response.data);
                    } else {
                        // Fallback to random movies if no recommendations
                        setRecommendMovies(getRandomMovies(movieList, 6) || []);
                    }
                } catch (error) {
                    console.error('Lỗi khi tải gợi ý phim:', error);
                    // Fallback to random movies on error
                    setRecommendMovies(getRandomMovies(movieList, 6) || []);
                } finally {
                    setLoadingRecommend(false);
                }
            } else {
                // User not logged in, show random movies
                setRecommendMovies(getRandomMovies(movieList, 6) || []);
            }
        };

        if (movieList && movieList.length > 0) {
            loadRecommendations();
        }
    }, [movieList]);

    const recommendMoviesToShow = recommendMovies.slice(recommendStart, recommendStart + 5);
    const canSlideLeftRecommend = recommendStart > 0;
    const canSlideRightRecommend = recommendMovies.length > recommendStart + 5;

    const showRecommend = filteredMovies.length === (movieList || []).length && !searchKeyword && !selectedGenre && !selectedCountry;
    const moviesToShow = filteredMovies.slice((page - 1) * MOVIES_PER_PAGE, page * MOVIES_PER_PAGE);
    const pageCount = Math.max(1, Math.ceil(filteredMovies.length / MOVIES_PER_PAGE));
    const showPagination = pageCount > 1;

    const genreList = Array.from(new Set((movieList || []).flatMap(m => m.maTheLoaiPhim ? [m.maTheLoaiPhim] : []))).filter(Boolean);
    const countryList = Array.from(new Set((movieList || []).flatMap(m => m.nhaSanXuat ? (Array.isArray(m.nhaSanXuat) ? m.nhaSanXuat : m.nhaSanXuat.split(',').map(s => s.trim())) : []))).filter(Boolean);

    const getTenTheLoai = (ma) => {
        const found = dsTheLoai.find(tl => Number(tl.id) === Number(ma));
        return found ? found.tenTheLoai : ma;
    };

    const filterMovies = (list) => {
        return (list || []).filter(movie => {
            const movieGenres = movie.maTheLoaiPhim ? [Number(movie.maTheLoaiPhim)] : [];
            const movieCountries = movie.nhaSanXuat
                ? (Array.isArray(movie.nhaSanXuat)
                    ? movie.nhaSanXuat.map(s => s.trim().toLowerCase())
                    : movie.nhaSanXuat.split(',').map(s => s.trim().toLowerCase()))
                : [];
            const matchKeyword = !searchKeyword || movie.tenPhim.toLowerCase().includes(searchKeyword.toLowerCase());
            const matchGenre = !selectedGenre || movieGenres.includes(Number(selectedGenre));
            const matchCountry = !selectedCountry || movieCountries.includes(selectedCountry.toLowerCase());
            return matchKeyword && matchGenre && matchCountry;
        });
    };

    useEffect(() => {
        if (movieList) {
            const filtered = filterMovies(movieList);
            setFilteredMovies(filtered);
            setPage(1);
        }
    }, [movieList, selectedGenre, selectedCountry, searchKeyword]);

    const handleGenreChange = (e) => {
        const value = e.target.value;
        setSelectedGenre(value);
    };

    const handleCountryChange = (e) => {
        const value = e.target.value;
        setSelectedCountry(value);
    };

    return (
        <div className={classes.root}>
            {/* Promotional Section */}
            <div className={classes.promoSection}>
                <div className={classes.promoContainer}>
                    <div className={classes.promoTextContainer}>
                        <h2 className={classes.promoTitle}>Phim chiếu rạp 2025 trên MoMo Cinema</h2>
                        <p className={classes.promoSubtitle}>
                            Danh sách Phim Chiếu Rạp 2025 đặc sắc và đáng mong đợi trên MoMo Cinema.
                        </p>
                        <ul className={classes.promoList}>
                            <li className={classes.promoListItem}>
                                <span className={classes.promoCheckmark}>✓</span> Đa dạng phim chiếu rạp 2025
                            </li>
                            <li className={classes.promoListItem}>
                                <span className={classes.promoCheckmark}>✓</span> Lịch chiếu phim cập nhật đầy đủ nhất
                            </li>
                            <li className={classes.promoListItem}>
                                <span className={classes.promoCheckmark}>✓</span> Đánh giá phim rạp chi tiết chân thật
                            </li>
                            <li className={classes.promoListItem}>
                                <span className={classes.promoCheckmark}>✓</span> Đặt vé xem phim Online dễ dàng
                            </li>
                        </ul>
                    </div>
                    <div className={classes.promoImageContainer}>
                        <img
                            src="https://homepage.momocdn.net/img/momo-amazone-s3-api-241016111327-638646740077856660.jpg"
                            alt="Phim chiếu rạp trên MoMo"
                            className={classes.promoImage}
                        />
                    </div>
                </div>
            </div>

            {/* Section gợi ý phim dành cho bạn */}
            <div className={classes.topMoviesSection}>
                <div className={classes.topMoviesOverlay}></div>
                <div className={classes.topMoviesContent}>
                    <div className={classes.topMoviesTitle}>
                        {loadingRecommend ? "Đang tải gợi ý..." : "Gợi ý phim dành cho bạn"}
                    </div>
                    {loadingRecommend ? (
                        <div style={{ textAlign: 'center', padding: '40px', color: '#fff' }}>
                            <div>Đang phân tích sở thích của bạn...</div>
                        </div>
                    ) : (
                        <div style={{ position: 'relative', width: '100%' }}>
                            {canSlideLeftRecommend && (
                                <button
                                    className={classes.topMoviesSliderBtn + ' ' + classes.topMoviesSliderBtnLeft}
                                    onClick={() => setRecommendStart(recommendStart - 1)}
                                    aria-label="Xem phim trước"
                                >
                                    ←
                                </button>
                            )}
                            {canSlideRightRecommend && (
                                <button
                                    className={classes.topMoviesSliderBtn}
                                    onClick={() => setRecommendStart(recommendStart + 1)}
                                    aria-label="Xem phim tiếp"
                                >
                                    →
                                </button>
                            )}
                            <div className={classes.topMoviesRow}>
                                {recommendMoviesToShow.map((movie, idx) => (
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
                                        <div className={classes.topMovieOverlay}>
                                            <div className={classes.overlayTitle}>{movie.tenPhim} (T16)</div>
                                            <div className={classes.overlayDetails}>
                                                <div className={classes.detailItem}>
                                                    <span className={classes.detailIcon}>🎭</span>
                                                    <span className={classes.detailText}>{getTenTheLoai(movie.maTheLoaiPhim)}</span>
                                                </div>
                                                <div className={classes.detailItem}>
                                                    <span className={classes.detailIcon}>⏳</span>
                                                    <span className={classes.detailText}>{movie.thoiLuong || 120}'</span>
                                                </div>
                                                <div className={classes.detailItem}>
                                                    <span className={classes.detailIcon}>🌏</span>
                                                    <span className={classes.detailText}>
                                                        {Array.isArray(movie.nhaSanXuat)
                                                            ? movie.nhaSanXuat.join(', ')
                                                            : (movie.nhaSanXuat || 'Khác')}
                                                    </span>
                                                </div>
                                                <div className={classes.detailItem}>
                                                    <span className={classes.detailIcon}>💬</span>
                                                    <span className={classes.detailText}>Phụ đề</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={classes.topMovieIndex}>
                                            <span style={{ 
                                                backgroundColor: '#e50914', 
                                                color: 'white', 
                                                padding: '2px 6px', 
                                                borderRadius: '4px', 
                                                fontSize: '12px',
                                                fontWeight: 'bold'
                                            }}>
                                                AI
                                            </span>
                                        </div>
                                        <div>
                                            <div className={classes.topMovieInfo}>
                                                Khởi chiếu: {movie.ngayKhoiChieu ? new Date(movie.ngayKhoiChieu).toLocaleDateString('vi-VN') : 'Đang cập nhật'}
                                            </div>
                                            <div className={classes.topMovieTitleNowShowing}>
                                                {movie.tenPhim}
                                            </div>
                                        </div>
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
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
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
                    <div className={classes.sectionTitle}>Tìm kiếm phim trên MoMO Cinema</div>
                    <select className={classes.filterSelect} value={selectedGenre} onChange={handleGenreChange}>
                        <option value="">Thể loại</option>
                        {genreList.map((g) => (
                            <option key={g} value={g}>
                                {getTenTheLoai(g)}
                            </option>
                        ))}
                    </select>
                    <select className={classes.filterSelect} value={selectedCountry} onChange={handleCountryChange}>
                        <option value="">Quốc gia</option>
                        {countryList.map((c) => (
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
                    {moviesToShow.map((movie, idx) => (
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
                            <div className={classes.topMovieOverlay}>
                                <div className={classes.overlayTitle}>{movie.tenPhim} (T16)</div>
                                <div className={classes.overlayDetails}>
                                    <div className={classes.detailItem}>
                                        <span className={classes.detailIcon}>🎭</span>
                                        <span className={classes.detailText}>{getTenTheLoai(movie.maTheLoaiPhim)}</span>
                                    </div>
                                    <div className={classes.detailItem}>
                                        <span className={classes.detailIcon}>⏳</span>
                                        <span className={classes.detailText}>{movie.thoiLuong || 120}'</span>
                                    </div>
                                    <div className={classes.detailItem}>
                                        <span className={classes.detailIcon}>🌏</span>
                                        <span className={classes.detailText}>
                                            {Array.isArray(movie.nhaSanXuat)
                                                ? movie.nhaSanXuat.join(', ')
                                                : (movie.nhaSanXuat || 'Khác')}
                                        </span>
                                    </div>
                                    <div className={classes.detailItem}>
                                        <span className={classes.detailIcon}>💬</span>
                                        <span className={classes.detailText}>Phụ đề</span>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.releaseInfo}>
                                Khởi chiếu: {movie.ngayKhoiChieu ? new Date(movie.ngayKhoiChieu).toLocaleDateString('vi-VN') : 'Đang cập nhật'}
                            </div>
                            <div className={classes.topMovieTitle}>{movie.tenPhim}</div>
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
                            </div>
                        </div>
                    ))}
                </div>

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