import React from 'react';

import {expect} from 'chai';
import sinon from 'sinon';

import { camelize } from '../../lib/String'

describe('string', () => {
  it('camelizes words', () => {
    expect(camelize('hello world')).to.equal('HelloWorld');
    expect(camelize('mousemove')).to.equal('Mousemove');
  })
})
