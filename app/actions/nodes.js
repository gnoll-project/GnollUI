  export const ADD_NODE = 'ADD_NODE';
export const REMOVE_NODE = 'REMOVE_NODE';
export const UPDATE_NODE = 'UPDATE_NODE';

import { runCodeInKernal } from '../kernel/';

let componentId = 0;

export function addNode(properties) {
  return {
    type: ADD_NODE,
    properties: {
      id: componentId++,
      width: 300,
      height: 300,
      code: 'def f(in, out):',
      ...properties
    }
  };
};

export function updateNode(id, properties) {
  return {
    type: UPDATE_NODE,
    id: id,
    properties: properties
  };
};

export function removeNode(id) {
  return {
    type: REMOVE_NODE,
    id: id
  };
};

export function sendToKernal(id, code) {
  return (dispatch) => {
    runCodeInKernal(code).then((e) => {
      dispatch({
        type: REMOVE_NODE
      })
    })
  }
};
