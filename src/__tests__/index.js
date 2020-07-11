import React from 'react';
import {mount, configure} from 'enzyme';
import {expect} from 'chai';
import Map from '../index';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

describe('Map', () => {
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
