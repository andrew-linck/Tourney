import qs from 'qs';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
const axios = require('axios');

class CreateTourney extends Component {
  constructor(){
    super();
    this.state = {
      tourneyName: "",
      redirect: false,
      logoutSummoner: false
    }
    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);
  }

  change = e => {
    this.setState({
      [e.target.name] : e.target.value
    });
  };

  logout = e => {
    e.preventDefault();
    this.setState({
      logoutSummoner: true
    });
  };

  submit = e => {
    e.preventDefault();
    this.setState({redirect: true})
  }

  render() {
    if (this.state.redirect && this.state.tourneyName) {
     return (
       <Redirect to={this.state.tourneyName} />
     )
   }
   if (this.state.logoutSummoner === true) {
     axios.post('/logout', qs.stringify(this.state))
     .then(res => { console.log(res.data);
      if(res.data === "logout") { console.log(res.data);
        window.location.reload();
      }
     })
   }
    return (
      <div className="Create-Tourney">
        <form onSubmit={this.submit}>
          tourney.link/<input type="text" className="feedback-input" onChange={this.change} name="tourneyName" value={this.state.tourneyName} />
          <input type="submit" className="feedback-input" value="Create Tourney" />
        </form>
        <form onSubmit={this.logout}>
          <input type="submit" className="feedback-input" value="Logout" />
        </form>
      </div>
    );
  }
}

export default CreateTourney;
