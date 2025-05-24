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
}));

export default useStyles;