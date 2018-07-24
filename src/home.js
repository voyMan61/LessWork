import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Header from "./pieces/ui/head.js";
import Footer from "./pieces/ui/foot.js";
import Body from './pieces/user.js'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import MenuList from '@material-ui/core/MenuList';
import ListItemText from '@material-ui/core/ListItemText';

import Avatar from '@material-ui/core/Avatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FolderIcon from '@material-ui/icons/BusinessCenter';
import Sticon from '@material-ui/icons/Message'
import Dicon from '@material-ui/icons/Send'
import UCicon from '@material-ui/icons/Email';
import SAicon from '@material-ui/icons/Settings';
import Person from '@material-ui/icons/PersonPin';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


import LogoM from './pieces/ui/mLogo2.png';
import Part from './pieces/ui/parts.js';
/*
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
;
*/





class Home extends React.Component {
  state = {
    log: true,
    logged: true,
    value: 0,
    open: true,
    currentUser:'sudowoodo',
    test: false  ,
    hits:[],
    isLoading: false,
    staVa: '',
    staffSelect: [],
    expanded: null,
    colour:'white',
    r: 255,
    g:255,
    b:255,
    isStaff:true,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handlelogO = () => {
    this.setState({ r: 255, g:255, b:255, logged: true, open: true,log: false });
  };
  handleClose = () => {
    this.setState({ open: false,log: true });
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleLogChange = event => {

if(event.target.id === '1')
{    if(window.btoa( event.target.value) === 'c3RhZmYx') {
    this.setState({isStaff:true, currentUser: 'Staff', logged:false, expanded: null, log: true,  });
    }}
    else if(event.target.id === '2')
    {    if(window.btoa( event.target.value) === 'ZGVhbjI=') {
        this.setState({isStaff: false,currentUser: 'Dean', logged:false, expanded: null, log: true,  });
        }}
        if(event.target.id === '3')
{    if(window.btoa( event.target.value) === 'dWMz') {
    this.setState({isStaff: false, currentUser: 'UC', logged:false, expanded: null, log: true,  });
    }}
    if(event.target.id === "4")
{    if(window.btoa( event.target.value) === 'c2E=') {
    this.setState({isStaff: false, currentUser: 'SA', logged:false, expanded: null, log: true,  });
    }
  }
    if(event.target.value === '') { this.setState({ isStaff: true, r: 255, g:255, b:255, }); }
  else
  {this.setState({  b: this.state.b-13, g:this.state.g-20, });}
  };

  handleStaffChange = event => {
    this.setState({ log: true, staffSelect: event.target.value });
    console.log(event.target.value);
  };

  handleExpandChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
      b: 255, g:255,});
  };



  render() {
    const {  classes } = this.props;
    const{ isStaff,r,g,b,expanded, test, currentUser, log, colour,logged} = this.state;

    return (
      <Paper className={classes.root}>
      {log ? ( <div>
              <Header className={classes.he}/>
              <Typography style={{ position: 'absolute', top: '3%', right: '3%',color:'#d6e9ff'}} gutterBottom variant="headline" > <Person/>
              {currentUser}
                </Typography>
              <Button  style={{position: 'absolute', top: '2%', right: '45%'}}  onClick={this.handlelogO} className={classes.button}><FolderIcon/></Button>
              <Body pa = {isStaff} className={classes.bo}/>
              <Footer className={classes.fo}/> </div>)
              : (<div>
                  <Part/>
        <Card  className={classes.card1}>
        <CardContent ><p>
        <Typography gutterBottom variant="headline">
            WorkLess
          </Typography>

</p>
<p >          <Card  className={classes.card2}>
        <CardContent style={{backgroundColor: 'rgb('+ r +','+ g +','+ b +')',}}>

        <ExpansionPanel expanded={expanded === 'Staff'} onChange={this.handleExpandChange('Staff')}>
          <ExpansionPanelSummary expandIcon={<Sticon />}>
          <Typography style={{textAlign: 'right', fontSize:15,}}>Staff</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          <FormControl className={classes.formControl}>
          <TextField
          id="1"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={this.handleLogChange}
          />       </FormControl>
          </ExpansionPanelDetails>

        </ExpansionPanel>

        <ExpansionPanel expanded={expanded === 'Dean'} onChange={this.handleExpandChange('Dean')}>
          <ExpansionPanelSummary expandIcon={<Dicon />}>
          <Typography style={{fontSize:15,}}>Dean </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          <FormControl className={classes.formControl}>
          <TextField
          id="2"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={this.handleLogChange}
          />       </FormControl>
          </ExpansionPanelDetails>

        </ExpansionPanel>

                <ExpansionPanel expanded={expanded === 'Unit Coordinator'} onChange={this.handleExpandChange('Unit Coordinator')}>
          <ExpansionPanelSummary expandIcon={<UCicon />}>
          <Typography style={{fontSize:15,}}>Unit Coordinator</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          <FormControl className={classes.formControl}>
          <TextField
          id="3"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={this.handleLogChange}
          />       </FormControl>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'System Administrator'} onChange={this.handleExpandChange('System Administrator')}>
          <ExpansionPanelSummary expandIcon={<SAicon />}>
          <Typography style={{justifyContent: 'center',fontSize:15,}}>System Administrator </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          <FormControl className={classes.formControl}>
          <TextField
          id="4"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={this.handleLogChange}
          />       </FormControl>
          </ExpansionPanelDetails>

        </ExpansionPanel>
        </CardContent>
                  </Card></p>
</CardContent>
          </Card>
              </div>)}
    </Paper>
    );
  }
}
  const styles = theme => ({
    root: {
      flexGrow: 1,
      zindex:1,
      width: '100% !important',
      height: '100% !important',
      minHeight:'10%',
    },
    formControl: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    card1: {
      top: '20%',
      left: '40%',
      right: '40%',
      flex: 1,
      position: 'absolute',
      minWidth: '25%',
      minHeight: '25%',
      background: 'linear-gradient(55deg, #ede8e8  10%, #e2e2e2 90%)',

    },
  });


Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
