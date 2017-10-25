const BASE_URL = 'https://swapi.co/api';

/**
 * Mock HTTP People Response.
 * @constant {object}
 */
export const peopleResponse = {
  count: 1,
  next: 'http://example.com',
  previous: null,
  results: [
    {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
      homeworld: 'https://swapi.co/api/planets/1/',
      films: [
        'https://swapi.co/api/films/2/',
        'https://swapi.co/api/films/6/',
        'https://swapi.co/api/films/3/',
        'https://swapi.co/api/films/1/',
        'https://swapi.co/api/films/7/',
      ],
      species: ['https://swapi.co/api/species/1/'],
      vehicles: ['https://swapi.co/api/vehicles/14/', 'https://swapi.co/api/vehicles/30/'],
      starships: ['https://swapi.co/api/starships/12/', 'https://swapi.co/api/starships/22/'],
      created: '2014-12-09T13:50:51.644000Z',
      edited: '2014-12-20T21:17:56.891000Z',
      url: 'https://swapi.co/api/people/1/',
    },
  ],
};

/**
 * Mock fetchPeople HTTP Request factory..
 * @param {string} url
 */
export const fetchPeople = (url = `${BASE_URL}/people`) => {
  if (url === `${BASE_URL}/people`) {
    return Promise.resolve(peopleResponse);
  }

  return Promise.resolve({
    ...peopleResponse,
    next: 'http://example.com/different/page',
  });
};
