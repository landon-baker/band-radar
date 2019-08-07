import React from 'react';

const Artist = ({ artistName, getArtist }) => {
  return (
    <a className="artistLink" onClick={e => getArtist(e, artistName)}>
      {artistName}
    </a>
  );
};

export default Artist;
