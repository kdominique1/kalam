import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import axios from 'axios';
import { Button } from '@material-ui/core';

import { FormControl, InputLabel, FormHelperText } from '@material-ui/core';

import { changeFetching } from '../store/actions/auth';
import {withRouter} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Dialog } from '@material-ui/core';
import Spinner from 'react-spinner-material';
import AddBox from '@material-ui/icons/AddBox';
import {Box} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

const CONSTANTS = require('../constant');
const baseUrl = process.env.API_URL;

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    maxWidth: 400,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400,
  },
  btn: {
    marginTop: theme.spacing(4)
  }
})

export class StudentFeedback extends React.Component {

  async addFeedbck() {
    try {
      this.props.fetchingStart()
      const response = await axios.post(this.dataURL, {
        "student_stage": this.stage,
        "feedback": this.state.feedback,
        "state": CONSTANTS.status[this.state.status],
        }).then(response => {
            this.setState({
                loading:false,
                dialogOpen: false,
            })
            alert("Feedback submited", response);
        })
      this.props.fetchingFinish();
    } catch (e) {
      console.log(e);
      this.props.fetchingFinish();
    }
  }

  onSubmit = () => {
    this.setState({
        loading:true,
    })
    this.addFeedbck();
  };

  validate = () => {};

  constructor(props) {
    super(props);
    this.dataURL = baseUrl+'students/feedback/'+this.props.studentId +'/' + this.props.userId;
    this.stage = this.props.stage;
    this.state = {
      "status": "",
      "feedback": "",
      "dialogOpen": false,
      "loading": false,
    }
  }

  handleChange = name => (event) => {
    let valChange = {}
    valChange[name] = event.target.value;

    this.setState(
      valChange
    );
  };
  
  handleClose = () => {
    this.setState({
      dialogOpen: false
    })
  };


  handleOpen = () => {
    this.setState({
      dialogOpen: true
    })
  }
  addFeedbackDetails = (feedbackDetails) => {
    return feedbackDetails.user + ": \n\n";
  }

  render = () => {
    const { classes } = this.props;
    const { loading } = this.state;
    return (
        <Fragment>
            <Box onClick={this.handleOpen}>
                <EditIcon/>
                <Spinner size={35} spinnerColor={"#ed343d"} spinnerWidth={5} visible={loading} />
            </Box>
            <Dialog
                open={this.state.dialogOpen}
                onClose={this.handleClose}
            >
                <form className={classes.container}>
                    <h1 style={{color: '#f05f40',textAlign: 'center'}}>Student Feedback</h1>
                    <FormControl>
                        <InputLabel id="demo-simple-select-readonly-label">Status</InputLabel>
                        <Select
                          labelId="demo-simple-select-readonly-label"
                          id="demo-simple-select-readonly"
                          name = "status"
                          value={this.state.status}
                          onChange={this.handleChange('status')}
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            {CONSTANTS.status.map((status, index)=> {
                                return <MenuItem key={index} value={index}>{status}</MenuItem>
                            })}
                        </Select>
                        <FormHelperText>Student ke Feedback par uska status bataye.</FormHelperText>
                    </FormControl>
                    <TextField
                      id="outlined-multiline-static"
                      label="Feedback"
                      multiline
                      rows="6"
                      name='feedback'
                      defaultValue={this.addFeedbackDetails(this.props)}
                      onChange={this.handleChange('feedback')}
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
                    />
                    <Button variant="contained" color="primary" onClick={this.onSubmit} className={classes.btn}>Submit Feedback</Button>
                </form>
            </Dialog>  
        </Fragment>
    );
  }
};

const mapDispatchToProps = (dispatch)=>({
  fetchingStart: () => dispatch(changeFetching(true)),
  fetchingFinish: () => dispatch(changeFetching(false))
});

export default withRouter(withStyles(styles)(connect(undefined, mapDispatchToProps)(StudentFeedback)))