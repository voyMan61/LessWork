import React from 'react';
import BarExample from './Bar';
import DeanButton from './DeanButton';
import OfferingsAssigned from './OfferingsAssigned';
import Avatars from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
    
if (sessionStorage.getItem('mydata') || sessionStorage.getItem('name')) {
        var username = sessionStorage.getItem('name')
}
class Dashboard extends React.Component {

        constructor(props) {
                super(props);
                this.state = {
                        chartData: {},
                        staffData: {},
                        classes: this.props.classes
                }
        }
        componentDidMount() {
                var obj;
                var myData = [];
                var myLabel = [];
                var myTarget = [];
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
        return (
        <Paper>
        <div>
        Dashboard - Viewing as {username} 
        <Avatars/>
        </div>
        <BarExample chartData={this.state.chartData} />
        <br />
        <OfferingsAssigned staffData={this.state.staffData} />
        <br />

        </Paper>

        )
        }
        }



export default Dashboard