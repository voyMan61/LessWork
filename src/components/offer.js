import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';

import LinearProgress from '@material-ui/core/LinearProgress';

import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import OfferMake from './offer/offerConf.js'
import OfferCreator from './offer/offerCreator.js'
import Button from '@material-ui/core/Button';
import OfferDetails from './offer/offerTable'


const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#301615',
    color: theme.palette.common.white,
    fontSize: 14,
  },
  body: {
    fontSize: 12,
  },
}))(TableCell);


const columnData = [
  { id: 'Unit Code',  label: 'Unit Code' },
  { id: 'Name', label: 'Name' },
  { id: 'Enrolled',  label: 'Enrolled' },
  { id: 'Patter',  label: 'Pattern code' },
  { id: 'Type',  label: 'Type' }
];

class EnhancedTableHead extends React.Component {
  render() {
    return (
      <TableHead>
        <TableRow>          
          {columnData.map(column => {
            return (
              <CustomTableCell>{column.label}</CustomTableCell>
            );
          })}
        </TableRow>
      </TableHead>
    );
  }
}


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  paper: {
    margin: theme.spacing.unit,
    position: 'absolute',
    width: theme.spacing.unit * 150,
    height: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },

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
      creatorOpen: false,
    };
  }
  handleChange = () => {
    this.setState(state => ({ checked: !state.checked }));
  };


 
  handleROpen = (data, e) => {
    this.setState(state => ({
      oData: data, 
      open: true, 
      offerView: true
    }));
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };


  viewerClosed() {
    this.setState({
      currentCount: this.state.currentCount+1,
      offerView: false
    })
  };

  handleCreator = () => {
    this.setState({ creatorOpen: true });
  };

  creatorClosed() {
    this.setState({creatorOpen: false});
  };

  
componentDidMount() {
  var offerObj;
  fetch('http://immense-headland-42479.herokuapp.com/api/offering', {
      //mode: 'no-cors',
      method: 'GET',
      headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
      },
  },
  ).then(response => {
      if (response.ok) {
          response.json().then(json => {
            offerObj = json;
              this.setState({
                objectLoaded: true,
                  patternData: offerObj,
                  hits: offerObj, 
                  isLoading: false,
              })
          });
      }
  });
}
render() {
    const { creatorOpen} = this.state;
  
    if(creatorOpen){
        return(
          <Paper>
            <Toolbar><Typography style={{position: 'absolute', left: 60}} variant="title" id="tableTitle">Offering</Typography></Toolbar>
            <OfferCreator cclosed={this.creatorClosed.bind(this)}/>
            <OfferDetails/>
          </Paper>
        );}
    else{
      return (
          <Paper>
          <Toolbar><Typography style={{position: 'absolute', left: 60}} variant="title" id="tableTitle">Offerings</Typography> 
            <Button style={{position: 'absolute', color: 'white', backgroundColor: '#001489', right: 60}} variant="contained" size="large" onClick={this.handleCreator}>
              Create new offering
            </Button>
          </Toolbar>
          <OfferDetails/>
          </Paper>
        );
  
      }
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(EnhancedTable);