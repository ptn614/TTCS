import React, { useState } from 'react';
import { SnackbarProvider } from 'notistack';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useSelector } from "react-redux";
import NavBar from './NavBar';
import TopBar from './TopBar';
import './AdminLayout.css';

export default function AdminLayout(props) {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:768px)');
  const { currentUser } = useSelector((state) => state.authReducer);

  if (currentUser?.maLoaiNguoiDung !== "QuanTri") {
    return <>{props.children}</>
  }

  return (
    <SnackbarProvider maxSnack={3}>
      <div className="admin-layout">
        <NavBar onMobileClose={() => setMobileNavOpen(false)} openMobile={isMobileNavOpen} />
        <div className="admin-main">
          <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
          <div className="admin-content">{props.children}</div>
        </div>
      </div>
    </SnackbarProvider>
  );
} 