require('babel-core/register');
require('babel-polyfill');

var jsdom = require('jsdom').jsdom;
var chai = require('chai'),
    spies = require('chai-spies');
var sinon = require('sinon');

var exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

chai.use(spies);

documentRef = document;
