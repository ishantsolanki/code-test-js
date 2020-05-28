import { TYPES } from '../actions/graphActions';

export const mountDirectedGraph = (state) => ({
  ...state,
  isSimulationOn: true,
})

export const setFoundSimilarVenuesFor = (state, venueId) => {
  const newState = {...state};

  if (state.nodes.has(venueId)) {
    const foundNode = state.nodes.get(venueId);
    const newFoundNode = {...foundNode, foundSimilar: true}
    const newNodes = new Map(state.nodes).set(venueId, newFoundNode);
    newState.nodes = newNodes;
  }

  return newState;
}

export const setSimulationStopped = (state) => ({
  ...state,
  isSimulationOn: false,
})

const defaultState = {
  nodes: new Map(),
  links: new Set(),
  isSimulationOn: false,
};

export default (state, action) => {
  switch(action.type) {
    case TYPES.MOUNT_GRAPH: return mountDirectedGraph(state)
    case TYPES.SET_FOUND_SIMILAR_VENUES: return setFoundSimilarVenuesFor(state, action.venueId)
    case TYPES.STOP_SIMULATION: return setSimulationStopped(state)
    default: return state || defaultState;
  }
};

