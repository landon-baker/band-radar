import React from 'react';
import SpotifyWebAPI from 'spotify-web-api-js';
const Spotify = new SpotifyWebAPI();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const params = this.getHashParams();
    this.state = {
      foo: 'bar',
      loggedIn: !!params.access_token,
      user: ''
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

  getUser() {
    Spotify.getMe().then(results => this.setState({ user: results }));
  }

  render() {
    if (!this.state.loggedIn) {
      return (
        <form action="http://localhost:8888/login" method="get">
          <button type="submit">Login with Spotify</button>
        </form>
      );
    } else {
      return (
        <div className="wrapper">
          <div className="main">
            <h2>Hello from React App Component!</h2>
            <h3>If you see this, that means</h3>
            <ul>
              <li>Server is running</li>
              <li>Webpack ran successfully</li>
              <li>CSS and JS are bundled together</li>
            </ul>
            <h3>Happy Hacking!</h3>
            <button onClick={() => this.getUser()}>Get User</button>
          </div>
        </div>
      );
    }
  }
}
