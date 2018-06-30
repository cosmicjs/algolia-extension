import getBucket from '../../utils/getBucket';

const actionTypes = {
  CATCH_SETTINGS_ERROR: 'CATCH_SETTINGS_ERROR',
  RECEIVE_SETTINGS: 'RECEIVE_SETTINGS',
  REQUEST_SETTINGS: 'REQUEST_SETTINGS',
};

const catchSettingsError = (error) => {
  if (process.env.NODE_ENV !== 'production') {
    console.error(error); // eslint-disable-line no-console
  }
  return {
    type: actionTypes.CATCH_SETTINGS_ERROR,
    error,
  };
};

const receiveSettings = settings => ({
  type: actionTypes.RECEIVE_SETTINGS,
  settings,
});

const requestSettings = () => ({
  type: actionTypes.REQUEST_SETTINGS,
});

const fetchSettings = () => async (dispatch) => {
  dispatch(requestSettings());

  try {
    const bucket = getBucket();
    const data = await Promise.all([
      bucket.getObject({ slug: 'algolia-info-application-id' }).catch(() => undefined),
      bucket.getObject({ slug: 'algolia-info-admin-api-key' }).catch(() => undefined),
      bucket.getObject({ slug: 'algolia-info-webhooks' }).catch(() => undefined),
    ]);

    const settings = {};

    settings.applicationId = data[0] && data[0].object && data[0].object.content;
    settings.adminApiKey = data[1] && data[1].object && data[1].object.content;
    settings.webhooks = JSON.parse((data[2] && data[2].object && data[2].object.content) || '[]');

    return dispatch(receiveSettings(settings));
  } catch (e) {
    return dispatch(catchSettingsError(e));
  }
};

export {
  actionTypes,
  fetchSettings,
};
