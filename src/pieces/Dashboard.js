import React from 'react';
import Barchart from './ui/Bar';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Assigner from './offer/assignOfferings.js'
import OfferingsAssigned from './offer/OfferingsAssigned.js';
import URL from './ui/url.json'

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.handleRefresh = this.handleRefresh.bind(this)
    this.state = {
      chartData: {},
      staffData: {},
      classes: this.props.classes,
      staffD: [],
      hits: [],
      staffSelect: [],
      log: false,
      mits: false,
      key: 1,
      costData: [],
      refresh: 2
    }
  }
  handleRefresh(e) {
    e.preventDefault()
  }
  handleToUpdate = (someArg) => {
    alert('Offering Assigned');
    this.setState({refresh: 1})
  }

  handleStaffChange = event => {
    this.forceUpdate();
    this.setState({mits: false, log: true, staffSelect: event.target.value});
  };
  handleStaffBChange = event => {
    this.forceUpdate();
    this.setState({
      key: this.state.key + 1,
      mits: true,
      log: true,
      staffSelect: event.target.value
    });
  };
  componentDidMount() {
    var obj;
    var myData = [];
    var myLabel = [];
    var myTarget = [];
    var costObj;
    //http://localhost:3000/Staff.json
    //http://localhost:5000/api/stafftotals
    //http://arcane-cove-45625.herokuapp.com/api/stafftotals
    //http://immense-headland-42479.herokuapp.com/api/stafftotals

    fetch(URL.url + 'costing', {
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
          costObj = json;
          this.setState({costLoaded: true, costData: costObj})
        });
      }
    });

    this.setState({isLoading: true});
    fetch(URL.url + 'stafftotals').then((response) => response.json()).then((responseJson) => {
      this.setState({hits: responseJson, isLoading: false});
    })

    fetch(URL.url + 'stafftotals', {
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

          obj = json;

          for (var i = 0; i < obj.length; i++) {
            myLabel.push(obj[i].name)
            myData.push(obj[i].total_load)
            myTarget.push(obj[i].target)
          }

          this.setState({loaded: true})
        });
      } else {
        throw Error(response.statusText);
      }
    }).catch(function(error) {
      console.log(error);
    });
  }

  render() {
    const {costData, hits, staffSelect, log, refresh} = this.state;
    if (this.props.lin === 1) {
      return (<Paper style={{
          height: '100%'
        }}>
        <Toolbar>
          <Typography style={{
              position: 'absolute',
              left: '5%'
            }} variant="title" id="tableTitle">
            Dashboard
          </Typography>
          <Typography style={{
              marginLeft: 33,
              position: 'absolute',
              left: '15%'
            }} variant="contained" size="large" color="secondary">
            {this.props.sid.name}</Typography>
          <Typography style={{
              position: 'fixed',
              right: '6%'
            }} variant="contained" size="large" color="secondary"></Typography>
        </Toolbar>
        <div style={{
            padding: '5%'
          }}>
          <Barchart chartData={this.state.chartData}/></div>
        <div style={{
            maxHeight: '33%'
          }}>
          <Toolbar>
            <Typography variant="title">Offerings
            </Typography>
          </Toolbar>
          <OfferingsAssigned key={this.props.sid} staffD={this.props.sid}/></div>

      </Paper>);
    }
    //this.props.lin === 5
    if (true && refresh >= 1) {
      return (<Paper key={refresh}>
        <Toolbar>
          <Typography style={{
              position: 'absolute',
              left: '5%'
            }} variant="title" id="tableTitle">
            Dashboard
          </Typography>
        </Toolbar>

        <div style={{
            position: 'relative',
            padding: '5%'
          }}>
          <Barchart chartData={this.state.chartData}/></div>

        <div style={{
            alignItems: 'center',
            padding: '5%'
          }}>
          <Card style={{
              background: 'linear-gradient(55deg, #ede8e8  10%, #e2e2e2 90%)'
            }}>
            <CardContent >
              <Typography variant="headline" gutterBottom="gutterBottom">
                Costs
              </Typography>

              <Typography variant="subheading" style={{
                  textAlign: 'center'
                }} gutterBottom="gutterBottom">
                Total casual Load: {costData.total_casual_load}&emsp;&emsp;&emsp;&emsp; Total billable hours: {costData.total_billable_hours}&emsp;&emsp;&emsp;&emsp; Total Cost: {costData.total_cost}
              </Typography>
            </CardContent >
          </Card >
        </div>

        <div style={{
            alignItems: 'center',
            padding: '5%'
          }}>
          <Card style={{
              background: 'linear-gradient(55deg, #ede8e8  10%, #e2e2e2 90%)'
            }}>
            <CardContent >
              <Typography variant="headline" gutterBottom="gutterBottom">
                Offerings to be assigned
              </Typography>
              <Assigner handleToUpdate={this.handleToUpdate}/>
            </CardContent >
          </Card >
        </div>

      </Paper>);
    } else {
      return (<Paper>
        <Toolbar>
          <Typography style={{
              position: 'absolute',
              left: '5%'
            }} variant="title" id="tableTitle">
            Dashboard</Typography>
          <Typography style={{
              position: 'absolute',
              left: '15%'
            }} variant="contained" size="large" color="secondary">
            {staffSelect.name}</Typography>
          <Typography style={{
              position: 'fixed',
              right: '6%'
            }} variant="contained" size="large" color="secondary"></Typography>
        </Toolbar>
        <div style={{
            display: 'flex',
            justifyContent: 'center'
          }}>
          <Barchart chartData={this.state.chartData}/></div>
      </Paper>);
    }

  }
}

export default Dashboard
