import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem'; 
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import { mailFolderListItems, otherMailFolderListItems } from './tileData';
import Offerings from './offerTable.js'
import StaffTots from './staffTotals.js'
import Yuu from './youI.js'
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';

const drawerWidth = 160;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    background: 'linear-gradient(to center, rgba(3,120,220,0.7) 20%, ' +
    'rgba(330,310,220,0.3) 100%, rgba(110,230,330,230) 100%)',
    display: 'flex',
    width: '101%',
  },
  appBar: {
    position: 'absolute',
    height:'90px',
    marginLeft: drawerWidth,
    background: '#600718',
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    height:'1200px',
    background:'#b3a558',
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false,
    dash: false,
    stT: false, 
    patt: false,
    off: false
  };

  handleSidebarOfferings = () => {
    this.setState({dash: true, stT: false, patt: false, off: false})
  };
  handleSidebarStaffTotals = () => {
    this.setState({dash: false, stT: true, patt: false, off: false})
  };
  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes, theme, dash, stT, patt, off } = this.props;
    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <ListItem>
        <ListItemText primary="" />
        </ListItem>
        <Divider />
        <ListItem button>
        <ListItemText primary="Dashboard" />
        </ListItem>
        <Divider />
        <ListItem button onClick={this.handleSidebarStaffTotals}>
        <ListItemText primary="Staff Totals" />
        </ListItem>
        <Divider />
        <ListItem button >
        <ListItemText primary="Patterns" />
        </ListItem>
        <Divider />
        <ListItem button onClick={this.handleSidebarOfferings} component="Offering" href="#fffff">
        <ListItemText primary="Offerings" />
        </ListItem><Divider />
      </div>
    );
    
    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton 
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              work
            </Typography>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <p><Typography noWrap>
            <p>fchvgjbhkjnl</p>
          </Typography></p>
        </main>
      </div>
    );


  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);
//            <Offerings/>