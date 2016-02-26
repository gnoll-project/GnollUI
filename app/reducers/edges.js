import { TOGGLE_EDGE } from '../actions/edges';

export default function nodes(state = {}, action) {
  switch (action.type) {
    case TOGGLE_EDGE:
      const newEdge = {};
      newEdge[action.fromId] = action.toId;
      if(!state[action.fromId]) {
        return Object.assign({}, state, newEdge);
      } else if (state[action.fromId] === action.toId) {
        // destructure the object and remove the old edge.
        const {
          [action.fromId]: oldEdge,
          ...rest
        } = state;
        return rest;
      }
      return Object.assign({}, state, newEdge);
    default:
      return state;
  }
}
