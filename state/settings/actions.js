import fetch from 'isomorphic-fetch';
import queryString from 'query-string';
import { fetchIndices } from '../indices/actions';
import getBucket from '../../utils/getBucket';

// const WEBHOOK_API_ENDPOINT = 'https://algolia-search.cosmicapp.co'; OLD URL
const WEBHOOK_API_ENDPOINT = 'https://algolia-webhook-listener.herokuapp.com';

const actionTypes = {
  CATCH_SETTINGS_ERROR: 'CATCH_SETTINGS_ERROR',
  RECEIVE_SETTINGS: 'RECEIVE_SETTINGS',
  REQUEST_SETTINGS: 'REQUEST_SETTINGS',
  START_SETTINGS_LOAD: 'START_SETTINGS_LOAD',
  FINISH_SETTINGS_LOAD: 'FINISH_SETTINGS_LOAD',
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

const startSettingsLoad = () => ({
  type: actionTypes.START_SETTINGS_LOAD,
});

const finishSettingsLoad = () => ({
  type: actionTypes.FINISH_SETTINGS_LOAD,
});

const fetchSettings = () => async (dispatch) => {
  dispatch(requestSettings());

  try {
    const bucket = getBucket();
    const data = await Promise.all([
      bucket.getObject({ slug: 'algolia-info-application-id' }).catch(() => undefined),
      bucket.getObject({ slug: 'algolia-info-admin-api-key' }).catch(() => undefined),
      bucket.getObject({ slug: 'algolia-info-webhooks' }).catch(() => undefined),
      bucket.getObject({ slug: 'algolia-info-bucket-id' }).catch(() => undefined),
    ]);

    const settings = {};

    settings.applicationId = data[0] && data[0].object && data[0].object.content;
    settings.adminApiKey = data[1] && data[1].object && data[1].object.content;
    settings.webhooks = JSON.parse((data[2] && data[2].object && data[2].object.content) || '{}');
    settings.bucketId = data[3] && data[3].object && data[3].object.content;

    await dispatch(receiveSettings(settings));
    return dispatch(fetchIndices(settings.applicationId, settings.adminApiKey));
  } catch (e) {
    return dispatch(catchSettingsError(e));
  }
};

const setSettings = settings => async (dispatch) => {
  try {
    const bucket = getBucket();

    return Promise.all(Object.keys(settings).map((async (settingName) => {
      const cosmicObject = { type_slug: 'algolia-info' };

      switch (settingName) {
        case 'applicationId':
          cosmicObject.content = settings[settingName] || '';
          cosmicObject.slug = 'algolia-info-application-id';
          cosmicObject.title = 'Application ID';
          break;
        case 'adminApiKey':
          cosmicObject.content = settings[settingName] || '';
          cosmicObject.slug = 'algolia-info-admin-api-key';
          cosmicObject.title = 'Admin API Key';
          break;
        case 'bucketId':
          cosmicObject.content = settings[settingName] || '';
          cosmicObject.slug = 'algolia-info-bucket-id';
          cosmicObject.title = 'Bucket ID';
          break;
        default:
          if (process.env.NODE_ENV !== 'production') {
            // eslint-disable-next-line no-console
            console.log(`${settings} not implemented yet`);
          }
          return Promise.resolve();
      }

      try {
        await bucket.editObject(cosmicObject);
      } catch (e) {
        await bucket.addObject(cosmicObject);
      }
      return dispatch(fetchSettings());
    })));
  } catch (e) {
    return dispatch(catchSettingsError(e));
  }
};

const removeWebhooks = () => async (dispatch, getState) => {
  dispatch(startSettingsLoad());

  try {
    const bucket = getBucket();

    const { bucketId } = getState().settings.data;
    await fetch(`${WEBHOOK_API_ENDPOINT}/api/removeBucketSlug/${bucketId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    let webhookRes;
    try {
      webhookRes = await bucket.getObject({ slug: 'algolia-info-webhooks' });
    } catch (e) {
      // No webhooks Object, so no webhooks to delete
      return Promise.resolve();
    }

    const { createId, editId, deleteId } = JSON.parse(webhookRes.object.content);

    await Promise.all([
      bucket.deleteWebhook({ id: createId }).catch(() => undefined),
      bucket.deleteWebhook({ id: editId }).catch(() => undefined),
      bucket.deleteWebhook({ id: deleteId }).catch(() => undefined),
    ]);

    const webhooksObject = {
      content: '{}',
      slug: 'algolia-info-webhooks',
      title: 'Webhooks IDs',
      type_slug: 'algolia-info',
    };

    try {
      await bucket.editObject(webhooksObject);
    } catch (e) {
      await bucket.addObject(webhooksObject);
    }

    await dispatch(fetchSettings());
  } catch (e) {
    await dispatch(catchSettingsError(e));
  }

  return dispatch(finishSettingsLoad());
};

const addWebhooks = () => async (dispatch, getState) => {
  dispatch(startSettingsLoad());

  try {
    const bucket = getBucket();
    const { bucketId } = getState().settings.data;
    const urlParams = new URLSearchParams(window.location.search);
    const createId = (await bucket.addWebhook({
      endpoint: `${WEBHOOK_API_ENDPOINT}/api/create?read_key=${urlParams.get('read_key')}`,
      event: 'object.created.published',
    })).webhook.id;

    const editId = (await bucket.addWebhook({
      endpoint: `${WEBHOOK_API_ENDPOINT}/api/edit?read_key=${urlParams.get('read_key')}`,
      event: 'object.edited.published',
    })).webhook.id;

    const unpublishedId = (await bucket.addWebhook({
      endpoint: `${WEBHOOK_API_ENDPOINT}/api/delete?read_key=${urlParams.get('read_key')}&bucket=${bucketId}&types=<ADD_COMMA_SEPARATED_TYPE_SLUGS_HERE>`,
      event: 'object.edited.unpublished',
    })).webhook.id;

    const deleteId = (await bucket.addWebhook({
      endpoint: `${WEBHOOK_API_ENDPOINT}/api/delete?read_key=${urlParams.get('read_key')}&bucket=${bucketId}&types=<ADD_COMMA_SEPARATED_TYPE_SLUGS_HERE>`,
      event: 'object.deleted',
    })).webhook.id;

    const webhooksObject = {
      content: JSON.stringify({
        createId,
        editId,
        unpublishedId,
        deleteId,
      }),
      slug: 'algolia-info-webhooks',
      title: 'Webhooks IDs',
      type_slug: 'algolia-info',
    };

    try {
      await bucket.editObject(webhooksObject);
    } catch (e) {
      await bucket.addObject(webhooksObject);
    }

    await fetch(`${WEBHOOK_API_ENDPOINT}/api/addBucketSlug`, {
      body: JSON.stringify({
        id: bucketId,
        slug: queryString.parse(window.location.search).bucket_slug,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    await dispatch(fetchSettings());
  } catch (e) {
    await dispatch(catchSettingsError(e));
  }

  return dispatch(finishSettingsLoad());
};

export {
  actionTypes,
  addWebhooks,
  fetchSettings,
  removeWebhooks,
  setSettings,
};
