import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import CreateSummoner from './CreateSummoner';

class Verify extends Component {
  constructor(props){
    super(props);
    this.state = {
      summonerNameVerify: this.props.summoner,
      summonerIconVerify: this.props.icon,
      verify: false,
      verifyError: ""
    }
    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);
  }

  change = e => {
    this.setState({
      [e.target.name] : e.target.value
    });
  };

  submit = e => {
    e.preventDefault();
    axios.post('/', qs.stringify(this.state))
    .then(res => {
      if(res.data === "changed") {
        this.setState({verify: true})
      }
      if(res.data === "not changed") {
        this.setState({verifyError: res.data})
      }
    })
  }

  render() {
    if(this.state.verify === true) {
      return (
        <CreateSummoner summoner={this.state.summonerNameVerify} icon={this.state.summonerIconVerify}/>
      );
    }
    return (
      <div className="Verify">
        <form onSubmit={this.submit}>
          <input type="submit" className="feedback-input" value="Verify" />
        </form>
        {this.state.verifyError}
      </div>
    );
  }
}

export default Verify;
