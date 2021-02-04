/*
 *
 * Subscribe reducer
 *
 */
import produce from 'immer';
import * as types from './constants';

export const initialState = {
  all: {
    data: [],
    page: 1,
    size: 10,
    totaldata: 0,
  },
  one: {},
  query: { find_email: '' },
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const adminSubscribePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.LOAD_SUBSCRIBER_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_SUBSCRIBER_SUCCESS:
        draft.loading = false;
        draft.all = action.payload;
        break;
      case types.LOAD_SUBSCRIBER_FAILURE:
        draft.loading = false;
        break;
      case types.SET_QUERY_VALUE:
        draft.query[action.payload.key] = action.payload.value;
        break;
      case types.CLEAR_QUERY:
        draft.query = initialState.query;
        break;

      case types.LOAD_ONE_REQUEST:
        draft.loading = true;
        break;
      case types.LOAD_ONE_SUCCESS:
        draft.loading = false;
        draft.one = action.payload.data;
        break;
      case types.DELETE_ONE_SUCCESS:
        draft.all = {
          ...draft.all,
          data: draft.all.data.filter(
            each => each._id != action.payload.data._id,
          ),
        };
        break;
    }
  });

export default adminSubscribePageReducer;
