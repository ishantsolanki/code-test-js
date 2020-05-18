const options = {
  method: 'GET',
  mode: 'cors',
}

export const getSuggestedVenues = (clientId, clientSecret, query) => fetch(`https://api.foursquare.com/v2/venues/search?near=London&query=${query}&client_id=${clientId}&client_secret=${clientSecret}&v=20200226&categoryId=4d4b7105d754a06374d81259`, options)
export const getSimilarVenues = (clientId, clientSecret, venueId) => fetch(`https://api.foursquare.com/v2/venues/${venueId}/similar?client_id=${clientId}&client_secret=${clientSecret}&v=20200226&categories=4d4b7105d754a06374d81259`, options)

export default {
  getSuggestedVenues,
  getSimilarVenues,
}
