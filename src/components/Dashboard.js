import React from 'react';
import BarExample from './Bar';
import DeanButton from './DeanButton';
import OfferingsAssigned from './OfferingsAssigned';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Toolbar from '@material-ui/core/Toolbar';
import classNames from 'classnames';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import Sticon from '@material-ui/icons/Sms';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import { lighten } from '@material-ui/core/styles/colorManipulator';


import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';



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

render() {       log
const{hits, staffSelect,log} = this.state;
const { classes } = this.props;


if(log){
        return(
                <Paper>
               
        <Toolbar>
            <Typography style={{position: 'absolute', left: 60}} variant="title" id="tableTitle">
                Dashboard
            </Typography> 
                <Typography style={{position: 'absolute', right: 60}} variant="contained" size="large" color="secondary" >
                {staffSelect.name}
                </Typography>
    </Toolbar>
                <OfferingsAssigned staffD = {staffSelect} />
                <BarExample chartData={this.state.chartData} />
                </Paper>
        );
}
return (
        <Paper>

        <Toolbar>
            
            <Typography style={{position: 'absolute', left: 60}} variant="title" id="tableTitle">
                Dashboard
            </Typography> 

                <Typography style={{position: 'absolute', right: 60}} variant="contained" size="large" color="secondary" >
                <form  autoComplete="off">
        <FormControl>
        <InputLabel htmlFor="age-auto-width">Staff</InputLabel>
        <Select
        value={this.state.staVa}
        onChange={this.handleStaffChange}
        input={<Input name="staff" id="age-auto-width" />}
        >
        {hits
        .map(n => {
        return (    
        <MenuItem value={n}>{n.name}</MenuItem>
        );
        })}
        </Select>
        <FormHelperText>select user</FormHelperText>
        </FormControl>
        </form>
                </Typography>
    </Toolbar>
        <BarExample chartData={this.state.chartData} />


      </Paper>

)
}
}



export default Dashboard