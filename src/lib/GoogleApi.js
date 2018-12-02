export const GoogleApi = function(opts) {
  opts = opts || {};

  if (!opts.hasOwnProperty('apiKey')) {
    throw new Error('You must pass an apiKey to use GoogleApi');
  }

  const apiKey = opts.apiKey;
  const libraries = opts.libraries || ['places'];
  const client = opts.client;
  const URL = opts.url || 'https://maps.googleapis.com/maps/api/js';

  const googleVersion = opts.version || '3.31';

  let script = null;
  let google = (typeof window !== 'undefined' && window.google) || null;
  let loading = false;
  let channel = null;
  let language = opts.language;
  let region = opts.region || null;

  let onLoadEvents = [];

  const url = () => {
    let url = URL;
    let params = {
      key: apiKey,
      callback: 'CALLBACK_NAME',
      libraries: libraries.join(','),
      client: client,
      v: googleVersion,
      channel: channel,
      language: language,
      region: region,
      onerror: 'ERROR_FUNCTION'
    };

    let paramStr = Object.keys(params)
      .filter(k => !!params[k])
      .map(k => `${k}=${params[k]}`)
      .join('&');

    return `${url}?${paramStr}`;
  };

  return url();
};

export default GoogleApi;
