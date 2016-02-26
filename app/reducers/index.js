import { combineReducers } from 'redux';
import ui from './ui';
import nodes from './nodes';
import edges from './edges';

const rootReducer = combineReducers({
  ui,
  nodes,
  edges
});

export default rootReducer;
