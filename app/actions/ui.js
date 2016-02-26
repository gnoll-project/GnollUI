export const SELECT_COMPONENT_TO_ADD = 'SELECT_COMPONENT_TO_ADD';
export const SELECT_NODE = 'SELECT_NODE';
export const UNSELECT_NODE = 'UNSELECT_NODE';

export function selectComponentToAdd(component) {
  console.log('select component');
  return {
    type: SELECT_COMPONENT_TO_ADD,
    component: component
  };
};

export function selectNode(node) {
  console.log('select node');
  return {
    type: SELECT_NODE,
    node: node
  };
};


export function unselectNode(node) {
  console.log('unselect node');
  return {
    type: UNSELECT_NODE
  };
};
