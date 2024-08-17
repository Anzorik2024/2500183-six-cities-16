import {Route, BrowserRouter, Routes} from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {HelmetProvider} from 'react-helmet-async';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import Offer from '../../pages/offer/offer';
import Page404 from '../../pages/page404/page404';
import ProtectedRoute from '../protected-route/protected-route';
import { AppRoute } from '../../const';
import { PlaceCardSample } from '../../types/offer/offer';
import { useAppSelector } from '../../hooks/use-app-dispatch';
import Spiner from '../spiner/spiner';
import { offerAction } from '../../store/main-slice/main-slice';
import { userActions } from '../../store/user-slice/user-slice';
import { useActionCreators } from '../../hooks/use-action-creators';
import { getToken } from '../../services/token';
import { selectIsLoading } from '../../store/selectors';
import { TOASTIFY_ERROR_MESSAGE } from '../../const';


type AppProps = {
  placesMock: PlaceCardSample[];
}


function App({placesMock}: AppProps): JSX.Element {
  const favoriteOffers = placesMock.filter((offer) => offer.isFavorite);
  const favoritesNumber = favoriteOffers.length | 0;

  const { fetchOffers } = useActionCreators(offerAction);
  const { checkAuthorization } = useActionCreators(userActions);

  useEffect(() => {
    fetchOffers()
      .unwrap()
      .catch(() => {
        toast.error(TOASTIFY_ERROR_MESSAGE.UploadOffer);
      });

  }, [fetchOffers]);

  const token = getToken();
  useEffect(() => {
    if (token) {
      checkAuthorization();
    }
  }, [token, checkAuthorization]);


  const isLoading = useAppSelector(selectIsLoading);


  if (isLoading) {
    return (
      <Spiner />
    );
  }
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route
            path={AppRoute.MainPage}
            element={<Main favoritesNumber={favoritesNumber}/>}
          />
          <Route
            path={AppRoute.LoginPage}
            element={
              <ProtectedRoute onlyAuth>
                <Login/>
              </ProtectedRoute>
            }
          />
          <Route
            path={AppRoute.FavoritesPage}
            element={
              <ProtectedRoute>
                <Favorites placesMock={placesMock} favoritesNumber={favoritesNumber} />
              </ProtectedRoute>
            }
          />
          <Route
            path={AppRoute.OfferPage}
            element={<Offer favoritesNumber={favoritesNumber}/>}
          />
          <Route
            path= '*'
            element={<Page404/>}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
