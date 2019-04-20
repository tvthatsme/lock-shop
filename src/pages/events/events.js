// a listing of all the events on the system

import React from 'react';
import format from 'date-fns/format';

import Page from '../../components/page/page.js';
import useGetArray from '../../hooks/useGetArray.js';
import { events, people, doors } from '../../api/index.js';

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
      <h1>Events</h1>
      <table>
        <thead>
          <tr>
            <td>Door</td>
            <td>Person</td>
            <td>Time</td>
            <td>Authorized</td>
          </tr>
        </thead>
        <tbody>
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
    </Page>
  );
};

export default Events;
