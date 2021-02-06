import { expect } from 'chai';
import { handler } from '../graphql';

describe('Netlify Function: graphql', () => {
  it('Netlify Functions should export handler', () => {
    expect(handler).to.exist;
  });
});