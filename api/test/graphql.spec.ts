import { expect } from 'chai';
import { handler } from '../graphql';

describe('Netlify Function: graphql', () => {
  it('Netlify Functions should export handler', () => {
    // Neltify Functions should export handler!
    // 만만한게 이놈이다
    // ,..,.
    // zzz
    expect(handler).to.exist;
  });
});
