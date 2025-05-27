import { makeStyles } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import { underLine } from '../../styles/materialUi';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';

const useStyles = makeStyles({
  cumRapItem: {
    transition: "height .2s",
    overflowY: "hidden",
    ...underLine,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "16px",
    marginLeft: 0,
    paddingLeft: 0,
  },
  topInfo: {
    paddingBottom: 20,
    cursor: "pointer",
  },
  imgTheater: {
    width: 50,
    display: "inline-block",
    border: "1px solid #ebebec",
  },
  wrapInfo: {
    paddingLeft: 4,
    display: "flex",
    flexDirection: "column",
  },
  digital: {
    marginBottom: 5,
    fontWeight: 500,
  },
});

const Accordion = withStyles({
  root: {
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    marginBottom: -1,
    minHeight: 56,
    transition: "all 0.2s", // Thêm transition cho hiệu ứng hover
    background: "#fff", // Nền trắng mặc định
    "&:hover": {
      background: "#f5f5f5", // Hover màu xám nhẹ
    },
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    alignItems: "center",
    gap: 12,
    display: "flex",
    flexDirection: "row",
    '& > img': {
      width: 50,
    },
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    gap: "10px",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
}))(MuiAccordionDetails);

export { useStyles, Accordion, AccordionSummary, AccordionDetails };