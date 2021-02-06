import { expect } from 'chai';
import { handler } from '../graphql';

describe('Netlify Function: graphql', () => {
  it('Netlify Functions should export handler', () => {
    expect(handler).to.exist;
  });

  it('must failed', () => {
    expect(2).to.equal(3);
  });
});
