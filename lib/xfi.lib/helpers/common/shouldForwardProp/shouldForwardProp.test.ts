import shouldForwardProp from './shouldForwardProp';

const EXAMPLE = 'example';
const EXAMPLE_START_WITH_$ = '$' + EXAMPLE;
const EXAMPLE_END_WITH_$ = EXAMPLE + '$';

describe('shouldForwardProp helper', () => {
  test('# call with string', async () => {
    expect(shouldForwardProp(EXAMPLE)).toBe(true);
  });

  test('# call with $ in the end of a string', async () => {
    expect(shouldForwardProp(EXAMPLE_END_WITH_$)).toBe(true);
  });

  test('# call with $ in the beginning of a string', async () => {
    expect(shouldForwardProp(EXAMPLE_START_WITH_$)).toBe(false);
  });
});
