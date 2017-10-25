import { peopleResponse } from '../../src/services/__mocks__/swapi';
import { GET_PEOPLE_RESPONSE } from '../../src/actions/people';
import peopleReducer from '../../src/reducers/people';

describe('reducers', () => {
  describe('people', () => {
    it('returns state without mutations if unknown action provided', () => {
      const state = { foo: 'bar' };
      const action = { type: 'FOO_BAR' };

      const nextState = peopleReducer(state, action);
      expect(nextState).toBe(state);
    });

    it('adds people to state if provided in action', () => {
      const action = {
        type: GET_PEOPLE_RESPONSE,
        response: peopleResponse,
      };

      const state = peopleReducer(undefined, action);

      expect(state.totalCount).toBe(1);
      expect(state.loaded).toBe(1);
      expect(state.next).toBe('http://example.com');
      expect(state.previous).toBe(null);
      expect(state.results).toHaveLength(1);
      expect(state.entities).toHaveProperty('1');
      expect(state.entities['1'].name).toBe('Luke Skywalker');
    });
  });
});
