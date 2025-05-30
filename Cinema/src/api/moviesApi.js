import axiosClient from "./axiosClient";
const moviesApi = {
    getDanhSachBanner: () => {
        const path = "/QuanLyPhim/LayDanhSachBanner";
        return axiosClient.get(path);
    },
    getDanhSachPhim: () => {
        const path = "/QuanLyPhim/LayDanhSachPhim?maNhom=GP09";
        return axiosClient.get(path);
    },
    getThongTinPhim: (maPhim) => {
        // Nếu maPhim là object, lấy thuộc tính maPhim hoặc id
        const id = typeof maPhim === "object" ? maPhim.maPhim || maPhim.id : maPhim;
        const path = `/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`;
        return axiosClient.get(path);
    },
    getDanhSachPhimTheoNgay: (maNhom, tuNgay, denNgay) => {
        const path = `/QuanLyPhim/LayDanhSachPhimTheoNgay`;
        return axiosClient.get(path, { maNhom, tuNgay, denNgay });
    },
    getDanhSachPhimPhanTrang: (param) => {
        const path = `/QuanLyPhim/LayDanhSachPhimPhanTrang`;
        return axiosClient.get(path, { param });
    },

    postThemPhim: (movie) => {
        const path = `/QuanLyPhim/ThemPhim`;
        return axiosClient.post(path, movie);
    },

    postCapNhatPhim: (movie) => {
        const path = `/QuanLyPhim/CapNhatPhim`;
        return axiosClient.post(path, movie);
    },

    deleteMovie: (maPhim) => {
        const path = `/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`;
        return axiosClient.delete(path);
    },
};
console.log("moviesApi:", moviesApi);
export default moviesApi;
