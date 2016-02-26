import { ADD_NODE, UPDATE_NODE, REMOVE_NODE } from '../actions/nodes';

export default function nodes(state = [], action) {
  switch (action.type) {
    case ADD_NODE:
      return [...state, {
        ...action.properties
      }];
    case UPDATE_NODE:
      return state.map((component) => {
        if(component.id === action.id) {
          return {
            ...component,
            ...action.properties
          };
        }
        return component;
      });
    case REMOVE_NODE:
      return state.filter((component) => {
        return component.id !== action.id;
      });
    default:
      return state;
  }
}
