// admin page for people

import React, { useState, useEffect } from 'react';

import { people } from '../../api/index.js';
import Page from '../../components/page/page.js';

const People = () => {
  const [peopleList, setPeopleList] = useState([]);
  const [personName, setPersonName] = useState('');

  useEffect(() => {
    getAllPeople();
  }, []);

  const getAllPeople = async () => {
    const result = await people.getAll();
    setPeopleList(result);
  };

  const addNewPerson = async event => {
    event.preventDefault();
    setPersonName('');
    await people.add({ name: personName });
    getAllPeople();
  };

  const removePerson = async id => {
    await people.remove(id);
    getAllPeople();
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
