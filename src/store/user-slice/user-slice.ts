import { UserData } from '../../types/auth/auth';
import { AuthorizationStatus } from '../../const';
import { createSlice} from '@reduxjs/toolkit';
import {loginUser, logout, checkAuthorization } from '../thunks/main';
import { RequestStatus } from '../../const';

type InitialState = {
  authorizationStatus: AuthorizationStatus;
  info: UserData | null;
  requestStatus: RequestStatus;
};

const initialState : InitialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  info: null,
  requestStatus: RequestStatus.Idle,
};

const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.info = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(loginUser.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(loginUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(checkAuthorization.fulfilled, (state, action) => {
        state.info = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(checkAuthorization.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(checkAuthorization.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      }).addCase(logout.pending, (state) => {
        state.info = null;
        state.authorizationStatus = AuthorizationStatus.Unknown;
      });
  }

});

const userReducer = userSlice.reducer;

const userActions = {
  loginUser,
  logout,
  checkAuthorization
};

export {
  userSlice,
  userReducer,
  userActions
};

