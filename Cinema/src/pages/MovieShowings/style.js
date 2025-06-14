import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: "20px 24px 40px",
        backgroundColor: "#fff5f8",
        minHeight: "100vh",
    },
    container: {
        maxWidth: 1200,
        margin: "0 auto",
        backgroundColor: "#fff",
        borderRadius: 16,
        boxShadow: "0 2px 16px 0 rgba(0,0,0,0.08)",
        padding: "32px 24px",
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 900,
        color: '#e4087e',
        fontFamily: "'Montserrat', 'Quicksand', sans-serif",
        margin: 0,
        lineHeight: 1.2,
        letterSpacing: '0.5px',
        display: 'flex',
        alignItems: 'center',
        alignSelf: 'center',
    },
    searchBarRow: {
        display: 'flex',
        alignItems: 'baseline',
        gap: 32,
        margin: '40px 0 24px 0',
        width: '100%',
        maxWidth: 1100,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '24px 0',
        backgroundColor: '#fff5f8',
        position: 'relative',
        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100vw',
            height: '100%',
            backgroundColor: '#fff5f8',
            zIndex: -1,
        }
    },
    searchBarWrap: {
        maxWidth: 500,
        width: 400,
        margin: 0,
        minHeight: 64,
        height: 64,
        display: 'flex',
        alignItems: 'center',
        marginTop: 6,
    },
    filterSelect: {
        minWidth: 140,
        height: 40,
        borderRadius: 20,
        background: '#fff',
        border: '1.5px solid #e0e0e0',
        color: '#e4087e',
        fontWeight: 700,
        fontFamily: "'Montserrat', 'Quicksand', sans-serif",
        fontSize: 16,
        marginRight: 5,
        padding: '0 16px',
        outline: 'none',
        marginLeft: 0,
    },
    searchInput: {
        minWidth: 180,
        height: 40,
        borderRadius: 20,
        background: '#fff',
        border: '1.5px solid #e0e0e0',
        color: '#e4087e',
        fontWeight: 700,
        fontFamily: "'Montserrat', 'Quicksand', sans-serif",
        fontSize: 16,
        padding: '0 16px',
        outline: 'none',
        marginLeft: 0,
        marginRight: 5,
    },
    topMoviesSection: {
        position: 'relative',
        width: '100%',
        minHeight: 550,
        background: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8cLYpjR8rhPA6f0IR9cWDrQRBqHLbPsJPsw&s) center/cover no-repeat',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '32px 0',
        overflow: 'hidden',
    },
    topMoviesOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,0.45)',
        zIndex: 1,
        pointerEvents: 'none',
    },
    topMoviesContent: {
        position: 'relative',
        zIndex: 2,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    topMoviesTitle: {
        fontSize: 38,
        fontWeight: 900,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 24,
        textShadow: '0 2px 16px rgba(0,0,0,0.5)',
        letterSpacing: 1,
        fontFamily: "'Montserrat', 'Quicksand', sans-serif",
    },
    topMoviesRow: {
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: 32,
        width: '100%',
        maxWidth: 1100,
        margin: '0 auto',
        zIndex: 2,
    },
    topMovieCard: {
        position: 'relative',
        borderRadius: 6,
        overflow: "hidden",
        backgroundColor: "transparent",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'transform 0.3s',
        height: 480, // Thêm chiều cao cố định
        justifyContent: 'flex-start', // Đảm bảo các phần xếp từ trên xuống
        '&:hover': {
            // transform: 'translateY(-8px) scale(1.04)',
        },
        '&:hover $topMovieOverlay': {
            opacity: 1,
            transform: 'translateY(-7px)', // Chỉ translateY, không scale

        },
    },
    topMovieImage: {
        width: '100%',
        height: 320,
        objectFit: 'cover',
        display: 'block',
        borderRadius: 6,
    },
    topMoviePosterOverlay: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: 320,
        pointerEvents: 'none',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0) 70%, rgba(0,0,0,0.7) 100%)',
        zIndex: 2,
    },
    movieOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: 320,
        background: 'rgba(0,0,0,0.55)',
        opacity: 0,
        transition: 'opacity 0.3s',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 4,
    },
    topMovieOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: 330,
        background: 'rgba(0,0,0,0.75)', // Darker background to match the image
        opacity: 0,
        transform: 'translateY(0)', // Giá trị mặc định
        transition: 'opacity 0.3s, transform 0.3s cubic-bezier(0.4,0,0.2,1)', // Thêm cubic-bezier cho mượt
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 4,
        padding: '16px', // Match padding from the image
    },
    overlayTitle: {
        fontSize: 20,
        fontWeight: 800,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 12, // Match spacing from the image
        textShadow: '0 2px 8px rgba(0,0,0,0.5)',
        fontFamily: "'Montserrat', 'Quicksand', sans-serif",
        lineHeight: 1.3,
        textTransform: 'uppercase', // Match the uppercase style in the image
    },
    overlayDetails: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 12, // Space between details and button
    },
    detailItem: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 8, // Space between each detail item
    },
    detailIcon: {
        fontSize: 16,
        color: '#FFD600', // Yellow to match the button
        marginRight: 8, // Space between icon and text
    },
    detailText: {
        fontSize: 14,
        fontWeight: 500,
        color: '#fff',
        textShadow: '0 1px 4px rgba(0,0,0,0.5)',
        fontFamily: "'Montserrat', 'Quicksand', sans-serif",
    },
    overlayButtons: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        alignItems: 'center',
        marginTop: 'auto', // Đẩy nút xuống cuối card
        marginBottom: 12,
    },
    overlayBtn: {
        background: '#ffe924', // vàng mặc định
        color: '#222',
        border: 'none',
        borderRadius: 8,
        fontWeight: 900,
        minWidth: 160,      // hoặc width: 100% để full chiều ngang card
        height: 45,         // hoặc padding: '18px 0' để tự động theo text
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',   // căn giữa theo chiều ngang nếu không dùng width: 100%
        cursor: 'pointer',
        transition: 'background 0.4s cubic-bezier(0.4,0,0.2,1), color 0.2s',
        outline: 'none',
        boxShadow: 'none',
        textTransform: 'uppercase',
        letterSpacing: 1,
        fontFamily: "'Montserrat', 'Quicksand', sans-serif",
        backgroundImage: 'linear-gradient(90deg, #fa5238 0%, #e60000 100%)',
        backgroundSize: '0% 100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
            color: '#fff',
            backgroundColor: '#ffe924', // fallback
            backgroundSize: '100% 100%',
            backgroundPosition: 'left',
            transition: 'background-size 0.4s cubic-bezier(0.4,0,0.2,1), color 0.2s',
        },
    },
    overlayLogo: {
        fontSize: 20,
        fontWeight: 900,
        color: '#FF0000', // Red to match the logo in the image
        textAlign: 'center',
        textShadow: '0 2px 8px rgba(0,0,0,0.5)',
        fontFamily: "'Montserrat', 'Quicksand', sans-serif",
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    topMovieIndex: {
        position: 'absolute',
        left: 0,
        bottom: 160,
        color: '#fff',
        fontWeight: 700,
        fontStyle: 'italic',
        fontSize: 40,
        zIndex: 3,
        lineHeight: 1.1,
        background: 'transparent',
        fontFamily: "'Montserrat', 'Quicksand', sans-serif",
        textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0 2px 0 #000, 2px 0 0 #000, 0 -2px 0 #000, -2px 0 0 #000',
        padding: 0,
        borderRadius: 0,
    },
    topMovieTitle: {
        fontSize: 16,
        fontWeight: 800,
        color: '#000',
        textAlign: 'center',
        margin: '8px 0 0 0',
        padding: '6px 0 0 0',
        whiteSpace: 'normal',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        lineHeight: 1.3,
        minHeight: 28,
        maxHeight: 56, // Cho phép tối đa 2-3 dòng
        borderRadius: 0,
        boxShadow: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Montserrat', 'Quicksand', sans-serif",
        letterSpacing: 0.5,

    },
    topMovieDivider: {
        width: '100%',
        height: 1.5,
        background: '#e0e0e0',
        margin: '4px 0',
        border: 'none',
    },
    topMovieMeta: {
        fontSize: 15,
        color: '#444',
        fontWeight: 500,
        textAlign: 'center',
        marginTop: 0,
        padding: '2px 0',
        display: 'none',
    },
    topMoviesSliderBtn: {
        position: 'absolute',
        top: '50%',
        right: 0,
        transform: 'translateY(-50%)',
        background: 'rgba(255,255,255,0.85)',
        border: 'none',
        borderRadius: '50%',
        width: 44,
        height: 44,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 28,
        color: '#222',
        boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
        cursor: 'pointer',
        zIndex: 10,
        transition: 'background 0.2s',
        '&:hover': {
            background: '#FFD600',
            color: '#222',
        },
    },
    topMoviesSliderBtnLeft: {
        left: 0,
        right: 'auto',
    },
    movieGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: 24,
        padding: "0 16px",
        maxWidth: 1100,
        margin: '0 auto',
        backgroundColor: '#fff5f8',
        position: 'relative',
        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100vw',
            height: '100%',
            backgroundColor: '#fff5f8',
            zIndex: -1,
        }
    },
    movieCard: {
        borderRadius: 6,
        overflow: "hidden",
        boxShadow: "none",
        border: "none",
        transition: "transform 0.3s ease",
        cursor: "pointer",
        backgroundColor: "transparent",
        position: 'relative',
        '&:hover': {
            transform: "translateY(-8px)",
        },
        '&:hover $movieOverlay': {
            opacity: 1,
        },
    },
    movieImage: {
        width: "100%",
        height: 320,
        objectFit: "cover",
        display: 'block',
        borderRadius: 6,
    },
    movieInfo: {
        padding: '12px 0',
        background: 'transparent',
        textAlign: 'center',
    },
    movieTitle: {
        fontSize: 16,
        fontWeight: 700,
        color: "#222",
        marginBottom: 4,
        textAlign: 'center',
        whiteSpace: 'normal',
        overflow: 'visible',
        textOverflow: 'unset',
        lineHeight: 1.2,
    },
    movieMeta: {
        fontSize: 14,
        color: '#888',
        fontWeight: 500,
        textAlign: 'center',
        marginTop: 0,
    },
    paginationWrap: {
        display: 'flex',
        justifyContent: 'center',
        margin: '32px 0 0 0',
        padding: '24px 0',
        backgroundColor: '#fff5f8',
        position: 'relative',
        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100vw',
            height: '100%',
            backgroundColor: '#fff5f8',
            zIndex: -1,
        }
    },
    recommendedSection: {
        position: 'relative',
        width: '100vw',
        left: '50%',
        marginLeft: '-50vw',
        padding: '0 0 48px 0',
        backgroundColor: '#e0e0e0',
        marginBottom: 40,
        marginTop: 0,
    },
    recommendedContent: {
        position: 'relative',
        width: '100%',
        maxWidth: 1100,
        margin: '0 auto',
    },
    recommendedRow: {
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: 32,
        width: '100%',
        maxWidth: 1100,
        margin: '0 auto',
    },
    recommendedCard: {
        borderRadius: 6,
        overflow: "hidden",
        boxShadow: "none",
        border: "none",
        transition: "transform 0.3s ease",
        cursor: "pointer",
        backgroundColor: "transparent",
        position: 'relative',
        '&:hover': {
            transform: "translateY(-8px)",
        },
        '&:hover $movieOverlay': {
            opacity: 1,
        },
    },
    recommendedImage: {
        width: "100%",
        height: 320,
        objectFit: "cover",
        display: 'block',
        borderRadius: 6,
    },
    recommendedInfo: {
        padding: '12px 0',
        background: 'transparent',
        textAlign: 'center',
    },
    recommendedMovieTitle: {
        fontSize: 16,
        fontWeight: 700,
        color: '#222',
        marginBottom: 4,
        textAlign: 'center',
        whiteSpace: 'normal',
        overflow: 'visible',
        textOverflow: 'unset',
        lineHeight: 1.2,
    },
    recommendedMovieMeta: {
        fontSize: 14,
        color: '#222',
        fontWeight: 500,
        textAlign: 'center',
        marginTop: 0,
    },
    recommendedSectionTitle: {
        fontSize: 28,
        fontWeight: 900,
        color: '#000',
        fontFamily: "'Montserrat', 'Quicksand', sans-serif",
        margin: 0,
        lineHeight: 1.2,
        letterSpacing: '0.5px',
        marginBottom: 24,
        paddingLeft: 30,
        paddingTop: 40,
        textAlign: 'center',
        display: 'block',
    },
    promoSection: {
        position: 'relative',
        width: '100vw',
        left: '50%',
        marginLeft: '-50vw',
        padding: '40px 0',
        backgroundColor: '#fff5f8',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    promoContainer: {
        maxWidth: 1100,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        margin: '70px auto',
    },
    promoTextContainer: {
        flex: 1,
        paddingRight: '40px',
    },
    promoTitle: {
        fontSize: 40,
        fontWeight: 900,
        color: '#e4087e',
        fontFamily: "'Montserrat', 'Quicksand', sans-serif",
        marginBottom: 16,
        lineHeight: 1.2,
    },
    promoSubtitle: {
        fontSize: 20,
        fontWeight: 500,
        color: '#222',
        marginBottom: 16,
        lineHeight: 1.4,
    },
    promoList: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
    },
    promoListItem: {
        display: 'flex',
        alignItems: 'center',
        fontSize: 18,
        color: '#222',
        marginBottom: 12,
        lineHeight: 1.4,
    },
    promoCheckmark: {
        width: 24,
        height: 24,
        marginRight: 8,
        color: '#e4087e',
    },
    promoImageContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
    },
    promoImage: {
        maxWidth: '100%',
        height: 'auto',
        borderRadius: 8,
    },
    releaseInfo: {
        fontSize: 14,
        color: '#5a4b7e',
        fontWeight: 600,
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 0,
        fontFamily: "'Montserrat', 'Quicksand', sans-serif",
    },
    topMovieInfo: {
        color: '#edeaf7',
        fontSize: 14,
        fontWeight: 500,
        textAlign: 'center',
        margin: '12px 0 0 0',
        letterSpacing: 0.2,
        fontFamily: "'Montserrat', 'Quicksand', sans-serif",
    },
    topMovieTitleNowShowing: {
        fontSize: 16,
        fontWeight: 900,
        color: '#edeaf7',
        textAlign: 'center',
        margin: '4px 0 12px 0',
        padding: 0,
        lineHeight: 1.3,
        fontFamily: "'Montserrat', 'Quicksand', sans-serif",
        letterSpacing: 0.5,

    },
}));

export { useStyles };