import React from 'react';

import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import Marker from '../../components/Marker';

// let google = {};
// google.maps = {};
// google.maps.LatLng = function(lat, lng, opt_noWrap) {};

describe('Marker', () => {
  let map = null, google = global.google;
  let sandbox;
  let LatLng = null;
  let location;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();

    map = {}
    location = {lat: 37.759703, lng: -122.428093}

    sandbox.stub(google.maps, 'Map').returns(google.maps.Map);
    // sandbox.stub(google.maps, 'Marker').returns(google.maps.Marker);
  })

  afterEach(() => {
    sandbox.restore();
  })

  it('accepts a `map` and a `google` prop', () => {
    const wrapper = mount(<Marker google={google}
                                  map={map}
                                  position={location} />);
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
