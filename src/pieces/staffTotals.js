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
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import LinearProgress from '@material-ui/core/LinearProgress';
import lime from '@material-ui/core/colors/lime';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import STE from './offer/OfferingsAssigned';
import CloseIcon from '@material-ui/icons/Close';
import URL from './ui/url.json'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#301615',
    color: theme.palette.common.white,
    fontSize: 14,
    textAlign: 'center',
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

});

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
      mew: false,
      open: true,
      staffSelect:[],
      load:true,
    };
  }

  handleROpen = (data, e) => {
    this.setState({ staffSelect: data, mew: true ,open:true});
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ load:true, mew:false, open: false });
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

  viewerClosed() {
    this.setState({load:true, mew: false});
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch(URL.url+'stafftotals')
    .then((response) => response.json())
    .then((responseJson) => {
        this.setState({ hits: responseJson, isLoading: false });
    })
}
  render() {
  const { classes } = this.props;

  const { load, staffSelect, mew, modee, isLoading, hits, order, orderBy, selected,} = this.state;


    return (
      <Paper>
        <Toolbar><Typography style={{position: 'absolute', left: 60}} variant="title" id="tableTitle">Staff totals</Typography>
        </Toolbar>



        {isLoading ? (<LinearProgress variant="query" />) :
        (<div className={classes.tableWrapper}>
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
                <Tooltip placement="left" TransitionComponent={Zoom} title="View staff info">
                    <TableRow key={n.id} data-item={n} onClick={this.handleROpen.bind(this, n)}>
                      <CustomTableCell style={{textAlign: 'center'}} component="th" scope="row"> {n.name}</CustomTableCell>
                      <CustomTableCell style={{textAlign: 'center'}} >{n.offerings_taken}</CustomTableCell>
                      <CustomTableCell style={{textAlign: 'center'}} >{n.target}</CustomTableCell>
                      <CustomTableCell style={{textAlign: 'center', color: n.total_load < 0.9* n.target? 'blue' : n.total_load > 1.1*n.target? 'red' :  'green'}}>{n.total_load}</CustomTableCell>
                      <CustomTableCell>{n.comments}</CustomTableCell>
                    </TableRow>
                    </Tooltip>
                  );
                })}
            </TableBody>
          </Table>
        </div>)}
        {mew ? (

        <Dialog
          open={this.state.open}
          scroll={this.state.scroll}
          aria-labelledby="scroll-dialog-title"
        >

        <DialogTitle style={{ background: 'linear-gradient(55deg, #fff9f9  10%, #fffef4 90%)'}}>
        <div style={{padding:1,}} >
        <Typography variant="subheading" gutterBottom noWrap>
         Offerings assigned to
          </Typography>

        <Typography  gutterBottom align="center" variant="display1">
        {staffSelect.name}
          </Typography>  </div>
<Button  variant="outlined" color="secondary"  style={{color: "#bf0000 ", position: 'absolute', top:'1%', right: '2%'}} onClick={this.handleClose.bind(this)}>
<CloseIcon/></Button>



</DialogTitle>
<DialogContent style={{padding:4, minWidth:400, background: 'linear-gradient(55deg, #e2e2e2  10%, #fdfff9 90%)',}}>
<DialogContentText>
            <STE staffD = {staffSelect}/>
        </DialogContentText>
        </DialogContent>
        </Dialog>

        ) : (<div></div>)}

      </Paper>
    );}
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
