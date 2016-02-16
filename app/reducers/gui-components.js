import { ADD_GUI_COMPONENT, UPDATE_GUI_COMPONENT_POSITION } from '../actions/gui-components';

export default function counter(state = [], action) {
  switch (action.type) {
    case ADD_GUI_COMPONENT:
      return [...state, {
        ...action.properties
      }];
    case UPDATE_GUI_COMPONENT_POSITION:
      return state.map((component) => {
        if(component.id === action.id) {
          return {
            ...component,
            position: action.position
          };
        }
        return component;
      });
    default:
      return state;
  }
}
