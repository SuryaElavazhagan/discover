import { createSlice, configureStore } from '@reduxjs/toolkit';

export interface IRootState {
  filter: IFilterState;
}

interface IFilterState {
  search: string;
  genre: number[];
  type: 'movie' | 'tv';
  year: [number, number];
  rating: [number, number];
  movieGenres: Array<Record<string, any>>;
  tvGenres: Array<Record<string, any>>;
}

interface IFilterAction {
  type: string;
  payload: any;
}

type IFilterReducers  = {
  changeType: (state: IFilterState, action: IFilterAction) => void;
  changeGenre: (state: IFilterState, action: IFilterAction) => void;
  changeSearch: (state: IFilterState, action: IFilterAction) => void;
  changeYear: (state: IFilterState, action: IFilterAction) => void;
  changeRating: (state: IFilterState, action: IFilterAction) => void;
  changeMovieGenres: (state: IFilterState, action: IFilterAction) => void;
  changeTvGenres: (state: IFilterState, action: IFilterAction) => void;
}

export const filterSlice = createSlice<IFilterState, IFilterReducers>({
  name: 'filter',
  initialState: {
    search: '',
    genre: [],
    type: 'movie',
    year: [1900, (new Date()).getFullYear()],
    rating: [0, 5],
    movieGenres: [],
    tvGenres: []
  },
  reducers: {
    changeType: (state, action) => {
      state.type = action.payload;
    },
    changeGenre: (state, action) => {
      state.genre = action.payload;
    },
    changeSearch: (state, action) => {
      state.search = action.payload;
    },
    changeYear: (state, action) => {
      state.year = action.payload;
    },
    changeRating: (state, action) => {
      state.rating = action.payload;
    },
    changeMovieGenres: (state, action) => {
      state.movieGenres = action.payload;
    },
    changeTvGenres: (state, action) => {
      state.tvGenres = action.payload;
    }
  },
});

const { reducer, actions: {
  changeType,
  changeGenre,
  changeSearch,
  changeYear,
  changeRating,
  changeMovieGenres,
  changeTvGenres
} } = filterSlice;

const store = configureStore({
  reducer: {
    filter: reducer
  }
});

export {
  store,
  changeType,
  changeGenre,
  changeSearch,
  changeYear,
  changeRating,
  changeMovieGenres,
  changeTvGenres
};
