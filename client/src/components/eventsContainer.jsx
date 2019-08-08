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
      <ul className="collapsible">
        {this.props.events.map(event => (
          <Event
            key={event.id}
            event={event}
            getArtist={this.props.getArtist}
          />
        ))}
      </ul>
    );
  }
}
