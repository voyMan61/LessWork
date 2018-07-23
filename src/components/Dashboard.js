import React from 'react';
import Barchart from './Bar';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import MenuItem from '@material-ui/core/MenuItem';

import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import OfferingsAssigned from './offer/OfferingsAssigned.js';


class Dashboard extends React.Component {

constructor(props) {
super(props);
this.state = {
chartData: {},
staffData: {},
classes: this.props.classes,
staffD:[],
hits:[],
staffSelect:[],
log: false,
}
}

handleStaffChange = event => {
        this.forceUpdate();
        this.setState({ log: true, staffSelect: event.target.value });
        console.log(event.target.value);
      };
componentDidMount() {
var obj;
var myData = [];
var myLabel = [];
var myTarget = [];
//http://localhost:3000/Staff.json
//http://localhost:5000/api/stafftotals
//http://arcane-cove-45625.herokuapp.com/api/stafftotals
//http://immense-headland-42479.herokuapp.com/api/stafftotals




this.setState({ isLoading: true });
    fetch('http://immense-headland-42479.herokuapp.com/api/stafftotals')
    .then((response) => response.json())
    .then((responseJson) => {
        this.setState({ hits: responseJson, isLoading: false });
    }) 

fetch('http://immense-headland-42479.herokuapp.com/api/stafftotals', {
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

obj = json;

for (var i = 0; i < obj.length; i++) {
        myLabel.push(obj[i].name)
        myData.push(obj[i].total_load)
        myTarget.push(obj[i].target)
}

this.setState({
        loaded: true,
})
});
} else {
throw Error(response.statusText);
}
}).catch(function (error) {
console.log(error);
});
}

render() {    
const{hits, staffSelect,log} = this.state;
        return(
        <Paper >
        <Toolbar><Typography style={{position: 'absolute', left: '5%'}} variant="title" id="tableTitle">
                Dashboard</Typography> <Typography style={{position: 'absolute', left: '15%'}} variant="contained" size="large" color="secondary" >
                {staffSelect.name}</Typography>
        <Typography style={{position: 'fixed', right: '6%'}} variant="contained" size="large" color="secondary" >
        <form  autoComplete="off">
        <FormControl>
        <InputLabel htmlFor="age-auto-width"> {staffSelect.name}</InputLabel>
        <Select
        value={this.state.staVa}
        onChange={this.handleStaffChange}
        input={<Input name="staff" id="age-auto-width"/>}
        >
        {hits
        .map(n => {
        return (    
        <MenuItem value={n}>{n.name}</MenuItem>
        );
        })}
        </Select>
        <FormHelperText>select staff</FormHelperText>
        </FormControl>
        </form>
        </Typography>
                </Toolbar>
        <div style={{display: 'flex', justifyContent: 'center',}}>
        <Barchart  chartData={this.state.chartData} /></div>
        {log ? (<div style={{padding: 33, display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center',  justifyContent: 'center', alignItems: 'center',  justifyContent: 'center'}}><OfferingsAssigned staffD = {staffSelect}/></div>) : (<div>k</div>)}
        </Paper>         
);
}
}



export default Dashboard