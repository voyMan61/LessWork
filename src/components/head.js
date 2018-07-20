import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    flexGrow: 1,
    background: 'linear-gradient(55deg, #ceba94  10%, #cec1a9  60%, #c6b38d   90%)',
  },
  flex: {
    flexGrow: 1,
  },
};

class MenuAppBar extends React.Component {
  state = {
    
  };



  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar className={classes.root} position="static">
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.flex}>
              WorkLess
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);