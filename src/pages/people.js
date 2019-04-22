import React, { useState } from 'react';

import { people } from '../api/index.js';
import Page from '../components/page/page.js';
import PageHeader from '../components/page-header/page-header.js';
import useGetArray from '../hooks/useGetArray.js';
import { TrashcanIcon, UsersIcon } from '../icons/index.js';

const People = () => {
  const [peopleList, refreshPeopleList] = useGetArray(people.getAll);
  const [personName, setPersonName] = useState('');

  const addNewPerson = async event => {
    event.preventDefault();
    setPersonName('');
    await people.add({ name: personName });
    refreshPeopleList();
  };

  const removePerson = async id => {
    await people.remove(id);
    refreshPeopleList();
  };

  // Don't show admin in this list because we won't allow that user to be removed
  const peopleListWithoutAdmin = peopleList.filter(
    person => person.name !== 'admin'
  );

  return (
    <Page>
      <PageHeader Icon={UsersIcon}>People</PageHeader>

      <div className="limited-width">
        <h2>Add a new person</h2>
        <p className="help-text">
          All new users are initially authorized to open zero doors. Adding
          authorization to users can be accomplished on the admin page.
        </p>
        <form onSubmit={addNewPerson} autoComplete="off">
          <label htmlFor="new-person">Name</label>
          <div className="form-row">
            <input
              id="new-person"
              type="text"
              value={personName}
              onChange={event => setPersonName(event.target.value)}
            />
            <button
              type="submit"
              className="form-submit"
              disabled={personName.length < 1}
            >
              Add
            </button>
          </div>
        </form>
      </div>

      <h2>All people in the system</h2>
      <p className="help-text">
        To see the full details on what doors each person has access to, please
        visit the admin page.
      </p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {peopleListWithoutAdmin.map(person => (
              <tr key={person.id}>
                <td>{person.name}</td>
                <td>
                  <button
                    type="button"
                    className="table-button"
                    title={`Remove ${person.name} from system`}
                    onClick={() => removePerson(person.id)}
                  >
                    <TrashcanIcon height={18} width={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Give the user some hints if there is nothing shown on this page */}
      {peopleListWithoutAdmin.length < 1 && (
        <p className="notice-text">
          Looks like there aren't any people added to the system yet. Get
          started by using the form at the top of this page.
        </p>
      )}
    </Page>
  );
};

export default People;
