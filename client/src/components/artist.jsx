import React from 'react';

const Artist = ({ artistName, getArtist }) => {
  return (
    <a className="artistLink" onClick={e => getArtist(artistName, e)}>
      {artistName}
    </a>
  );
};

export default Artist;
