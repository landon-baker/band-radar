import React from 'react';
import Event from './event';
import { Collapsible, CollapsibleItem } from 'react-materialize';

const EventsContainer = ({ events, getArtist }) => {
  return (
    <div>
      {/* <Collapsible>
        <CollapsibleItem
          header="Better safe than sorry. That's my motto."
          icon="filter_drama"
        >
          Better safe than sorry. That's my motto.
        </CollapsibleItem>
        <CollapsibleItem
          header="Yeah, you do seem to have a littl"
          icon="place"
        >
          Yeah, you do seem to have a little ction going.
        </CollapsibleItem>
        <CollapsibleItem
          header="You know, FYI, you can buy a paddle. Did you not p…"
          icon="whatshot"
        >
          You know, FYI, you can buy a paddle. Did you not plan for this
          contingency?
        </CollapsibleItem>
      </Collapsible> */}
      <ul className="collapsible">
        {events.map(event => (
          <Event key={event.id} event={event} getArtist={getArtist} />
        ))}
      </ul>
    </div>
  );
};

export default EventsContainer;
