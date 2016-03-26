export const TOGGLE_EDGE = 'TOGGLE_EDGE';
import { syncGraph } from '../kernel/';

export function toggleEdge(fromId, toId) {
  return (dispatch, getState) => {
    dispatch({
      type: TOGGLE_EDGE,
      fromId: fromId,
      toId: toId
    });
    const { nodes, edges } = getState();
    syncGraph({
      nodes,
      edges
    });
  };
};
