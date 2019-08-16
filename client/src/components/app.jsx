import React from 'react';
import SpotifyWebAPI from 'spotify-web-api-js';
import axios from 'axios';
import Login from './login';
import EventsContainer from './eventsContainer';
import SpotifyPlayer from 'react-spotify-web-playback';
import radarGif from '../../dist/radar.gif';
const Spotify = new SpotifyWebAPI();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const params = this.getHashParams();
    this.state = {
      loggedIn: !!params.access_token,
      artist: '',
      params,
      events: [],
      current: '',
      spotifyUris: [],
      topTracks: ''
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
    window.location.hash = '';
    return hashParams;
  }

  async getEvents() {
    let results = await axios.get(`/projects/bandradar/api/events`);
    const {
      data: { events }
    } = results;
    await this.setState({ events });
    this.getArtist(this.state.events[0]._embedded.attractions[0].name);
  }

  async getArtist(artistQuery, e) {
    if (e) {
      e.preventDefault();
    }
    try {
      const result = await Spotify.searchArtists(artistQuery);
      const artist = result.artists.items[0];
      const topTracks = await Spotify.getArtistTopTracks(artist.id, 'US');
      const spotifyUris = topTracks.tracks.map(track => track.uri);
      this.setState({ artist, spotifyUris });
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    this.getEvents();
  }

  createPlayer(uris) {
    return (
      <SpotifyPlayer
        token={this.state.params.access_token}
        uris={uris}
        name={'Band Radar Player'}
        magnifySliderOnHover={false}
        showSaveIcon={true}
        autoPlay={false}
        play={false}
      />
    );
  }

  render() {
    if (!this.state.loggedIn && this.state.events.length > 0) {
      return <Login />;
    }
    if (this.state.events.length === 0) {
      return <img className="loadingGif" src={radarGif} />;
    }
    return (
      <div>
        <form
          className="logout"
          action="https://spotify.com/logout"
          method="get"
        >
          <button className="btn" type="submit">
            Logout
          </button>
        </form>
        <div className="container">
          <div className="main">
            <h2 className="logo">Band Radar</h2>
            <h6 className="tagLine">scope out talent headed your way</h6>
            <EventsContainer
              events={this.state.events}
              getArtist={this.getArtist}
            />
          </div>
        </div>
        <div className="player">
          {this.createPlayer(this.state.spotifyUris)}
        </div>
      </div>
    );
  }
}
