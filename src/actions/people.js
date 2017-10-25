import { fetchPeople } from '../services/swapi';

/**
 * @constant {string}
 */
export const GET_PEOPLE_RESPONSE = 'GET_PEOPLE_RESPONSE';

/**
 * @constant {string}
 */
export const GET_PEOPLE_ERROR = 'GET_PEOPLE_ERROR';

/**
 * Action Creator for successful People HTTP Response.
 * @param {object} response
 * @returns {object}
 */
export const createGetPeopleResponse = response => ({
  type: GET_PEOPLE_RESPONSE,
  response,
});

/**
 * Action Creator for failed People HTTP Response.
 * @param {error} error
 * @returns {object}
 */
export const createGetPeopleError = error => ({
  type: GET_PEOPLE_ERROR,
  error,
});

/**
 * Gets people from swapi service and dispatches the service's response on success, or error on
 * failure.
 *
 * This is an asynchronous action creator (`thunk`) which itself runs async code and can dispatch
 * other actions.
 * @returns {function}
 */
export const getPeople = () => async (dispatch) => {
  try {
    const response = await fetchPeople();
    dispatch(createGetPeopleResponse(response));
  } catch (error) {
    dispatch(createGetPeopleError(error));
  }
};

/**
 * Get the next people page provided by an earlier request. If no next page is available, the
 * default page is fetched.
 *
 * This is an asynchronous action creator (`thunk`) which itself runs async code and can dispatch
 * other actions.
 * @returns {function}
 */
export const getNextPeople = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const { next } = state.people;

    const response = next ? await fetchPeople(next) : await fetchPeople();
    dispatch(createGetPeopleResponse(response));
  } catch (error) {
    dispatch(createGetPeopleError(error));
  }
};

/**
 * Get the previous people page provided by an earlier request. If no previous page is available,
 * the default page is fetched.
 *
 * This is an asynchronous action creator (`thunk`) which itself runs async code and can dispatch
 * other actions.
 * @returns {function}
 */
export const getPreviousPeople = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const { previous } = state.people;

    const response = previous ? await fetchPeople(previous) : await fetchPeople();
    dispatch(createGetPeopleResponse(response));
  } catch (error) {
    dispatch(createGetPeopleError(error));
  }
};
