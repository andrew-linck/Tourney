import React, { Component } from 'react';
import axios from 'axios';
import TeamMember from './TeamMember';
import { Redirect } from 'react-router-dom';

class Team extends Component {
  constructor(){
    super();
    this.state = {
      tourney: String,
      team: String,
      redirect: false
    }
  }

  getTeam() {
    axios.get(`/${this.props.params.tourney}/${this.props.params.team}`)
    .then(res => {
      if(res.data === "Log In First") {
        window.location.replace("http://18.218.234.246/")
      }
      const team = res.data;
      this.setState({ team });
    })
  }

  submit = e => {
    e.preventDefault();
    this.setState({redirect: true});
  }

  componentDidMount() {
    this.getTeam();
  }

  render() {
    if(this.state.redirect === true) {
      return (
        <Redirect to={"/" + this.props.params.tourney} />
      );
    }
    let teamMember;
    if(this.state.team.players){
      teamMember = this.state.team.players.map(teamMember => {
        return (
          <TeamMember key={teamMember} teamMember={teamMember} />
        );
      });
    }

    return (
      <div className="Team">
        <h1>tourney.link/{this.props.params.tourney}/{this.props.params.team}</h1>
        <ul>
          {teamMember}
        </ul>
        <form onSubmit={this.submit}>
          <input type="submit" value="back"/>
        </form>
      </div>
    );
  }
}

export default Team;
