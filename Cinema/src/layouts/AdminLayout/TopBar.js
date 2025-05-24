import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IconButton, Tooltip, Badge } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { LOGOUT } from '../../reducers/constants/Auth';
import { LOADING_BACKTO_HOME } from '../../reducers/constants/Lazy';

export default function TopBar({ onMobileNavOpen }) {
  const [notifications] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClickLogo = () => {
    dispatch({ type: LOADING_BACKTO_HOME });
    setTimeout(() => {
      history.push("/");
    }, 50);
  };

  return (
    <div className="admin-header">
      <div className="logo-section" onClick={handleClickLogo} style={{ cursor: 'pointer' }}>
        <img
          src="https://png.pngtree.com/png-clipart/20240731/original/pngtree-the-square-colorful-logo-of-photoshop-vector-png-image_15670929.png"
          alt="logo"
          style={{ height: 48 }}
        />
      </div>
      <div className="icon-section">
        <IconButton color="inherit">
          <Badge badgeContent={notifications.length} color="primary" variant="dot">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Tooltip title="Đăng xuất">
          <IconButton color="inherit" onClick={() => dispatch({ type: LOGOUT })}>
            <InputIcon />
          </IconButton>
        </Tooltip>
        <IconButton color="inherit" onClick={onMobileNavOpen}>
          <MenuIcon />
        </IconButton>
      </div>
    </div>
  );
}
