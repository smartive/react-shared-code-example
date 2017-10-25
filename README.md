# react-shared-code-example
This is an example repository containing code that is shared between a React Native and a React App.

## Usage
### Create Redux Store
Initially we created the Redux store within this package and exported it to other applications but
then realised that consumers would be unable to add or remove reducers from the store. Therefore we
opted to only export the pure reducers and consumers are responsible for the store creation.

Creating a store with the provided reducers is fairly simple:

```javascript
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { reducers } from 'react-shared-code-example';

// Example of adding a different reducer.
import anotherReducer from './another-reducer';

export const store = createStore(
  combineReducers({
    ...reducers,
    another: anotherReducer,
  }),
  applyMiddleware(thunk)
);
```

### Using Action Creators
The action creators `getPeople`, `getNextPeople` and `getPreviousPeople` are exported and can be
dispatched on store just like any other action.

## Example
We've added a tiny example of how the shared library can be used in [examples/web](examples/web).
