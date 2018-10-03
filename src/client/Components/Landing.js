import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import Verify from './Verify';
import CreateTourney from './CreateTourney';

class Landing extends Component {
  constructor(){
    super();
    this.state = {
      loginSummoner: "",
      loginPassword: "",
      summonerNameJoin: "",
      summonerIconJoin: 1,
      submit: false,
      loginError: "",
      session: false
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
    console.log(this.state);
    e.preventDefault();
    axios.post('/', qs.stringify(this.state))
    .then(res => {
      this.setState({summonerIconJoin: res.data.icon})
      this.setState({submit: true})
      if (res.data === "session") {
        this.setState({session: true})
      }
    })
  }

  login = e => {
    e.preventDefault();
    axios.post('/login', qs.stringify(this.state))
    .then(res => {
      if (res.data === "session") {
        this.setState({session: true})
      }
      if (res.data === "Join First") {
        this.setState({loginError: "Join First"})
      }
    })
  }

  render() {
      if(this.state.session === true) {
        return (<CreateTourney />)
      }
      if(this.state.submit === true & this.state.session === false) {
        return (
          <Verify summoner={this.state.summonerNameJoin} icon={this.state.summonerIconJoin}/>
        )
      }
      if(this.state.session === false) {
        return (
          <div className="Landing">
            <header className="App-header">
              <h1 className="App-title">Welcome to Supreme Tournaments</h1>
            </header>
            <form onSubmit={this.submit}>
              <input name="summonerNameJoin" type="text" className="feedback-input" value={this.state.summonerNameJoin} placeholder="Enter Your Summoner Name" required onChange={this.change} />
              <input type="submit" className="feedback-input" value="Sign Up" />
            </form>
            <hr id="Landing-Hr"/>
            <form onSubmit={this.login}>
              <input type="text" name="loginSummoner" placeholder="Summoner" className="feedback-input" value={this.state.loginSummoner} onChange={this.change} required />
              <input type="password" name="loginPassword" placeholder="Password" className="feedback-input" value={this.state.loginPassword} onChange={this.change} required />
              <input type="submit" value="Login" className="feedback-input" />
            </form>
            {this.state.loginError}
          </div>
        );
      }
  }
}

export default Landing;
