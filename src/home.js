import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from '@material-ui/core/Paper';

import Header from "./components/head.js";
import Footer from "./components/foot.js";
import Body from './components/user.js'

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
    return (
      <Paper className={classes.root}>
        <Header/>
        <Body/>
        <Footer/>
      </Paper>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
  