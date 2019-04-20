// admin page for connecting doors with people

import React from 'react';

import Page from '../../components/page/page.js';
import PermissionsBar from '../../components/permissions-bar/permissions-bar.js';
import useGetArray from '../../hooks/useGetArray.js';
import { doors, people } from '../../api/index.js';

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
      <h1>Admin</h1>
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
