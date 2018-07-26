import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import SaveIcon from '@material-ui/icons/Save';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

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
            editMode: true,
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
      const {classes,  } = this.props;
      const{editMode} = this.state;
      console.log(this.props.epriv)
    return (
      <Paper className={this.state.classes.root}>
          <Dialog style={{ minWidth:500, }}
          open={this.state.open}
          scroll={this.state.scroll}
          aria-labelledby="scroll-dialog-title"
        >
          <DialogTitle id="scroll-dialog-title">
          <div style={{padding:1,maxWidth:300,}} >
          <Typography gutterBottom align="center" variant="display1">
                {this.props.od.unit_code}
            </Typography><Typography variant="title" gutterBottom>
                {this.props.od.name}
              </Typography>

          <Button  variant="fab" color="secondary"  style={{position: 'absolute', top:'1%', right: '2%'}} className={classes.button} onClick={this.props.viewed}>
                <CloseIcon/>
            </Button>          </div>
          </DialogTitle>
          <DialogContent style={{padding:4, minWidth:400,}}>
          <DialogContentText>


          {editMode ? (<div>
            <Table style={{background:'red'}} className={this.state.classes.table}>
              <TableHead>
                <TableRow>
                  <CustomTableCell>modify offering </CustomTableCell>
                  <CustomTableCell></CustomTableCell>
                </TableRow>
            </TableHead>
              <TableBody>
                    <TableRow>
                      <CustomTableCell component="th" scope="row">Enrolments</CustomTableCell>
                      <CustomTableCell>{this.props.od.enrolment}</CustomTableCell>
                    </TableRow>
                    {/*<TableRow>
                      <CustomTableCell component="th" scope="row">Type</CustomTableCell>
                      <CustomTableCell>{this.props.od.type}</CustomTableCell>
                    </TableRow>   */}
                    <TableRow>
                      <CustomTableCell component="th" scope="row">Tutorials to staff</CustomTableCell>
                      <CustomTableCell>{this.props.od.tutorial_to_staff}</CustomTableCell>
                    </TableRow>
                    <TableRow>
                      <CustomTableCell component="th" scope="row">Tutorials to casual</CustomTableCell>
                      <CustomTableCell>{this.props.od.tutorial_to_casual}</CustomTableCell>
                    </TableRow>
                    <TableRow>
                      <CustomTableCell component="th" scope="row">CASUAL TUTORIAL</CustomTableCell>
                      <CustomTableCell>{this.props.od.tutorial_to_casual}</CustomTableCell>
                    </TableRow>
            </TableBody>
            </Table>

            </div>):(<div></div>)}










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
                {/*<TableRow>
                  <CustomTableCell component="th" scope="row">Type</CustomTableCell>
                  <CustomTableCell>{this.props.od.type}</CustomTableCell>
                </TableRow>   */}
                <TableRow>
                  <CustomTableCell component="th" scope="row">Tutorials to staff</CustomTableCell>
                  <CustomTableCell>{this.props.od.tutorial_to_staff}</CustomTableCell>
                </TableRow>
                <TableRow>
                  <CustomTableCell component="th" scope="row">Tutorials to casual</CustomTableCell>
                  <CustomTableCell>{this.props.od.tutorial_to_casual}</CustomTableCell>
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
        </Dialog>
      </Paper>
    );
  }
}
export default withStyles(styles)(CustomizedTable);

/* <Button style={{position: "relative", right: '30px'}} type="submit" color="primary" variant="outlined" className={this.state.classes.button}>
<SaveIcon/>Create
</Button>*/
