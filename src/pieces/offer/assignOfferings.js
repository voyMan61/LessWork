import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import LinearProgress from '@material-ui/core/LinearProgress';

import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import OfferEdit from './offerEditor.js'
import OfferViewer from './offerViewer.js'
import Button from '@material-ui/core/Button';
import URL from '../ui/url.json'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import SaveIcon from '@material-ui/icons/Save';

import classNames from 'classnames';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


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
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },

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
      da:[{}],
      d:null,
      h:null,
      staffLoaded: false,
      staffData: null,
      staffSelect:'',
      confirmed:null,
      loadD:null,
      catg:'',
      cotg:'',
      loadT:null,
      currentID:null,
      enrol:null,
      isloading:false,
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

handlecasual = name => event => {
  this.setState({catg: event.target.tutorial_to_casual})
};

handlecoord = name => event => {
  this.setState({cotg: event.target.tutorial_to_staff})
};

handleEnrolments = name => event => {
  this.setState({enrol: event.target.enrolment})
};


  handleConfirm = name => event => {
    console.log(event.target.id)
    this.setState({currentID:event.target.id, confirmed:event.target.checked});
 };


handleStaff = name => event => {

  this.setState({ loadT: event.target.value.target ,loadD: event.target.value.total_load, staffSelect:event.target.value});
};
  handleCreator = () => {
    console.log('create');
    this.setState({ creatorOpen: true });
  };

  creatorClosed() {
    this.setState({creatorOpen: false});
  };


componentDidMount() {
  var offerObj;
var staffObj;


fetch(URL.url+'stafftotals', {
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
            staffObj = json;
            this.setState({
                staffLoaded: true,
                staffData: staffObj
            })

        });
    }
});

  fetch(URL.url+'offering', {
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


    handleSubmit = (e) => {
      console.log(e)
        this.setState({ isloading: true });
        var n = JSON.stringify({
          confirm:this.state.confirmed,
        	enrolment:this.state.enrols,
        	tutorial_to_staff:this.state.cotg,
        	tutorial_to_casual:this.state.catg,
        	staff_id:this.state.staffSelect
        })
        console.log(this.state.currentID)

        e.preventDefault();

    };





  render() {
  const { classes } = this.props;
  const { currentID, catg, cotg, loadD, confirmed, staffSelect, staffData, staffLoaded, h, d, da, objectLoaded, oData, offerView, hits} = this.state;
  if(objectLoaded && staffLoaded) {
      return (
            <div>
    <Grid container spacing={24}>
                    {hits
                      .map(n => {
                        if(n.staff_id === null){
                        return (
                        <Grid item xs={3} spacing={40}>
                          <div >
                          <ExpansionPanel>
                            <ExpansionPanelSummary style={{ padding:5, flexGrow: 1,}}expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>{n.unit_code}</Typography>
                                        <Typography className={classes.secondaryHeading}> - {n.name}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails className={classes.details}>
                              <div style={{ textAlign:'center', alignItems:'center'}} >
                            <form onSubmit={this.handleSubmit}>
                              <p>confirm<Switch
                            checked={confirmed}
                            id={n.id}
                            onChange={this.handleConfirm()}
                            value={confirmed}
                            color="primary"
                          /></p>
                          <p>select staff
                          <Select
                          id={n.id}
                          value= {staffSelect}
                          onChange={this.handleStaff()}
                          input={<Input name="staff" id="age-auto-width"/>}
                          >
                          {staffData
                          .map(m => {
                          return (
                          <MenuItem value={m}>{m.name}</MenuItem>
                          );
                          })}
                          </Select>


                          </p>
                            <p>staff load </p>
                            <div>



//workload viz

                            </div>
                            <p>
                            <TextField
                                id={n.id}
                                label="Coordinator tutorial Groups"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                placeholder="0"
                                margin="normal"
                                onChange={this.handlecoord()}
                                value={cotg}
                            />

</p>

<p>
<TextField
    id={n.id}
    label="Casual tutorial Groups"
    InputLabelProps={{
        shrink: true,
    }}
    placeholder="0"
    margin="normal"
    onChange={this.handlecasual()}
    value={cotg}
/>

</p>


<p>
<TextField
    id={n.id}
    label="Enrolments"
    InputLabelProps={{
        shrink: true,
    }}
    placeholder="0"
    margin="normal"
    onChange={this.handleEnrolments()}
    value={cotg}
/>

</p>

                            <Button type="submit" variant="outlined" size="small" style={{ color: "#0f6600"}} >
                            <SaveIcon/> Save
                            </Button>
                            </form></div>
                            </ExpansionPanelDetails>
                            <Divider />
                            <ExpansionPanelActions>
                              <Button size="small">Cancel</Button>

                            </ExpansionPanelActions>


                          </ExpansionPanel>
                          </div>
                          </Grid>
                        );}
                      })}
                      </Grid>
                </div>
      );


    }

  else {
    return (
        <Paper>
        <LinearProgress/>
        </Paper>
    )
}
  }

}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(EnhancedTable);
