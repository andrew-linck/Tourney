import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


class CreateTeam extends Component {
  constructor(props){
    super(props);
    this.state = {
      tourneyName: this.props.tourney,
      teamName: "",
      redirect: false
    }
  }

  change = e => {
    this.setState({
      [e.target.name] : e.target.value
    });
  }

  submit = e => {
    e.preventDefault();
    this.setState({redirect: true})
  }

  render() {
    if(this.state.redirect === true) {
      return (
          <Redirect to={this.props.tourney + "/" + this.state.teamName} />
      );
    }
    return (
      <div className="">
        <form onSubmit={this.submit}>
          <input name="teamName" type="text" className="feedback-input" placeholder="Team Name" value={this.state.teamName} onChange={this.change} tourney={this.props.tourney}  required />
          <input type="submit" className="feedback-input" value="Create Team" />
        </form>
      </div>
    );
  }
}

export default CreateTeam;
