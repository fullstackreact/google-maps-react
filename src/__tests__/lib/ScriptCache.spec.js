import sinon from 'sinon'

import {
    shallow,
    mount,
    render
} from 'enzyme';
import {
    expect
} from 'chai';

const createCache = (obj, newElement) => {
    const ScriptCache = require('../../lib/ScriptCache').ScriptCache;
    let cache = ScriptCache(obj);
    cache._scriptTag = sinon.spy(cache, '_scriptTag')
    return cache;
}
describe('Cache', () => {
    let cache;
    let newElement;
    let onLoad;
    let stub, i;

    beforeEach(() => {
        newElement = {};
        cache = createCache({
            example: 'http://example.com'
        }, newElement);
    })

    afterEach(() => {
        cache._scriptTag.restore();
    })

    it('adds a script tag', () => {
        expect(global.window._scriptMap.has('example')).to.be.ok;
    })

    it('only adds a single script', () => {
        createCache({
            example: 'http://example.com'
        })
        createCache({
            example: 'http://example.com'
        })

        expect(global.window._scriptMap.has('example')).to.be.ok;
        const scripts = global.document.querySelectorAll('script')
        expect(scripts.length).to.equal(1);
        expect(scripts[0].src).to.equal('http://example.com/')
    });
})
