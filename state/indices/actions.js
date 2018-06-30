import algoliasearch from 'algoliasearch';

const actionTypes = {
  CATCH_INDICES_ERROR: 'CATCH_INDICES_ERROR',
  RECEIVE_INDICES: 'RECEIVE_INDICES',
  REQUEST_INDICES: 'REQUEST_INDICES',
};

const catchIndicesError = (error) => {
  if (process.env.NODE_ENV !== 'production') {
    console.error(error); // eslint-disable-line no-console
  }
  return {
    type: actionTypes.CATCH_INDICES_ERROR,
    error,
  };
};

const receiveIndices = indices => ({
  type: actionTypes.RECEIVE_INDICES,
  indices,
});

const requestIndices = () => ({
  type: actionTypes.REQUEST_INDICES,
});

const fetchIndices = (applicationId, adminApiKey) => async (dispatch) => {
  dispatch(requestIndices());

  try {
    const client = algoliasearch(applicationId, adminApiKey);

    const data = await client.listIndexes();

    const { items } = data;

    return dispatch(receiveIndices(items));
  } catch (e) {
    return dispatch(catchIndicesError(e));
  }
};

export {
  actionTypes,
  fetchIndices,
};
