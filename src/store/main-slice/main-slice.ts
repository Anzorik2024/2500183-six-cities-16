import { Sorting } from '../../const';
import { PlaceCardSample } from '../../types/offer/offer';
import { DEFAULT_CITY } from '../../const';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadingOffers} from '../api-actions';
import { UserData } from '../../types/user/auth';

type InitialState = {
  city: string;
  offers: PlaceCardSample[];
  sorting: Sorting;
  isLoading: boolean;
  info: UserData | null;
};

const initialState : InitialState = {
  city: DEFAULT_CITY,
  offers: [],
  sorting: Sorting.Popular,
  isLoading: false,
  info: null,
};

const mainSlice = createSlice({
  name: 'MainProcess',
  initialState,
  reducers: {
    changeSortBy: (state, action: PayloadAction<{sorting: Sorting}>) => {
      state.sorting = action.payload.sorting;
    },
    changeCity: (state, action: PayloadAction<{city: string}>) => {
      state.city = action.payload.city;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(loadingOffers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadingOffers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.offers = action.payload;
      })
      .addCase(loadingOffers.rejected, (state) => {
        state.isLoading = false;
      });
  }

});

const {changeSortBy,changeCity, } = mainSlice.actions;
const mainReducer = mainSlice.reducer;

const offerAction = {
  loadingOffers
};

export {
  mainReducer,
  changeSortBy,
  changeCity,
  offerAction
};
