import algoliasearch from 'algoliasearch';
import uniq from 'lodash/uniq';
import convertCosmicObjToAlgoliaObj from '../../utils/convertCosmicObjToAlgoliaObj';
import getBucket from '../../utils/getBucket';

const actionTypes = {
  CATCH_INDICES_ERROR: 'CATCH_INDICES_ERROR',
  RECEIVE_INDICES: 'RECEIVE_INDICES',
  REQUEST_INDICES: 'REQUEST_INDICES',
  START_SYNC: 'START_SYNC',
  FINISH_SYNC: 'FINISH_SYNC',
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

const startSync = () => ({
  type: actionTypes.START_SYNC,
});

const finishSync = () => ({
  type: actionTypes.FINISH_SYNC,
});

const fetchIndices = (applicationId, adminApiKey) => async (dispatch) => {
  dispatch(requestIndices());

  try {
    const client = algoliasearch(applicationId, adminApiKey);
    const data = await client.listIndexes();
    const { items } = data;
    const indices = (await Promise.all(items.map(async (item) => {
      const { name } = item;
      const index = client.initIndex(name);
      const settings = await index.getSettings();
      return {
        name,
        ...settings,
        ...item,
      };
    })))
      .reduce((accumulator, indexSettings) => ({
        ...accumulator,
        [indexSettings.name]: indexSettings,
      }), {});

    return dispatch(receiveIndices(indices));
  } catch (e) {
    return dispatch(catchIndicesError(e));
  }
};

const syncIndex = index => async (dispatch, getState) => {
  dispatch(startSync());

  try {
    const { applicationId, adminApiKey } = getState().settings.data;
    await addCosmicObjectsToAlgolia(applicationId, adminApiKey, index);
    await dispatch(fetchIndices(applicationId, adminApiKey));
  } catch (e) {
    await dispatch(catchIndicesError(e));
  }

  return dispatch(finishSync());
};

const addCosmicObjectsToAlgolia = async (applicationId, adminApiKey, index) => {
  const client = algoliasearch(applicationId, adminApiKey);
  const algoliaIndex = client.initIndex(index);
  const bucket = getBucket();
  const data = await bucket.getObjects({ type: index, skip: 0 });
  let objects = data.objects;
  const addObjectsRes = await algoliaIndex.addObjects(objects);
  const { taskID } = addObjectsRes;
  await algoliaIndex.waitTask(taskID);
  // Pagination
  if (data.total > 1000) {
    for (let skip = 1000; skip < data.total; skip = skip + 1000) {
      const loop_data = await bucket.getObjects({ type: index, skip: skip });
      const addObjectsRes = await algoliaIndex.addObjects(loop_data.objects);
      const { taskID } = addObjectsRes;
      await algoliaIndex.waitTask(taskID);
    }
  }
}

const removeIndex = index => async (dispatch, getState) => {
  dispatch(startSync());

  try {
    const { applicationId, adminApiKey } = getState().settings.data;
    const client = algoliasearch(applicationId, adminApiKey);
    const algoliaIndex = client.initIndex(index);
    const res = await client.deleteIndex(index);
    const { taskID } = res;
    await algoliaIndex.waitTask(taskID);
    await dispatch(fetchIndices(applicationId, adminApiKey));
  } catch (e) {
    await dispatch(catchIndicesError(e));
  }

  return dispatch(finishSync());
};

const addSearchableAttribute = (index, attribute) => async (dispatch, getState) => {
  dispatch(startSync());

  try {
    const { applicationId, adminApiKey } = getState().settings.data;
    const client = algoliasearch(applicationId, adminApiKey);
    const algoliaIndex = client.initIndex(index);
    const getSettingsRes = await algoliaIndex.getSettings();
    const attributesToIndex = (getSettingsRes && getSettingsRes.attributesToIndex) || [];
    const newAttributes = uniq([...attributesToIndex, attribute]);
    const setSettingsRes = await algoliaIndex.setSettings({
      attributesToIndex: newAttributes,
    });
    const { taskID } = setSettingsRes;
    await algoliaIndex.waitTask(taskID);
    await dispatch(fetchIndices(applicationId, adminApiKey));
  } catch (e) {
    await dispatch(catchIndicesError(e));
  }

  return dispatch(finishSync());
};

const removeSearchableAttribute = (index, attribute) => async (dispatch, getState) => {
  dispatch(startSync());

  try {
    const { applicationId, adminApiKey } = getState().settings.data;
    const client = algoliasearch(applicationId, adminApiKey);
    const algoliaIndex = client.initIndex(index);
    const getSettingsRes = await algoliaIndex.getSettings();
    const attributesToIndex = (getSettingsRes && getSettingsRes.attributesToIndex) || [];
    const newAttributes = attributesToIndex.filter(name => name !== attribute);
    const setSettingsRes = await algoliaIndex.setSettings({
      attributesToIndex: newAttributes,
    });
    const { taskID } = setSettingsRes;
    await algoliaIndex.waitTask(taskID);
    await dispatch(fetchIndices(applicationId, adminApiKey));
  } catch (e) {
    await dispatch(catchIndicesError(e));
  }

  return dispatch(finishSync());
};

const addFacetAttribute = (index, attribute) => async (dispatch, getState) => {
  dispatch(startSync());

  try {
    const { applicationId, adminApiKey } = getState().settings.data;
    const client = algoliasearch(applicationId, adminApiKey);
    const algoliaIndex = client.initIndex(index);
    const getSettingsRes = await algoliaIndex.getSettings();
    const attributesForFaceting = (getSettingsRes && getSettingsRes.attributesForFaceting) || [];
    const newAttributes = uniq([...attributesForFaceting, attribute]);
    const setSettingsRes = await algoliaIndex.setSettings({
      attributesForFaceting: newAttributes,
    });
    const { taskID } = setSettingsRes;
    await algoliaIndex.waitTask(taskID);
    await dispatch(fetchIndices(applicationId, adminApiKey));
  } catch (e) {
    await dispatch(catchIndicesError(e));
  }

  return dispatch(finishSync());
};

const removeFacetAttribute = (index, attribute) => async (dispatch, getState) => {
  dispatch(startSync());

  try {
    const { applicationId, adminApiKey } = getState().settings.data;
    const client = algoliasearch(applicationId, adminApiKey);
    const algoliaIndex = client.initIndex(index);
    const getSettingsRes = await algoliaIndex.getSettings();
    const attributesForFaceting = (getSettingsRes && getSettingsRes.attributesForFaceting) || [];
    const newAttributes = attributesForFaceting.filter(name => name !== attribute);
    const setSettingsRes = await algoliaIndex.setSettings({
      attributesForFaceting: newAttributes,
    });
    const { taskID } = setSettingsRes;
    await algoliaIndex.waitTask(taskID);
    await dispatch(fetchIndices(applicationId, adminApiKey));
  } catch (e) {
    await dispatch(catchIndicesError(e));
  }

  return dispatch(finishSync());
};

export {
  actionTypes,
  addFacetAttribute,
  addSearchableAttribute,
  fetchIndices,
  removeIndex,
  removeFacetAttribute,
  removeSearchableAttribute,
  syncIndex,
};
