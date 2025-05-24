import { makeStyles } from "@material-ui/core"
import { customScrollbar } from '../../../../styles/materialUi';

const useStyle = makeStyles({
  search: {
    display: 'flex',
    maxWidth: "500px",
    margin: "40px auto 0 auto",
    height: "56px",
    position: "relative",
    width: "100%",
    borderRadius: "16px",
    boxShadow: '0 2px 16px 0 rgba(0,0,0,0.08)',
    alignItems: "center",
    backgroundColor: "#fff",
    zIndex: 2,
  },
  itemFirst: {
    padding: 0,
    flex: "100%",
    backgroundColor: "#fff",
    '& > div': {
      width: "100% !important",
      backgroundColor: "#fff",
      borderRadius: "16px",
      boxShadow: 'none',
    },
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
  popupIndicator: {
    '& > span': {
      marginTop: 0,
      '& > svg': {
        color: "#1976d2",
        fontSize: "22px !important",
      },
    },
  },
  listbox: {
    ...customScrollbar,
    backgroundColor: "#fff",
    borderRadius: "16px",
    boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)',
    marginTop: 8,
    padding: 0,
    '& .MuiAutocomplete-option[aria-selected="true"]': {
      backgroundColor: "rgba(25, 118, 210, 0.08)",
      color: "#1976d2",
    },
    '& .MuiAutocomplete-option': {
      borderRadius: 12,
      margin: '4px 8px',
      padding: '8px 12px',
    },
  },
  paper: {
    backgroundColor: "#fff",
    borderRadius: "16px",
    boxShadow: "0px 5px 16px 0px rgba(0,0,0,0.10)",
  },
  noOptions: {
    color: "#888",
    fontSize: 16,
    padding: "16px 24px",
    backgroundColor: "#fff",
    borderRadius: "12px",
  },
  search__item: {
    color: 'black',
    padding: '1%',
    '& > div:before': {
      borderBottom: 'none',
    },
    '& > div:hover:not(.Mui-disabled):before': {
      borderBottom: 'none',
    },
    '& > div > div': {
      color: 'black',
      fontSize: 14,
      padding: '18px 0px',
      '&:focus': {
        backgroundColor: 'transparent'
      },
      '& ~ svg': {
        fontSize: 19,
        color: 'rgba(0, 0, 0, 0.3)',
        top: '33%',
      }
    },
    '&:after': {
      content: "''",
      position: "absolute",
      right: "0",
      height: "62%",
      top: "50%",
      transform: "translateY(-50%)",
    }
  },
  'search__item--first': {
    flex: '30%',
    paddingLeft: '2%',
  },
  'search__item--next': {
    flex: "calc(70% / 4)",
  },
  menu: { maxHeight: 300, ...customScrollbar },
  menu__item: {
    width: '100%',
    minHeight: "auto",
    display: 'block',
    padding: '8px 20px',
    fontSize: '16px',
    color: '#222',
    backgroundColor: "#fff",
    borderRadius: 12,
    '&:focus': {
      backgroundColor: 'rgba(25, 118, 210, 0.08)',
    },
    '&:hover': {
      backgroundColor: "rgba(25, 118, 210, 0.08)",
      color: "#1976d2",
    },
  },
  'menu__item--selected': {
    backgroundColor: "rgb(238, 130, 59)85 !important",
    color: "#fff",
    '& li ~ li': {
      color: '#fff',
    }
  },
  btn: {
    backgroundColor: 'rgb(238, 130, 59)',
    margin: 'auto',
    '&:hover': {
      backgroundColor: "#d01414",
    },
    '&:focus': {
      outline: "none",
    },
    "&$btn": {
      color: '#fff',
      padding: "8px 23px",
    }
  },
  btnDisabled: {
    backgroundColor: "#4a4a4a",
    border: "none",
    textTransform: "uppercase",
    borderRadius: "4px",
    padding: "8px 23px",
  }
})

export default useStyle