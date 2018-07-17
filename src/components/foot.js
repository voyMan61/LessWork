import React from 'react';
import PropTypes from 'prop-types'; 
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    flexGrow: 1,
    background: 'linear-gradient( rgb(206, 193, 169) 17%,' +
    'rgb(206, 186, 148) 90%, rgb(198, 179, 141) 100%)',
  },
  flex: {
    flexGrow: 1,
  },
};

class footer extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <BottomNavigation className={classes.root} showLabels>
      <BottomNavigationAction label="2018 Murdoch University"/>
      <BottomNavigationAction label="© FT05 WorkLess "/>
      </BottomNavigation>
    );
  }
}

footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(footer);

