import React from 'react';

import Page from '../components/page/page.js';
import PageHeader from '../components/page-header/page-header.js';
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
      <PageHeader Icon={SettingsIcon}>Admin</PageHeader>
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

      {/* Give the user some hints if there is nothing shown on this page */}
      {doorsList.length < 1 && (
        <p className="notice-text">
          You haven't added any doors to the system yet. Get started on the
          doors page and then come back here to set permissions.
        </p>
      )}
    </Page>
  );
};

export default Admin;
