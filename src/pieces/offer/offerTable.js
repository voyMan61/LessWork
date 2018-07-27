import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import OfferViewer from './offerViewer.js'
import URL from '../ui/url.json'

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#301615',
    color: theme.palette.common.white,
    fontSize: 14,
    textAlign: 'center'
  },
  body: {
    fontSize: 12
  }
}))(TableCell);

const columnData = [
  {
    id: 'Unit Code',
    label: 'Unit Code'
  }, {
    id: 'Name',
    label: 'Name'
  }, {
    id: 'Enrolled',
    label: 'Enrolled'
  }, {
    id: 'Patter',
    label: 'Pattern code'
  }, {
    id: 'Type',
    label: 'Type'
  }, {
    id: 'Staff',
    label: 'Staff'
  }
];

class EnhancedTableHead extends React.Component {
  render() {
    return (<TableHead>
      <TableRow>
        {
          columnData.map(column => {
            return (<CustomTableCell>{column.label}</CustomTableCell>);
          })
        }
      </TableRow>
    </TableHead>);
  }
}

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
      staffDe: [],
      offerView: false,
      objectLoaded: false,
      creatorOpen: false,
      staffLoaded: false
    };
  }

  handleChange = () => {
    this.setState(state => ({
      checked: !state.checked
    }));
  };

  handleROpen = (data, e) => {
    this.setState(state => ({oData: data, open: true, offerView: true}));
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  viewerClosed() {
    this.setState({
      currentCount: this.state.currentCount + 1,
      offerView: false
    })
  };

  handleCreator = () => {
    console.log('create');
    this.setState({creatorOpen: true});
  };

  creatorClosed() {
    this.setState({creatorOpen: false});
  };

  componentDidMount() {
    var offerObj;
    fetch(URL.url + 'stafftotals').then((response) => response.json()).then((responseJson) => {
      this.setState({staffLoaded: true, staffDe: responseJson});
    })
    fetch(URL.url + 'offering', {
      //mode: 'no-cors',
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    },).then(response => {
      if (response.ok) {
        response.json().then(json => {
          offerObj = json;
          this.setState({objectLoaded: true, patternData: offerObj, hits: offerObj, isLoading: false})
        });
      }
    });
  }

  render() {
    const {classes} = this.props;
    const {
      objectLoaded,
      oData,
      offerView,
      hits,
      staffDe,
      staffLoaded
    } = this.state;
    if (objectLoaded && staffLoaded) {
      return (<div className={classes.tableWrapper}>
        <Table className={classes.table} aria-labelledby="tableTitle">
          <EnhancedTableHead/>
          <TableBody>
            {
              hits.map(n => {
                if (n.confirm && n.enrolment > 0) {
                  return (<Tooltip placement="left" TransitionComponent={Zoom} title="View offering">
                    <TableRow key={n.id} data-item={n} onClick={this.handleROpen.bind(this, n)}>
                      <CustomTableCell style={{
                          textAlign: 'center'
                        }} component="th" scope="row">{n.unit_code}</CustomTableCell>
                      <CustomTableCell >{n.name}</CustomTableCell>
                      <CustomTableCell style={{
                          textAlign: 'center'
                        }}>{n.enrolment}</CustomTableCell>
                      <CustomTableCell style={{
                          textAlign: 'center'
                        }}>{n.pattern_code}</CustomTableCell>
                      <CustomTableCell style={{
                          textAlign: 'center'
                        }}>{n.type}</CustomTableCell>
                      <CustomTableCell style={{
                          textAlign: 'center'
                        }}>
                        {
                          staffDe.map(m => {
                            if (n.staff_id === m.id) {
                              return (m.name)
                            }
                          })
                        }
                      </CustomTableCell>
                    </TableRow>
                  </Tooltip>);
                }
              })
            }
          </TableBody>
        </Table>
        {
          offerView
            ? (<OfferViewer epriv={this.props.priv} viewed={this.viewerClosed.bind(this)} od={oData}/>)
            : (<div></div>)
        }
      </div>);
    } else {
      return (<Paper>
        <LinearProgress variant="query"/>
      </Paper>)
    }
  }

}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(EnhancedTable);
