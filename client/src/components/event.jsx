import React from 'react';
import Artist from './artist';

const Event = ({ event, getArtist }) => {
  const formatPrice = price => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };
  const formatDate = date => {
    date = date.split('-');
    return `${date[1]}/${date[2]}`;
  };
  return (
    <li className="avatar">
      <div className="collapsible-header">
        <span className="eventDate">
          {formatDate(event.dates.start.localDate)}
        </span>
        <img className="eventPic" src={event.images[0].url} width="100"></img>
        <p className="artistVenueBlock">
          {event.name} <br></br>
          <a href={event._embedded.venues[0].url}>
            {event._embedded.venues[0].name}
          </a>
        </p>
        <p className="ticketPriceBlock">
          <a className="ticketLink" href={event.url}>
            Tickets
          </a>{' '}
          <br />
          <span className="priceRange">
            {event.priceRanges
              ? `${formatPrice(event.priceRanges[0].min)}-${formatPrice(
                  event.priceRanges[0].max
                )}`
              : 'N/A'}
          </span>
        </p>
      </div>
      <div className="collapsible-body artistWrap">
        {event._embedded.attractions
          ? event._embedded.attractions.map(artist => {
              return (
                <Artist
                  key={artist.id}
                  artistName={artist.name}
                  getArtist={getArtist}
                />
              );
            })
          : ''}
      </div>
    </li>
  );
};

export default Event;
