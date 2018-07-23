import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Header from "./components/head.js";
import Footer from "./components/foot.js";
import Body from './components/user.js'
import Particles from 'react-particles-js';
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

import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


import LogoM from './components/assets/mLogo2.png';
import Part from './components/parts.js';
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
    currentUser:'U',
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

  };
  
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handlelogO = () => {
    this.setState({ r: 255, g:230, b:230, logged: true, open: true,log: false });
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
    this.setState({currentUser: 'Staff', logged:false, expanded: null, log: true,  });
    }}
    else if(event.target.id === '2')
    {    if(window.btoa( event.target.value) === 'ZGVhbjI=') {
        this.setState({currentUser: 'Dean', logged:false, expanded: null, log: true,  });
        }}
        if(event.target.id === '3')
{    if(window.btoa( event.target.value) === 'dWMz') {
    this.setState({currentUser: 'UC', logged:false, expanded: null, log: true,  });
    }}
    if(event.target.id === "4")
{    if(window.btoa( event.target.value) === 'c2E=') {
    this.setState({currentUser: 'SA', logged:false, expanded: null, log: true,  });
    }
  }
    if(event.target.value === '') {    this.setState({ r: 255, g:255, b:255, }); }
  else 
  {this.setState({ b: this.state.b-20, g:this.state.g-20, });}
  };

  handleStaffChange = event => {
    this.setState({ log: true, staffSelect: event.target.value });
    console.log(event.target.value);
  };

  handleExpandChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch('http://immense-headland-42479.herokuapp.com/api/stafftotals')
    .then((response) => response.json())
    .then((responseJson) => {
        this.setState({ hits: responseJson, isLoading: false });
    }) 
}


  render() {
    const {  classes } = this.props;
    const{r,g,b,expanded, test, currentUser, log, colour,logged} = this.state;
   
    return (
      <Paper className={classes.root}>
      {log ? ( <div>
              <Header className={classes.he}/>
              <Typography style={{ position: 'absolute', top: '3%', right: '3%',color:'#d6e9ff'}} gutterBottom variant="headline">
              {currentUser}
                </Typography>
              <Button  style={{position: 'absolute', top: '2%', right: '45%'}}  onClick={this.handlelogO} className={classes.button}><FolderIcon/></Button>
              <Body className={classes.bo}/>
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






const parts = 
  {
    "particles": {
      "number": {
        "value": 40,
        "density": {
          "enable": true,
          "value_area": 1104.8088779284833
        }
      },

      "color": {
        "value": ["#ffe100", "#d0ff00", "#00ffdd", "#3f00ff", "#fff200", "#fff200"]
      },

      "shape": {
        "type": "edge",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 1.5,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 63.13193588162762,
        "color": "#ffffff",
        "opacity": 0.7418002466091246,
        "width": 1.1048088779284833
      },
      "move": {
        "enable": true,
        "speed": 1.5782983970406905,
        "direction": "none",
        "random": true,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "bubble"
        },
        "onclick": {
          "enable": true,
          "mode": "repulse"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 133.99314807765512,
          "size": 6.181195279786829,
          "duration": 3.248318741276488,
          "opacity": 0.109489912447658927,
          "speed": 3
        },
        "repulse": {
          "distance": 199.8001998001998,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  }


  /*
      <Particles  params={parts}
              style={{
                zindex: -100,
                width: '100% !important',
                height: '100% !important',
                background: 'linear-gradient(160deg, #ad0025  20%, #82001b  40%, #660e04  80%)',
                boxShadow: '0 3px 5px 2px rgba(247, 193, 0, 0.4)',
              }}
            />




           






  */