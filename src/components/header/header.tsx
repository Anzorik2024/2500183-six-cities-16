import {Link} from 'react-router-dom';
import { AppRoute, AuthorizationStatus} from '../../const';
import HeaderLogo from '../header/header-logo';
import { useAppSelector } from '../../hooks/use-app-selector';
import { userActions } from '../../store/user-slice/user-slice';
import { useActionCreators } from '../../hooks/use-action-creators';
import { selectAuthorizationStatus, selectUserInfo } from '../../store/selectors';
import { selectFavoriteOffer } from '../../store/selectors';
import React from 'react';

type PathnameType = typeof AppRoute[keyof typeof AppRoute];


function Header() : JSX.Element {

  const url = location.pathname as PathnameType === AppRoute.FavoritesPage
    ? AppRoute.LoginPage
    : AppRoute.MainPage;

  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const userData = useAppSelector(selectUserInfo);

  const {logout} = useActionCreators(userActions);

  const favoriteOffers = useAppSelector(selectFavoriteOffer);
  const favoritesNumber = favoriteOffers.length;

  const handleSignoutClick = () => {
    logout();
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <HeaderLogo/>
          <nav className="header__nav">
            <ul className="header__nav-list">
              { authorizationStatus === AuthorizationStatus.Auth &&
                    <React.Fragment>
                      <li className="header__nav-item user">
                        <Link className="header__nav-link header__nav-link--profile" to={AppRoute.FavoritesPage}>
                          <div className="header__avatar-wrapper user__avatar-wrapper">
                          </div>
                          <span className="header__user-name user__name">{userData?.email}</span>
                          <span className="header__favorite-count">{favoritesNumber}</span>
                        </Link>
                      </li>
                      <li className="header__nav-item">
                        <Link className="header__nav-link" to={url}>
                          <span className="header__signout" onClick={handleSignoutClick}>Sign out</span>
                        </Link>
                      </li>
                    </React.Fragment>}
              {authorizationStatus !== AuthorizationStatus.Auth &&
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.LoginPage}>
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
