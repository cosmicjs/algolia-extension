import queryString from 'query-string';
import Cosmic from 'cosmicjs';

export default () => {
  if (typeof window === 'undefined') return undefined;

  if (window.bucket) return window.bucket;

  const { bucket_slug } = queryString.parse(window.location.search);
  const urlParams = new URLSearchParams(window.location.search);
  const api = Cosmic({
    version: 'v3',
    token: urlParams.get('access_token'),
  });
  window.bucket = api.bucket({ slug: bucket_slug, read_key: urlParams.get('read_key'), write_key: urlParams.get('write_key') });

  return window.bucket;
};
