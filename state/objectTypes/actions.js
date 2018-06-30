import getBucket from '../../utils/getBucket';

const actionTypes = {
  CATCH_OBJECT_TYPES_ERROR: 'CATCH_OBJECT_TYPES_ERROR',
  RECEIVE_OBJECT_TYPES: 'RECEIVE_OBJECT_TYPES',
  REQUEST_OBJECT_TYPES: 'REQUEST_OBJECT_TYPES',
};

const catchObjectTypesError = (error) => {
  if (process.env.NODE_ENV !== 'production') {
    console.error(error); // eslint-disable-line
  }
  return {
    type: actionTypes.CATCH_OBJECT_TYPES_ERROR,
    error,
  };
};

const receiveObjectTypes = objectTypes => ({
  type: actionTypes.RECEIVE_OBJECT_TYPES,
  objectTypes,
});

const requestObjectTypes = () => ({
  type: actionTypes.REQUEST_OBJECT_TYPES,
});

const fetchObjectTypes = () => async (dispatch) => {
  dispatch(requestObjectTypes());

  try {
    const bucket = getBucket();
    const data = await bucket.getObjectTypes();
    return dispatch(receiveObjectTypes(data.object_types));
  } catch (e) {
    return dispatch(catchObjectTypesError(e));
  }
};

const shouldFetchObjectTypes = (state) => {
  try {
    const { objectTypes } = state;
    if (objectTypes.isLoading) return false;
    return !objectTypes.data;
  } catch (e) {
    return true;
  }
};

const fetchObjectTypesIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchObjectTypes(getState())) {
    return dispatch(fetchObjectTypes());
  }
  return Promise.resolve();
};

export {
  actionTypes,
  fetchObjectTypes,
  fetchObjectTypesIfNeeded,
};
