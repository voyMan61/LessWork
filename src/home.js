import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from '@material-ui/core/Paper';
import Header from "./components/head.js";
import Footer from "./components/foot.js";

import Typography from '@material-ui/core/Typography';

import U from './components/user.js'

const styles = theme => ({
  root: {
    flexGrow: 1,
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
      <Header/>
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
  