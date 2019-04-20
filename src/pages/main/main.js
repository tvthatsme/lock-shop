// controls for the system

import React from 'react';

import Page from '../../components/page/page.js';
import UserSelector from '../../components/user-selector/user-selector.js';

const Main = () => {
  return (
    <Page>
      <h1>Main</h1>
      <UserSelector />
    </Page>
  );
};

export default Main;
