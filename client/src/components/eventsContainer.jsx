import React from 'react';
import Event from './event';

const EventsContainer = ({ events, getArtist }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Venue</th>
          <th>Link</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {events.map(event => (
          <Event event={event} getArtist={getArtist} />
        ))}
      </tbody>
    </table>
  );
};

export default EventsContainer;
