/**
 * The Star Wars Base API URL.
 * @constant {string}
 */
const BASE_URL = 'https://swapi.co/api';

/**
 * Returns JSON Response from given URL.
 *
 * @constant {function}
 * @param {string} url
 */
const getResource = async (url) => {
  const response = await fetch(url);
  const resource = await response.json();
  return resource;
};

/**
 * Returns People Resources from the swwapi.
 * @constant {function}
 * @param {string} url
 * @export
 */
export const fetchPeople = async (url = `${BASE_URL}/people`) => {
  const people = await getResource(url);
  return people;
};
