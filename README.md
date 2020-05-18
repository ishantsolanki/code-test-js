This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Checkout the demo video at https://share.getcloudapp.com/Z4uLE56K

## Available Scripts

After cloning the repo, follow the general steps.

### `yarn`

Installs the required dependencies

### `yarn start`

Runs the app

### Foursquare

You will need fourSquare credentials for running the simulation.
Create your account for free at https://developer.foursquare.com

### Running the simulation

Enter the clientId and clientSecret provided from fourSquare.
Enter the search query in the venue field and select a restaurant from the autocomplete suggestions.
This will search venues around london. So look for your favourite restaurants around london. Mine is <b>Dishoom</b>.

Once selected, the `start simulation` button is enabled. Click on the button and enjoy the simulation.

You can pause the simulation at any point by pressing the spacebar or clicking the `pause simulation` button. And continue again by clicking on `play simulation`.

Hover on the nodes to see the name of the restaurant.

Ofcourse, You can drag the nodes around.

The color of the nodes represent where its located.
<br/>
red - Restaurants in the north <br/>
green - Restaurants in the east <br/>
blue - Restaurants in the west <br/>
orange - Restaurants in the south <br/>
Black - Restaurant location not found


### Interesting restaurants for simulation

 - Search for any cafe to see a graph of ever expanding nodes
 - Search 'Grosvenor Casino' to see a graph of closely similar casinos that creates a nice glob of tightly knit restaurants. (Maybe there arent that many casinos in london)

  ![alt casino](https://p78.f0.n0.cdn.getcloudapp.com/items/5zu1RyoJ/Image%202020-05-18%20at%2011.35.18%20am.png?v=0a34b8226187cceec0b25c8a7668b000)
 - Search for 'Burger King' and you will see very few other similar takeaway restaurants.

  ![alt text](https://p78.f0.n0.cdn.getcloudapp.com/items/2NuXQBQy/Image%202020-05-18%20at%2011.36.19%20am.png?v=d3f18c8ee62531443a694be7b833220d)
