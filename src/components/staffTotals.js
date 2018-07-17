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
import Tooltip from '@material-ui/core/Tooltip'; 
import { lighten } from '@material-ui/core/styles/colorManipulator';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';


import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import STE from './staffView.js';


const columnData = [
  { id: 'Name', label: 'Staff Name' },
  { id: 'offerings_taken',  label: 'Offerings Taken ' },
  { id: 'target',  label: 'Target ' },
  { id: 'total_load',  label: 'Total Load' },
  { id: 'Comments',  label: 'Comments' }
];

class EnhancedTableHead extends React.Component {
  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;
    return (
      <TableHead>
        <TableRow>          
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
              >
                  <TableSortLabel>
                    {column.label}
                  </TableSortLabel>

              </TableCell>
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
    //const it = e.currentTarget('data-item');
    //console.log(it.name)
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
        console.table(responseJson);
        //document.write("<h3>",url,"</h3>");
        this.setState({ hits: responseJson, isLoading: false });

    }) 
}
  render() {
  const { classes } = this.props;
  const { load, modee, mod, open, checked, isLoading, hits, fet, data, order, orderBy, selected, rowsPerPage, expanded } = this.state;
  console.table(hits);
  if (isLoading) {
    return (
    <p>Loading ...</p>
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
                    <TableRow key={n.id} data-item={n} onClick={this.handleROpen.bind(this, n)}>
                      <TableCell component="th" scope="row"> {n.name}</TableCell>                    
                      <TableCell >{n.offerings_taken}</TableCell>
                      <TableCell>{n.target}</TableCell>
                      <TableCell style={{color: n.total_load < 0.9* n.target? 'blue' : n.total_load > 1.1*n.target? 'red' :  'green'}}>{n.total_load}</TableCell>
                      <TableCell>{n.comments}</TableCell>
                    </TableRow>
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