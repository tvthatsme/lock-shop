// Set the endpoint for connecting to the "backend"
const apiEndpoint = 'http://localhost:3001/';

/**
 * Define a function for creating curried functions to get all the items of a
 * specific type from the backend.
 *
 * @param {string} type
 * @returns {() => Promise<any>}
 */
function getAllOfType(type) {
  return async function getType() {
    const response = await fetch(`${apiEndpoint}${type}`);
    const result = await response.json();
    return result;
  };
}

/**
 * Define a function for creating curried functions to add an item of a specific
 * type to the backend database.
 *
 * @param {string} type
 * @returns {(data: any) => Promise<AxiosResponse<any>>}
 */
function addOneOfType(type) {
  return async function addType(data) {
    const response = await fetch(`${apiEndpoint}${type}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.status === 200;
  };
}

/**
 * Define a function for creating curried functions to remove an item of a specific
 * type from the backend database.
 *
 * @param {string} type
 * @returns {(id: string) => Promise<AxiosResponse<any>>}
 */
function removeOneOfType(type) {
  return async function removeDoor(id) {
    const response = await fetch(`${apiEndpoint}${type}/${id}`, {
      method: 'DELETE'
    });
    return response.status === 200;
  };
}

// Create an object for all the CRUD operations relating to doors
const doors = {
  getAll: getAllOfType('doors'),
  add: addOneOfType('doors'),
  remove: removeOneOfType('doors')
};

const people = {
  getAll: getAllOfType('users'),
  add: addOneOfType('users'),
  remove: removeOneOfType('users')
};

export { doors, people };
