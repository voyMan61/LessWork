import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import Toolbar from '@material-ui/core/Toolbar';
import purple from '@material-ui/core/colors/deepPurple';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};


class SimpleCard1 extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            offeringLoaded: false,
            locationLoaded: false,
            periodLoaded: false,
            staffOfferingLoaded: false,
            patternLoaded: false,
            offeringData: this.props.offeringData,
            locationData: this.props.locationData,
            periodData: this.props.periodData,
            staffOfferingData: this.props.staffOfferingData,
            patternData: this.props.patternData,
            classes: this.props.classes,
            loaded:false,

        }

    }

    componentDidMount() {
        var offeringObj;
        var locationObj;
        var periodObj;
        var staffOfferingObj;
        var patternObj;


        //http://localhost:3000/Staff/14.json
        //http://localhost:5000/api/offering
        //http://arcane-cove-45625.herokuapp.com/api/offering
        //http://immense-headland-42479.herokuapp.com/api/offering
        fetch('http://immense-headland-42479.herokuapp.com/api/offering', {
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
                    offeringObj = json;
                    this.setState({
                        offeringLoaded: true,
                        offeringData: offeringObj,
                    })

                });
            }
        });

        fetch('http://immense-headland-42479.herokuapp.com/api/offeringlookup/' + this.props.staffD.id, {
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
                    staffOfferingObj = json;
                    this.setState({
                        staffOfferingLoaded: true,
                        staffOfferingData: staffOfferingObj,

                    })

                });
            }
        });

        fetch('http://immense-headland-42479.herokuapp.com/api/location', {
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
                    locationObj = json;
                    this.setState({
                        locationLoaded: true,
                        locationData: locationObj
                    })

                });
            }
        });


        fetch('http://immense-headland-42479.herokuapp.com/api/period', {
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
                    periodObj = json;
                    this.setState({
                        periodLoaded: true,
                        periodData: periodObj,

                    })


                });
            }
        });

        fetch('http://immense-headland-42479.herokuapp.com/api/pattern', {
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
                    patternObj = json;
                    this.setState({
                        patternLoaded: true,
                        patternData: patternObj,

                    })


                });
            }
        });


    }
    savePattern = value => {
        console.log(value);
    };


    render() {

        if (this.state.offeringLoaded === true && this.state.locationLoaded === true && this.state.staffOfferingLoaded === true && this.state.periodLoaded === true) {

            var singleOffering = this.state.offeringData.find(item => item.staff_id === this.props.staffD.id);

            const data1 = this.state.staffOfferingData.map((data) => {
                var loc = this.state.locationData.find(item => item.id === singleOffering.location_id).name;
                var periodCode = this.state.periodData.find(item => item.id === data.period_id).code;
                //var period_code = Promise.all(fetchPeriod(data.location_id, data.period_id))

                //this.fetchPeriod(data.location_id, data.period_ID)
                //console.log(this.state.period_code);

                return (
                    <div style={{display:'flex',alignItems: 'center', padding: '1%', }} key={data.id}>
      <Card style={{  background: 'linear-gradient(90deg, #e2e2e2  10%, #fdfff9 90%)', }}>
              <CardContent>
                                <Typography variant="display1" component="p">
                                    {singleOffering.unit_code}
                                </Typography>
                                <Typography variant="headline" component="p">
                                  {singleOffering.name}
                                </Typography>
                                <Typography component="p">
                                    {loc} | {periodCode} | {singleOffering.pattern_code}
                                </Typography>
                            </CardContent>
                        </Card>
                    </div >
                )
            });
            return (
                <div style={{ padding: '2%', }}>
                    {data1}
                </div>
                );
        }
        else {
            return (
                <div style={{alignItems: 'center', padding: '1%', justifyContent: 'center'}}>
              <Card className="Bar" style={{ background: 'linear-gradient(155deg, #e2e2e2  10%, #fdfff9 90%)', }}>
              <CardContent >
              <CircularProgress  size={'40%'} style={{ position: 'relative', bottom:'5%', left: '35%', color: purple[700] }} thickness={0.3} />
              </CardContent>
              </Card></div>
            )
        }
    }
}





export default withStyles(styles)(SimpleCard1)
