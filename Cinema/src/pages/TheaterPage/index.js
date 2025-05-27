import React from "react";
import Theaters from "../Homepage/Theaters";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: "80px 24px 40px",
        backgroundColor: "#f8f9fa",
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
    title: {
        fontSize: 28,
        fontWeight: 700,
        color: "#222",
        marginBottom: 32,
        textAlign: "center",
        fontFamily: "'Montserrat', sans-serif",
    }
}));

export default function TheaterPage() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <h1 className={classes.title}>Hệ Thống Rạp Chiếu Phim</h1>
                <Theaters />
            </div>
        </div>
    );
} 