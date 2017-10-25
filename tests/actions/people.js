import { peopleResponse } from '../../src/services/__mocks__/swapi';
import {
  GET_PEOPLE_RESPONSE,
  getNextPeople,
  getPeople,
  getPreviousPeople,
} from '../../src/actions/people';

jest.mock('../../src/services/swapi');

describe('actions', () => {
  describe('people', () => {
    it('returns the initial list of people', async () => {
      expect.assertions(2);
      const dispatch = jest.fn();

      await getPeople()(dispatch);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({
        type: GET_PEOPLE_RESPONSE,
        response: peopleResponse,
      });
    });

    it('returns the next page of people', async () => {
      expect.assertions(3);
      const dispatch = jest.fn();

      const getState = jest.fn().mockImplementation(() => ({
        people: {
          next: 'http://example.com',
        },
      }));

      await getNextPeople()(dispatch, getState);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(getState).toHaveBeenCalledTimes(1);
      expect(dispatch).lastCalledWith({
        type: GET_PEOPLE_RESPONSE,
        response: {
          ...peopleResponse,
          next: 'http://example.com/different/page',
        },
      });
    });

    it('returns the default page if no next page defined', async () => {
      expect.assertions(3);
      const dispatch = jest.fn();

      const getState = jest.fn().mockImplementation(() => ({
        people: {
          next: null,
        },
      }));

      await getNextPeople()(dispatch, getState);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(getState).toHaveBeenCalledTimes(1);
      expect(dispatch).lastCalledWith({
        type: GET_PEOPLE_RESPONSE,
        response: peopleResponse,
      });
    });

    it('returns the previous page of people', async () => {
      expect.assertions(3);
      const dispatch = jest.fn();

      const getState = jest.fn().mockImplementation(() => ({
        people: {
          previous: 'http://example.com',
        },
      }));

      await getPreviousPeople()(dispatch, getState);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(getState).toHaveBeenCalledTimes(1);
      expect(dispatch).lastCalledWith({
        type: GET_PEOPLE_RESPONSE,
        response: {
          ...peopleResponse,
          next: 'http://example.com/different/page',
        },
      });
    });

    it('returns the default page if no previous page defined', async () => {
      expect.assertions(3);
      const dispatch = jest.fn();

      const getState = jest.fn().mockImplementation(() => ({
        people: {
          previous: null,
        },
      }));

      await getPreviousPeople()(dispatch, getState);
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(getState).toHaveBeenCalledTimes(1);
      expect(dispatch).lastCalledWith({
        type: GET_PEOPLE_RESPONSE,
        response: peopleResponse,
      });
    });
  });
});
