import { connect } from 'react-redux';

import { getPeople, getNextPeople } from '../../src/actions';

import { applySwitch } from '../../src/index';

import { List } from './list';
import { LoadingIndicator } from './loading-indicator';

const PlaceholderComponent = applySwitch(List, LoadingIndicator);

const mapStateToProps = state => ({
  people: state.people.results.map(id => state.people.entities[id]),
  total: state.people.totalCount,
  loaded: state.people.loaded,
  fullRender: state.people.loaded > 0,
});

const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch(getNextPeople()),
  loadInitial: () => dispatch(getPeople()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaceholderComponent);
