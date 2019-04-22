import React from 'react';

import Page from '../components/page/page.js';
import PermissionsBar from '../components/permissions-bar/permissions-bar.js';
import useGetArray from '../hooks/useGetArray.js';
import { doors, people } from '../api/index.js';
import { SettingsIcon } from '../icons/index.js';

const Admin = () => {
  const [doorsList, refreshDoorsList] = useGetArray(doors.getAll);
  const [peopleList] = useGetArray(people.getAll);

  const togglePersonsPermissions = async (
    doorObject,
    userId,
    addingNewAuth
  ) => {
    // Create a new array of authenticated users for the door
    let updatedAuth = [];
    if (addingNewAuth) {
      updatedAuth = [...doorObject.authenticated_users, userId];
    } else {
      updatedAuth = doorObject.authenticated_users.filter(id => id !== userId);
    }

    // Send the request to modify door permissions and update the list once
    // there is a response.
    await doors.modify(doorObject.id, {
      ...doorObject,
      authenticated_users: updatedAuth
    });
    refreshDoorsList();
  };

  return (
    <Page>
      <h1>
        <SettingsIcon height={40} width={40} className="header-icon" />
        Admin
      </h1>
      <h2>Give your users access</h2>
      <p className="help-text">
        Get a quick overview of who has access to each door or set fine-grain
        permissions by clicking the "Edit Access" button on an individual door.
      </p>
      {doorsList.map(door => (
        <PermissionsBar
          key={door.id}
          door={door}
          people={peopleList}
          togglePersonsPermissions={togglePersonsPermissions}
        />
      ))}
    </Page>
  );
};

export default Admin;
