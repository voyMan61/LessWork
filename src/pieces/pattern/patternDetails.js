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

import PatternActivities from './patternActivities';
import URL from '../ui/url.json'

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#301615',
    color: theme.palette.common.white,
    fontSize: 14
  },
  body: {
    fontSize: 12
  }
}))(TableCell);

const columnData = [
  {
    id: 'code',
    label: 'Pattern Code'
  }, {
    id: 'short_desc',
    label: 'Description'
  }, {
    id: 'mode',
    label: 'Mode'
  }, {
    id: 'students',
    label: 'Students per group'
  }, {
    id: 'long_desc',
    label: 'Long Description'
  }
];

class EnhancedTableHead extends React.Component {

  render() {
    return (<TableHead >
      <TableRow>
        {
          columnData.map(column => {
            return (<CustomTableCell style={{
                textAlign: 'center'
              }}>
              {column.label}</CustomTableCell>);
          }, this)
        }
      </TableRow>
    </TableHead>);
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

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
      mod: '',
      open: false,
      hits: [],
      fet: 'false',
      patternLoaded: false,
      Copen: false,
      patterAct: false,
      patId: 0,
      patcode: ''
    };
  }
  handleChange = () => {
    this.setState(state => ({
      checked: !state.checked
    }));
  };

  handleROpen = (data, e) => {
    this.setState(state => ({patId: data.id, patcode: data.code, open: true, patterAct: true}));
  };

  handleChange = event => {
    const patternID = this.state.patternData.find(item => item.code === event.target.value).id;
    sessionStorage.setItem('patternCode', event.target.value);
    sessionStorage.setItem('patternID', patternID);
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleClick = () => {
    this.setState(state => ({
      Copen: !state.open
    }));
  };

  handleClickAway = () => {
    this.setState({Copen: false, patterAct: false});
  };

  viewerClosed() {
    this.setState({
      currentCount: this.state.currentCount + 1,
      patterAct: false
    });
  };
  handleOpen = () => {
    this.setState({open: true});
  };
  handleClose = () => {
    this.setState({open: false});
  };

  componentDidMount() {
    var patternObj;
    fetch(URL.url + 'pattern', {
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
          patternObj = json;
          this.setState({patternLoaded: true, patternData: patternObj, hits: json, isLoading: false})
        });
      }
    });
  }

  render() {
    const {classes} = this.props;
    const {
      patId,
      patcode,
      patternLoaded,
      patterAct,
      isLoading,
      hits
    } = this.state;
    if (isLoading) {
      return (<Paper className={this.state.classes.root}>
        <LinearProgress color="secondary" variant="query"/>
      </Paper>)
    }
    if (patterAct) {
      return (
      <Paper className={classes.root}>
        <PatternActivities viewed={this.viewerClosed.bind(this)} Pid={patId} Pcode={patcode}/>
      </Paper>);
    }
    if (patternLoaded) {
      return (<Paper>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead/>
            <TableBody>
<<<<<<< HEAD
              {hits.map(n => {
                  if (n.id > 25 || n.id < 11) {
                    return (<Tooltip placement="left" TransitionComponent={Zoom} title="View Pattern">
                      <TableRow key={n.id} data-item={n} onClick={this.handleROpen.bind(this, n)}>
                        <CustomTableCell style={{
                            textAlign: 'center'
                          }} component="th" scope="row">
                          {n.code}
                        </CustomTableCell>
                        <CustomTableCell style={{
                            width: '20%'
                          }}>{n.description}</CustomTableCell>
                        <CustomTableCell style={{
                            textAlign: 'center'
                          }}>{n.mode}</CustomTableCell>
                        <CustomTableCell style={{
                            textAlign: 'center'
                          }}>{n.student_per_group}</CustomTableCell>
                        <CustomTableCell style={{
                            width: '35%'
                          }}>
                          {n.long_description}</CustomTableCell>
                      </TableRow>
                    </Tooltip>);
                  }

                })
              }
=======
              {hits
                .map(n => {
                    if(n.id>225 || n.id<11 ){
                  return (
                    <Tooltip placement="left" TransitionComponent={Zoom} title="View Pattern">
                    <TableRow key={n.id} data-item={n} onClick={this.handleROpen.bind(this, n)}>
                      <CustomTableCell style={{textAlign: 'center'}} component="th" scope="row">
                        {n.code}
                      </CustomTableCell>
                      <CustomTableCell style={ {width:'20%'}}>{n.description}</CustomTableCell>
                      <CustomTableCell style={{textAlign: 'center'}}>{n.mode}</CustomTableCell>
                      <CustomTableCell style={{textAlign: 'center'}}>{n.student_per_group}</CustomTableCell>
                      <CustomTableCell style={ {width:'35%'}}> {n.long_description }</CustomTableCell>
                    </TableRow>
                    </Tooltip>
                  );}
                })}
>>>>>>> 21c2f9c4e3563c9063c85436cfb7be8d5c1d26c1
            </TableBody>
          </Table>
        </div>
      </Paper>);
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
