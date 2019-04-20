// admin page for people

import React, { useState } from 'react';

import { people } from '../../api/index.js';
import Page from '../../components/page/page.js';
import useGetAllPeople from '../../hooks/useGetAllPeople.js';

const People = () => {
  const [peopleList, refreshPeopleList] = useGetAllPeople();
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

  return (
    <Page>
      <h1>People</h1>

      <form onSubmit={addNewPerson}>
        <p>Add a new person</p>
        <label htmlFor="new-person">Name</label>
        <input
          id="new-person"
          type="text"
          value={personName}
          onChange={event => setPersonName(event.target.value)}
        />
        <button>Add</button>
      </form>

      <table>
        <caption>All people in the system</caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {peopleList.map(person => (
            <tr key={person.id}>
              <td>{person.name}</td>
              <td>
                <button type="button" onClick={() => removePerson(person.id)}>
                  x
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Page>
  );
};

export default People;
