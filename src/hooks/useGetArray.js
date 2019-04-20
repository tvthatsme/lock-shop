import { useState, useEffect } from 'react';

/**
 * Custom hook for getting an array
 *
 * @param {function} asyncGetter - A promise-returning function that gets
 * an array from somewhere.
 */
const useGetArray = asyncGetter => {
  const [array, setArray] = useState([]);

  // Get the latest on mount/update
  useEffect(() => {
    getArray();
  }, []);

  // Define a function for getting all the people from the backend
  const getArray = async () => {
    const result = await asyncGetter();
    setArray(result);
  };

  // Return the list and a method to update the list
  return [array, getArray];
};

export default useGetArray;
