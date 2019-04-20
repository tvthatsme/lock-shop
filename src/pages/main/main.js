// controls for the system

import React, { useContext } from 'react';

import Page from '../../components/page/page.js';
import UserSelector from '../../components/user-selector/user-selector.js';
import useGetAllDoors from '../../hooks/useGetAllDoors.js';
import { SignedInUserContext } from '../../context/signed-in-user.js';
import { events } from '../../api/index.js';

const Main = () => {
  const [doorsList] = useGetAllDoors();
  const { signedInUser } = useContext(SignedInUserContext);

  const openDoor = async doorId => {
    const success = await events.add({
      doorId,
      userId: signedInUser.id
    });
    console.log(success);
  };

  return (
    <Page>
      <h1>Main</h1>
      <UserSelector />
      {doorsList.map(door => {
        return (
          <div key={door.id}>
            <p>{door.label}</p>
            <button type="button" onClick={() => openDoor(door.id)}>
              Open
            </button>
          </div>
        );
      })}
    </Page>
  );
};

export default Main;
