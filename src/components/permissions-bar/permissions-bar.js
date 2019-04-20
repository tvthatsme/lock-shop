import React, { useState } from 'react';

import DeleteablePill from '../deleteable-pill/deleteable-pill.js';
import CustomModal from '../modal/modal.js';

const PermissionsBar = ({ door, people, togglePersonsPermissions }) => {
  const [modalIsOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  // Create an array of people and their authorized state for this door
  const peopleWithAuthStates = people.map(person => {
    return {
      ...person,
      access: door.authenticated_users.includes(person.id)
    };
  });

  return (
    <>
      <div>
        <p style={{ margin: 0 }}>{door.label}</p>
        <div>
          {peopleWithAuthStates
            .filter(person => person.access)
            .map(person => (
              <DeleteablePill
                key={`${door.label}-${person.id}`}
                text={person.name}
                handleDelete={() =>
                  togglePersonsPermissions(door, person.id, false)
                }
              />
            ))}
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            edit
          </button>
        </div>
      </div>

      <CustomModal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <p>List of people with add and remove</p>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Access</th>
            </tr>
          </thead>
          <tbody>
            {peopleWithAuthStates.map(person => (
              <tr key={person.id}>
                <td>{person.name}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={person.access}
                    onChange={() =>
                      togglePersonsPermissions(door, person.id, !person.access)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <button type="button" onClick={closeModal}>
            Close
          </button>
        </div>
      </CustomModal>
    </>
  );
};

export default PermissionsBar;
