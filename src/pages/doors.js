import React, { useState } from 'react';

import Page from '../components/page/page.js';
import { doors } from '../api/index.js';
import useGetArray from '../hooks/useGetArray.js';
import { TrashcanIcon, KeyIcon } from '../icons/index.js';

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
      <h1>
        <KeyIcon height={40} width={40} className="header-icon" />
        Doors
      </h1>

      <div className="limited-width">
        <h2>Add a new door</h2>
        <p className="help-text">
          All new doors are automatically authorized for the admin user.
          Additional users can be added from the admin page.
        </p>
        <form onSubmit={addNewDoor} autoComplete="off">
          <label htmlFor="new-door">Door name</label>
          <div className="form-row">
            <input
              id="new-door"
              type="text"
              value={doorName}
              onChange={event => setDoorName(event.target.value)}
            />
            <button type="submit" className="form-submit">
              Add
            </button>
          </div>
        </form>
      </div>

      <h2>All doors in the system</h2>
      <p className="help-text">
        To see the full details on who has access to each individual door,
        please visit the admin page.
      </p>
      <div className="table-wrapper">
        <table>
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
                <td>
                  {door.authenticated_users.length}{' '}
                  {door.authenticated_users.length > 1 ? 'people' : 'person'}
                </td>
                <td>
                  <button
                    type="button"
                    className="table-button"
                    title={`Remove ${door.label} from system`}
                    onClick={() => removeDoor(door.id)}
                  >
                    <TrashcanIcon height={18} width={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Page>
  );
};

export default Doors;
