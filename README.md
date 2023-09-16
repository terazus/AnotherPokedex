# Another Pokedex - by Tera

## Resources:
GraphQL console: https://beta.pokeapi.co/graphql/console/


## Notes:
Main concern is velocity of development to fit as many features as possible in the 4h time limit
- SSR/PWA support with graphQL, loading data on nuxtServerInit: slower build time, but faster load time
- Offline mode not set up yet but PWA has the workbox module to let us do that (https://pwa.nuxtjs.org/workbox/). To make this work properly, we would need to download all images and add them to the distribution.
- Caching not required because requests are made at build time (inspect browser network tab to confirm)
- GraphQL lets us get all the data in a single request
- V-lazy to load images and prevent unnecessary requests
- Each search result has a permanent link so sharing is possible. It uses URL parameters to pass the search queries
- Search is client side only, this is to enable easy offline mode. For more complex search and aggregation data, we would need to use the API, which wouldn't work offline.
- Reusable mixin for handling URL parameters on the search page: easy to add new filters and key permanent links


## TODO:
- improve the getter for the Pokemon list, it's a bit slow and hacky. Alternatively, we could do the search server side.
- add unit tests and e2e (jest already configured for webpack)
- add JSDoc
- Continuous integration, Continuous deployment, Continuous documentation
- Setup PWA workbox to cache images and enable offline mode
- Replace lazy load with pagination for the search results
