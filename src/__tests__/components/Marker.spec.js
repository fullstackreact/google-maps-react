import React from 'react';

import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import Marker from '../../components/Marker';

// let google = {};
// google.maps = {};
// google.maps.LatLng = function(lat, lng, opt_noWrap) {};

describe('Marker', () => {
  let map = null, google = null;
  let sandbox;
  let LatLng = null;
  let location;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();

    map = {}
    location = {lat: 37.759703, lng: -122.428093}

    google = {
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
            addListener: function() {}
          };
    		},
    		MarkerImage: function() {
    			return {};
    		},
    		Map: function() {
    			return {};
    		},
    		Point: function() {
    			return {};
    		},
    		Size: function() {
    			return {};
    		}
    	}
    };


    sandbox.stub(google.maps, 'Map').returns(google.maps.Map);
    // sandbox.stub(google.maps, 'Marker').returns(google.maps.Marker);
  })

  afterEach(() => {
    sandbox.restore();
  })

  it('accepts a `map` and a `google` prop', () => {
    const wrapper = mount(<Marker google={google} map={map} />);
    expect(wrapper.props().google).to.equal(google);
    expect(wrapper.props().map).to.equal(map);
  });

  describe('LatLng', () => {
    let wrapper;
    beforeEach(() => {
      sandbox.stub(google.maps, 'LatLng')
        .returns(sinon.createStubInstance(google.maps.LatLng));
      sandbox.spy(google.maps, 'Marker')
      wrapper = mount(<Marker google={google}
                              position={location} />);
    });

    it('creates a location from the position prop', () => {
      wrapper.setProps({map: map})
      sinon.assert
        .calledWith(google.maps.LatLng, location.lat, location.lng)
    });

    it('creates a Marker from the position prop', () => {
      wrapper.setProps({map: map})
      sinon.assert.called(google.maps.Marker)
    });

  })

})
