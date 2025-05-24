import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    option: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(1),
        '&:hover': {
            backgroundColor: 'rgba(238, 130, 59, 0.1)',
        },
    },
    movieImage: {
        width: 50,
        height: 70,
        marginRight: theme.spacing(2),
        objectFit: 'cover',
        borderRadius: 4,
    },
    movieInfo: {
        display: 'flex',
        flexDirection: 'column',
    },
    movieTitle: {
        fontWeight: 'bold',
        marginBottom: theme.spacing(0.5),
    },
    movieDetails: {
        fontSize: '0.875rem',
        color: theme.palette.text.secondary,
    },
    textField: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: "16px",
        '& .MuiInputBase-root': {
            borderRadius: "16px",
            fontSize: 18,
            padding: "0 16px",
            background: "#fff",
            boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
            border: '1.5px solid #e0e0e0',
            transition: 'border-color 0.2s',
        },
        '& .MuiInputBase-root.Mui-focused': {
            border: '1.5px solid #1976d2',
            boxShadow: '0 2px 12px 0 rgba(25, 118, 210, 0.08)',
        },
        '& .MuiInputBase-input': {
            padding: "16px 0 16px 36px",
            fontSize: 18,
            color: '#222',
        },
        '& .MuiInputAdornment-root': {
            marginLeft: 8,
        },
        '& .MuiInputLabel-root': {
            left: 36,
            fontSize: 16,
            color: '#888',
            top: 2,
        },
        '& .MuiInputLabel-shrink': {
            top: 0,
        },
        '& .MuiInput-underline:before, & .MuiInput-underline:after': {
            borderBottom: 'none',
        },
    },
}));

export default function MovieSearchBar({ movieList, onMovieChange, onInputChange, placeholder }) {
    const classes = useStyles();
    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState('');

    return (
        <Autocomplete
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
                if (onMovieChange) onMovieChange(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
                if (onInputChange) onInputChange(newInputValue);
            }}
            options={movieList}
            getOptionLabel={(option) => option.tenPhim || ''}
            style={{ width: '100%', margin: '0 auto', marginBottom: 32 }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label=""
                    placeholder={placeholder || "Tìm kiếm phim"}
                    variant="standard"
                    className={classes.textField}
                    InputProps={{
                        ...params.InputProps,
                        style: { fontFamily: "'Montserrat', 'Quicksand', sans-serif", width: '100%' },
                    }}
                    inputProps={{
                        ...params.inputProps,
                        style: {
                            ...params.inputProps.style,
                            color: '#e4087e',
                            fontWeight: 700,
                            fontFamily: "'Montserrat', 'Quicksand', sans-serif",
                        },
                    }}
                />
            )}
            renderOption={(option) => (
                <div className={classes.option}>
                    <img
                        src={option.hinhAnh}
                        alt={option.tenPhim}
                        className={classes.movieImage}
                    />
                    <div className={classes.movieInfo}>
                        <div className={classes.movieTitle}>{option.tenPhim}</div>
                    </div>
                </div>
            )}
            popupIcon={<ExpandMoreIcon />}
        />
    );
} 