export const ADD_GUI_COMPONENT = 'ADD_GUI_COMPONENT';
export const UPDATE_GUI_COMPONENT_POSITION = 'UPDATE_GUI_COMPONENT_POSITION';

const chartTypes = ['scatter', 'line', 'pie'];
let componentId = 0;

export function addGUIComponent(position) {
  console.log('add gui component');
  return {
    type: ADD_GUI_COMPONENT,
    properties: {
      id: componentId++,
      chartType: chartTypes[Math.floor(Math.random()*chartTypes.length)],
      position
    }
  };
};

export function updateGUIComponentPosition(id, position) {
  console.log('update gui component position');
  return {
    type: UPDATE_GUI_COMPONENT_POSITION,
    id: id,
    position: position
  };
}
