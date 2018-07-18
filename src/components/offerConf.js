import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import LinearProgress from '@material-ui/core/LinearProgress';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';

import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Zoom from '@material-ui/core/Zoom';
import Switch from '@material-ui/core/Switch';


const CustomTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      fontSize: 13,
    },
    body: {
      fontSize: 12,
    },
  }))(TableCell);
  
  const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 2,
      overflowX: 'auto',
    },
    table: {
      maxWidth: 700,
    },
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: 'theme.palette.background.default',
      },
    },
    button:{
        alignContent: 'center',
    },
  });

  class CustomizedTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: this.props.classes,
            activityLookupLoaded: false,
            activityLookupData: this.props.activityLookupData,
            frAct: [],
            psAct: [],
            ptAct: [],
            totalfr:0,
            totalps:0,
            totalpt:0, 
            open: true,
            scroll: 'paper',
            dd:'',
            confirm: this.props.od.confirm,
            confirme:'not confirmed',
        }
    }
  
    progress = () => {
      const { completed } = this.state;
      if (completed > 100) {
        this.setState({ completed: 0, buffer: 10 });
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        this.setState({ completed: completed + diff, buffer: completed + diff + diff2 });
      }
    };
  
    handleClickOpen = scroll => () => {
      this.setState({ open: true, scroll });
    };
    handleConfirmation = name => event => {
        this.setState({ confirm: event.target.checked });
        console.log('confirmed');
      };

    handleClose = () => {
      this.setState({ open: false });
    };
    handleStuff = () => {
        this.setState({ open: false });
    }
    

    render() {
      const { a, classes } = this.props;
      const {confirm} = this.props.od.confirm;
    return ( 
      <Paper className={this.state.classes.root}>
      <Dialog
          open={this.state.open}
          scroll={this.state.scroll}
          aria-labelledby="scroll-dialog-title"
        >
          <DialogTitle id="scroll-dialog-title">{this.props.od.unit_code} {this.props.od.name}
          </DialogTitle>
          <DialogContent>
          <DialogContentText>
                     
        <Table className={this.state.classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell>Rows</CustomTableCell>
              <CustomTableCell>Value</CustomTableCell>
            </TableRow>
        </TableHead>
          <TableBody> 
                <TableRow>
                  <CustomTableCell component="th" scope="row">Confirmed</CustomTableCell>
                  <CustomTableCell>
                  <Switch
                checked={this.state.confirm}
                onChange={this.handleConfirmation('confirm')}
                value="confirm"
              />
              </CustomTableCell>
                </TableRow>
                <TableRow>
                  <CustomTableCell component="th" scope="row">CASUAL TUTORIAL</CustomTableCell>
                  <CustomTableCell>{this.props.od.tutorial_to_casual}</CustomTableCell>
                </TableRow>
                <TableRow>
                  <CustomTableCell component="th" scope="row">Projected Enrolments</CustomTableCell>
                  <CustomTableCell>{this.props.od.enrolment}</CustomTableCell>
                </TableRow>
                <TableRow>
                  <CustomTableCell component="th" scope="row">ENTER COORDINATOR</CustomTableCell>
                  <CustomTableCell>{this.props.od.type}</CustomTableCell>
                </TableRow>
                <TableRow>
                  <CustomTableCell component="th" scope="row">COORDINATOR TUTORIALS</CustomTableCell>
                  <CustomTableCell>{this.props.od.tutorial_to_staff}</CustomTableCell>
                </TableRow>
                <TableRow>
                  <CustomTableCell component="th" scope="row">CASUAL TUTORIAL</CustomTableCell>
                  <CustomTableCell>{this.props.od.tutorial_to_casual}</CustomTableCell>
                </TableRow>


        </TableBody> 
        </Table>

        <Table className={this.state.classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell>Rows</CustomTableCell>
              <CustomTableCell>Value</CustomTableCell>
            </TableRow>
        </TableHead>
          <TableBody> 
                <TableRow>
                  <CustomTableCell component="th" scope="row">Enrolments</CustomTableCell>
                  <CustomTableCell>{this.props.od.enrolment}</CustomTableCell>
                </TableRow>
                <TableRow>
                  <CustomTableCell component="th" scope="row">Type</CustomTableCell>
                  <CustomTableCell>{this.props.od.type}</CustomTableCell>
                </TableRow>
                <TableRow>
                  <CustomTableCell component="th" scope="row">Tutorials to staff</CustomTableCell>
                  <CustomTableCell>{this.props.od.tutorial_to_staff}</CustomTableCell>
                </TableRow>
                <TableRow>
                  <CustomTableCell component="th" scope="row">Tutorials to casual</CustomTableCell>
                  <CustomTableCell>{this.props.od.tutorial_to_casual}</CustomTableCell>
                </TableRow>
        </TableBody> 
        </Table>

        <Table className={this.state.classes.table}>
            <TableHead>
                <TableRow>
                <CustomTableCell>Fixed load</CustomTableCell>
                <CustomTableCell>Hours</CustomTableCell>
                </TableRow>
            </TableHead>
            <TableBody> 
                <TableRow>
                  <CustomTableCell component="th" scope="row">Students in a group</CustomTableCell>
                  <CustomTableCell>{this.props.od.student_per_group}</CustomTableCell>
                </TableRow>
                <TableRow>
                  <CustomTableCell component="th" scope="row">Base hours</CustomTableCell>
                  <CustomTableCell>{this.props.od.base}</CustomTableCell>
                </TableRow>
                <TableRow>
                  <CustomTableCell component="th" scope="row">Per student hours</CustomTableCell>
                  <CustomTableCell>{this.props.od.student}</CustomTableCell>
                </TableRow>
                <TableRow>
                  <CustomTableCell component="th" scope="row">Per period hours</CustomTableCell>
                  <CustomTableCell>{this.props.od.hour_per_period}</CustomTableCell>
                </TableRow>
                <TableRow>
                  <CustomTableCell component="th" scope="row">Total Work load</CustomTableCell>
                  <CustomTableCell>{this.props.od.total_workload}</CustomTableCell>
                </TableRow>
                <TableRow>
                  <CustomTableCell component="th" scope="row">Regular staff hours</CustomTableCell>
                  <CustomTableCell>{this.props.od.hours_to_staff}</CustomTableCell>
                </TableRow>
                <TableRow>
                  <CustomTableCell component="th" scope="row">Casual staff hours</CustomTableCell>
                  <CustomTableCell>{this.props.od.hours_to_casual}</CustomTableCell>
                </TableRow>
                <TableRow>
                  <CustomTableCell component="th" scope="row">Casual staff hours billable</CustomTableCell>
                  <CustomTableCell>{this.props.od.casual_hours_billable}</CustomTableCell>
                </TableRow>   
        </TableBody> 
        </Table>
        </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button variant="outlined" color="secondary" className={classes.button} onClick={this.props.viewed}>       
        <CloseIcon/>Close
      </Button>
      <Button variant="outlined" color="primary"  className={classes.button}>
        <SaveIcon/> Save
      </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    );
  }
}
export default withStyles(styles)(CustomizedTable);