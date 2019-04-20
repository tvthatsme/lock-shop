import { useState, useEffect } from 'react';

import { people } from '../api/index.js';

const useGetAllPeople = () => {
  const [peopleList, setPeopleList] = useState([]);

  // Get the latest on mount/update
  useEffect(() => {
    getAllPeople();
  }, []);

  // Define a function for getting all the people from the backend
  const getAllPeople = async () => {
    const result = await people.getAll();
    setPeopleList(result);
  };

  // Return the list and a method to update the list
  return [peopleList, getAllPeople];
};

export default useGetAllPeople;
