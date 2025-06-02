import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { scroller } from "react-scroll";
import { LOGOUT } from "../../../reducers/constants/Auth";
import { LOADING_BACKTO_HOME } from "../../../reducers/constants/Lazy";
import { getMovieList } from "../../../reducers/actions/Movie";
import { getTheaters } from "../../../reducers/actions/Theater";
import "./style.css";

const headMenu = [
    { nameLink: "Trang chủ", id: "trangchu" },
    { nameLink: "Rạp chiếu", path: "/theaters" },
    { nameLink: "Phim chiếu", path: "/phim-dang-chieu" },
];

export default function Header() {
    const { currentUser } = useSelector((state) => state.authReducer);
    const { isLoadingBackToHome } = useSelector((state) => state.lazyReducer);
    const dispatch = useDispatch();
    let location = useLocation();
    const history = useHistory();
    const [openDrawer, setOpenDrawer] = useState(false);
    const [openAccountMenu, setOpenAccountMenu] = useState(false);

    useEffect(() => {
        if (window.innerWidth >= 768 && openDrawer) {
            setOpenDrawer(false);
        }
    }, [openDrawer]);

    useEffect(() => {
        if (!isLoadingBackToHome) {
            setTimeout(() => {
                scroller.scrollTo(location.state, {
                    duration: 800,
                    smooth: "easeInOutQuart",
                });
            }, 200);
        }
    }, [isLoadingBackToHome]);

    const handleLogout = () => {
        setOpenDrawer(false);
        setOpenAccountMenu(false);
        dispatch({ type: LOGOUT });
    };

    const handleLogin = () => {
        history.push("/login", location.pathname);
        setOpenAccountMenu(false);
    };

    const handleRegister = () => {
        history.push("/signUp", location.pathname);
        setOpenAccountMenu(false);
    };

    const handleClickLogo = () => {
        if (location.pathname === "/") {
            dispatch(getMovieList());
            dispatch(getTheaters());
            return;
        }
        dispatch({ type: LOADING_BACKTO_HOME });
        setTimeout(() => {
            history.push("/", "");
        }, 50);
    };

    const handleClickLink = (id, path) => {
        setOpenDrawer(false);
        if (path) {
            history.push(path);
            return;
        }
        if (location.pathname === "/") {
            scroller.scrollTo(id, {
                duration: 800,
                smooth: "easeInOutQuart",
            });
        } else {
            dispatch({ type: LOADING_BACKTO_HOME });
            setTimeout(() => {
                history.push("/", id);
            }, 50);
        }
    };

    const handleUser = () => {
        history.push("/taikhoan");
        setOpenDrawer(false);
        setOpenAccountMenu(false);
    };

    const toggleMenu = () => {
        setOpenDrawer(!openDrawer);
    };

    const toggleAccountMenu = () => {
        setOpenAccountMenu(!openAccountMenu);
    };

    // Function to check if menu item is active
    const isActiveMenuItem = (id, path) => {
        if (path) {
            return location.pathname === path;
        }
        // For homepage sections
        if (id === "trangchu") {
            return location.pathname === "/";
        }
        return false;
    };

    return (
        <nav className="header">
            <div className="container">
                <a
                    className="logo"
                    href="/"
                    onClick={(e) => {
                        e.preventDefault();
                        handleClickLogo();
                    }}
                >
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTddDYBAD6frCdzeo_TifC6zQdowcnIiblwjA&s"
                        alt="logo"
                        className="logo-img"
                    />
                </a>
                <div className={`menu ${openDrawer ? 'show' : ''}`}>
                    {headMenu.map((link) => (
                        <div
                            key={link.id || link.path}
                            className={`menu-item ${isActiveMenuItem(link.id, link.path) ? 'active' : ''}`}
                            onClick={() => handleClickLink(link.id, link.path)}
                        >
                            {link.nameLink}
                        </div>
                    ))}
                    <div className="account-menu">
                        <button
                            className="account-toggle"
                            type="button"
                            onClick={toggleAccountMenu}
                        >
                            <span className="account-toggle-icon">Tài khoản</span>
                        </button>
                        {openAccountMenu && (
                            <div className="account-dropdown">
                                {currentUser ? (
                                    <>
                                        <div
                                            className="account-item btn-profile"
                                            onClick={handleUser}
                                        >
                                            <i className="fa fa-user"></i> {currentUser.hoTen}
                                        </div>
                                        <div
                                            className="account-item btn-logout"
                                            onClick={handleLogout}
                                        >
                                            Đăng xuất
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div
                                            className="account-item btn-login"
                                            onClick={handleLogin}
                                        >
                                            Đăng nhập
                                        </div>
                                        <div
                                            className="account-item btn-register"
                                            onClick={handleLogin}
                                        >
                                            Đăng ký
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}