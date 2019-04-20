import React, { useState, useEffect } from 'react';

import useGetArray from '../hooks/useGetArray.js';
import { people } from '../api/index.js';

export const SignedInUserContext = React.createContext();

export const SignedInUserProvider = ({ children }) => {
  // Get the list of users in the system so that we can have a default
  // signed in user.
  // NOTE: For a real app, it would be okay to not have a default but for
  // this demo it makes things a little nicer.
  const [peopleList] = useGetArray(people.getAll);

  // Because the 'peopleList' is initally an empty array, we don't have any
  // user data to set as the default for a signed-in user.
  const [signedInUser, setSignedInUser] = useState({});

  // However, if we listen for when 'peopleList' changes, we can update the
  // signedInUser once we get back the full 'peopleList'. This effect will
  // only be triggered twice on app load if the provider is a top-most
  // component. We can also check before setting the signed in user to make
  // sure that any valid user signed in is not overwritten.
  useEffect(() => {
    if (peopleList.length && signedInUser.isAdmin === undefined) {
      // When setting a default signed-in user, use the first user in the
      // database.
      setSignedInUser(peopleList[0]);
    }
  }, [peopleList]);

  // Create the context object to provide
  const context = {
    signedInUser,
    setSignedInUser
  };

  return (
    <SignedInUserContext.Provider value={context}>
      {children}
    </SignedInUserContext.Provider>
  );
};
