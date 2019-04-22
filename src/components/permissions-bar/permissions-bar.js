import React from 'react';

import './permissions-bar.css';
import DeleteablePill from '../deleteable-pill/deleteable-pill.js';
import CustomModal, { useModalState } from '../modal/modal.js';
import PermissionsTable from '../permissions-table/permissions-table.js';

const PermissionsBar = ({ door, people, togglePersonsPermissions }) => {
  const [modalIsOpen, openModal, closeModal] = useModalState();

  // Create an array of people and their authorized state for this door
  const peopleWithAuthStates = people.map(person => {
    return {
      ...person,
      access: door.authenticated_users.includes(person.id)
    };
  });

  return (
    <div className="permissions-bar">
      <div className="permissions-bar__title">
        <span>{door.label}</span>
        <button
          type="button"
          className="permissions-bar__edit"
          onClick={openModal}
        >
          Edit Access
        </button>
      </div>
      <div>
        <p className="permissions-bar__explain">Accessible to:</p>
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
      <CustomModal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <PermissionsTable
          door={door}
          people={peopleWithAuthStates}
          togglePermissions={togglePersonsPermissions}
        />
        <div>
          <button
            type="button"
            onClick={closeModal}
            className="permissions-bar__close"
          >
            Close
          </button>
        </div>
      </CustomModal>
    </div>
  );
};

export default PermissionsBar;
