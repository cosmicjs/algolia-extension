import queryString from 'query-string';
import cosmic from 'cosmicjs';

export default () => {
  if (typeof window === 'undefined') return undefined;

  if (window.bucket) return window.bucket;

  const { bucket_slug } = queryString.parse(window.location.search);
  const Cosmic = cosmic();
  const urlParams = new URLSearchParams(window.location.search);
  window.bucket = Cosmic.bucket({ slug: bucket_slug, read_key: urlParams.get('read_key'), write_key: urlParams.get('write_key') });

  return window.bucket;
};
