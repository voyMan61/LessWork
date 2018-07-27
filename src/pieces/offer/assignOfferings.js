import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import URL from '../ui/url.json'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import SaveIcon from '@material-ui/icons/Save';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import Switch from '@material-ui/core/Switch';

const styles = theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15)
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20
  },
  details: {
    alignItems: 'center'
  },
  column: {
    flexBasis: '33.33%'
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  },

  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3
  },

  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  paper: {
    margin: theme.spacing.unit,
    position: 'absolute',
    width: theme.spacing.unit * 150,
    height: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  }
});

class EnhancedTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: 'asc',
      mod: '',
      modee: false,
      open: false,
      checked: false,
      hits: [],
      oData: '',
      offerView: false,
      objectLoaded: false,
      creatorOpen: false,
      da: [
        {}
      ],
      d: null,
      h: null,
      staffLoaded: false,
      staffData: null,
      staffSelect: '',
      confirmed: null,
      loadD: null,
      catg: 0,
      cotg: 0,
      loadT: null,
      currentID: null,
      enrol: null,
      isloading: false,
      expanded: null,
      postPassed: false,
      enrols: 0,
      sopen: false,
      r: 255,
      g: 255,
      b: 255,
      d: ''
    };
  }

  handleChange = () => {
    this.setState(state => ({
      checked: !state.checked
    }));
  };

  handleROpen = (data, e) => {
    this.setState(state => ({oData: data, open: true, offerView: true}));
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  viewerClosed() {
    this.setState({
      currentCount: this.state.currentCount + 1,
      offerView: false
    })
  };

  handlecasual = name => event => {
    this.setState({catg: event.target.value})
  };

  handlecoord = name => event => {
    this.setState({cotg: event.target.value})
  };

  handleEnrolments = name => event => {
    this.setState({enrols: event.target.value})
  };

  handleConfirm = name => event => {
    this.setState({currentID: event.target.id, confirmed: event.target.checked});
  };

  handleStaff = name => event => {
    this.setState({loadT: event.target.value.target, loadD: event.target.value.total_load, staffSelect: event.target.value});
  };
  handleCreator = () => {
    this.setState({creatorOpen: true});
  };

  creatorClosed() {
    this.setState({creatorOpen: false});
  };

  handleEChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded
        ? panel
        : false,
      confirmed: false,
      enrols: 0,
      cotg: 0,
      catg: 0,
      staffSelect: null
    });
  };

  componentDidMount() {
    var offerObj;
    var staffObj;

    fetch(URL.url + 'stafftotals', {
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
          staffObj = json;
          this.setState({staffLoaded: true, staffData: staffObj})

        });
      }
    });

    fetch(URL.url + 'offering', {
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
          offerObj = json;
          this.setState({objectLoaded: true, patternData: offerObj, hits: offerObj, isLoading: false})
        });
      }
    });
  }

  handleClick = () => {
    this.setState({sopen: true});
  };

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
    fetch(URL.url + 'offering/' + this.state.currentID, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        confirm: this.state.confirmed,
        enrolment: parseInt(this.state.enrols),
        tutorial_to_staff: parseInt(this.state.cotg),
        tutorial_to_casual: parseInt(this.state.catg),
        staff_id: this.state.staffSelect.id
      })
    }).then(response => {
      if (response.ok) {
        this.setState({postPassed: true, isloading: false, message: "Offering updated"});
        this.props.reffed;
        return response
      } else {
        this.setState({postPassed: true, isloading: false, message: "Offering not updated. Please try again"})
        return Promise.reject('something went wrong!')
      }
    }).then(data => console.log('data is', data)).catch(error => console.log('error is', error));
  };

  render() {
    var handleToUpdate = this.props.handleToUpdate;
    const {classes} = this.props;
    const {
      postPassed,
      expanded,
      currentID,
      catg,
      enrols,
      cotg,
      loadD,
      confirmed,
      staffSelect,
      staffData,
      staffLoaded,
      d,
      objectLoaded,
      hits
    } = this.state;
    if (objectLoaded && staffLoaded) {
      return (<div key={this.state.postPassed}>
        <Grid container="container" spacing={24}>
          {
            hits.map(n => {
              if (n.enrolment === 0) {
                return (<Grid item="item" xs={3} spacing={40}>
                  <div>
                    <ExpansionPanel style={{
                        backgroundColor: d
                      }} expanded={expanded === n.id} onChange={this.handleEChange(n.id)}>
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} style={{
                          padding: 5,
                          flexGrow: 1
                        }}>
                        <Typography className={classes.heading}>{n.unit_code}</Typography>
                        <Typography className={classes.secondaryHeading}>
                          - {n.name}</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails className={classes.details}>

                        <form onSubmit={this.handleSubmit}>
                          <p style={{
                              top: '10%',
                              textAlign: 'center',
                              position: 'relative'
                            }}>Confirm
                            <Switch checked={confirmed} id={n.id} label={'Confirm'} onChange={this.handleConfirm()} value={confirmed} color="primary"/>
                          </p>

                          <p style={{
                              top: '12%',
                              textAlign: 'center',
                              position: 'relative'
                            }}>
                            <Select id={n.id} value={staffSelect} onChange={this.handleStaff()} input={<Input name = "staff" id = "age-helper" />}>
                              {
                                staffData.map(m => {
                                  return (<MenuItem value={m}>{m.name}</MenuItem>);
                                })
                              }
                            </Select>
                            <FormHelperText style={{
                                textAlign: 'center'
                              }}>Select Staff</FormHelperText>
                          </p>

                          {
                            this.state.loadD / this.state.loadT > 1
                              ? (<p style={{
                                  textAlign: 'center',
                                  backgroundColor: 'rgb(255, 17, 61)'
                                }}>Staff is overworked
                              </p>)
                              : (<p></p>)
                          }
                          <p style={{
                              position: 'relative',
                              color: '#d6e9ff',
                              textAlign: 'center'
                            }}>
                            <TextField id={n.id} label="Coordinator tutorial Groups" InputLabelProps={{
                                shrink: true
                              }} placeholder="0" margin="normal" onChange={this.handlecoord()} value={this.state.cotg}/></p>
                          <p style={{
                              position: 'relative',
                              color: '#d6e9ff',
                              textAlign: 'center'
                            }}>

                            <TextField id={n.id} label="Casual tutorial Groups" InputLabelProps={{
                                shrink: true
                              }} placeholder="0" margin="normal" onChange={this.handlecasual()} value={this.state.catg}/>

                            <TextField id={n.id} label="Enrolments" InputLabelProps={{
                                shrink: true
                              }} margin="normal" onChange={this.handleEnrolments()} value={this.state.enrols}/>
                          </p>

                          <Button onClick={() => handleToUpdate('someVar')} type="submit" variant="outlined" size="large" style={{
                              position: 'relative',
                              left: '30%',
                              textAlign: 'center',
                              color: "#0f6600"
                            }}>
                            <SaveIcon/>
                            Save
                          </Button>
                        </form>
                        <div style={{
                            textAlign: 'left',
                            alignItems: 'center'
                          }}></div>
                      </ExpansionPanelDetails>
                      <Divider/>
                    </ExpansionPanel>
                  </div>
                </Grid>);
              }
            })
          }
        </Grid>
      </div>);
    } else {
      return (<Paper>
        <LinearProgress/>
      </Paper>)
    }
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(EnhancedTable);
