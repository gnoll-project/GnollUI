import { SELECT_COMPONENT_TO_ADD, SELECT_NODE, UNSELECT_NODE } from '../actions/ui';

const initialState = {};

export default function ui(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case SELECT_COMPONENT_TO_ADD:
      return Object.assign({}, state, {
        componentToAdd: action.component
      });
    case SELECT_NODE:
      return Object.assign({}, state, {
        selectedNode: action.node
      });
    case UNSELECT_NODE:
      const {
        selectedNode,
        ...rest
      } = state;
      return rest;
    default:
      return state;
  }
}
