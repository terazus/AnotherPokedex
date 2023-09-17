# Another Pokedex - by Tera


## Resources:
Website accessible at https://terapokedex.netlify.app/
GraphQL console: https://beta.pokeapi.co/graphql/console/
Nuxt lifecycle hooks: https://v2.nuxt.com/docs/concepts/nuxt-lifecycle/
Nuxt Workbox: https://pwa.nuxtjs.org/workbox/


## Notes:
Main concern were velocity of development and offline mode.
- SSR/PWA support with graphQL, loading data on `nuxtServerInit`: slower build time, but offline/SEO ready (static pages).
- Offline mode not set up yet but PWA has the workbox module to let us do that. To make this work properly, we would need to download all images and add them to the distribution.
- Caching not required because requests are made at build time (inspect browser network tab to confirm).
- GraphQL lets us get all the data in a single request.
- V-lazy to load images and prevent unnecessary requests + load more button to prevent overloading DOM and better TTI.
- Each search result has a permanent link so sharing is possible. It uses URL parameters to pass the search queries.
- Search is client side only, this is to enable easy offline mode. For more complex search and aggregation data, we would need to use the API, which wouldn't work offline.
- Reusable mixin for handling URL parameters on the search page: easy to add new filters and have permanent links.
- More optimisation, less UI.
- For individual pokemon pages: `asyncData()` merges its return statement with the component data attribute and is executed at build time. During that step, the component is not available yet: we need to pass the route as a parameter of the function.
- Using computed getters and setters to synchronise the filters with the VueX store (states shouldn't be modified outside of mutations). We could also use Pinia (https://pinia.vuejs.org/) instead of VueX.
- Effective dev time: 5h with downtime over 3 days.

## Todo:
- Improve the getter for the Pokemon list, it's a bit slow and hacky. Alternatively, we could search server side. This would give us access to aggregation data and more complex search queries (not/and/or ect ...).
- Add unit tests and e2e (jest already configured for webpack) for Continuous Integration.
- Add JSDoc for Continuous Documentation.
- Continuous Deployment not cost-effective because intensive build time: more than 1000 static pages generated.
- Setup PWA workbox to cache images and enable offline mode.
- Add JSON-LD markup and sitemap.xml to let google search console parse and reference the pages (https://sitemap.nuxtjs.org/): better SEO.
- Add a counter for the number of pokemons in the current query.
- Add a PWA icon for mobile devices.
- Design individual pokemon pages (data already available a fetched through REST at build time).


## Usage:
After cloning the repo locally:
```sh
nvm use 18
export NODE_OPTIONS=--openssl-legacy-provider  # for node 18
npm install
npm run dev  # for development
npm run generate  # for production
```

Deployed with the netlify CLI:
```sh
npm install netlify-cli -g  # global install
netlify deploy --prod
```
Then select the `dist` folder as the target


## Requirements:
- Tested with node 14.15.4 in Windows 10 and node 18.0.0 in Ubuntu 20.04 through WLS2
- For node > 14: remember to set the `NODE_OPTIONS=--openssl-legacy-provider` environment variable and use nvm if you have multiple node versions installed
