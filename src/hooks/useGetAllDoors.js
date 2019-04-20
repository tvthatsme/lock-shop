import { useState, useEffect } from 'react';

import { doors } from '../api/index.js';

const useGetAllDoors = () => {
  const [doorsList, setDoorsList] = useState([]);

  // Get the latest on mount/update
  useEffect(() => {
    getAllDoors();
  }, []);

  // Define a function for getting all the doors from the backend
  const getAllDoors = async () => {
    const result = await doors.getAll();
    setDoorsList(result);
  };

  // Return the list and a method to update the list
  return [doorsList, getAllDoors];
};

export default useGetAllDoors;
