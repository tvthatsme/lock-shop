import React from 'react';

import Page from '../components/page/page.js';
import PageHeader from '../components/page-header/page-header.js';
import UserSelector from '../components/user-selector/user-selector.js';
import DoorControls from '../components/door-controls/door-controls.js';
import useGetArray from '../hooks/useGetArray.js';
import { doors } from '../api/index.js';
import { HomeIcon } from '../icons/index.js';

const Main = () => {
  const [doorsList] = useGetArray(doors.getAll);

  return (
    <Page>
      <PageHeader Icon={HomeIcon}>Home</PageHeader>
      <div className="limited-width">
        <h2>Select a user</h2>
        <p className="help-text">
          This is the fake login section that would be better handled with a
          real backend in place. Routes in the navigation are also dependent on
          what user is selected here.
        </p>
        <UserSelector />
      </div>

      <h2>Open doors</h2>
      <p className="help-text">
        Below is a listing of all the doors on the system. Open any of them as
        you please.
      </p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th width={'20%'}>Door</th>
              <th width={'20%'}>Controls</th>
              <th width={'60%'}>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {doorsList.map(door => (
              <DoorControls door={door} key={door.id} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Give the user some hints if there is nothing shown on this page */}
      {doorsList.length < 1 && (
        <p className="notice-text">
          Looks like there aren't any doors added to the system yet. Your
          administer needs to add doors before you can unlock anything.
        </p>
      )}
    </Page>
  );
};

export default Main;
