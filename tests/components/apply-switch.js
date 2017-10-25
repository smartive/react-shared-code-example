import React from 'react';
import renderer from 'react-test-renderer';

import { applySwitch } from '../../src';

const Full = () => (
  <div>
    <p>Full</p>
  </div>
);

const Loading = () => (
  <div>
    <p>Loading</p>
  </div>
);

describe('components', () => {
  describe('apply-switch', () => {
    it('matches its snapshot and calls loadInitial if not fullRender', () => {
      const Skeleton = applySwitch(Full, Loading);
      const loadInitial = jest.fn();

      const tree = renderer
        .create(<Skeleton fullRender={false} loadInitial={loadInitial} />)
        .toJSON();

      expect(tree).toMatchSnapshot();
      expect(loadInitial).toHaveBeenCalledTimes(1);
    });

    it('matches its snapshot and doesn\'t call loadInitial if fullRender', () => {
      const Skeleton = applySwitch(Full, Loading);
      const loadInitial = jest.fn();

      const tree = renderer
        .create(<Skeleton fullRender loadInitial={loadInitial} />)
        .toJSON();

      expect(tree).toMatchSnapshot();
      expect(loadInitial).toHaveBeenCalledTimes(0);
    });
  });
});
