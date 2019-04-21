// controls for the system

import React from 'react';

import Page from '../../components/page/page.js';
import UserSelector from '../../components/user-selector/user-selector.js';
import DoorControls from '../../components/door-controls/door-controls.js';
import useGetArray from '../../hooks/useGetArray.js';
import { doors } from '../../api/index.js';

const Main = () => {
  const [doorsList] = useGetArray(doors.getAll);

  return (
    <Page>
      <h1>Main</h1>
      <UserSelector />
      {doorsList.map(door => (
        <DoorControls door={door} key={door.id} />
      ))}
    </Page>
  );
};

export default Main;
