import React from 'react';
import format from 'date-fns/format';

import Page from '../components/page/page.js';
import useGetArray from '../hooks/useGetArray.js';
import { events, people, doors } from '../api/index.js';
import { EventsIcon } from '../icons/index.js';

const Events = () => {
  const [eventsList] = useGetArray(events.getAll);
  const [peopleList] = useGetArray(people.getAll);
  const [doorsList] = useGetArray(doors.getAll);

  // Function to get the display name for the door
  const getDoorName = id => {
    const doorObject = doorsList.find(door => door.id === id);
    return doorObject ? doorObject.label : '';
  };

  // Function to get the display name for the person
  const getPersonName = id => {
    const personObject = peopleList.find(person => person.id === id);
    return personObject ? personObject.name : '';
  };

  // Function to format the time stamp
  const formatDate = dateString => {
    return format(new Date(dateString), 'HH:mm:ss DD MMM YYYY');
  };

  // Sort the list with the newest events at the top
  const sortedList = [...eventsList].reverse();

  return (
    <Page>
      <h1>
        <EventsIcon height={40} width={40} className="header-icon" />
        Events
      </h1>
      <h2>See who's been here</h2>
      <p className="help-text">
        This table provides an overview of all access requests for doors in the
        system. Both authorized and rejected requests are logged here.
      </p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Door</th>
              <th>Person</th>
              <th>Time</th>
              <th>Authorized</th>
            </tr>
          </thead>
          <tbody style={eventsStyles}>
            {sortedList.map(event => {
              return (
                <tr key={event.id}>
                  <td>{getDoorName(event.doorId)}</td>
                  <td>{getPersonName(event.userId)}</td>
                  <td>{formatDate(event.time)}</td>
                  <td>{event.authorized.toString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Give the user some hints if there is nothing shown on this page */}
      {sortedList.length < 1 && (
        <p className="notice-text">
          Looks like there aren't any events yet. Once we have some activity to
          show, it will appear here.
        </p>
      )}
    </Page>
  );
};

export default Events;

// Add a custom style to events to make the data more readable
const eventsStyles = {
  fontFamily: `source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace`
};
