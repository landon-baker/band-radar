import React from 'react';
import SpotifyWebAPI from 'spotify-web-api-js';
import axios from 'axios';
import Login from './login';
import EventsContainer from './eventsContainer';
import M from 'materialize-css';
const Spotify = new SpotifyWebAPI();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const params = this.getHashParams();
    this.state = {
      loggedIn: !!params.access_token,
      artist: '',
      events: []
    };
    if (this.state.loggedIn) {
      Spotify.setAccessToken(params.access_token);
    }
    this.getArtist = this.getArtist.bind(this);
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

  async getArtist(e, artistQuery) {
    e.preventDefault();
    try {
      const result = await Spotify.searchArtists(artistQuery);
      const artist = result.artists.items[0];
      this.setState({ artist });
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.collapsible');
      var instances = M.Collapsible.init(elems);
    });
    this.getEvents();
  }

  render() {
    if (!this.state.loggedIn) {
      return <Login />;
    }
    return (
      <div className="container">
        <div className="main">
          <h2>Band Radar</h2>
          <EventsContainer
            events={this.state.events}
            getArtist={this.getArtist}
          />
        </div>
      </div>
    );
  }
}
