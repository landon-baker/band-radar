import React from 'react';
import Artist from './artist';

const Event = ({ event, getArtist }) => {
  const formatPrice = price => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };
  return (
    <tr>
      <td>
        <img src={event.images[0].url} width="100"></img>
        <div className="eventName">{event.name}</div>
        <div className="artistWrap">
          {event._embedded.attractions
            ? event._embedded.attractions.map(artist => {
                return (
                  <Artist artistName={artist.name} getArtist={getArtist} />
                );
              })
            : ''}
        </div>
      </td>
      <td>
        <a href={event._embedded.venues[0].url}>
          {event._embedded.venues[0].name}
        </a>
      </td>
      <td>
        <a href={event.url}>Link</a>
      </td>
      <td>
        {event.priceRanges
          ? `${formatPrice(event.priceRanges[0].min)}-${formatPrice(
              event.priceRanges[0].max
            )}`
          : 'N/A'}
      </td>
    </tr>
  );
};

export default Event;
