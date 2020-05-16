import { TYPES } from '../actions/fourSquareActions';

export const getSuggestedVenuesSuccess = (state, suggestedVenues) => ({
  ...state,
  suggestedVenues,
});

export const getSuggestedVenuesError = (state, error) => ({
  ...state,
  error,
});

export const setClientId = (state, clientId) => ({
  ...state,
  clientId
});

export const setClientSecret = (state, clientSecret) => ({
  ...state,
  clientSecret,
});

export const setSelectedVenue = (state, venueName) => {
  const selectedVenue = state.suggestedVenues.filter(venue => venue.name === venueName) ?? null;

  return {
    ...state,
    selectedVenue: selectedVenue[0],
  }
};

const defaultState = {
  clientId: 'VISFONLNVU3YKUHYGIQW415XKOOVTHWUVTM0X0E54GEVQUAE',
  clientSecret: 'TEWCHTC2SAVTP3NQ5EQVVR45XYRGRIJEW3E4T1CWQCFOZPL0',
  suggestedVenues: [],
  selectedVenue: null,
};

export default (state, action) => {
  switch(action.type) {
    case TYPES.GET_SUGGESTED_VENUES_SUCCESS: return getSuggestedVenuesSuccess(state, action.response)
    case TYPES.GET_SUGGESTED_VENUES_ERROR: return getSuggestedVenuesError(state, action.response)
    case TYPES.SET_CLIENT_ID: return setClientId(state, action.clientId)
    case TYPES.SET_CLIENT_SECRET: return setClientSecret(state, action.clientSecret)
    case TYPES.SELECT_VENUE: return setSelectedVenue(state, action.venueName)
    default: return state || defaultState;
  }
};

