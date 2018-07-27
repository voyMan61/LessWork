import React from 'react';
import PropTypes from 'prop-types';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import {withStyles} from '@material-ui/core/styles';

const styles = {
  root: {
    flexGrow: 1,
    background: 'linear-gradient(55deg, #cec1a9  10%, #c6b38d  60%, #ceba94 90%)'
  },
  flex: {
    flexGrow: 1
  }
};

class footer extends React.Component {
  render() {
    const {classes} = this.props;
    return (<BottomNavigation className={classes.root} showLabels="showLabels">
      <BottomNavigationAction label="© FT05 WorkLess"/>
      <BottomNavigationAction label="2018 Murdoch University"/>
    </BottomNavigation>);
  }
}

footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(footer);
