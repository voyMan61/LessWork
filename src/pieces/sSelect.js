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

import OfferingsAssigned from './offer/OfferingsAssigned.js';
import URL from './ui/url.json'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class Sselect extends React.Component {

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
mits:false,
key:1,
}
}

handleStaffChange = event => {
        this.forceUpdate();
        this.setState({ mits: false, log: true, staffSelect: event.target.value });
        console.log(event.target.value);
      };
      handleStaffBChange = event => {
        this.forceUpdate();
        this.setState({ key: this.state.key+1,mits: true, log: true, staffSelect: event.target.value });
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
    fetch(URL.url+'stafftotals')
    .then((response) => response.json())
    .then((responseJson) => {
        this.setState({ hits: responseJson, isLoading: false });
    })

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
const{mits, hits, staffSelect,log} = this.state;
        return(
        <div >
        <form  autoComplete="off">
        <FormControl>
        <InputLabel htmlFor="age-auto-width"> {staffSelect.name}</InputLabel>
        <Select
        value= {this.props.value}
        onChange={this.props.onChangeValue}
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
        </div>
);

}
}


export default Sselect
