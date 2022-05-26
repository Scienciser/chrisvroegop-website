import React from 'react';


export class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {fill: this.props.fill};
    }

    getFill() {
        return this.state.fill ? {backgroundColor:"red"} : {backgroundColor:"white"};
    }      

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.fill !== prevProps.fill) {
          this.setState({fill: this.props.fill});
        }
      }
      

    render() {
        return (
            <td style={this.getFill()}></td>
        );
    }
  }
  
  