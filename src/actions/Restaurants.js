import { map as d3Map } from 'd3';

class Restaurants {
  constructor() {
    this.entries = d3Map();
    this.similarities = d3Map();
    this.subscriptions = [];
  }

  addEntry(restaurant) {
    if(!this.entries.has(restaurant.id)) {
      this.entries.set(restaurant.id, restaurant);
    }
  }

  setFoundEntry(restaurantId) {
    if(this.entries.has(restaurantId)) {
      const restaurant = this.entries.get(restaurantId);
      restaurant.foundSimilar = true;

    }
  }

  updateEntry(restaurant) {
    if(this.entries.has(restaurant.id)) {
      this.entries.set(restaurant.id, restaurant);
    }
  }

  triggerUpdate() {
    this.subscriptions.forEach((subscription) => subscription());
  }

  addSimilarity(similarity) {
    this.similarities.set(`${similarity.source}-${similarity.target}`, similarity);
  }

  setSubscription(callback) {
    this.subscriptions.push(callback);
  }
}

const restaurants = new Restaurants();

export default restaurants;
