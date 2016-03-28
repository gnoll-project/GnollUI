export const TOGGLE_EDGE = 'TOGGLE_EDGE';
import { syncGraph } from '../kernel/';

export function toggleEdge(fromId, toId) {
  return (dispatch, getState) => {
    // TODO - I guess in theory we 
    //        should make sure the syncGraph
    //        call succeeds and then dispatch
    //        the update.
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
