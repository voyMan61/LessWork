import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import OfferCreator from './offerCreator.js'
import OfferDetails from './offerTable'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3
  },

  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  paper: {
    margin: theme.spacing.unit,
    position: 'absolute',
    width: theme.spacing.unit * 150,
    height: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  }
});

class EnhancedTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: 'asc',
      mod: '',
      modee: false,
      open: false,
      checked: false,
      hits: [],
      oData: '',
      offerView: false,
      objectLoaded: false,
      creatorOpen: false
    };
  }

  viewerClosed() {
    this.setState({
      currentCount: this.state.currentCount + 1,
      offerView: false
    })
  };

  handleCreator = () => {
    this.setState({creatorOpen: true});
  };

  creatorClosed() {
    this.setState({creatorOpen: false});
  };

  render() {
    const {creatorOpen} = this.state;
    if (creatorOpen) {
      return (<Paper>
        <Toolbar>
          <Typography style={{
              position: 'absolute',
              left: 60
            }} variant="title" id="tableTitle">Offering</Typography>
        </Toolbar>
        <OfferCreator cclosed={this.creatorClosed.bind(this)}/>
        <OfferDetails priv={this.props.lin}/>
      </Paper>);
    } else {
      return (<Paper>
        <Toolbar>
          <Typography style={{
              position: 'absolute',
              left: 60
            }} variant="title" id="tableTitle">Offerings</Typography>
          {
            this.props.lin < 3
              ? (<div></div>)
              : (<Button style={{
                  position: 'absolute',
                  color: 'white',
                  backgroundColor: '#001489',
                  right: '5%'
                }} variant="contained" size="large" onClick={this.handleCreator}>
                Create new offering
              </Button>)
          }
        </Toolbar>
        <OfferDetails priv={this.props.lin}/>
      </Paper>);
    }
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(EnhancedTable);
