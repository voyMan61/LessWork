class Counter extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      currentCount: 0
    }
  }
  
  // Basic parent increment handler
  increment() {
    this.setState({
      currentCount: this.state.currentCount+1
    })
  }
  
  // Basic parent decrement handler
  decrement() {
    this.setState({
      currentCount: this.state.currentCount-1
    })
  }
  
  render() {
    // Here we are passing references to the increment and decrement functions to our child components as props. 
    return(
      <div>
        <h2>Current Count: {this.state.currentCount}</h2>
        <Increment increment={this.increment.bind(this)} />
        <Decrement decrement={this.decrement.bind(this)} />
      </div>
    );
  }
}

class Increment extends React.Component {
  // This allows us to change the state of the parent component when we click the button in the child component using this.props.increment
  render() {
    return(
      <button onClick={this.props.increment}>Higher</button>
    );
  }
}

class Decrement extends React.Component {
  // And again for this.props.decrement
  render() {
    return(
      <button onClick={this.props.decrement}>Lower</button>
    );
  }
}

ReactDOM.render(<Counter />, document.getElementById('app'));