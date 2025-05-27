// index.js - Seat Management Page
import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import { useSnackbar } from "notistack";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Dialog from "@material-ui/core/Dialog";
import AddBoxIcon from "@material-ui/icons/AddBox";
import CircularProgress from "@material-ui/core/CircularProgress";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useStyles, DialogContent, DialogTitle } from "./styles";
import Action from "./Action";
import Form from "./Form";

export default function SeatManagement() {
    const [seatList, setSeatList] = useState([]);
    const [filteredSeats, setFilteredSeats] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedSeat, setSelectedSeat] = useState(null);
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const [searchValue, setSearchValue] = useState("");
    const classes = useStyles();
    const isMobile = useMediaQuery("(max-width:768px)");

    useEffect(() => {
        fetchSeats();
    }, []);

    const fetchSeats = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:4000/api/QuanLyDatVe/LayDanhSachVeDaMuaCuaKhachHang");
            const data = await res.json();
            const danhSach = Array.isArray(data) ? data : data?.content || data?.danhSachVe || [];
            setSeatList(danhSach);
            setFilteredSeats(danhSach);
        } catch (err) {
            enqueueSnackbar("Lỗi khi tải danh sách ghế", { variant: "error" });
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchValue(value);
        const filtered = seatList.filter(seat =>
            seat.tenGhe?.toLowerCase().includes(value) ||
            seat.tenRap?.toLowerCase().includes(value) ||
            seat.tenPhim?.toLowerCase().includes(value)
        );
        setFilteredSeats(filtered);
    };

    const handleAdd = () => {
        setSelectedSeat(null);
        setOpenModal(true);
    };

    const handleEdit = (seat) => {
        setSelectedSeat(seat);
        setOpenModal(true);
    };

    const handleDelete = async (maGhe, taiKhoanNguoiDat) => {
        try {
            await fetch(`http://localhost:4000/api/DeleteTicketOfUser?maGhe=${maGhe}&taiKhoanNguoiDat=${taiKhoanNguoiDat}`, { method: "DELETE" });
            enqueueSnackbar("Đã xóa ghế thành công", { variant: "success" });
            fetchSeats();
        } catch (err) {
            enqueueSnackbar("Xóa thất bại", { variant: "error" });
        }
    };

    const handleSubmit = (updatedSeat) => {
        setOpenModal(false);
        fetchSeats();
    };

    const columns = [
        { field: "maGhe", headerName: "Mã Ghế", width: 100 },
        { field: "tenGhe", headerName: "Tên Ghế", width: 150 },
        { field: "tenPhim", headerName: "Phim", width: 200 },
        { field: "tenRap", headerName: "Rạp", width: 150 },
        { field: "tenTaiKhoan", headerName: "Người Đặt", width: 150 },
        { field: "giaVe", headerName: "Giá Vé", width: 120 },
        { field: "loaiGhe", headerName: "Loại", width: 100 },
        {
            field: "actions",
            headerName: "Hành động",
            width: 150,
            renderCell: (params) => (
                <Action
                    seat={params.row}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )
        }
    ];

    return (
        <div style={{ height: "100vh", width: "100%", padding: 20 }}>
            <div className={classes.control}>
                <button className={classes.addMovie} onClick={handleAdd}>
                    <AddBoxIcon /> &nbsp;Thêm ghế
                </button>
                <div className={classes.search}>
                    <div className={classes.searchIcon}><SearchIcon /></div>
                    <InputBase
                        placeholder="Tìm kiếm..."
                        classes={{ root: classes.inputRoot, input: classes.inputInput }}
                        value={searchValue}
                        onChange={handleSearch}
                    />
                </div>
            </div>
            <DataGrid
                rows={filteredSeats.map((s, i) => ({ ...s, id: i }))}
                columns={columns}
                pageSize={10}
                loading={loading}
                components={{ Toolbar: GridToolbar, LoadingOverlay: CircularProgress }}
            />
            <Dialog open={openModal} onClose={() => setOpenModal(false)}>
                <DialogTitle onClose={() => setOpenModal(false)}>
                    {selectedSeat ? "Cập nhật ghế" : "Thêm ghế"}
                </DialogTitle>
                <DialogContent dividers>
                    <Form seat={selectedSeat} onSubmit={handleSubmit} />
                </DialogContent>
            </Dialog>
        </div>
    );
}
