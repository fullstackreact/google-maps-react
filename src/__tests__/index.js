import React from 'react';

import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import Map from '../index';

describe('Map', () => {
  let wrapper;

  describe('google prop', () => {
    it('explodes without a `google` prop', () => {
      expect(() => mount(<Map />)).to.throw(Error);
    });

    it('does not explode with a `google` prop', () => {
      expect(() => mount(
        <Map
          google={global.google} />
      )).not.to.throw(Error);
    });
  });

})
