import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from '@material-ui/core/Paper';

import Particles from 'react-particles-js';


import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';

import Dialog from '@material-ui/core/Dialog';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';


import Header from "./components/head.js";
import Footer from "./components/foot.js";
import Body from './components/user.js'


function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    zindex:'-1',
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

  },
  pap2er: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& $primary, & $icon': {
        color: theme.palette.common.white,
      },
    },
  },
  primary: {},
  icon: {},
});

class Home extends React.Component {
  state = {
    log: false,
    logged: '',
    value: 0,
    open: true,
  };
  
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false,log: true });
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };
  render() {
    const {  classes } = this.props;
    const{log, logged} = this.state;
if(log){
    return (
      <Paper className={classes.root}>
        <Header className={classes.he}/>
        <Body className={classes.bo}/>
        <Footer className={classes.fo}/>
      </Paper>
    );
  }

    return (
      <Paper className={classes.pap2er}>
              <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >

                
        <Grid className={classes.grid} container spacing={24}>
        <Grid item xs={12} sm={3}></Grid>
        <Grid item xs={12} md={6}>         
          <Card className={classes.card}>
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            WorkLess
          </Typography>
          <Typography component="p">
          
          </Typography>
        </CardContent>
        
        <CardActions>
        <MenuList onClick={this.handleClose}>
        <MenuItem className={classes.menuItem}>
          <ListItemIcon className={classes.icon} >
            <SendIcon/>
          </ListItemIcon>
          <ListItemText classes={{ primary: classes.primary }} inset primary="Dean" />
        </MenuItem>
        <MenuItem className={classes.menuItem}>
          <ListItemIcon className={classes.icon}>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText classes={{ primary: classes.primary }} inset primary="Unit Coordinator" />
        </MenuItem>
        <MenuItem className={classes.menuItem} >
          <ListItemIcon className={classes.icon}>
            <InboxIcon />
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
                width: '100%',
                zindex: -999,
                background: 'linear-gradient(to bottom, rgb(173, 0, 37) 16%,' +
                'rgb(130, 0, 27) 60%, rgb(91, 0, 19) 100%)',
              }}
            />
      <img src={"/murdLogo.eps"} />
        </Dialog>
        </Paper>
);
  }
}

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


Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
  

