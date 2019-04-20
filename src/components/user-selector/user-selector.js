import React, { useState, useEffect, useContext } from 'react';

import Selector from '../selector/selector.js';
import { SignedInUserContext } from '../../context/signed-in-user.js';
import { people } from '../../api/index.js';

/**
 * Provide context to selector to enable viewing and updating the currently
 * 'signed in' user
 */
const UserSelector = () => {
  const { signedInUser, setSignedInUser } = useContext(SignedInUserContext);
  const [currentSignedIn, setCurrentSignedIn] = useState(signedInUser);
  const [users, setUsers] = useState([]);

  // Get all the users on mount/update
  useEffect(() => {
    getAllUsers();
  }, []);

  // Update the local state when context updates
  useEffect(() => {
    setCurrentSignedIn(signedInUser);
  }, [signedInUser]);

  // Format items according to the format that selector expects
  const items = users.map(user => {
    return {
      id: user.id,
      label: user.name
    };
  });

  const getAllUsers = async () => {
    const users = await people.getAll();
    setUsers(users);
  };

  const handleSelect = id => {
    setSignedInUser(users.find(user => id === user.id));
  };

  return (
    <Selector
      items={items}
      onSelect={handleSelect}
      selectedItem={currentSignedIn.name}
    />
  );
};

export default UserSelector;
