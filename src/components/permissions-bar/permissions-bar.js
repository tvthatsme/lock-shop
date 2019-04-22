import React, { useState } from 'react';

import './permissions-bar.css';
import DeleteablePill from '../deleteable-pill/deleteable-pill.js';
import CustomModal from '../modal/modal.js';
import { SquareIcon, CheckSquareIcon } from '../../icons/index.js';

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
      <div className="permissions-bar">
        <div className="permissions-bar__title">
          <span>{door.label}</span>
          <button
            type="button"
            className="permissions-bar__edit"
            onClick={() => {
              setModalOpen(true);
            }}
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
      </div>

      <CustomModal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <div>
          <h2 className="permissions-bar__modal-title">
            Access to {door.label}
          </h2>
          <p className="help-text">
            Toggle access for any person in the system.
          </p>
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
                    <button
                      type="button"
                      className="permissions-bar__toggle"
                      onClick={() =>
                        togglePersonsPermissions(
                          door,
                          person.id,
                          !person.access
                        )
                      }
                    >
                      {person.access ? (
                        <CheckSquareIcon height={24} width={24} />
                      ) : (
                        <SquareIcon height={24} width={24} />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
    </>
  );
};

export default PermissionsBar;
