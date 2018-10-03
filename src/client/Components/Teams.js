import React, { Component } from 'react';
import axios from 'axios'
import TeamForTeamsPage from './TeamForTeamsPage';
import CreateTeam from './CreateTeam';


class Teams extends Component {
  constructor(){
    super();
    this.state = {
      teams: [],
      tourney: String
    }
  }

  getTeams() {
    axios.get(`/${this.props.params.tourney}`)
    .then(res => {
      if(res.data === "Log In First") {
        window.location.replace("http://18.218.234.246/")
      }
      const teams = res.data;
      this.setState({ teams });
    })
  }

  componentWillMount() {
    this.setState({tourney: this.props.params.tourney})
    this.getTeams()
  }

  render() {
    let teams;
    if(this.state.teams){
      teams = this.state.teams.map(team => {
        return (
          <TeamForTeamsPage key={team._id} params={this.props.params} team={team} />
        );
      });
    }

    return (
      <div className="Teams">
        <h1>tourney.link/{this.state.tourney}</h1>
        <CreateTeam tourney={this.state.tourney} />
        <h3>Teams</h3>
          <ul>
            {teams}
          </ul>
          <hr id="Teams"/>
          <h1>Info</h1>
          <h3>Saturday September 27th</h3>
          <p>8pm est. 5pm pst. 6pm mst.</p>
          <h3>Single-Elimination(One Life)</h3>
          <p>Semi-Finals: Best of 3</p>
          <p>Finals: Best of 5</p>
      </div>
    );
  }
}

export default Teams;
