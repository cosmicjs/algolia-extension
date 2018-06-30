import queryString from 'query-string';
import cosmic from 'cosmicjs';

export default () => {
  if (typeof window === 'undefined') return undefined;

  if (window.bucket) return window.bucket;

  const { bucket_slug } = queryString.parse(window.location.search);
  const Cosmic = cosmic();
  window.bucket = Cosmic.bucket({ slug: bucket_slug });

  return window.bucket;
};
