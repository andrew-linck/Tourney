import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Teams from './Components/Teams';
import Team from './Components/Team';
import Landing from './Components/Landing';
import CreateTourney from './Components/CreateTourney';
import axios from 'axios';
import qs from 'qs';
import './App.css'

class App extends Component {
  constructor(){
    super();
    this.state = {
      display: 'landing',
      loginSummoner: "",
      loginPassword: "",
      summonerNameJoin: "",
      summonerIconJoin: 1,
      submit: false,
      loginError: "",
      session: false
    }
  }

  componentDidMount() {
    axios.post('/', qs.stringify(this.state))
    .then(res => {
      if (res.data === "session") {
        this.setState({session: true})
      }
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" exact render={(state) => (
            this.state.session === true
            ? <CreateTourney />
            : <Landing  />
          )} />
          <Route path="/:tourney" exact render={({match}) => (
            <Teams params={match.params}/> )} />
          <Route path="/:tourney/:team" render={({match}) => (
            <Team params={match.params}/> )} />
        </div>
      </Router>
    );
  }
}

export default App;
