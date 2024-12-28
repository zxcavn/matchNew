import { isValidXdsName, isValidXdsNameLabel, normalizeXdsName, ROOT_XDS_DOMAIN } from './xds';

const getName = (label: string) => `${label}.${ROOT_XDS_DOMAIN}`;

describe('isValidXdsNameLabel helper', () => {
  test('# should validate xds label correctly', () => {
    expect(isValidXdsNameLabel('xfi')).toBe(true);
    expect(isValidXdsNameLabel('name')).toBe(true);
    expect(isValidXdsNameLabel('name123')).toBe(true);
    expect(isValidXdsNameLabel('x'.repeat(64))).toBe(true);

    expect(isValidXdsNameLabel('')).toBe(false);
    expect(isValidXdsNameLabel('n')).toBe(false);
    expect(isValidXdsNameLabel('na')).toBe(false);
    expect(isValidXdsNameLabel('n'.repeat(65))).toBe(false);
    expect(isValidXdsNameLabel('!@#$%^&*()_')).toBe(false);
  });
});

describe('isValidXdsName helper', () => {
  test('# should validate xds name correctly', () => {
    expect(isValidXdsName(getName('xfi'))).toBe(true);
    expect(isValidXdsName(getName('name'))).toBe(true);
    expect(isValidXdsName(getName('name123'))).toBe(true);
    expect(isValidXdsName(getName('n'.repeat(64)))).toBe(true);

    expect(isValidXdsName(getName(''))).toBe(false);
    expect(isValidXdsName(getName('n'))).toBe(false);
    expect(isValidXdsName(getName('na'))).toBe(false);
    expect(isValidXdsName(getName('n'.repeat(65)))).toBe(false);
    expect(isValidXdsName(getName('!@#$%^&*()_'))).toBe(false);
  });
});

describe('normalizeXdsName helper', () => {
  test('# should normalize valid name or label to `NormalizeNameResult` object', () => {
    const label = 'name';
    const name = getName(label);
    const normalizedLabel = normalizeXdsName(label);
    const normalizedName = normalizeXdsName(name);

    expect(normalizedLabel).not.toBeNull();
    expect(normalizedName).not.toBeNull();
    expect(normalizedLabel?.label).toBe(label);
    expect(normalizedLabel?.name).toBe(name);
    expect(normalizedName?.label).toBe(label);
    expect(normalizedName?.name).toBe(name);
  });

  test('# should not normalize incorrect name or label', () => {
    const label = 'n';
    const name = getName(label);
    const normalizedLabel = normalizeXdsName(label);
    const normalizedName = normalizeXdsName(name);

    expect(normalizedLabel).toBeNull();
    expect(normalizedName).toBeNull();
  });
});
