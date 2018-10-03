import React, { Component } from 'react';
import TeamMember from './TeamMember';

class TeamForTeamsPage extends Component {
  render() {
    let teamMember;
    if(this.props.team.players){
      teamMember = this.props.team.players.map(teamMember => {
        return (
          <TeamMember key={teamMember} teamMember={teamMember} />
        );
      });
    }

    return (
      <div className="Team">
        <strong>{this.props.team.teamName}</strong>
        <ul>
          {teamMember}
        </ul>
      </div>
    );
  }
}

export default TeamForTeamsPage;
