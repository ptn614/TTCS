import React from "react";
import { useSelector } from "react-redux";

function getRandomMovies(movies, n) {
    if (!movies || movies.length <= n) return movies;
    const shuffled = [...movies].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
}

export default function MovieSidebar({ maPhim }) {
    const { movieList } = useSelector((state) => state.movieReducer);
    // Lọc bỏ phim đang xem chi tiết
    const filteredList = movieList?.filter(movie => movie.maPhim !== maPhim);
    const recommendMovies = getRandomMovies(filteredList, 5);

    return (
        <div style={{ width: "100%", background: "#fff", borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div className="sidebar-title" style={{ fontWeight: 700, fontSize: 20, color: '#111', fontFamily: 'Montserrat, sans-serif', marginBottom: 18, letterSpacing: 0.5 }}>Phim đang chiếu</div>
            {recommendMovies.map((movie) => (
                <div
                    key={movie.maPhim}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: 18,
                        cursor: "pointer",
                        borderBottom: "1px solid #eee",
                        paddingBottom: 14,
                        gap: 12,
                    }}
                    onClick={() => window.location.href = `/detail/${movie.maPhim}`}
                >
                    <img
                        src={movie.hinhAnh}
                        alt={movie.tenPhim}
                        style={{ width: 54, height: 72, objectFit: "cover", borderRadius: 6, marginRight: 12, boxShadow: '0 2px 8px rgba(60,60,60,0.08)' }}
                    />
                    <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: 16, color: '#222', marginBottom: 2 }}>{movie.tenPhim}</div>
                        <div style={{ fontSize: 13, color: "#888", marginBottom: 2 }}>{movie.theLoai || ''}</div>
                        <div style={{ fontSize: 13, color: "#fa5238", fontWeight: 600 }}>
                            <span style={{ marginRight: 8 }}>★</span>
                            {movie.danhGia || ''}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
} 