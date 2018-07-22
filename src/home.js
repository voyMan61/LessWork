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
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';

import Avatar from '@material-ui/core/Avatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FolderIcon from '@material-ui/icons/BusinessCenter';
import Dicon from '@material-ui/icons/Send'
import UCicon from '@material-ui/icons/Email';
import SAicon from '@material-ui/icons/Settings';

import DB from './components/Dashboard.js'
/*
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
;
*/





class Home extends React.Component {
  state = {
    log: false,
    logged: '',
    value: 0,
    open: true,
    currentUser:'U',
    test: false  ,
    hits:[],
    isLoading: false,
    staVa: '',
    staffSelect: [],
  };
  
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handlelogin = () => {
    this.setState({ currentUser: 'NY', open: true,log: false });
  };
  handleClose = () => {
    this.setState({ open: false,log: true });
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleStaffChange = event => {
    this.setState({ log: true, staffSelect: event.target.value });
    console.log(event.target.value);
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
    const{test, currentUser, log} = this.state;

    if(test){
      return(
        <Paper className={classes.root}>
          <DB/>
        </Paper>
      );
    }

if(log){
    return (
      <Paper className={classes.root}>
        <Header className={classes.he}/>
        <Button  style={{position: 'absolute', top: '2%', right: '45%'}}  onClick={this.handlelogin} className={classes.button}><FolderIcon/></Button>
        <Avatar style={{position: 'absolute', top: '2%', right: '3%', backgroundColor:'red'}}>{currentUser}</Avatar>
        <Body className={classes.bo}/>
        <Footer className={classes.fo}/>
      </Paper>
    );
  }
    return (
      <Paper className={classes.root}>
        <Grid className={classes.grid} container spacing={24}>
        <Grid item xs={12} md={6}>         
          <Card  className={classes.card}>
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            WorkLess
          </Typography>
        </CardContent> 
        <CardActions>
        <MenuList>
        <MenuItem onClick={this.handleClose} className={classes.menuItem}>
          <ListItemIcon className={classes.icon} >
          <Dicon />
          </ListItemIcon>
          <ListItemText classes={{ primary: classes.primary }} inset primary="Dean" />
        </MenuItem>
        <MenuItem onClick={this.handleClose} className={classes.menuItem}>
          <ListItemIcon className={classes.icon}>
            <UCicon/>
          </ListItemIcon>
          <ListItemText classes={{ primary: classes.primary }} inset primary="Unit Coordinator" />
        </MenuItem>
        <MenuItem onClick={this.handleClose} className={classes.menuItem} >
          <ListItemIcon className={classes.icon}>
             <SAicon/>
          </ListItemIcon>
          <ListItemText classes={{ primary: classes.primary }} inset primary="System Administrator" />
        </MenuItem>
      </MenuList>
        </CardActions>
                  </Card>
        </Grid>
      </Grid>
      <Particles  params={parts}
              style={{
                zindex: -100,
                width: '100% !important',
                height: '100% !important',
                background: 'linear-gradient(160deg, #ad0025  20%, #82001b  40%, #660e04  80%)',
                boxShadow: '0 3px 5px 2px rgba(247, 193, 0, 0.4)',
              }}
            />
        </Paper>
  );
  }
}
  const styles = theme => ({
    root: {
      flexGrow: 1,
      zindex:'-1',
      width: '100% !important',
      height: '100% !important',
    }, 
    card: { 
      maxwidth: '50%',
      flex: 1,
      width: theme.spacing.unit * 55,
      height: theme.spacing.unit * 25,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    grid: {
      position: 'absolute',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      top: '30%'
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