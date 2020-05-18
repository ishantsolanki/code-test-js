import api from './api';

export const TYPES = {
  GET_SUGGESTED_VENUES_ERROR: 'GET_SUGGESTED_VENUES_ERROR',
  GET_SUGGESTED_VENUES_SUCCESS: 'GET_SUGGESTED_VENUES_SUCCESS',
  GET_SUGGESTED_VENUES: 'GET_SUGGESTED_VENUES',
  SET_CLIENT_ID: 'SET_CLIENT_ID',
  SET_CLIENT_SECRET: 'SET_CLIENT_SECRET',
  SELECT_VENUE: 'SELECT_VENUE',
}

export const getSuggestedVenuesSuccess = (response) => ({
  type: TYPES.GET_SUGGESTED_VENUES_SUCCESS,
  response,
});

export const getSuggestedVenuesError = (error) => ({
  type: TYPES.GET_SUGGESTED_VENUES_ERROR,
  error,
});

export const setClientId = (clientId) => ({
  type: TYPES.SET_CLIENT_ID,
  clientId,
})

export const setClientSecret = (clientSecret) => ({
  type: TYPES.SET_CLIENT_SECRET,
  clientSecret,
});

export const selectVenue = (venueName) => ({
  type: TYPES.SELECT_VENUE,
  venueName,
});

export const getSuggestedVenues = (query) => async(dispatch, getState) => {
  try {
    const { fourSquare: { clientId, clientSecret } } = getState();
    dispatch(selectVenue(query));
    const response = await api.getSuggestedVenues(clientId, clientSecret, query);
    const responseJson = await response.json();
    if (responseJson.meta.code === 200) {
      return dispatch(getSuggestedVenuesSuccess(responseJson.response.venues.slice(0, 8)));
    }
    return dispatch(getSuggestedVenuesError(responseJson))
  } catch(error) {
    return dispatch(getSuggestedVenuesError(error))
  }
};
