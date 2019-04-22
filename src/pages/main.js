import React from 'react';

import Page from '../components/page/page.js';
import UserSelector from '../components/user-selector/user-selector.js';
import DoorControls from '../components/door-controls/door-controls.js';
import useGetArray from '../hooks/useGetArray.js';
import { doors } from '../api/index.js';
import { HomeIcon } from '../icons/index.js';

const Main = () => {
  const [doorsList] = useGetArray(doors.getAll);

  return (
    <Page>
      <h1>
        <HomeIcon height={40} width={40} className="header-icon" />
        Home
      </h1>
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
    </Page>
  );
};

export default Main;
