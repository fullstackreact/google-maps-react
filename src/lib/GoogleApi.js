import invariant from 'invariant'

export const GoogleApi = function(opts) {
    opts = opts || {}

    invariant(opts.hasOwnProperty('apiKey'),
              'You must pass an apiKey to use GoogleApi');

    const apiKey = opts.apiKey;
    const libraries = opts.libraries || ['places'];
    const client = opts.client;
    const URL = 'https://maps.googleapis.com/maps/api/js';

    const googleVersion = opts.version || '3';

    let script = null;
    let google = window.google || null;
    let loading = false;
    let channel = null;
    let language = opts.language;
    let region = null;

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
            region: region
        }

        let paramStr = Object.keys(params)
            .filter(k => !!params[k])
            .map(k => `${k}=${params[k]}`).join('&');

        return `${url}?${paramStr}`;
    }

    return url();
}

export default GoogleApi
