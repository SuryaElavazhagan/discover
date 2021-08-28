import { createSlice, configureStore } from '@reduxjs/toolkit';
import { ACTIONS } from '../constants/actions';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    genre: [0],
    type: 'movie',
    year: [0, (new Date()).getFullYear()],
    rating: [0, 5]
  },
  reducers: {
    changeFilter: (state, action) => {
      switch (action.type) {
        case ACTIONS.CHANGE_GENRE:
          state.genre = action.payload;
          break;
        case ACTIONS.CHANGE_TYPE:
          state.type = action.payload;
          break;
        case ACTIONS.CHANGE_YEAR:
          state.year = action.payload;
          break;
        case ACTIONS.CHANGE_RATING:
          state.rating = action.payload;
          break;
      }
    }
  },
});

const { reducer, actions: { changeFilter } } = filterSlice;

const store = configureStore({
  reducer: {
    filter: reducer
  }
});

export {
  store,
  changeFilter
};
