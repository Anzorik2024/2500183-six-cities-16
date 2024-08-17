import { configureStore} from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { mainReducer } from './main-slice/main-slice';
import { userReducer } from './user-reducer/user-reducer';
import { offerReducer } from './offer-reducer/offer-reducer';


const api = createAPI();

const store = configureStore({
  reducer: {
    main: mainReducer,
    user: userReducer,
    offerPage: offerReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api
      }
    }
    ),
});

export { store };
