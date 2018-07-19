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
<<<<<<< HEAD
    open: true,
  };
  
  handleClickOpen = () => {
    this.setState({ open: true });
=======
>>>>>>> parent of 0cf73e1... mewTwo did nothing wrong
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Header className={classes.he}/>
        <Body className={classes.bo}/>
        <Footer className={classes.hfo}/>
      </Paper>
    );
  }
<<<<<<< HEAD

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
=======
>>>>>>> parent of 0cf73e1... mewTwo did nothing wrong
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
  