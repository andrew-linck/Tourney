import React, { Component } from 'react';

class TeamMember extends Component {
  render() {
    return (
      <li className="Member">
        {this.props.teamMember}
      </li>
    );
  }
}

export default TeamMember;
