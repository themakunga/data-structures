import { defaultEquals } from '../src/structures/utils';

describe('utils', () => {
  it('defaultEquals', () => {
    expect(defaultEquals(1, 8)).toBe(false);
    expect(defaultEquals(8, 8)).toBe(true);
  });
});
