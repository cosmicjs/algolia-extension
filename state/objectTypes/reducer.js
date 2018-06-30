import { actionTypes } from './actions';

const {
  CATCH_OBJECT_TYPES_ERROR,
  RECEIVE_OBJECT_TYPES,
  REQUEST_OBJECT_TYPES,
} = actionTypes;

const defaultState = {
  data: undefined,
  error: undefined,
  finishedLoadAt: undefined,
  isLoading: false,
  startedLoadAt: undefined,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case CATCH_OBJECT_TYPES_ERROR:
      return {
        ...state,
        data: undefined,
        error: action.error.message || action.error,
        finishedLoadAt: Date.now(),
        isLoading: false,
      };
    case RECEIVE_OBJECT_TYPES:
      return {
        ...state,
        data: action.objectTypes,
        error: undefined,
        finishedLoadAt: Date.now(),
        isLoading: false,
      };
    case REQUEST_OBJECT_TYPES:
      return {
        ...state,
        isLoading: true,
        startedLoadAt: Date.now(),
      };
    default:
      return state;
  }
};
