import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import LinearProgress from '@material-ui/core/LinearProgress';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import lime from '@material-ui/core/colors/lime';
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';
import Zoom from '@material-ui/core/Zoom';
import STE from './staffView.js';

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
  { id: 'Name', label: 'Staff Name' },
  { id: 'offerings_taken',  label: 'Offerings Taken ' },
  { id: 'target',  label: 'Target ' },
  { id: 'total_load',  label: 'Total Load' },
  { id: 'Comments',  label: 'Comments' }
];

class EnhancedTableHead extends React.Component {
  render() {
    return (
      <TableHead style={{color: 'white'}}>
        <TableRow>          
          {columnData.map(column => {
            return (
              <CustomTableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
              >
                    {column.label}

              </CustomTableCell>
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
  spacer: {
    flex: '1 1 100%',
  },

  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes } = props;
  return (
    <Toolbar
      className={classNames(classes.tolo, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
          <Typography variant="title" id="tableTitle">
            Staff Totals
          </Typography> 
      </div>
      <div className={classes.spacer} />
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
    marginTop: theme.spacing.unit * 2,
  },
  table: {
    minWidth: 1000,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  red:{
    backgroundColor: 'red',
  },
  default:{

  },
  paper: {
    margin: theme.spacing.unit,
    position: 'absolute',
    width: theme.spacing.unit * 150,
    height: theme.spacing.unit * 50,
    backgroundColor: 'theme.palette.background.paper',
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

var url = 'http://immense-headland-42479.herokuapp.com/api/stafftotals';

class EnhancedTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      checked: false,
      selected: [],
      hits: [],
      fet: 'false',
      load: 'red',
    };
  }

  handleROpen = (data, e) => {
    console.log( data.name); 
  };
  
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };


  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';
    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }
    this.setState({ order, orderBy });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;
  
  componentDidMount() {
    this.setState({ isLoading: true });
    var f = [];
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
        this.setState({ hits: responseJson, isLoading: false });

    }) 
}
  render() {
  const { classes } = this.props;
  const { load, modee, mod, open, checked, isLoading, hits, fet, data, order, orderBy, selected, rowsPerPage, expanded } = this.state;
  if (isLoading) {
    return (
      <Paper>
      <LinearProgress style={{ color: lime[500] }}  variant="query" />
      </Paper>
  );
  }
  if(modee){
    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="title" id="modal-title">
              Text in a modal
            </Typography>
            <Typography variant="subheading" id="simple-modal-description">
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </div>
        </Modal>
      </div>
    );
  }
  else {
    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              rowCount={hits.length}
            />     
        <TableBody>
              {hits
                .map(n => {
                  return (     

                <Tooltip placement="top-end" TransitionComponent={Zoom} title="View staff info">   
                    <TableRow key={n.id} data-item={n} onClick={this.handleROpen.bind(this, n)}>
                      <CustomTableCell component="th" scope="row"> {n.name}</CustomTableCell>                    
                      <CustomTableCell >{n.offerings_taken}</CustomTableCell>
                      <CustomTableCell>{n.target}</CustomTableCell>
                      <CustomTableCell style={{color: n.total_load < 0.9* n.target? 'blue' : n.total_load > 1.1*n.target? 'red' :  'green'}}>{n.total_load}</CustomTableCell>
                      <CustomTableCell>{n.comments}</CustomTableCell>
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