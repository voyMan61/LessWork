import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import SaveIcon from '@material-ui/icons/Save';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import URL from '../ui/url.json'


if (sessionStorage.getItem('calfr')) {
    sessionStorage.setItem('calfr', 0.00)
}

if (sessionStorage.getItem('calpt')) {
    sessionStorage.setItem('calpt', 0.00)
}

if (sessionStorage.getItem('calps')) {
    sessionStorage.setItem('calps', 0.00)
}

const modE = [
    {
        value: 'D',
        label: 'D',
    },
    {
        value: 'X',
        label: 'X',
    }
];


const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontSize: 14,
        textAlign: 'center',
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
    button:{
        alignContent: 'center',
        margin: theme.spacing.unit,
    },
    table: {
        maxWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },

    textFieldArea: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 300,
    },

    menu: {
        width: 200,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },

    close: {
        width: theme.spacing.unit * 4,
        height: theme.spacing.unit * 4,
    },
});

var activity = [];
class CustomizedTable extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            classes: this.props.classes,
            activityLookupLoaded: false,
            locationLoaded: false,
            activityLookupData: this.props.activityLookupData,
            locationData: this.props.locationData,
            frAct: [],
            psAct: [],
            ptAct: [],
            totalfr: 0.0,
            totalps: 0,
            totalpt: 0,
            location: 1,
            code: "",
            mode: "X",
            activities: [],
            sdesc: "",
            ldesc: "",
            postPassed: false,
            open: true,
        }

    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ postPassed: false });
    };

    handleSubmit = (e) => {
        this.setState({  isloading:true });
        e.preventDefault();
        //http://immense-headland-42479.herokuapp.com/api/new/pattern
        //https://jsonplaceholder.typicode.com/posts
      console.log(URL.url+'new/pattern')
        fetch(URL.url+'new/pattern', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                code: this.state.code,
                location_id: this.state.location,
                mode: this.state.mode,
                activities: this.state.activities,
                description: this.state.sdesc,
                long_description: this.state.ldesc

            })
        }).then(response => {
            if (response.ok) {
                this.setState({ postPassed: true, isloading:false, message:"Pattern created" });
                return response
            } else {
                this.setState({postPassed: true,isloading:false,message:"Pattern not created. Please try again" })
                return Promise.reject('something went wrong!')
            }
        })
            .then(data => console.log('data is', data))
            .catch(error => console.log('error is', error) ) ;
    };


    handleLoc = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleMode = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleCode = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleDesc = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };



    handleChange = name => event => {
        var sessioncalfr;
        var setsessionfr;
        var sessioncalpt;
        var setsessionpt;
        var sessioncalps;
        var setsessionps;
        var obj = {};
        var type;
        this.setState({ [name]: event.target.checked });
        type = this.state.activityLookupData.find(item => item.id === name).type
        if (event.target.checked === true) {
            if (type === 'fr') {
                if (!sessionStorage.getItem('calfr')) {
                    var fr = (this.state.frAct.find(item => item.id === name).hour).toFixed(2)
                    sessionStorage.setItem('calfr', this.state.frAct.find(item => item.id === name).hour);
                    obj['activity_id'] = this.state.frAct.find(item => item.id === name).id
                    activity.push(obj)
                    this.setState({ totalfr: fr, activities: activity });
                } else {
                    sessioncalfr = parseFloat(sessionStorage.getItem('calfr'))
                    setsessionfr = (sessioncalfr + this.state.frAct.find(item => item.id === name).hour).toFixed(2)
                    sessionStorage.setItem('calfr', setsessionfr)
                    obj['activity_id'] = this.state.frAct.find(item => item.id === name).id
                    activity.push(obj)
                    this.setState({ activities: activity, totalfr: setsessionfr });
                }
            } else if (type === 'pt') {
                if (!sessionStorage.getItem('calpt')) {
                    var pt = (this.state.ptAct.find(item => item.id === name).hour).toFixed(2)
                    sessionStorage.setItem('calpt', this.state.ptAct.find(item => item.id === name).hour);
                    obj['activity_id'] = this.state.ptAct.find(item => item.id === name).id
                    activity.push(obj)
                    this.setState({ totalpt: pt, activities: activity });
                } else {
                    sessioncalpt = parseFloat(sessionStorage.getItem('calpt'))
                    setsessionpt = (sessioncalpt + this.state.ptAct.find(item => item.id === name).hour).toFixed(2)
                    sessionStorage.setItem('calpt', setsessionpt)
                    obj['activity_id'] = this.state.ptAct.find(item => item.id === name).id
                    activity.push(obj)
                    this.setState({ totalpt: setsessionpt, activities: activity });
                }
            } else if (type === 'ps') {
                if (!sessionStorage.getItem('calps')) {
                    var ps = (this.state.psAct.find(item => item.id === name).hour).toFixed(2)
                    sessionStorage.setItem('calps', this.state.psAct.find(item => item.id === name).hour);
                    obj['activity_id'] = this.state.psAct.find(item => item.id === name).id
                    activity.push(obj)
                    this.setState({ totalps: ps, activities: activity });
                } else {
                    sessioncalps = parseFloat(sessionStorage.getItem('calps'))
                    setsessionps = (sessioncalps + this.state.psAct.find(item => item.id === name).hour).toFixed(2)
                    sessionStorage.setItem('calps', setsessionps)
                    obj['activity_id'] = this.state.psAct.find(item => item.id === name).id
                    activity.push(obj)
                    this.setState({ totalps: setsessionps, activities: activity });
                }
            }
        } else {
            if (type === 'fr') {
                sessioncalfr = parseFloat(sessionStorage.getItem('calfr'))
                setsessionfr = (sessioncalfr - this.state.frAct.find(item => item.id === name).hour).toFixed(2)
                sessionStorage.setItem('calfr', setsessionfr)
                //activity.splice(name-1,1)
                this.setState({ totalfr: setsessionfr });
            } else if (type === 'pt') {
                sessioncalpt = parseFloat(sessionStorage.getItem('calpt'))
                setsessionpt = (sessioncalpt - this.state.ptAct.find(item => item.id === name).hour).toFixed(2)
                sessionStorage.setItem('calpt', setsessionpt)
                //activity.splice(name-1,1)
                this.setState({ totalpt: setsessionpt });
            } else if (type === 'ps') {
                sessioncalps = parseFloat(sessionStorage.getItem('calps'))
                setsessionps = (sessioncalps - this.state.psAct.find(item => item.id === name).hour).toFixed(2)
                sessionStorage.setItem('calps', setsessionps)
                //activity.splice(name-1,1)
                this.setState({ totalps: setsessionps });
            }

            var index = activity.findIndex(activityindex => activityindex.activity_id === name)
            activity.splice(index, 1)

            this.setState({ activities: activity })
        }
    };

    componentDidMount() {
        var activityLookupObj;
        var locationObj;

        var calps = 0;
        var calpt = 0;

        fetch(URL.url+'activity', {
            //mode: 'no-cors',
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        },
        ).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    activityLookupObj = json;
                    for (var i = 0; i < activityLookupObj.length; i++) {
                        if (activityLookupObj[i].type === "fr") {
                            this.state.frAct.push(activityLookupObj[i])

                        } else if (activityLookupObj[i].type === "pt") {
                            this.state.ptAct.push(activityLookupObj[i])
                        } else if (activityLookupObj[i].type === "ps") {
                            this.state.psAct.push(activityLookupObj[i])
                        }

                    }
                    this.setState({
                        activityLookupLoaded: true,
                        activityLookupData: activityLookupObj,
                        totalps: calps,
                        totalpt: calpt

                    })

                });
            }
        });

        fetch(URL.url+'location', {
            //mode: 'no-cors',
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        },
        ).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    locationObj = json;
                    this.setState({
                        locationLoaded: true,
                        locationData: locationObj
                    })

                });
            }
        });
    }

    render() {
        const { isloading } = this.state;

        if (this.state.activityLookupLoaded === true && this.state.locationLoaded === true) {

            return (

                <Paper className={this.state.classes.root}>

            <Dialog
          open={this.state.open}
          scroll={this.state.scroll}
          aria-labelledby="scroll-dialog-title"
          title="Dialog"
            modal = {true}
            autoDetectWindowHeight={false}
            autoScrollBodyContent={false}
            contentStyle={{width: "100%", maxWidth: "none"}}
        >
          <DialogTitle id="scroll-dialog-title" style={{ background: 'linear-gradient(55deg, #fff9f9  10%, #fffef4 90%)'}}>
          <div style={{padding:1,maxWidth:300,}} >
          <Typography variant="display1" gutterBottom noWrap>
                Create New Pattern
            </Typography></div>
<Button  variant="fab" color="secondary"  style={{position: 'absolute', top:'1%', right: '2%'}} onClick={this.props.cclosed}>
<CloseIcon/></Button>
</DialogTitle>
<DialogContent style={{padding:4, minWidth:400, background: 'linear-gradient(55deg, #e2e2e2  10%, #fdfff9 90%)',}}>

                    <form onSubmit={this.handleSubmit}>
                    <p style={{position: 'relative',color:'#d6e9ff', textAlign: 'center'}} >
                        <TextField
                            required
                            id="code"
                            label="Pattern Name/Code"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="E.g LT1"
                            className={this.state.classes.textField}
                            margin="normal"
                            onChange={this.handleCode('code')}
                            value={this.state.code}

                        />

                        <TextField
                            id="location_id"
                            select
                            label="Location"
                            className={this.state.classes.textField}
                            value={this.state.location}
                            onChange={this.handleLoc('location')}
                            SelectProps={{
                                MenuProps: {
                                    className: this.state.classes.menu,
                                },
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                        >{this.state.locationData.map(option => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                        </TextField></p>
                        <p style={{position: 'relative',color:'#d6e9ff', textAlign: 'center'}} >
                        <TextField
                            id="description"
                            label="Short Description"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="E.g LT, Internal"
                            className={this.state.classes.textField}
                            margin="normal"
                            onChange={this.handleDesc('sdesc')}
                            value={this.state.sdesc}
                        />
                        <TextField
                            id="mode"
                            select
                            label="Mode"
                            className={this.state.classes.textField}
                            value={this.state.mode}
                            onChange={this.handleMode('mode')}
                            SelectProps={{
                                MenuProps: {
                                    className: this.state.classes.menu,
                                },
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                        >{modE.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                        </TextField>

                        </p><p style={{position: 'relative', textAlign: 'center'}} >
                        <TextField
                            id="long_description"
                            label="Long Description"
                            multiline
                            rows="3"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="E.g Internal, Murdoch campus offering of the unit. May also be offered in other modes/teaching periods. Can be thought of as the 'primary' offering"
                            className={this.state.classes.textFieldArea}
                            margin="normal"
                            onChange={this.handleDesc('ldesc')}
                            value={this.state.ldesc}

                        /></p>

                        <Table className={this.state.classes.table}>
                            {this.state.frAct.length !== 0 &&
                                <TableHead>
                                    <TableRow>
                                        <CustomTableCell>Flat rate activities</CustomTableCell>
                                        <CustomTableCell>Hours</CustomTableCell>
                                        <CustomTableCell>Confirm</CustomTableCell>
                                    </TableRow>
                                </TableHead>}
                            <TableBody>
                                {this.state.frAct.map(n => {

                                    return (
                                        <TableRow className={this.state.classes.row} key={n.id}>
                                            <CustomTableCell component="th" scope="row">
                                                {n.name}
                                            </CustomTableCell>
                                            <CustomTableCell style={{textAlign: 'center'}}> {n.hour}</CustomTableCell>
                                            <CustomTableCell><Switch
                                                onChange={this.handleChange(n.id)}
                                                color="primary"
                                            /></CustomTableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                            </Table>
                            <Table className={this.state.classes.table}>
                            {this.state.ptAct.length !== 0 &&
                                <TableHead>
                                    <TableRow>
                                        <CustomTableCell>Per tutorial/group activities</CustomTableCell>
                                        <CustomTableCell>Hours</CustomTableCell>
                                        <CustomTableCell>Confirm</CustomTableCell>
                                    </TableRow>
                                </TableHead>}
                            <TableBody>
                                {this.state.ptAct.map(n => {

                                    return (
                                        <TableRow className={this.state.classes.row} key={n.id}>
                                            <CustomTableCell component="th" scope="row">
                                                {n.name}
                                            </CustomTableCell>
                                            <CustomTableCell style={{textAlign: 'center'}}> {n.hour}</CustomTableCell>
                                            <CustomTableCell><Switch
                                                onChange={this.handleChange(n.id)}
                                                color="primary"
                                            /></CustomTableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>

                            {this.state.psAct.length !== 0 &&
                                <TableHead>
                                    <TableRow>
                                        <CustomTableCell>Per student activities</CustomTableCell>
                                        <CustomTableCell>Hours</CustomTableCell>
                                        <CustomTableCell>Confirm</CustomTableCell>
                                    </TableRow>
                                </TableHead>}
                            <TableBody>
                                {this.state.psAct.map(n => {

                                    return (
                                        <TableRow className={this.state.classes.row} key={n.id}>
                                            <CustomTableCell component="th" scope="row">
                                                {n.name}
                                            </CustomTableCell>
                                            <CustomTableCell style={{textAlign: 'center'}}> {n.hour}</CustomTableCell>
                                            <CustomTableCell><Switch

                                                onChange={this.handleChange(n.id)}
                                                color="primary"
                                            /></CustomTableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                        <p style={{textAlign: 'center'}} >
                        <Button type="submit" variant="contained" size="large"  className={this.state.classes.button} style={{ color: "#0f6600"}} type="submit" variant="outlined" >
                                <SaveIcon/>    Create
                        </Button></p>
      {isloading ?  <Paper className={this.state.classes.root}>
          <LinearProgress color="secondary" variant="query" />
        </Paper> : isloading}
                    </form>
                    </DialogContent>
        <DialogActions style={{ color: "#005e5e", background: 'linear-gradient(55deg, #fffef9  10%, #fffbf9 90%)'}}>
                          <p style={{textAlign: 'center'}} ><Button  size="small" style ={{color: "#002b68", width: 160, position: 'relative'}} variant="outlined" color={'secondary'}>
                        Flat rate: {this.state.totalfr}
                        </Button>
                        <Button size="small" style ={{color: "#002b68", width: 200, position: 'relative'}} variant="outlined" color={'secondary'}>
                            Per tutorial:  {this.state.totalpt}
                        </Button>
                        <Button size="small" style ={{color: "#002b68", width: 160, position: 'relative'}} variant="outlined" color={'secondary'}>
                            Per student: {this.state.totalps}
                        </Button></p>
        </DialogActions>
        </Dialog>
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={this.state.postPassed}
            autoHideDuration={6000}
            onClose={this.handleClose}
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{this.state.message}</span>}
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className={this.state.classes.close}
                    onClick={this.handleClose}
                >
                    <CloseIcon />
                </IconButton>,
            ]}
        />
        </Paper>
            );
        }
        else {
            return (
              <Paper className={this.state.classes.root} >
              <Dialog
                  open={this.state.open}
                  scroll={this.state.scroll}
                  aria-labelledby="scroll-dialog-title"
                >
                  <DialogTitle id="scroll-dialog-title">Loading Creator
                  </DialogTitle>
                  <DialogContent>
                  <DialogContentText>

                    <LinearProgress color= "primary" variant="query" />

                </DialogContentText>
                </DialogContent>
                </Dialog>
              </Paper>
            )
        }
    }
}


export default withStyles(styles)(CustomizedTable);
