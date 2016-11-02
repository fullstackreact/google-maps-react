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

const google = {
  maps: {
    LatLng: function(lat, lng) {
      return {
        latitude: parseFloat(lat),
        longitude: parseFloat(lng),

        lat: function() {
          return this.latitude;
        },
        lng: function() {
          return this.longitude;
        }
      };
    },
    LatLngBounds: function(ne, sw) {
      return {
        getSouthWest: function() {
          return sw;
        },
        getNorthEast: function() {
          return ne;
        }
      };
    },
    OverlayView: function() {
      return {};
    },
    InfoWindow: function() {
      return {};
    },
    Marker: function() {
      return {
        addListener: function() {},
        setMap: function() {}
      };
    },
    MarkerImage: function() {
      return {};
    },
    Map: function() {
      return {
        addListener: function() {},
        trigger: function() {}
      };
    },
    Point: function() {
      return {};
    },
    Size: function() {
      return {};
    },
    event: {
      trigger: function() {}
    }
  }
};

global.google = google;

documentRef = document;
