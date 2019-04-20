// admin page for doors

import React, { useState } from 'react';

import Page from '../../components/page/page.js';
import { doors } from '../../api/index.js';
import useGetArray from '../../hooks/useGetArray.js';

const Doors = () => {
  const [doorsList, refreshDoorsList] = useGetArray(doors.getAll);
  const [doorName, setDoorName] = useState('');

  // Add new door to the system
  const addNewDoor = async event => {
    event.preventDefault();
    setDoorName('');
    await doors.add({ label: doorName });
    refreshDoorsList();
  };

  // Remove door from the system
  const removeDoor = async id => {
    await doors.remove(id);
    refreshDoorsList();
  };

  return (
    <Page>
      <h1>Doors</h1>

      <form onSubmit={addNewDoor}>
        <p>Add a new door</p>
        <label htmlFor="new-door">Door name</label>
        <input
          id="new-door"
          type="text"
          value={doorName}
          onChange={event => setDoorName(event.target.value)}
        />
        <button>Add</button>
      </form>

      <table>
        <caption>All doors in the system</caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>Accessible to</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {doorsList.map(door => (
            <tr key={door.id}>
              <td>{door.label}</td>
              <td>{door.authenticated_users.length}</td>
              <td>
                <button type="button" onClick={() => removeDoor(door.id)}>
                  x
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Page>
  );
};

export default Doors;
