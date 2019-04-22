import React, { useState, useEffect, useContext } from 'react';

import './door-controls.css';
import Toast from '../toast/toast.js';
import { SignedInUserContext } from '../../contexts/signed-in-user.js';
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
    <tr {...props}>
      <td>{door.label}</td>
      <td>
        <button
          type="button"
          className="door-controls__open"
          onClick={openDoor}
        >
          Open Door
        </button>
      </td>
      <td>
        {message.length ? (
          <Toast clearMessage={clearMessage} style={customeToastStyle}>
            <p className="door-controls__feedback">{message}</p>
          </Toast>
        ) : null}
      </td>
    </tr>
  );
};

export default DoorControls;

// Extend the default toast styles a bit
const customeToastStyle = {
  padding: '6px 24px'
};
