import "date-fns";
import React from "react";
import { Modal, Button } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import MUIDataTable from "mui-datatables";
import Moment from "react-moment";
import Typography from "@material-ui/core/Typography";
import { theme } from "../theme/theme";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

import GlobalService from "../services/GlobalService";
import DetailsIcon from "@material-ui/icons/Details";
import { makeStyles } from "@material-ui/styles";
// API USage : https://blog.logrocket.com/patterns-for-data-fetching-in-react-981ced7e5c56/

const getModalStyle = () => {
  const top = 50; // + rand()
  const left = 50; //+ rand()

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    overflowY: "scroll",
    maxHeight: "90vh",
    width: "90%",
  };
};

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    marginLeft: "3vw",
    marginRight: "3vw",
    width: "94vw",
    [theme.breakpoints.up("md")]: {
      margin: "auto",
      width: "50%",
    },
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: "none",
  },
  overrides: {
    MUIDataTableBodyCell: {
      root: {
        minHeight: "22px",
      },
    },
  },
}));

const StageTransitionsStudentStatus = (props) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    data: [],
    modalOpen: false,
  });
  const columns = [
    {
      label: "Stage",
      name: "to_stage",
      options: {
        customBodyRender: (value) => {
          return allStages[value];
        },
      },
    },
    {
      label: "When?",
      name: "created_at",
      options: {
        customBodyRender: (value) => {
          return (
            <Moment format="D MMM YYYY" withTitle>
              {value}
            </Moment>
          );
        },
      },
    },
  ];

  const { allStages } = props;

  const getMuiTheme = () =>
    createTheme({
      overrides: {
        MUIDataTableBodyCell: {
          stackedCommon: {
            height: "auto !important",
            // width: 'calc(50% - 80px) !important'
          },
        },
      },
    });

  const handleClose = () => {
    setState({
      ...state,
      modalOpen: false,
    });
  };

  const handleOpen = () => {
    setState({
      ...state,
      modalOpen: true,
    });
  };

  const { rowData } = props;
  const modalStyle = getModalStyle();
  return !state.modalOpen ? (
    <div>
      <Button color="primary" align="right" onClick={handleOpen}>
        <DetailsIcon color="primary" />
        &nbsp;&nbsp;
      </Button>
    </div>
  ) : (
    <Modal open={state.modalOpen} onClose={handleClose}>
      <Box style={modalStyle} className={classes.paper}>
        <ThemeProvider theme={getMuiTheme()}>
          <Typography variant="h5" id="modal-title">
            Transitions
          </Typography>
          <br />
          <MUIDataTable
            columns={columns}
            data={rowData}
            icons={GlobalService.tableIcons}
            options={{
              headerStyle: {
                color: theme.palette.primary.main,
              },
              exportButton: true,
              pageSize: 100,
              showTitle: false,
              selectableRows: "none",
              toolbar: false,
              filtering: true,
              filter: true,
              filterType: "doprdown",
              responsive: "stacked",
            }}
          />
        </ThemeProvider>
      </Box>
    </Modal>
  );
};

export default StageTransitionsStudentStatus;
