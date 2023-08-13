import { negative1ToNull } from '../util';

describe('negative1ToNull Test', () => {
  test('put -1, get Null', () => {
    expect(negative1ToNull(-1)).toBeNull();
  });

  test('put 0, get 0', () => {
    expect(negative1ToNull(0)).toBe(0);
  });

  test('put 2343, get 2343', () => {
    expect(negative1ToNull(2343)).toBe(2343);
  });

  test('put -12, get -12', () => {
    expect(negative1ToNull(-12)).toBe(-12);
  });
});
