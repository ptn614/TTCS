import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 1100,
        margin: "32px auto",
        background: "#fff",
        borderRadius: 18,
        boxShadow: "0 4px 32px 0 rgba(255,23,68,0.10)",
        padding: "32px 24px",
        [theme.breakpoints.down("sm")]: {
            padding: "16px 4px",
            margin: "12px 0",
        },
    },
    error: {
        color: "#ff1744",
        fontWeight: 700,
        fontSize: 20,
        textAlign: "center",
        margin: "40px 0",
    },
    theaterSection: {
        display: 'flex',
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        margin: '20px 0',
    },
    theaterTabs: {
        borderRight: '1px solid #e0e0e0',
        minWidth: '280px',
        backgroundColor: '#f8f9fa',
        '& .MuiTabs-indicator': {
            backgroundColor: '#fa5238',
            width: '4px',
        },
    },
    theaterTab: {
        textTransform: 'none',
        minHeight: '80px',
        padding: '12px 16px',
        '&:hover': {
            backgroundColor: 'rgba(250, 82, 56, 0.08)',
        },
        '&.Mui-selected': {
            backgroundColor: 'rgba(250, 82, 56, 0.12)',
        },
    },
    theaterLogo: {
        width: '5px',
        height: '5px',
        objectFit: 'contain',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    theaterContent: {
        flex: 1,
        padding: '5px',
        backgroundColor: '#fff',
        '& > div': {
            animation: '$fadeIn 0.3s ease-in-out',
        },
    },
    '@keyframes fadeIn': {
        from: {
            opacity: 0,
            transform: 'translateY(10px)',
        },
        to: {
            opacity: 1,
            transform: 'translateY(0)',
        },
    },
}));

export default useStyles;