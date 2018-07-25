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

import Seletctor from './pieces/sSelect.js'
import LogoM from './pieces/ui/mLogo2.png';
import Part from './pieces/ui/parts.js';
/*
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
;
*/


class Home extends React.Component {
  state = {
    log: false,
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
    value:0,
    lvalue: null,
    s: null,
    width: window.innerWidth,
    height: window.innerHeight,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handlelogO = () => {
    this.setState({lvalue:0, s:null, r: 255, g:255, b:255, logged: true, open: true,log: false });
  };
  handleClose = () => {
    this.setState({ open: false,log: true });
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleStChangeValue = e => {
    this.setState({lvalue: 1, expanded: null, log: true, currentUser: e.target.value.name, s: e.target.value});

  };

  handleLogChange = event => {
if(event.target.id === '1')
{    if(window.btoa( event.target.value) === 'c3RhZmYx') {
    this.setState({ currentUser: 'Staff', logged:false, expanded: null, log: true,  });
    }}
    else if(event.target.id === '2')
    {    if(window.btoa( event.target.value) === 'ZGVhbjI=') {
        this.setState({lvalue:2, currentUser: 'Dean', logged:false, expanded: null, log: true,  });
        }}
        if(event.target.id === '3')
{    if(window.btoa( event.target.value) === 'dWMz') {
    this.setState({lvalue:3,currentUser: 'UC', logged:false, expanded: null, log: true,  });
    }}
    if(event.target.id === "4")
{    if(window.btoa( event.target.value) === 'c2E=') {
    this.setState({lvalue:5,currentUser: 'SA', logged:false, expanded: null, log: true,  });
    }
  }
    if(event.target.value === '') { this.setState({r: 255, g:255, b:255, }); }
  else
  {this.setState({  b: this.state.b-13, g:this.state.g-20, });}
  };

  handleStaffChange = event => {
    this.setState({ log: true, staffSelect: event.target.value });
    console.log(event.target.value);
  };

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({     height: window.innerHeight,width: window.innerWidth });
  };

  handleExpandChange = panel => (event, expanded) => {
    this.setState({lvalue:0, s:null,
      expanded: expanded ? panel : false, b: 255, g:255,});
  };


  componentDidMount() {
      window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount(){
      window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
      this.forceUpdate();
  };





  render() {
    const {  classes } = this.props;
    const{ s, lid,lvalue, value,r,g,b,expanded, test, currentUser, log, colour,logged} = this.state;
    const { height, width } = this.state;
    const isMobile = width <= 700;

  if (isMobile) {
    return (
<Paper style={{
}}>

<Part style={{minHeight:33,}}/>
<Card style={{top: '15%',
flex: 1,
position: 'absolute',
margin: '20%',
padding: 1,
background: 'linear-gradient(55deg, #ede8e8  10%, #e2e2e2 90%)',}}>
<CardContent >
<Typography gutterBottom variant="display2">
    WorkLess
  </Typography><Typography gutterBottom variant="display1">
      mobile site not here
    </Typography>
  </CardContent>
  </Card>
</Paper>
      );
  } else {

    return (
      <Paper className={classes.root}>
      {log ? ( <div>
              <Header className={classes.he}/>
              <Typography style={{ position: 'absolute', top: '3%', right: '3%',color:'#d6e9ff'}} gutterBottom variant="headline" > <Person/>
              {currentUser}
                </Typography>
              <Button  style={{position: 'absolute', top: '2%', right: '45%'}}  onClick={this.handlelogO} className={classes.button}><FolderIcon/></Button>
              <Body ls={s} linfo ={lvalue} className={classes.bo}/>
              <Footer className={classes.fo}/> </div>)
              : (<div>
                  <Part/>
        <Card  className={classes.card1}>
        <CardContent ><p>
        <Typography gutterBottom variant="display2">
            WorkLess
          </Typography>
</p>
<p >          <Card  className={classes.card2}>
        <CardContent style={{backgroundColor: 'rgb('+ r +','+ g +','+ b +')',}}>
        <ExpansionPanel expanded={expanded === 'Staff'} onChange={this.handleExpandChange('Staff')}>
          <ExpansionPanelSummary expandIcon={<Sticon />}>
          <Typography style={{textAlign: 'right', fontSize:15,}}>Staff</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{justifyContent: 'center'}}>
          <Seletctor
          value={this.state.value}
          onChangeValue={this.handleStChangeValue}
          />
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
}
  const styles = theme => ({
    root: {
      flexGrow: 1,
      zindex:1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    formControl: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    card1: {
      top: '20%',
      left: '38%',
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
