import React from 'react';
import Event from './event';

const EventsContainer = ({ events, getArtist }) => {
  return (
    <ul className="collapsible">
      {events.map(event => (
        <Event key={event.id} event={event} getArtist={getArtist} />
      ))}
    </ul>
  );
};

export default EventsContainer;
