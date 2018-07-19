import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { lighten } from '@material-ui/core/styles/colorManipulator';
//import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import LinearProgress from '@material-ui/core/LinearProgress';

import PatternActivities from './patternActivities';

import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';
import Zoom from '@material-ui/core/Zoom';

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
  { id: 'code', label: 'Pattern Code' },
  { id: 'short_desc',  label: 'Description' },
  { id: 'mode',  label: 'Mode' },
  { id: 'students',  label: 'Students per group' },
  { id: 'long_desc',  label: 'Long Description' }
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    return (
      <TableHead>
        <TableRow>          
          {columnData.map(column => {
            return (
              <CustomTableCell> {column.label}</CustomTableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: '#00838F',
          backgroundColor: lighten('#00838F', 0.8),
        }
      : {
          color: '#00838F',
          backgroundColor: '#00838F',
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: '#00838F',
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes } = props;
  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
          <Typography variant="title" id="tableTitle">
            Pattern
          </Typography> 
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

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

var url = 'http://immense-headland-42479.herokuapp.com/api/pattern';

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
      patcode: '',
    };
  }
  handleChange = () => {
    this.setState(state => ({ checked: !state.checked }));
  };

  handleROpen = (data, e) => {
    this.setState(state => ({
      patId: data.id, 
      patcode: data.code, 
      open: true, 
      patterAct: true
    }));
  };


  handleChange = event => {
    const patternID = this.state.patternData.find(item => item.code === event.target.value).id;
    sessionStorage.setItem('patternCode', event.target.value);
    sessionStorage.setItem('patternID', patternID);
    this.setState({ [event.target.name]: event.target.value });
};

handleClick = () => {
  this.setState(state => ({
    Copen: !state.open,
  }));
};

handleClickAway = () => {
  this.setState({
    Copen: false,
    patterAct: false,
  });
};

viewerClosed() {
  this.setState({
    currentCount: this.state.currentCount+1,
    patterAct: false
  }),
  console.log('rrrrr')
};
handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

componentDidMount() {
  var patternObj;
  fetch('http://immense-headland-42479.herokuapp.com/api/pattern', {
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
              patternObj = json;
              this.setState({
                  patternLoaded: true,
                  patternData: patternObj,
                  hits: json, 
                  isLoading: false,
              })
          });
      }
  });
}

  render() {
  const { classes } = this.props;
  const { patId, patcode, patternLoaded, patterAct, isLoading, hits} = this.state;
  if (isLoading) {
    return (
        <Paper className={this.state.classes.root}>
          <LinearProgress color="secondary" variant="query" />
        </Paper>
      )
  }
  if(patterAct){
    return(
      //<ClickAwayListener onClickAway={this.handleROpen} onClickAway={this.handleClickAway}>
        <Paper className={classes.root}> 
         <PatternActivities viewed={this.viewerClosed.bind(this)} Pid={patId} Pcode={patcode} />
        </Paper>
      //</ClickAwayListener>
    )
  }
  if(patternLoaded) {
    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar/>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead/>
            <TableBody>
              {hits
                .map(n => {
                  return ( 
                    <Tooltip placement="top-end" TransitionComponent={Zoom} title="View Pattern">                  
                    <TableRow key={n.id} data-item={n} onClick={this.handleROpen.bind(this, n)}>
                      <CustomTableCell component="th" scope="row">
                        {n.code}
                      </CustomTableCell>
                      <CustomTableCell>{n.description}</CustomTableCell>
                      <CustomTableCell>{n.mode}</CustomTableCell>
                      <CustomTableCell>{n.student_per_group}</CustomTableCell>
                      <CustomTableCell>{n.long_description }</CustomTableCell>
                    </TableRow>
                    </Tooltip>
                  );
                  
                })}
            </TableBody>
          </Table>
        </div>
      </Paper>
    );
  }
  else {
    return (
        <Paper>
        <LinearProgress color="secondary" variant="query" />
        </Paper>
    )
}
}
}

function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(EnhancedTable);