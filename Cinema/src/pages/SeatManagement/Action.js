// Action.js - Buttons for Edit & Delete
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';

export default function Action({ seat, onEdit, onDelete }) {
    return (
        <>
            <Tooltip title="Chỉnh sửa">
                <IconButton
                    color="primary"
                    onClick={() => onEdit(seat)}
                    style={{ color: 'rgb(238, 130, 59)' }}
                >
                    <EditIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Xóa">
                <IconButton
                    color="secondary"
                    onClick={() => {
                        if (window.confirm("Bạn có chắc muốn xóa ghế này?")) {
                            onDelete(seat.maGhe, seat.tenTaiKhoan);
                        }
                    }}
                    style={{ color: '#f50057' }}
                >
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
        </>
    );
}
