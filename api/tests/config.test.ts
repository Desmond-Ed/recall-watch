import { describe, expect, it } from 'vitest';
import { loadConfig } from '../src/config.js';

describe('loadConfig', () => {
  it('returns typed config with defaults when PORT is present', () => {
    const config = loadConfig({ PORT: '3000' });
    expect(config.PORT).toBe(3000);
    expect(config.LOG_LEVEL).toBe('info');
    expect(config.NODE_ENV).toBe('development');
  });

  it('throws an error that names PORT when it is missing', () => {
    expect(() => loadConfig({})).toThrow(/PORT/);
  });

  it('throws when PORT is not a number', () => {
    expect(() => loadConfig({ PORT: 'abc' })).toThrow(/PORT/);
  });

  it('treats blank optional values as not set', () => {
    const config = loadConfig({ PORT: '3000', OPENFDA_API_KEY: '' });
    expect(config.OPENFDA_API_KEY).toBeUndefined();
  });
});
