import React, { useState, useEffect, useContext } from 'react';

import Toast from '../toast/toast.js';
import { SignedInUserContext } from '../../context/signed-in-user.js';
import { events } from '../../api/index.js';

const DoorControls = ({ door, ...props }) => {
  const [message, setMessage] = useState('');
  const { signedInUser } = useContext(SignedInUserContext);

  // Load the control with no message and reset if the user changes
  useEffect(() => {
    clearMessage();
  }, [signedInUser]);

  // Clear out the message (removes toast from showing)
  const clearMessage = () => {
    setMessage('');
  };

  // Attempt to open the door and provide the user with feedback
  const openDoor = async () => {
    const success = await events.add({
      doorId: door.id,
      userId: signedInUser.id
    });

    // Determine a message to show the user based on the response
    const displayMessage = success
      ? `Successfully opened door! Come on in...`
      : `Sorry, you don't have permission to open this door.`;
    setMessage(displayMessage);
  };

  return (
    <div {...props}>
      <p>{door.label}</p>
      <Toast clearMessage={clearMessage}>
        <p>{message}</p>
      </Toast>
      <button type="button" onClick={openDoor}>
        Open
      </button>
    </div>
  );
};

export default DoorControls;
