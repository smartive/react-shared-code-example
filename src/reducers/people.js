import { GET_PEOPLE_RESPONSE } from '../actions/people';
import { mergeItems } from '../services/dictionary-merge';
import { getIDFromUrl } from '../services/id-parser';

/**
 * Initially loaded state.
 * Due to a hackday's nature this was not properly designed but models the
 * swapi.co's HTTP response, but keeps the results as a hash for easier access.
 *
 * @constant {object}
 */
const initialState = {
  totalCount: null,
  loaded: 0,
  next: null,
  previous: null,
  results: [],
  entities: {},
};

/**
 * Object containing all relevant reducers.
 *
 * @constant {object}
 */
const handlers = {
  /**
   * @param {object} Partial State
   * @param {object} Action
   */
  [GET_PEOPLE_RESPONSE]: (state, { response }) => {
    const {
      count, next, previous, results,
    } = response;

    // Because the swapi does not provide ID properties, we parse them from the URL and add them to
    // the entitiy.
    const resultsWithID = results.map(result => ({
      ...result,
      id: getIDFromUrl(result.url),
    }));

    // We merged the already stored entities with the freshly fetched ones.
    const entities = mergeItems(state.entities, resultsWithID);
    const nextResults = state.results.concat(resultsWithID.map(result => result.id));

    // Increment results count - this can be compared against totalCount to see whether there are
    // any non-fetched entities.
    const loaded = nextResults.length;

    return {
      totalCount: count,
      results: nextResults,
      loaded,
      entities,
      next,
      previous,
    };
  },
};

/**
 * Default reducer.
 *
 * @function
 * @default
 * @export
 */
export default (state = initialState, action) =>
  (handlers[action.type] ? handlers[action.type](state, action) : state);
