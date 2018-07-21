import React from 'react';
import { Bar } from 'react-chartjs-2';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/deepPurple';

class BarExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: this.props.chartData,
      loaded: false
    }
  }
  componentDidMount() {
    var obj;
    var myData = [];
    var myLabel = [];
    var myTarget = [];
    //http://localhost:3000/Staff.json
    //http://localhost:5000/api/stafftotals
    //http://arcane-cove-45625.herokuapp.com/api/stafftotals
    //http://immense-headland-42479.herokuapp.com/api/stafftotals
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
            chartData: {
              displayName: 'BarChart',
              labels: myLabel,
              //labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
              datasets: [
                {
                  label: 'Total Load',
                  backgroundColor: 'rgba(54, 162, 235, 0.2)',
                  borderColor: 'rgba(54, 162, 235,1)',
                  borderWidth: 1,
                  hoverBackgroundColor: 'rgba(54, 162, 235,0.4)',
                  hoverBorderColor: 'rgba(54, 162, 235,1)',
                  data: myData,
                  //data: [99, 59, 80, 81, 56, 55, 40]
                }, {
                  label: 'Target',
                  backgroundColor: 'rgba(255,99,132,0.2)',
                  borderColor: 'rgba(255,99,132,1)',
                  borderWidth: 1,
                  hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                  hoverBorderColor: 'rgba(255,99,132,1)',
                  data: myTarget,

                  //data: [65, 59, 80, 81, 56, 55, 40]
                }
              ]
            }
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
      <Card className="Bar" style={{ background: 'linear-gradient(55deg, #e2e2e2  10%, #fdfff9 90%)', minHeight: '25%', maxHeight: '25%', minWidth: '40%', maxWidth: '40%'}}>
        <Toolbar><Typography style={{position: 'absolute', left: '6%'}} variant="title">WorkLoad Distribution Graph</Typography> </Toolbar>
              <CardContent> 
        {!this.state.loaded && <CircularProgress size={'55%'} style={{  color: purple[700] }} thickness={0.1} /> } {this.state.loaded &&
          
          <Bar
            data={this.state.chartData}
            width={10}
            height={300}
            options={{
              maintainAspectRatio: false,
              scales: {
                yAxes: [{
                  display: true,
                  ticks: {
                    beginAtZero: true
                  }
                }],
                xAxes: [{
                  display: true,
                }]
              }
            }}
          />}
</CardContent>
      </Card> 
    )

  }
}


export default BarExample
