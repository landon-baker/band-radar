import React from 'react';
import M from 'materialize-css';
import Event from './event';

export default class EventsContainer extends React.Component {
  componentDidMount() {
    const elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems);
  }

  render() {
    return (
      <div className="">
        <ul className="collapsible">
          {this.props.events.map(event => (
            <Event
              key={event.id}
              event={event}
              getArtist={this.props.getArtist}
            />
          ))}
        </ul>
        <span className="footer">
          Powered by{' '}
          <a className="footerLink" href="https://www.ticketmaster.com/">
            Ticketmaster
          </a>{' '}
          and{' '}
          <a className="footerLink" href="https://www.spotify.com/us/">
            Spotify
          </a>
        </span>
      </div>
    );
  }
}
