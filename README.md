# Zara challenge

The app is deployed on [Vercel](https://zara-challenge-git-main-santiago-trigos-projects.vercel.app/)

## Installation and execution

### Prerequisites:

- Node.js >= 18.0.0
- npm >= 8.0.0

```sh
git clone git@github.com:trigoporres/zara-challenge.git
cd zara-challenge

npm i
cp .env.example .env.local
```

```sh
npm run dev          # Development (unminified assets)
npm run build        # Production (minified assets)
npm run preview      # Production build preview
npm run test         # Unit tests (watch mode)
npm run test:run     # Unit tests (single run)
npm run test:e2e     # End-to-end tests
npm run lint         # Linter
npm run format       # Format code
```

## Technologies used

- **React 19.2** - UI Framework
- **TypeScript 5.9** - Static typing
- **Vite 7.2** - Build tool and dev server
- **React Router 7.12** - Routing
- **Zod 4.3** - Schema validation
- **Vitest 4.0** - Unit testing
- **Playwright 1.58** - E2E testing
- **Oxlint 1.41** - High performance linting
- **Prettier 3.8** - Code formatting

## Project structure

```
src/
├── api/              # HTTP client and API configuration
├── components/       # Reusable components
│   ├── header/
│   ├── cardSmartphone/
│   ├── productInfo/
│   └── ...
├── contexts/         # Global state (CartContext)
├── hooks/            # Reusable logic
├── schemas/          # Validation with Zod
├── services/         # Business services
├── views/            # Main pages
└── test/             # Testing setup
```

## Architecture

The project follows a **Layered Architecture** organized by responsibilities:

### Views

- Home: List of 20 phones
- Details: contains the selection of capacity and color of the phone to later add it to the cart. It has the specifications section of the phone. And finally a section of similar phones.
- Cart: is the view where you can see the phones that have been added. You can see the photo of the phone in the chosen color, with the information of color name, chosen capacity and quantity of phones with those characteristics that are in the cart.

### Data

- API: extracted layer for communication with the API through HTTP.
- Schemas: contains data validation schemas with Zod.

### Components

Reusable and specific components, organized by the feature they belong to

### Business logic

- Hooks: reusable business logic.
- Contexts: manages the global state of the app.
- Services: communication logic with the API

There are a series of patterns that I wanted to include in the project:

- Schema Validation: Through the [Zod](https://zod.dev/) library I wanted to add an extra layer of security validating that the parameters that come from the API or from localStorage. This is interesting for the case where localStorage may have become corrupted and doesn't break the app, what it does is delete the localStorage.

- One of the requirements of the test was that in all requests the api key was included. For this the call is completely extracted and tested in a unit way. So that any component has access to the API I have created productService. Which creates a simple wrapper through which any component can make use of the calls defined by business logic.

- For the visual components I decided to put them all inside components so that the presentation layer was isolated. With the purpose that these components are reusable and testable in a simple way.

## Technical decisions

### Styled component vs css

One of the requirements was to use styled component. Given the construction of visual components in the simplest and clearest way possible, very basic components remain with x css properties. The use of styled component adds extra javascript computation to be able to resolve the css. For this reason I have made the decision to only include styled component where I need it because for example it has dynamic css properties. For the rest of cases I have decided to add css to try to make the app as optimized as possible.

**Important note: it is true that in apps like this case the improvement will probably be microseconds or not even that. But I think it is important to create the app from the beginning in the most efficient way possible. In case of needing styled component in some area it would be easy to implement**

### Testing

For the testing of the application I wanted to maintain a balance between time and necessary tests. The most necessary thing was to test the important business logic, in this case components like apiClient, cartContext or useProduct. However I decided not to add tests to the visual components, they are simple components in which in the great majority of cases I would be testing that react correctly paints the color x or property y. On the other hand I did see it very necessary to have an e2e test that completely covered what would be a normal user flow. From when they enter the product list until they reach the cart.

### UseProduct

Here resides the logic of requesting products, either in a general way (requests all products when entering the web) or in a partial way (requests products according to the search that the user has made). At this point I had to put a filter of duplicate products since from the API the product Redmi Note 13 Pro 5G is arriving as duplicate. This step can be removed when the API responsible team corrects the error, meanwhile we give the user a correct experience within the app.

### scrollTo(0, 0)

Both in the Home view and in the details view I have added this useEffect. The natural behavior of the browser is to maintain the scroll between views since it detects them as the same page. For the user it is not a good experience to enter a product at the end of the list and see that the details view is in the middle of the page.

```ts
useEffect(() => {
  scrollTo(0, 0);
}, []);
```

The decision I have made was the one that seemed most correct to me for the, we could say, MVP of the app. However, the correct option when the app grows would be to add [<ScrollRestoration />](https://reactrouter-com.translate.goog/6.30.3/components/scroll-restoration?_x_tr_sl=en&_x_tr_tl=es&_x_tr_hl=es&_x_tr_pto=sge) from react router.

### Virtualization of the phone list

A clear optimization when there is a list of elements is to virtualize it, so that only what is seen on the screen is created or even a little up or down. For this one of the best solutions is to add [TanStack Virtual](https://tanstack.com/virtual/latest).

One of the requirements was to show the first 20 phones from a list of 24 phones. Following the design of figma provided, each row has 5 phones on a normal computer screen. That makes a total of 4 rows, so if we count with [overscan](https://tanstack.com/virtual/latest/docs/api/virtualizer#overscan) it would make nothing virtualized.

In the mobile version a virtualization could generate a real benefit. Even so I decided not to implement it given that the list of phones is not very large and I consider that for the user it is better to "wait" a little more at the beginning than to have intermediate loads as they scroll.

### Caching of request results

I think it is important to avoid an excessive number of requests to the API. For this the most normal thing is to cache the results so that according to what type of actions unnecessary requests are not made. Currently [TanStack Query](https://tanstack.com/query/latest) would be the best option.

I evaluated different use cases that the user can have within the application to see if it was necessary or not to implement. The most "serious" case is when the user uses the Home search. But in this case it was a requirement that this search made use of the API so having the products cached in that case was not necessary. The case that the user enters the home, either returning from the details of a phone or from the cart, a data request will be made.

Given the size of the data and that for the search the API is necessary I considered not to include it in the MVP and leave it as possible in case the product list grew.

## Requirements compliance

✅ List view with 20 phones
✅ Real-time search with API filtering
✅ Results indicator
✅ Navigation with home icon and cart
✅ Persistent cart with localStorage
✅ Detail view with dynamic selectors
✅ "Add to cart" button conditionally activated
✅ Similar products
✅ Cart view with item management
✅ Total price and continue shopping button
✅ Responsive design
✅ Testing implemented (unit + E2E)
✅ Linters and formatters configured
✅ Development and production mode
✅ Accessibility implemented
✅ Detailed README with architecture
✅ Production deployment (Vercel)
