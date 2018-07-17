import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from '@material-ui/core/Paper';
import Footer from "./components/foot.js";

import Typography from '@material-ui/core/Typography';

import U from './components/user.js'

const styles = theme => ({
  Footer: {
    background:'#b3a558',
    position: 'absolute',
    height:'12%',
  },
  root: {
    flexGrow: 1,
    background: 'linear-gradient(to bottom, rgba(103,120,120,0.7) 60%,' +
    'rgba(131,210,320,0.3) 100%, rgba(210,130,130,130) 100%)',
  },
});

class Home extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <Paper className={classes.root}>
        <U/>
        <Footer/>
      </Paper>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
  