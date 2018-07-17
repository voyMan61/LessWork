import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from '@material-ui/core/Paper';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import Patterns from './patternDetails.js'
import StaffTots from './staffTotals.js'
import Offerings from './offerTable'
import Ste from './staffView.js'

const styles = theme => ({
  Footer: {
    background:'#b3a558',
    position: 'absolute',
    height:'10%',
  },
  AppBar: {
    position: 'absolute',
    height:'100px',
    background: '#600718',
  },
  root: {
    flexGrow: 1,
    height: '1802%',
    background: 'linear-gradient(to bottom, rgb(173, 0, 37) 30%,' +
    'rgb(130, 0, 27) 40%, rgb(91, 0, 19) 100%)',
  },
  aa:{
    
    color:'black',
  },
});
//background: '#b3a558',
function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class USerView extends React.Component {
  state = {
    value: 4,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <Paper className={classes.root}>
        <AppBar className={classes.aa} position="static" href="#" >
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Dashboard" href="#Dashboard" />
            <Tab label="    " href="#Blanked" />
            <Tab label="Offerings" href="#Offerings" />
            <Tab label="Staff Totals" href="#Staff-Totals" />
            <Tab label="Patterns" href="#Patterns" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer> </TabContainer>}
        {value === 1 && <TabContainer><Ste/></TabContainer>}
        {value === 2 && <TabContainer><Offerings/></TabContainer>}
        {value === 3 && <TabContainer><StaffTots/></TabContainer>}
        {value === 4 && <TabContainer><Patterns/></TabContainer>}
      </Paper>
    );
  }
}

USerView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(USerView);
  