import React from 'react';

import './permissions-table.css';
import { SquareIcon, CheckSquareIcon } from '../../icons/index.js';

const PermissionsTable = ({ door, people, togglePermissions }) => {
  return (
    <div>
      <h2 className="permissions-table__modal-title">Access to {door.label}</h2>
      <p className="help-text">Toggle access for any person in the system.</p>
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Access</th>
            </tr>
          </thead>
          <tbody>
            {people.map(person => (
              <tr key={person.id}>
                <td>{person.name}</td>
                <td>
                  <button
                    type="button"
                    className="permissions-table__toggle"
                    onClick={() =>
                      togglePermissions(door, person.id, !person.access)
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
    </div>
  );
};

export default PermissionsTable;
