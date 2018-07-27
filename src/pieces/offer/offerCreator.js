import React from 'react';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import SaveIcon from '@material-ui/icons/Save';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import URL from '../ui/url.json'


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 2,
    overflowX: 'auto'
  },
  table: {
    maxWidth: 700
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    }
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },

  textFieldArea: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  },

  menu: {
    width: 200
  },
  unitmenu: {
    width: 'auto'
  },
  unittextField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 'auto'
  },

  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  },

  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4
  }
});

class CustomizedTable extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      classes: this.props.classes,
      locationLoaded: false,
      locationData: this.props.locationData,

      location: 1,
      postPassed: false,
      unitLoaded: false,
      unitData: this.props.unitData,
      unit: 1,
      patternLoaded: false,
      patternData: this.props.patternData,
      pattern: 1,
      periodLoaded: false,
      periodData: this.props.periodData,
      period: 1,
      open: true
    }

  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({postPassed: false});
  };

  handleSubmit = (e) => {
    this.setState({isloading: true});
    e.preventDefault();
    //http://immense-headland-42479.herokuapp.com/api/new/pattern
    //https://jsonplaceholder.typicode.com/posts
    console.log(URL.url + 'new/offering')
    fetch(URL.url + 'new/offering', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({unit_id: this.state.unit, pattern_id: this.state.pattern, period_id: this.state.period})
    }).then(response => {
      if (response.ok) {
        this.setState({postPassed: true, isloading: false, message: "Offering created"});
        return response
      } else {
        this.setState({postPassed: true, isloading: false, message: "Offering not created. Please try again"})
        return Promise.reject('something went wrong!')
      }
    }).then(data => console.log('data is', data)).catch(error => console.log('error is', error));
  };

  handleLoc = name => event => {
    var periodObj;

    fetch(URL.url + 'periodoptions/' + event.target.value, {
      //mode: 'no-cors',
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    },).then(response => {
      if (response.ok) {
        response.json().then(json => {
          periodObj = json;
          this.setState({periodLoaded: true, periodData: periodObj, period: periodObj[0].id})

        });
      }
    });

    this.setState({[name]: event.target.value});

  };

  handlePeriod = name => event => {
    this.setState({[name]: event.target.value});

  };

  handleUnit = name => event => {
    this.setState({[name]: event.target.value});

  };

  handlePattern = name => event => {
    var Findlocation = this.state.patternData.find(item => item.id === event.target.value);
    this.setState({[name]: event.target.value, location: Findlocation.location_id});
    var periodObj;
    fetch('http://immense-headland-42479.herokuapp.com/api/periodoptions/' + Findlocation.location_id, {
      //mode: 'no-cors',
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    },).then(response => {
      if (response.ok) {
        response.json().then(json => {
          periodObj = json;
          this.setState({periodLoaded: true, periodData: periodObj, period: periodObj[0].id})

        });
      }
    });

  };

  componentDidMount() {
    var locationObj;
    var unitObj;
    var patternObj;
    var periodObj;

    fetch(URL.url + 'location', {
      //mode: 'no-cors',
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    },).then(response => {
      if (response.ok) {
        response.json().then(json => {
          locationObj = json;
          this.setState({locationLoaded: true, locationData: locationObj})

        });
      }
    });

    fetch(URL.url + 'unit', {
      //mode: 'no-cors',
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    },).then(response => {
      if (response.ok) {
        response.json().then(json => {
          unitObj = json;
          this.setState({unitLoaded: true, unitData: unitObj})

        });
      }
    });

    fetch(URL.url + 'pattern', {
      //mode: 'no-cors',
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    },).then(response => {
      if (response.ok) {
        response.json().then(json => {
          patternObj = json;
          this.setState({patternLoaded: true, patternData: patternObj})

        });
      }
    });

    fetch(URL.url + 'periodoptions/1', {
      //mode: 'no-cors',
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    },).then(response => {
      if (response.ok) {
        response.json().then(json => {
          periodObj = json;
          this.setState({periodLoaded: true, periodData: periodObj})

        });
      }
    });

  }

  render() {
    const {isloading} = this.state;
    if (this.state.locationLoaded === true && this.state.unitLoaded === true && this.state.patternLoaded === true && this.state.periodLoaded === true) {
      return (<Paper className={this.state.classes.root}>
        <Dialog open={this.state.open} scroll={this.state.scroll} aria-labelledby="scroll-dialog-title" title="Dialog" modal={true} autoDetectWindowHeight={false} autoScrollBodyContent={false} contentStyle={{
            width: "100%",
            maxWidth: "none"
          }}>
          <DialogTitle id="scroll-dialog-title" style={{
              minWidth: 500,
              background: 'linear-gradient(55deg, #fff9f9  10%, #fffef4 90%)'
            }}>
            Create New Offering
            <Button variant="fab" color="secondary" style={{
                position: 'absolute',
                top: '1%',
                right: '2%'
              }} onClick={this.props.cclosed}>
              <CloseIcon/>
            </Button>
          </DialogTitle>
          <DialogContent style={{
              alignItems: 'center',
              background: 'linear-gradient(55deg, #e2e2e2  10%, #fdfff9 90%)'
            }}>
            <form onSubmit={this.handleSubmit}>
              <p style={{
                  textAlign: 'center'
                }}>
                <TextField id="unit_id" select="select" label="Unit Name" className={this.state.classes.unittextField} value={this.state.unit} onChange={this.handleUnit('unit')} SelectProps={{
                    MenuProps: {
                      className: this.state.classes.unitmenu
                    }
                  }} InputLabelProps={{
                    shrink: true
                  }} margin="normal">{
                    this.state.unitData.map(option => (<MenuItem key={option.id} value={option.id}>
                      {option.code + " " + option.name}
                    </MenuItem>))
                  }
                </TextField>
              </p>
              <p style={{
                  textAlign: 'center'
                }}>
                <TextField id="pattern_id" select="select" label="Pattern Code" className={this.state.classes.textField} value={this.state.pattern} onChange={this.handlePattern('pattern')} SelectProps={{
                    MenuProps: {
                      className: this.state.classes.unitmenu
                    }
                  }} InputLabelProps={{
                    shrink: true
                  }} margin="normal">{
                    this.state.patternData.map(option => (<MenuItem key={option.id} value={option.id}>
                      {option.code}
                    </MenuItem>))
                  }
                </TextField>
              </p>
              <p style={{
                  textAlign: 'center'
                }}>
                <TextField id="location_id" select="select" disabled="disabled" label="Location" className={this.state.classes.textField} value={this.state.location} onChange={this.handleLoc('location')} SelectProps={{
                    MenuProps: {
                      className: this.state.classes.menu
                    }
                  }} InputLabelProps={{
                    shrink: true
                  }} margin="normal">{
                    this.state.locationData.map(option => (<MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>))
                  }
                </TextField>

              </p>
              <p style={{
                  textAlign: 'center'
                }}>
                <TextField id="period_id" select="select" label="Period" className={this.state.classes.textField} value={this.state.period} onChange={this.handlePeriod('period')} SelectProps={{
                    MenuProps: {
                      className: this.state.classes.menu
                    }
                  }} InputLabelProps={{
                    shrink: true
                  }} margin="normal">

                  {
                    this.state.periodData.map(option => (<MenuItem key={option.id} value={option.id}>
                      {option.code}
                    </MenuItem>))
                  }
                </TextField>
              </p>

              {
                isloading
                  ? <Paper className={this.state.classes.root}>
                      <LinearProgress color="secondary" variant="query"/>
                    </Paper>
                  : isloading
              }

              <p style={{
                  textAlign: 'center'
                }}>
                <Button className={this.state.classes.button} type="submit" size="large" variant="outlined" style={{
                    color: "#0f6600"
                  }}>
                  <SaveIcon className={classNames(this.state.classes.leftIcon, this.state.classes.iconSmall)}/>
                  Create Offering
                </Button>
              </p>
            </form>
          </DialogContent>
        </Dialog>
        <Snackbar anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }} open={this.state.postPassed} autoHideDuration={6000} onClose={this.handleClose} ContentProps={{
            'aria-describedby' : 'message-id'
          }} message={<span id = "message-id" > {
            this.state.message
          }
          </span>} action={[<IconButton key="close" aria-label="Close" color="inherit" className={this.state.classes.close} onClick={this.handleClose}>
            <CloseIcon/>
          </IconButton>
            ]}/>
      </Paper>);
    } else {
      return (<Paper className={this.state.classes.root}>
        <Dialog open={this.state.open} scroll={this.state.scroll} aria-labelledby="scroll-dialog-title">
          <DialogTitle id="scroll-dialog-title">Loading Creator
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <LinearProgress color="primary" variant="query"/>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Paper>)
    }
  }
}

export default withStyles(styles)(CustomizedTable);
