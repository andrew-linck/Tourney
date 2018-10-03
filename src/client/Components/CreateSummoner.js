import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import CreateTourney from './CreateTourney';

class CreateSummoner extends Component {
  constructor(props){
    super(props);
    this.state = {
      summonerNameCreate: this.props.summoner,
      password: "",
      passwordConfirm: "",
      submit: false
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
      this.setState({submit: true})
    })
  }

  render() {
    if(this.state.submit === true) {
      return (<CreateTourney summoner={this.state.summonerNameCreate} />)
    }
    return (
    <div className="Create">
      <form onSubmit={this.submit}>
        <input name="summonerNameCreate" type="hidden" value={this.state.summonerNameCreate} />
        <input name="password" type="password" className="feedback-input" placeholder="Password" value={this.state.password} onChange={this.change} required />
        <input name="passwordConfirm" type="password" className="feedback-input" placeholder="Confirm Password" value={this.state.passwordConfirm} onChange={this.change} required />
        <input type="submit" className="ghost-input" value="Join Tourney" />
      </form>
    </div>
    );
  }
}

export default CreateSummoner;
