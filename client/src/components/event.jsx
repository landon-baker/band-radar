import React from 'react';

const Event = ({ event }) => {
  return (
    <tr>
      <td>{event.name}</td>
      <td>
        <a href={event.url}>Link</a>
      </td>
      <td>
        {event.priceRanges
          ? `$${event.priceRanges[0].min}-${event.priceRanges[0].max}`
          : 'N/A'}
      </td>
    </tr>
  );
};

export default Event;
