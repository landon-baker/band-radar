import React from 'react';
import Event from './event';

const EventsContainer = ({ events }) => {
  return (
    <table>
      <thead>
        <th>Name</th>
        <th>Link</th>
        <th>Price</th>
      </thead>
      <tbody>
        {events.map(event => (
          <Event event={event} />
        ))}
      </tbody>
    </table>
  );
};

export default EventsContainer;
