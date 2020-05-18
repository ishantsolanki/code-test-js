import api from './api';
import Restaurants from './Restaurants';

export const TYPES = {
  ADD_LINK: 'ADD_LINK',
  ADD_NODE: 'ADD_NODE',
  GET_SIMILAR_VENUES_ERROR: 'GET_SIMILAR_VENUES_ERROR',
  GET_SIMILAR_VENUES_SUCCESS: 'GET_SIMILAR_VENUES_SUCCESS',
  MOUNT_GRAPH: 'MOUNT_GRAPH',
  SET_FOUND_SIMILAR_VENUES: 'SET_FOUND_SIMILAR_VENUES',
  SET_GRAPH_INITIALIZED: 'SET_GRAPH_INITIALIZED',
  STOP_SIMULATION: 'STOP_SIMULATION',
}

export const mountGraph = () => ({
  type: 'MOUNT_GRAPH'
});

export const addNode = (node) => {
  Restaurants.addEntry(node);
};

export const addLink = (link) => {
  Restaurants.addSimilarity(link);
};

export const getSimilarVenuesSuccess = (response, venueId) => (dispatch, getState) => {
  const {
    graphState: { isSimulationOn },
  } = getState();
  response.response.similarVenues.items.forEach(item => {
    const link = {
      source: venueId,
      target: item.id,
    };
    addNode(item);
    addLink(link);
  });
  if (isSimulationOn) {
    Restaurants.triggerUpdate();
  }
};

export const stopSimulation = () => ({
  type: TYPES.STOP_SIMULATION,
});

export const getSimilarVenuesError = (error) => ({
  type: TYPES.GET_SIMILAR_VENUES_ERROR,
  error,
});

export const setFoundSimilarVenuesFor = (venueId) => {
  Restaurants.setFoundEntry(venueId);
}

export const waitFor = async(duration) => new Promise(resolve => setTimeout(resolve, duration));

export const getSimilarVenuesFor = (venueId) => async (dispatch, getState) => {
  try {
    const {
      fourSquare: { clientId, clientSecret },
      graphState: { isSimulationOn },
    } = getState();
    const response = await api.getSimilarVenues(clientId, clientSecret, venueId)
    const responseJson = await response.json();
    setFoundSimilarVenuesFor(venueId);
    dispatch(getSimilarVenuesSuccess(responseJson, venueId));

    await waitFor(1000);
    if (isSimulationOn) {
      dispatch(findNextSimilarVenue());
    }
  } catch(error) {
    return dispatch(getSimilarVenuesError(error))
  }
}

export const findNextSimilarVenue = () => (dispatch) => {
  const entries = Restaurants.entries;

  entries.values().some((restaurant) => {
    if (!restaurant.foundSimilar) {
      dispatch(getSimilarVenuesFor(restaurant.id));
      return true;
    }
    return false;
  })
};

export const setGraphInitialized = () => async (dispatch, getState) => {
  dispatch(mountGraph());
  const { fourSquare: { selectedVenue }} = getState();

  addNode(selectedVenue);
  Restaurants.triggerUpdate();
  dispatch(findNextSimilarVenue());
};
