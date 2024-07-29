const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;

const ACTIVE_CITY = CITIES[0];

enum AppRoute {
  MainPage = '/',
  LoginPage = '/login',
  FavoritesPage = '/favorites',
  OfferPage = '/offer/:id'
}

enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

const REVIEW_LENGTH = {
  MIN_REVIEW_LENGTH: 50,
  MAX_REVIEW_LENGTH: 300,
} as const;

export { CITIES, ACTIVE_CITY, REVIEW_LENGTH, AppRoute, AuthorizationStatus };
