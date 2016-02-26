export const TOGGLE_EDGE = 'TOGGLE_EDGE';

export function toggleEdge(fromId, toId) {
  return {
    type: TOGGLE_EDGE,
    fromId: fromId,
    toId: toId
  };
};
