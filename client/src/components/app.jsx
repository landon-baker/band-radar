import React from 'react';
import SpotifyWebAPI from 'spotify-web-api-js';
import axios from 'axios';
import Login from './login';
import EventsContainer from './eventsContainer';
const Spotify = new SpotifyWebAPI();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const params = this.getHashParams();
    this.state = {
      loggedIn: !!params.access_token,
      user: '',
      events: []
    };
    if (this.state.loggedIn) {
      Spotify.setAccessToken(params.access_token);
    }
  }

  getHashParams() {
    const hashParams = {};
    let e;
    let r = /([^&;=]+)=?([^&;]*)/g;
    let q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  async getEvents() {
    let results = await axios.get(`http://localhost:3008/api/events`);
    const {
      data: { events }
    } = results;
    this.setState({ events });
  }

  getUser() {
    Spotify.getMe().then(results => this.setState({ user: results }));
  }

  render() {
    if (!this.state.loggedIn) {
      return <Login />;
    } else {
      return (
        <div className="wrapper">
          <div className="main">
            <h2>Band Radar</h2>
            <button onClick={() => this.getUser()}>Get User</button>
            <button onClick={() => this.getEvents()}>
              Get TicketMaster Events
            </button>
            <EventsContainer events={this.state.events} />
          </div>
        </div>
      );
    }
  }
}
